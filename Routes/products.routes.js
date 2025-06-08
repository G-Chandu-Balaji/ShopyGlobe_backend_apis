import {
  CreateProduct,
  DeleteProduct,
  FetchProductById,
  FetchProducts,
  UpdateProduct,
} from "../Controller/products.controller.js";
import express from "express";

const router = express.Router();

function validateProductFields(req, res, next) {
  const { name, price, description, stockQuantity } = req.body;
  if (!name || !price || !description || stockQuantity == null) {
    return res.status(400).json({ error: "All fields are required" });
  }
  next();
}

router.get("/", FetchProducts);
router.get("/:id", FetchProductById);

router.post("/", validateProductFields, CreateProduct);
router.delete("/", DeleteProduct);
router.put("/", UpdateProduct);

export default router;
