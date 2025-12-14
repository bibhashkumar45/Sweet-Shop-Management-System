import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Example protected route
router.get("/me", protect, (req, res) => {
  res.json({ msg: "Hello user!", user: req.user });
});

// Example admin-only route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ msg: "Hello Admin!" });
});

export default router;
