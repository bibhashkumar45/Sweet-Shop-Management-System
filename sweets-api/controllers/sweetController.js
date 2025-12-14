// This controller manages all sweet-related business logic.
// It includes CRUD operations for sweets, searching and filtering,
// purchasing sweets by users, and restocking inventory by admins.
// Purchase history is also recorded to maintain transactional data.

import Sweet from "../models/Sweet.js";
import Purchase from "../models/Purchase.js";

// Add new sweet
export const addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.json({ msg: "Sweet added", sweet });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Get all sweets
export const getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.json(sweets);
};

// Search sweets
export const searchSweets = async (req, res) => {
  const { name, category, min, max } = req.query;

  const q = {};

  if (name) q.name = new RegExp(name, "i");
  if (category) q.category = category;
  if (min && max) q.price = { $gte: min, $lte: max };

  const sweets = await Sweet.find(q);
  res.json(sweets);
};

// Update sweet
export const updateSweet = async (req, res) => {
  const sweet = await Sweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ msg: "Updated", sweet });
};

// Delete sweet (Admin only)
export const deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  res.json({ msg: "Sweet deleted" });
};

// Purchase sweet
export const purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) return res.status(404).json({ msg: "Sweet not found" });

    const { qty } = req.body;
    const amount = qty && qty > 0 ? qty : 1;

    if (sweet.quantity < amount)
      return res.status(400).json({ msg: "Out of stock" });

    sweet.quantity -= amount;
    await sweet.save();

    const purchase = await Purchase.create({
      user: req.user.id,
      sweet: sweet._id,
      sweetName: sweet.name,
      price: sweet.price,
      quantity: amount,
      totalAmount: sweet.price * amount,
    });

    res.json({
      msg: "Purchased successfully",
      purchase,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// Restock sweet (Admin only)
export const restockSweet = async (req, res) => {
  const amount = parseInt(req.body.amount);
  const sweet = await Sweet.findById(req.params.id);

  sweet.quantity += amount;
  await sweet.save();

  res.json({ msg: "Restocked", sweet });
};

export const getSweetById = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ msg: "Sweet not found" });
    }
    res.json(sweet);
  } catch {
    res.status(400).json({ msg: "Invalid sweet id" });
  }
};
