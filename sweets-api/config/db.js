// This file handles the database connection for the application.
// It connects the backend to MongoDB using Mongoose and environment variables.
// Keeping database logic in a separate file helps maintain clean architecture
// and makes the application easier to test and scale.

import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB Error:", err.message);
  }
};
