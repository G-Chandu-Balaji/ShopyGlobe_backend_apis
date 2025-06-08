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
