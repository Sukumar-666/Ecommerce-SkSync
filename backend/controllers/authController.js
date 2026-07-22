const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendVerificationEmail, sendOtpEmail } = require("../utils/email");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  hashValue,
  generateRawToken,
  generateOtp,
  refreshExpiryDate
} = require("../utils/tokens");

const OTP_EXPIRES_MS = 5 * 60 * 1000; // 5 minutes
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_MS = 45 * 1000;
const VERIFY_TOKEN_EXPIRES_MS = 24 * 60 * 60 * 1000; // 24 hours
const REFRESH_COOKIE_NAME = "sksync_refresh";

function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7) * 24 * 60 * 60 * 1000
  };
}

function clearCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth"
  };
}

// Short-lived ticket issued after password check succeeds, before OTP is verified.
// Keeps the login flow stateless between step 1 and step 2 without exposing the
// user's real session yet.
function signPendingTicket(user) {
  return jwt.sign({ id: user._id, purpose: "2fa-pending" }, process.env.JWT_PENDING_SECRET, {
    expiresIn: "10m"
  });
}

function verifyPendingTicket(token) {
  const decoded = jwt.verify(token, process.env.JWT_PENDING_SECRET);
  if (decoded.purpose !== "2fa-pending") throw new Error("Invalid ticket purpose.");
  return decoded;
}

async function issueSessionTokens(res, user, deviceLabel) {
  const accessToken = signAccessToken(user);

  // jti is a random id for this specific refresh token record, so it can be
  // looked up/revoked individually without decoding+hashing the whole token.
  const jti = generateRawToken();
  const refreshToken = signRefreshToken(user, jti);

  user.refreshTokens.push({
    tokenHash: hashValue(refreshToken),
    device: deviceLabel || "unknown device",
    expiresAt: refreshExpiryDate()
  });
  // Prevent unbounded growth — keep the most recent 10 sessions per user.
  if (user.refreshTokens.length > 10) {
    user.refreshTokens = user.refreshTokens.slice(-10);
  }
  await user.save();

  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions());
  return accessToken;
}

function publicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    gender: user.gender
  };
}

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword, gender } = req.body;

    if (!name || !email || !mobile || !password || !gender) {
      return res.status(400).json({ message: "All fields are required, including gender." });
    }
    if (!["male", "female"].includes(gender)) {
      return res.status(400).json({ message: "Please select Male or Female." });
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const rawToken = generateRawToken();

    const hasSmtp = Boolean(process.env.SMTP_HOST);
    const autoVerify = !hasSmtp || process.env.AUTO_VERIFY === "true";

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      mobile,
      password: hashedPassword,
      gender,
      role: "customer",
      isEmailVerified: autoVerify,
      emailVerificationTokenHash: hashValue(rawToken),
      emailVerificationExpires: new Date(Date.now() + VERIFY_TOKEN_EXPIRES_MS)
    });

    let emailSent = false;
    if (hasSmtp) {
      const mailResult = await sendVerificationEmail(user, rawToken);
      if (mailResult && !mailResult.error && !mailResult.skipped) {
        emailSent = true;
      } else {
        console.warn(`[signup] Email send skipped or failed for ${user.email}. Auto-verifying user account as fallback.`);
        user.isEmailVerified = true;
        await user.save();
      }
    }

    res.status(201).json({
      message: (autoVerify || !emailSent)
        ? "Account created successfully. You can now log in."
        : "Account created. Please check your email to verify your account before logging in."
    });
  } catch (err) {
    res.status(500).json({ message: "Signup failed.", error: err.message });
  }
};

// GET /api/auth/verify-email/:token
exports.verifyEmail = async (req, res) => {
  try {
    const tokenHash = hashValue(req.params.token);
    const user = await User.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ message: "This verification link is invalid or has expired." });
    }

    user.isEmailVerified = true;
    user.emailVerificationTokenHash = null;
    user.emailVerificationExpires = null;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (err) {
    res.status(500).json({ message: "Verification failed.", error: err.message });
  }
};

