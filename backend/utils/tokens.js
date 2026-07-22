const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const ACCESS_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_EXPIRES_IN_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRES_DAYS || 7);

// --- Access token: short-lived, sent on every request, never stored server-side ---
function signAccessToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, gender: user.gender },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_EXPIRES_IN }
  );
}

// --- Refresh token: long-lived, stored (hashed) server-side so it can be revoked ---
function signRefreshToken(user, tokenId) {
  return jwt.sign(
    { id: user._id, jti: tokenId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: `${REFRESH_EXPIRES_IN_DAYS}d` }
  );
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

// We never store raw tokens/OTPs/verification codes in the DB — only a SHA-256
// hash of them — the same principle as password hashing: if the DB leaks, the
// tokens inside it are useless without the original value.
function hashValue(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function generateRawToken() {
  return crypto.randomBytes(32).toString("hex"); // used for email verification links
}

function generateOtp() {
  return String(crypto.randomInt(100000, 999999)); // 6-digit numeric OTP
}

function refreshExpiryDate() {
  return new Date(Date.now() + REFRESH_EXPIRES_IN_DAYS * 24 * 60 * 60 * 1000);
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  hashValue,
  generateRawToken,
  generateOtp,
  refreshExpiryDate
};
