import mongoose from "mongoose";
import cartModel from "../Model/cart.model.js";
import productModel from "../Model/Products.model.js";

export async function FetchCart(req, res) {
  try {
    const products = await cartModel.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "Cart is Empty" });
    }

    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

export async function ADDToCart(req, res) {
  const { productId, quantity } = req.body;
  try {
    const product = await productModel.findById(productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    const product1 = await cartModel.find({ product: productId });
    if (product1) {
      return res.status(404).json({ error: "Product already in cart" });
    }

    const cartItem = new cartModel({ product: productId, quantity });
    await cartItem.save();
    res
      .status(201)
      .json({ message: "Product Added to Cart", product: cartItem });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function UpadateQuantity(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid cart item ID" });
  }
  const { quantity } = req.body;

  try {
    const cartItem = await cartModel.findOneAndUpdate(
      { product: req.params.id },
      { quantity },
      { new: true, runValidators: true }
    );
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res
      .status(200)
      .json({ message: "Product quantity updated in cart", product: cartItem });
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function DeleteProductInCart(req, res) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid cart item ID" });
  }
  try {
    const deleted = await cartModel.findOneAndDelete({
      product: req.params.id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    res.json({ message: "Item removed from Cart " });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