// POST /api/auth/resend-verification  { email }
exports.resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });

    const genericResponse = { message: "If an account exists for that email, a new verification link has been sent." };

    if (!user || user.isEmailVerified) return res.json(genericResponse);

    const rawToken = generateRawToken();
    user.emailVerificationTokenHash = hashValue(rawToken);
    user.emailVerificationExpires = new Date(Date.now() + VERIFY_TOKEN_EXPIRES_MS);
    await user.save();

    if (process.env.SMTP_HOST) {
      await sendVerificationEmail(user, rawToken);
    }
    res.json(genericResponse);
  } catch (err) {
    res.status(500).json({ message: "Could not resend verification email.", error: err.message });
  }
};

// POST /api/auth/login  { email, password, role }
// Step 1 of 2: verifies credentials, then emails an OTP instead of issuing a session.
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (role && role !== user.role) {
      return res.status(403).json({ message: `This account is registered as "${user.role}", not "${role}".` });
    }

    // Admins bypass email verification and OTP steps for instant dashboard login
    if (user.role === "admin") {
      const accessToken = await issueSessionTokens(res, user, req.headers["user-agent"]);
      return res.json({
        message: "Admin login successful.",
        otpRequired: false,
        accessToken,
        user: publicUser(user)
      });
    }

    const hasSmtp = Boolean(process.env.SMTP_HOST);
    if (!user.isEmailVerified) {
      if (hasSmtp && process.env.AUTO_VERIFY !== "true") {
        return res.status(403).json({
          message: "Please verify your email before logging in.",
          code: "EMAIL_NOT_VERIFIED"
        });
      }
      // If SMTP is not configured or AUTO_VERIFY=true, auto-verify account
      user.isEmailVerified = true;
      await user.save();
    }

    const otp = generateOtp();
    user.otpHash = hashValue(otp);
    user.otpExpires = new Date(Date.now() + OTP_EXPIRES_MS);
    user.otpAttempts = 0;
    user.otpLastSentAt = new Date();
    await user.save();

    await sendOtpEmail(user, otp);

    res.json({
      message: hasSmtp
        ? "A verification code has been sent to your email."
        : `SMTP not set. Your OTP code is: ${otp}`,
      otpRequired: true,
      pendingToken: signPendingTicket(user),
      ...(hasSmtp ? {} : { devOtp: otp })
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed.", error: err.message });
  }
};

