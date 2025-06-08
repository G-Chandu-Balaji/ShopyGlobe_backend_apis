import mongoose from "mongoose";
const cartschema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const cartModel = mongoose.model("Cart", cartschema);
export default cartModel;
