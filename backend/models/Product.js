const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    brand: { type: String, default: "" },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    stock: { type: Number, default: 0 },

    // New: which audience this product belongs to. "unisex" products show
    // for both genders; "male"/"female" products are filtered by the
    // logged-in user's selected gender everywhere in the app.
    gender: { type: String, enum: ["male", "female", "unisex"], default: "unisex" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
