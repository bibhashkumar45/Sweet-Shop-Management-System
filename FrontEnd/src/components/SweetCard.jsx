// Reusable sweet card component that displays sweet details,
// handles user purchase flow, and provides admin actions
// like update and delete based on user role.

import { useState } from "react";
import { toast } from "react-toastify";

export default function SweetCard({ sweet, isAdmin, onDelete, onPurchase }) {
  const [showBuy, setShowBuy] = useState(false);
  const [qty, setQty] = useState(1);

  function confirmPurchase() {
    if (qty < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (qty > sweet.quantity) {
      toast.error("Quantity exceeds available stock");
      return;
    }

    onPurchase(sweet._id, qty);
    toast.success("Purchase successful 🛒");

    setShowBuy(false);
    setQty(1);
  }

  async function handleDelete() {
    try {
      await onDelete(sweet._id);
      toast.success("Sweet deleted successfully 🍬");
    } catch {
      toast.error("Failed to delete sweet ❌");
    }
  }

  return (
    <div className="card">
      <img src={sweet.imageUrl} alt={sweet.name} className="card-img" />

      {sweet.ingredients?.length > 0 && (
        <p className="ingredients">
          Ingredients: {sweet.ingredients.join(", ")}
        </p>
      )}

      <h3>{sweet.name}</h3>

      <div className="price-row">
        <p className="price">₹ {sweet.price}</p>
      </div>

      <p className="stock">Stock: {sweet.quantity}</p>

      {!isAdmin && (
        <>
          {!showBuy ? (
            <button
              className={`btn ${
                sweet.quantity === 0 ? "btn-out" : "btn-purchase"
              }`}
              disabled={sweet.quantity === 0}
              onClick={() => setShowBuy(true)}
            >
              {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
            </button>
          ) : (
            <div style={{ marginTop: "10px" }}>
              <input
                type="text"
                max={sweet.quantity}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />

              <button
                className="btn btn-confirm"
                onClick={confirmPurchase}
                style={{ marginTop: "6px" }}
              >
                Confirm Purchase
              </button>

              <button
                className="btn btn-cancel"
                style={{ marginTop: "6px" }}
                onClick={() => {
                  setShowBuy(false);
                  setQty(1);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}

      {isAdmin && (
        <div className="admin-actions">
          <button
            className="btn btn-update"
            onClick={() => (window.location.href = `/update/${sweet._id}`)}
          >
            Update
          </button>

          <button className="btn btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
