import jwt from "jsonwebtoken";
import UserModel from "../Model/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
export async function Register(req, res) {
  try {
    const { email, password } = req.body;
    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already in use" });
    const user = new UserModel({ email, password });
    await user.save();

    res.status(201).json({ message: "User Registered successfully" });
  } catch (err) {
    console.error("Registration error:".err);
    res.status(500).json({ error: "server error" });
  }
}

export async function Login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
}

//middleWare
export function authMiddleWare(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(403).json({ error: "Invalid or expired token" });
  }
}
