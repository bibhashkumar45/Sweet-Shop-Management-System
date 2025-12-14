import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: 
    { type: String, 
    required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    description: { type: String },
    imageUrl: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    ingredients: { type: [String] }
  },
  { timestamps: true } // adds createdAt + updatedAt
);

export default mongoose.model("Sweet", sweetSchema);
