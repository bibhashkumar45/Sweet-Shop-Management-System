// This model represents a purchase record in the system.
// It stores information about which user bought which sweet,
// along with quantity, price, total amount, and timestamps.
// Using references allows easy population of related user
// and sweet details when fetching purchase history.

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
