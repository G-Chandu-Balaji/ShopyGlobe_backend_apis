import ProductModel from "../Model/Products.model.js";
import mongoose from "mongoose";

export async function CreateProduct(req, res) {
  try {
    const { name, price, description, stockQuantity } = req.body;

    const newProduct = new ProductModel({
      name,
      price,
      description,
      stockQuantity,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({ message: "Product created", product: savedProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function FetchProducts(req, res) {
  try {
    const products = await ProductModel.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

export async function FetchProductById(req, res) {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid Product ID format" });
  }
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not Found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Server error while fetching product" });
  }
}

export async function UpdateProduct(req, res) {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid Product ID format" });
  }
  const updatedData = req.body;
  try {
    const product = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not Found" });
    }
    await product.save();
    res
      .status(200)
      .json({ message: "Product updated successfully", Product: product });
  } catch (err) {
    console.error("Error Updating product:", err);
    res.status(500).json({ error: "Server error while Updating product" });
  }
}

export async function DeleteProduct(req, res) {
  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid Product ID format" });
  }
  try {
    const product = await ProductModel.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not Found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Server error while deleting product" });
  }
}
