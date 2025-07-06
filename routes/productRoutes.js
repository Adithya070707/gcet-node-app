 import express from 'express'
import productModel from "../models/productModel.js";

const productRouter = express.Router()

productRouter.get("/all", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

productRouter.post("/new", async (req, res) => {
  const product = req.body
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


export default productRouter