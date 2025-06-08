import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  stockQuantity: Number,
});

const productModel = mongoose.model("Products", productSchema);
export default productModel;
