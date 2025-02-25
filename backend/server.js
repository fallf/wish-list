import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.mjs";

dotenv.config();
const app = express();

app.use(express.json()); //allows us to accept json data in the req.body

//!to GET all the product
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//we will create all the route and then import the routes

//!is to create the product
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

//* we will create a route to delete the route
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.log("error in deleting product:", error.message);
    res.status(404).json({ success: false, message: "Server Error" });
  }
});
app.listen(5030, () => {
  connectDB();
  console.log("server started at port 5030");
});
