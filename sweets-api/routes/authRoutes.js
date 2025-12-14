// This route file handles all authentication-related endpoints.
// It connects HTTP routes to their respective controller functions
// and applies middleware for protected and admin-only access.
// Separating routes from controllers keeps the code modular and readable.

import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json({ msg: "Hello user!", user: req.user });
});

//admin-only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ msg: "Hello Admin!" });
});

export default router;
