const { verifyAccessToken } = require("../utils/tokens");
const User = require("../models/User");

async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided. Please log in." });
  }

  try {
    const decoded = verifyAccessToken(token); // { id, role, gender }

    // Fetch the full document (minus password) rather than trusting the token's
    // stale snapshot — matches what the existing user/order controllers expect
    // (req.user._id, req.user.address, etc.) and catches deleted/banned accounts.
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User no longer exists." });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Access token expired.", code: "TOKEN_EXPIRED" });
    }
    return res.status(401).json({ message: "Invalid token. Please log in again." });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
}

// Backward-compatible aliases — the existing userRoutes.js/orderRoutes.js
// (carried over unchanged) import { protect, adminOnly }.
module.exports = { requireAuth, requireAdmin, protect: requireAuth, adminOnly: requireAdmin };
