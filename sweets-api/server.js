// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import { connectDB } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
// import sweetRoutes from "./routes/sweetRoutes.js";
// import purchaseRoutes from "./routes/purchaseRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();

// // middleware
// app.use(cors());
// app.use(express.json());

// // routes
// app.use("/api/auth", authRoutes);
// app.use("/api/sweets", sweetRoutes);
// app.use("/api/purchases", purchaseRoutes);

// // start server
// app.listen(process.env.PORT, () => {
//   console.log("Server running on port", process.env.PORT);
// });

// app.get("/", (req, res) => {
//   res.send("Server is running successfully!");
// });


import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();
connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});


