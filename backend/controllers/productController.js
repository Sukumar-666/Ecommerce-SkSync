const Product = require("../models/Product");

// GET /api/products?gender=male|female&category=...&brand=...
// If gender is provided, returns that gender's products PLUS unisex items —
// this is the one shared filter every personalized page (home, categories,
// listing, search, offers, recommendations) should call through.
exports.list = async (req, res) => {
  const { gender, category, brand } = req.query;
  const filter = {};
  if (gender && ["male", "female"].includes(gender)) {
    filter.gender = { $in: [gender, "unisex"] };
  }
  if (category) filter.category = category;
  if (brand) filter.brand = brand;

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ products });
};

exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
};

exports.create = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ product });
};

exports.remove = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found." });
  res.json({ message: "Product deleted." });
};