// POST /api/auth/verify-otp  { pendingToken, otp }
// Step 2 of 2: completes login and issues the real session tokens.
exports.verifyOtp = async (req, res) => {
  try {
    const { pendingToken, otp } = req.body;
    if (!pendingToken || !otp) {
      return res.status(400).json({ message: "Missing verification code." });
    }

    let decoded;
    try {
      decoded = verifyPendingTicket(pendingToken);
    } catch {
      return res.status(401).json({ message: "This login attempt has expired. Please log in again." });
    }

    const user = await User.findById(decoded.id);
    if (!user || !user.otpHash || !user.otpExpires) {
      return res.status(400).json({ message: "No pending verification for this account." });
    }

    if (user.otpExpires < new Date()) {
      user.otpHash = null;
      user.otpExpires = null;
      await user.save();
      return res.status(400).json({ message: "This code has expired. Please request a new one." });
    }

    if (user.otpAttempts >= OTP_MAX_ATTEMPTS) {
      user.otpHash = null;
      user.otpExpires = null;
      await user.save();
      return res.status(429).json({ message: "Too many failed attempts. Please log in again." });
    }

    if (hashValue(otp) !== user.otpHash) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(401).json({
        message: `Incorrect code. ${OTP_MAX_ATTEMPTS - user.otpAttempts} attempt(s) remaining.`
      });
    }

    // Success — clear OTP state and issue the real session.
    user.otpHash = null;
    user.otpExpires = null;
    user.otpAttempts = 0;
    const accessToken = await issueSessionTokens(res, user, req.headers["user-agent"]);

    res.json({ accessToken, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed.", error: err.message });
  }
};

// POST /api/auth/resend-otp  { pendingToken }
exports.resendOtp = async (req, res) => {
  try {
    const { pendingToken } = req.body;
    let decoded;
    try {
      decoded = verifyPendingTicket(pendingToken);
    } catch {
      return res.status(401).json({ message: "This login attempt has expired. Please log in again." });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (user.otpLastSentAt && Date.now() - user.otpLastSentAt.getTime() < OTP_RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((OTP_RESEND_COOLDOWN_MS - (Date.now() - user.otpLastSentAt.getTime())) / 1000);
      return res.status(429).json({ message: `Please wait ${waitSeconds}s before requesting a new code.` });
    }

    const otp = generateOtp();
    user.otpHash = hashValue(otp);
    user.otpExpires = new Date(Date.now() + OTP_EXPIRES_MS);
    user.otpAttempts = 0;
    user.otpLastSentAt = new Date();
    await user.save();

    await sendOtpEmail(user, otp);
    res.json({ message: "A new code has been sent to your email." });
  } catch (err) {
    res.status(500).json({ message: "Could not resend code.", error: err.message });
  }
};

// POST /api/auth/refresh — reads httpOnly cookie, rotates the refresh token
exports.refresh = async (req, res) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "No refresh token." });

    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());
      return res.status(401).json({ message: "Refresh token invalid or expired. Please log in again." });
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found." });

    const tokenHash = hashValue(token);
    const record = user.refreshTokens.find((rt) => rt.tokenHash === tokenHash && !rt.revoked);

    if (!record) {
      // Valid JWT signature but not present/already used in our store — possible
      // token theft/reuse. Revoke every session for this user as a precaution.
      user.refreshTokens = [];
      await user.save();
      res.clearCookie(REFRESH_COOKIE_NAME, clearCookieOptions());
      return res.status(401).json({ message: "Session invalid. Please log in again." });
    }

    // Rotate: invalidate the used token, issue a brand new pair.
    user.refreshTokens = user.refreshTokens.filter((rt) => rt._id.toString() !== record._id.toString());
    const accessToken = await issueSessionTokens(res, user, req.headers["user-agent"]);

    res.json({ accessToken, user: publicUser(user) });
  } catch (err) {
    res.status(500).json({ message: "Could not refresh session.", error: err.message });
  }
};

// POST /api/auth/logout — revoke just this device's refresh token
exports.logout = async (req, res) => {
  try {
    const token = req.cookies?.[REFRESH_COOKIE_NAME];
    if (token) {
      try {
        const decoded = verifyRefreshToken(token);
        const user = await User.findById(decoded.id);
        if (user) {
          const tokenHash = hashValue(token);
          user.refreshTokens = user.refreshTokens.filter((rt) => rt.tokenHash !== tokenHash);
          await user.save();
        }
      } catch {
        // token already invalid/expired — nothing to revoke, fall through to clearing the cookie
      }
    }
    res.clearCookie(REFRESH_COOKIE_NAME, clearCookieOptions());
    res.json({ message: "Logged out." });
  } catch (err) {
    res.status(500).json({ message: "Logout failed.", error: err.message });
  }
};

// POST /api/auth/logout-all — requires a valid access token; revokes every device
exports.logoutAll = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.refreshTokens = [];
    await user.save();

    res.clearCookie(REFRESH_COOKIE_NAME, clearCookieOptions());
    res.json({ message: "Logged out from all devices." });
  } catch (err) {
    res.status(500).json({ message: "Could not log out of all devices.", error: err.message });
  }
};

// GET /api/auth/me — requires a valid access token
exports.me = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({ user: publicUser(user) });
};
