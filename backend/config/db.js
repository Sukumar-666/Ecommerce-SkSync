const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error(
      "MONGO_URI is undefined. Copy backend/.env.example to backend/.env and fill it in, " +
        "and make sure dotenv.config() runs before connectDB() in server.js."
    );
    process.exit(1);
  }
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
