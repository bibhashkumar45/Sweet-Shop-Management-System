// This route file manages purchase-related endpoints.
// It allows authenticated users to view their own purchase history
// and provides admins with access to view all purchases in the system.
// Middleware is used to ensure proper authentication and authorization.

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
