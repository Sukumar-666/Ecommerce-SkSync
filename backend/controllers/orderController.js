const Order = require("../models/Order");

// POST /api/orders  (protected) — used at the end of Checkout/Payment
async function placeOrder(req, res) {
  try {
    const { items, shippingAddress, paymentMethod, subtotal, shipping, total } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "An order must contain at least one item." });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      total
    });

    return res.status(201).json({ order });
  } catch (error) {
    console.error("Place order error:", error);
    return res.status(500).json({ message: "Could not place your order." });
  }
}

// GET /api/orders/my  (protected) — powers the Profile "My Orders" table
async function myOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (error) {
    console.error("My orders error:", error);
    return res.status(500).json({ message: "Could not fetch your orders." });
  }
}

// GET /api/orders  (protected — admin only) — powers the Admin Dashboard orders table
async function allOrders(req, res) {
  try {
    const orders = await Order.find().populate("user", "name email role").sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (error) {
    console.error("All orders error:", error);
    return res.status(500).json({ message: "Could not fetch orders." });
  }
}

// PUT /api/orders/:id/status  (protected — admin only) — update order status
async function updateStatus(req, res) {
  try {
    const validStatuses = ["Placed", "Shipped", "Delivered", "Cancelled"];
    const { status } = req.body;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found." });
    return res.json({ order });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({ message: "Could not update order status." });
  }
}

module.exports = { placeOrder, myOrders, allOrders, updateStatus };
