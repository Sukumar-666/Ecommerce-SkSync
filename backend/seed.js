// Run with: npm run seed  (from inside /backend)
require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");
const Product = require("./models/Product");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const adminEmail = "sukumar1@gmail.com";
  const hashedPassword = await bcrypt.hash("Admin@123", 12);
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) {
    existingAdmin.password = hashedPassword;
    existingAdmin.role = "admin";
    existingAdmin.isEmailVerified = true;
    await existingAdmin.save();
    console.log(`Admin account updated: ${adminEmail} / Admin@123 (verified admin)`);
  } else {
    await User.create({
      name: "Site Admin",
      email: adminEmail,
      mobile: "9999999999",
      password: hashedPassword,
      role: "admin",
      gender: "male",
      isEmailVerified: true
    });
    console.log(`Admin account created: ${adminEmail} / Admin@123 (verified admin)`);
  }

  try {
    await Product.collection.dropIndex("slug_1");
  } catch {}

  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    await Product.insertMany([
      // Women's
      { name: "Rose Glow Face Serum", category: "Skincare", brand: "SkSync", price: 599, stock: 40, gender: "female" },
      { name: "Matte Finish Lipstick", category: "Makeup", brand: "SkSync", price: 349, stock: 60, gender: "female" },
      { name: "Hydra Boost Moisturizer", category: "Skincare", brand: "SkSync", price: 449, stock: 35, gender: "female" },
      { name: "Volumizing Mascara", category: "Makeup", brand: "SkSync", price: 299, stock: 50, gender: "female" },
      // Men's
      { name: "Charcoal Face Wash for Men", category: "Skincare", brand: "SkSync Men", price: 349, stock: 45, gender: "male" },
      { name: "Matte Beard Wax", category: "Grooming", brand: "SkSync Men", price: 299, stock: 30, gender: "male" },
      { name: "Cooling After Shave Balm", category: "Grooming", brand: "SkSync Men", price: 279, stock: 40, gender: "male" },
      { name: "Anti-Dandruff Hair Cream", category: "Haircare", brand: "SkSync Men", price: 199, stock: 55, gender: "male" },
      // Unisex
      { name: "Vitamin C Sunscreen SPF 50", category: "Skincare", brand: "SkSync", price: 499, stock: 70, gender: "unisex" },
      { name: "Everyday Lip Balm", category: "Skincare", brand: "SkSync", price: 149, stock: 90, gender: "unisex" }
    ]);
    console.log("Sample products created (male, female, unisex).");
  } else {
    console.log("Products already exist.");
  }

  await mongoose.disconnect();
  console.log("Done.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
