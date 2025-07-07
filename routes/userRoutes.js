import express from 'express';
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js"; // <== IMPORT USER MODEL

const productRouter = express.Router();

// Product Routes
productRouter.get("/all", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

productRouter.post("/new", async (req, res) => {
  const product = req.body;
  const products = await productModel.create(product);
  res.json(products);
});

productRouter.delete("/delete/:id", async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// ✅ New: User Register Route
productRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.create({ name, email, password });
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

export default productRouter;