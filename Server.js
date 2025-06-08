import express from "express";
import mongoose from "mongoose";
import ProductRoutes from "./Routes/products.routes.js";
import CartRoutes from "./Routes/cart.routes.js";
import authRoutes from "./Routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;

const app = new express();
app.use(express.json());

app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/user", authRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}.... `);
});

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("open", () => {
  console.log("Connection Sucessfull");
});

db.on("error", () => {
  console.log("Connection not  Sucessful");
});
