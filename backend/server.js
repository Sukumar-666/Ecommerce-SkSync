require("dotenv").config(); // must run first — everything below depends on process.env

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectDB();

const app = express();

// --- Security headers ---
app.use(helmet());

// --- CORS: only the real frontend origin, with credentials for the refresh cookie ---
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:3000").split(",");
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.use(express.json({ limit: "1mb" })); // also caps payload size (basic DoS hardening)
app.use(cookieParser());

// --- Strip any Mongo operator injection ($gt, $ne, etc.) from user input ---
app.use(mongoSanitize());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "SkSync API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found." });
});

// Centralized error handler — keeps stack traces out of API responses in production
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SkSync API running on port ${PORT}`);
});
