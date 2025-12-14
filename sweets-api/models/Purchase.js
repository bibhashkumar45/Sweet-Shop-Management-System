// models/Purchase.js
import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sweet",
      required: true,
    },
    quantity: Number,
    price: Number,
    totalAmount: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Purchase", purchaseSchema);
