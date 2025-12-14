// This file configures the Express application.
// It sets up global middleware, registers all route modules,
// and exposes the app instance for both server startup and testing.
// Separating app configuration from server startup helps support
// clean architecture and Test-Driven Development (TDD).

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import sweetRoutes from "./routes/sweetRoutes.js";
import purchaseRoutes from "./routes/purchaseRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/purchases", purchaseRoutes);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

export default app;
