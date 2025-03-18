import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { requestLogger, detailedLogger } from "./middleware/logger.js";

import productRoutes from "./routes/productRoutes.mjs";

const app = express();

const PORT = process.env.PORT || 5032;
app.use(express.json()); // Allows us to accept JSON data in req.body

//mddleware
app.use(detailedLogger);

// ✅ Check if `MONGO_URI` is missing and prevent crashes
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in the .env file.");
  process.exit(1); // Stop the app if the database URI is missing
}

app.use("/api/products", productRoutes);

// ✅ Start Server & Connect to MongoDB
app.listen(PORT, async () => {
  await connectDB(process.env.MONGO_URI); // ✅ Pass the variable directly
  console.log("Server started at http://localhost:" + PORT);
});
