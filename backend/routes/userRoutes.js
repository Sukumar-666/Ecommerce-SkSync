const express = require("express");
const { getProfile, updateProfile, listUsers } = require("../controllers/userController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/", protect, adminOnly, listUsers);

module.exports = router;
