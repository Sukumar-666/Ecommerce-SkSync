const express = require("express");
const { placeOrder, myOrders, allOrders, updateStatus } = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my", protect, myOrders);
router.get("/", protect, adminOnly, allOrders);
router.put("/:id/status", protect, adminOnly, updateStatus);

module.exports = router;
