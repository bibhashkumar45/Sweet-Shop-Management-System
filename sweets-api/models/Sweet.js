// This model defines the structure of a sweet item stored in the database.
// It includes basic details like name, category, price, and quantity,
// along with optional fields such as description, image, rating,
// and ingredients. Timestamps are enabled to track when a sweet
// is created or updated.

import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },

    description: { type: String },
    imageUrl: { type: String },
    rating: { type: Number, min: 1, max: 5 },
    ingredients: { type: [String] }
  },
  { timestamps: true } 
);

export default mongoose.model("Sweet", sweetSchema);
