const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address: { type: String, default: "" },
    city: { type: String, default: "" },
    state: { type: String, default: "" },
    pincode: { type: String, default: "" },
    phone: { type: String, default: "" }
  },
  { _id: false }
);

// One refresh token per logged-in device/browser, so "logout from all devices"
// and multi-device support both work by managing entries in this array.
const refreshTokenSchema = new mongoose.Schema(
  {
    tokenHash: { type: String, required: true }, // never store the raw refresh token
    device: { type: String, default: "unknown" },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    revoked: { type: Boolean, default: false }
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    password: { type: String, required: true }, // bcrypt hash, never plain text

    // Existing role-based access — unchanged
    role: { type: String, enum: ["customer", "admin"], default: "customer" },

    // Existing address sub-document — unchanged, used by Profile "update address"
    address: { type: addressSchema, default: () => ({}) },

    // Mandatory gender selection drives the personalized catalog everywhere.
    // Existing accounts created before this change may have "other" — the
    // signup form itself now only offers Male/Female per the new requirement.
    gender: { type: String, enum: ["male", "female", "other"], required: true, default: "other" },

    // --- Email verification ---
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationTokenHash: { type: String, default: null },
    emailVerificationExpires: { type: Date, default: null },

    // --- Two-factor (OTP) login ---
    otpHash: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    otpAttempts: { type: Number, default: 0 },
    otpLastSentAt: { type: Date, default: null },

    // --- Refresh token / multi-device session tracking ---
    refreshTokens: { type: [refreshTokenSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
