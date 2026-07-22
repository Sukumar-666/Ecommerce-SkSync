const User = require("../models/User");

function toPublicUser(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    gender: user.gender,
    role: user.role,
    address: user.address
  };
}

// GET /api/users/profile  (protected — any logged-in user)
async function getProfile(req, res) {
  return res.json({ user: toPublicUser(req.user) });
}

// PUT /api/users/profile  (protected — any logged-in user)
async function updateProfile(req, res) {
  try {
    const { name, mobile, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found." });

    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (address) user.address = { ...user.address.toObject(), ...address };

    await user.save();
    return res.json({ user: toPublicUser(user) });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Could not update profile." });
  }
}

// GET /api/users  (protected — admin only) — powers the Admin Dashboard user table
async function listUsers(req, res) {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return res.json({ users });
  } catch (error) {
    console.error("List users error:", error);
    return res.status(500).json({ message: "Could not fetch users." });
  }
}

module.exports = { getProfile, updateProfile, listUsers };
