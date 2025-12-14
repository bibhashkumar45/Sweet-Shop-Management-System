import express from "express";
import {
  addSweet,
  getSweets,
  getSweetById,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from "../controllers/sweetController.js";


import { protect } from "../middleware/auth.js";
import { adminOnly } from "../middleware/admin.js";

const router = express.Router();

// CRUD
router.post("/", protect, adminOnly, addSweet);
router.get("/",protect, getSweets);
router.get("/search",protect, searchSweets);
router.get("/:id", protect, getSweetById);

router.put("/:id", protect, adminOnly, updateSweet);
router.delete("/:id", protect, adminOnly, deleteSweet);

// Inventory
router.post("/:id/purchase", protect, purchaseSweet);
router.post("/:id/restock", protect, adminOnly, restockSweet);

export default router;
