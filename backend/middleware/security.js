const rateLimit = require("express-rate-limit");
// Slows down brute-force attacks on login/OTP/signup without affecting normal browsing.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: { message: "Too many attempts. Please try again in a few minutes." }
});
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  validate: { xForwardedForHeader: false },
  message: { message: "Too many OTP requests. Please wait a few minutes before trying again." }
});
module.exports = { authLimiter, otpLimiter };
