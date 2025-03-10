import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { requestLogger, detailedLogger } from "./middleware/logger.js";
import Product from "./models/product.mjs";
import mongoose from "mongoose";

const app = express();

app.use(express.json()); // Allows us to accept JSON data in req.body

//mddleware
app.use(detailedLogger);

// ✅ Check if `MONGO_URI` is missing and prevent crashes
if (!process.env.MONGO_URI) {
  console.error("❌ ERROR: MONGO_URI is not defined in the .env file.");
  process.exit(1); // Stop the app if the database URI is missing
}

//! GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//! CREATE a new product
app.post("/api/products", async (req, res) => {
  const product = req.body; // User input

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//! UPDATE a product (PUT)
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//! DELETE a product
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product ID" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ✅ Start Server & Connect to MongoDB
app.listen(5030, async () => {
  await connectDB(process.env.MONGO_URI); // ✅ Pass the variable directly
  console.log("Server started at port 5030");
});
