const express = require("express");
const auth = require("../controllers/authController");
const { requireAuth } = require("../middleware/auth");
const { authLimiter, otpLimiter } = require("../middleware/security");

const router = express.Router();

router.post("/signup", authLimiter, auth.signup);
router.get("/verify-email/:token", auth.verifyEmail);
router.post("/resend-verification", authLimiter, auth.resendVerification);
router.get("/test-email", auth.testEmail);

router.post("/login", authLimiter, auth.login);
router.post("/verify-otp", otpLimiter, auth.verifyOtp);
router.post("/resend-otp", otpLimiter, auth.resendOtp);

router.post("/refresh", auth.refresh);
router.post("/logout", auth.logout);
router.post("/logout-all", requireAuth, auth.logoutAll);
router.get("/me", requireAuth, auth.me);

module.exports = router;
