// Admin form component used to add a new sweet to the inventory.
// Handles form state, basic validation, API submission, and user feedback.

import { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddSweet() {
  const [f, setF] = useState({});
    const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();

    if (!f.name || !f.category || !f.price || !f.quantity) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await api.post("/sweets", {
        ...f,
        price: Number(f.price),
        quantity: Number(f.quantity),
        ingredients: f.ingredients?.split(",") || [],
      });

      toast.success("Sweet added successfully 🍬");

       navigate("/dash");
    } catch {
      toast.error("Failed to add sweet ❌");
    }
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2>Add Sweet</h2>

        <form onSubmit={submit} className="form-grid">
          <label>
            Sweet Name
            <input
              placeholder="e.g. Rasgulla"
              onChange={(e) => setF({ ...f, name: e.target.value })}
            />
          </label>

          <label>
            Category
            <input
              placeholder="Indian Sweet"
              onChange={(e) => setF({ ...f, category: e.target.value })}
            />
          </label>

          <label>
            Price (₹)
            <input
              type="number"
              placeholder="120"
              onChange={(e) => setF({ ...f, price: e.target.value })}
            />
          </label>

          <label>
            Quantity
            <input
              type="number"
              placeholder="50"
              onChange={(e) => setF({ ...f, quantity: e.target.value })}
            />
          </label>

          <label>
            Image URL
            <input
              placeholder="https://image.com/sweet.jpg"
              onChange={(e) => setF({ ...f, imageUrl: e.target.value })}
            />
          </label>

          {f.imageUrl && (
            <img src={f.imageUrl} alt="preview" className="preview-img" />
          )}

          <label>
            Ingredients
            <input
              placeholder="milk, sugar"
              onChange={(e) => setF({ ...f, ingredients: e.target.value })}
            />
          </label>

          <button className="primary-btn">Add Sweet</button>
        </form>
      </div>
    </div>
  );
}
