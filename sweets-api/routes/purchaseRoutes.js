import express from "express";
import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";
import {
  getMyPurchases,
  getAllPurchases,
} from "../controllers/purchaseController.js";

const router = express.Router();

// User history
router.get("/my", protect, getMyPurchases);

// Admin history
router.get("/all", protect, adminOnly, getAllPurchases);

export default router;
