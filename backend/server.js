import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.mjs";

dotenv.config();
const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
  const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error in Create product:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5030, () => {
  connectDB();
  console.log("server started at port 5030");
});
