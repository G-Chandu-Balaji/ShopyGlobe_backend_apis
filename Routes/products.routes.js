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
  let { name, price, description, stockQuantity } = req.body;

  const missingFields = [];
  const invalidFields = {};

  // Name
  if (name === undefined || name === null) {
    missingFields.push("name");
  } else if (typeof name !== "string" || name.trim() === "") {
    invalidFields.name = "Name must be a non-empty string";
  }

  // Price
  if (price === undefined || price === null) {
    missingFields.push("price");
  } else {
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;
    if (isNaN(parsedPrice)) {
      invalidFields.price = "Price must be a valid number";
    } else if (parsedPrice <= 0) {
      invalidFields.price = "Price must be greater than 0";
    } else {
      req.body.price = parsedPrice; // store as number
    }
  }

  // Description
  if (description === undefined || description === null) {
    missingFields.push("description");
  } else if (typeof description !== "string" || description.trim() === "") {
    invalidFields.description = "Description must be a non-empty string";
  }

  // Stock Quantity
  if (stockQuantity === undefined || stockQuantity === null) {
    missingFields.push("stockQuantity");
  } else {
    const parsedStock =
      typeof stockQuantity === "string"
        ? parseInt(stockQuantity)
        : stockQuantity;
    if (isNaN(parsedStock)) {
      invalidFields.stockQuantity = "Stock quantity must be a valid integer";
    } else if (parsedStock < 0) {
      invalidFields.stockQuantity = "Stock quantity cannot be negative";
    } else {
      req.body.stockQuantity = parsedStock; // store as number
    }
  }

  if (missingFields.length > 0 || Object.keys(invalidFields).length > 0) {
    return res.status(400).json({
      error: "Invalid request body",
      missingFields,
      invalidFields,
    });
  }

  next();
}

function validateProductUpdateFields(req, res, next) {
  let { name, price, description, stockQuantity } = req.body;

  const allowedFields = { name, price, description, stockQuantity };
  const providedFields = Object.entries(allowedFields).filter(
    ([_, value]) => value !== undefined && value !== null
  );

  if (providedFields.length === 0) {
    return res.status(400).json({
      error: "At least one field must be provided for update",
    });
  }

  const invalidFields = {};

  // Name validation
  if (name !== undefined) {
    if (typeof name !== "string" || name.trim() === "") {
      invalidFields.name = "Name must be a non-empty string";
    }
  }

  // Price validation (accepts string or number)
  if (price !== undefined) {
    const parsedPrice = typeof price === "string" ? parseFloat(price) : price;

    if (isNaN(parsedPrice)) {
      invalidFields.price = "Price must be a valid number";
    } else if (parsedPrice <= 0) {
      invalidFields.price = "Price must be greater than 0";
    } else {
      req.body.price = parsedPrice; // Store as number
    }
  }

  // Description validation
  if (description !== undefined) {
    if (typeof description !== "string" || description.trim() === "") {
      invalidFields.description = "Description must be a non-empty string";
    }
  }

  // Stock quantity validation (accepts string or number)
  if (stockQuantity !== undefined) {
    const parsedStock =
      typeof stockQuantity === "string"
        ? parseInt(stockQuantity)
        : stockQuantity;

    if (isNaN(parsedStock)) {
      invalidFields.stockQuantity = "Stock quantity must be a valid integer";
    } else if (parsedStock < 0) {
      invalidFields.stockQuantity = "Stock quantity cannot be negative";
    } else {
      req.body.stockQuantity = parsedStock; // Store as number
    }
  }

  if (Object.keys(invalidFields).length > 0) {
    return res.status(400).json({
      error: "One or more fields are invalid",
      invalidFields,
    });
  }

  next();
}

router.get("/", FetchProducts);
router.get("/:id", FetchProductById);

router.post("/", validateProductFields, CreateProduct);
router.delete("/:id", DeleteProduct);
router.put("/:id", validateProductUpdateFields, UpdateProduct);

export default router;
