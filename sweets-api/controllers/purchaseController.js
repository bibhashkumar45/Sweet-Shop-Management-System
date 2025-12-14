import Purchase from "../models/Purchase.js";

// USER → View own purchase history
export const getMyPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user.id })
      .populate("sweet")   // ✅ THIS IS THE FIX
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch purchase history" });
  }
};

// ADMIN → View all purchase history
export const getAllPurchases = async (req, res) => {
  const purchases = await Purchase.find()
    .populate("user", "name email")
    .populate("sweet", "name")
    .sort({ createdAt: -1 });

  res.json(purchases);
};
