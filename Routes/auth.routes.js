import express from "express";
import { Register, Login } from "../Controller/auth.controller.js";

const router = express.Router();

// middleware/validateRegisterInput
export function validateRegisterInput(req, res, next) {
  const { email, password } = req.body;

  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Email format is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Invalid input", details: errors });
  }

  next();
}

// middleware/validateLoginInput
export function validateLoginInput(req, res, next) {
  const { email, password } = req.body;
  const errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Email format is invalid";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ error: "Invalid input", details: errors });
  }

  next();
}

router.post("/register", validateRegisterInput, Register);
router.post("/login", validateLoginInput, Login);

export default router;
