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

  // Check presence first
  if (!productId || quantity == null) {
    return res
      .status(400)
      .json({ error: "productId and quantity are required" });
  }

  // Validate productId format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ error: "Invalid productId format" });
  }

  // Validate quantity is a number and >= 1
  const qtyNumber =
    typeof quantity === "string" ? parseInt(quantity) : quantity;
  if (isNaN(qtyNumber) || qtyNumber < 1) {
    return res
      .status(400)
      .json({ error: "Quantity must be a number greater than or equal to 1" });
  }

  // Convert quantity to number in request body for downstream usage
  req.body.quantity = qtyNumber;

  next();
}

function validateQuantityUpdate(req, res, next) {
  const { quantity } = req.body;

  if (quantity === undefined || quantity === null) {
    return res.status(400).json({ error: "Quantity is required for update" });
  }

  const qtyNumber =
    typeof quantity === "string" ? parseInt(quantity) : quantity;

  if (isNaN(qtyNumber) || qtyNumber < 1) {
    return res
      .status(400)
      .json({ error: "Quantity must be a number greater than or equal to 1" });
  }

  req.body.quantity = qtyNumber;

  next();
}

router.use(authMiddleWare);
router.get("/", FetchCart);
router.post("/", validateProductFields, ADDToCart);
router.put("/:id", validateQuantityUpdate, UpadateQuantity);
router.delete("/:id", DeleteProductInCart);
export default router;
