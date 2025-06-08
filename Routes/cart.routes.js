import express from "express";
import {
  ADDToCart,
  DeleteProductInCart,
  FetchCart,
  UpadateQuantity,
} from "../Controller/cart.controller.js";
import mongoose from "mongoose";
import { authMiddleWare } from "../Controller/auth.controller.js";

const router = express.Router();

function validateProductFields(req, res, next) {
  const { productId, quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid cart item ID" });
  }
  if (!productId || quantity == null) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
}
router.use(authMiddleWare);
router.get("/", FetchCart);
router.post("/", validateProductFields, ADDToCart);
router.put("/:id", UpadateQuantity);
router.delete("/:id", DeleteProductInCart);
export default router;
