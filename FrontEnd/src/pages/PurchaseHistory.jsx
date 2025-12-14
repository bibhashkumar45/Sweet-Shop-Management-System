// Purchase history page that fetches and displays all sweets bought by the user,
// calculates total spending, and shows detailed purchase information.

import { useEffect, useState } from "react";
import api from "../api/api";

export default function PurchaseHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadHistory() {
    try {
      const res = await api.get("/purchases/my");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  const totalSpent = history.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading purchase history...</p>;
  }

  return (
    <div className="container">
      <h2>🧾 Purchase History</h2>
      <p style={{ color: "#666", marginBottom: "10px" }}>
        View all sweets you have purchased so far
      </p>

      {history.length > 0 && (
        <div className="total-spent-box">
          <span>Total Amount Spent:</span>
          <strong className="total-money"> ₹{totalSpent}</strong>
        </div>
      )}

      {history.length === 0 ? (
        <p>No purchases yet.</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item._id} className="history-card">
              <div className="history-left">
                <img
                  src={item.sweet?.imageUrl || "/no-image.png"}
                  alt={item.sweet?.name || "Sweet"}
                  className="history-img"
                />
              </div>

              <div className="history-right">
                <h4>{item.sweet?.name || "Sweet Item"}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price per item: ₹{item.price}</p>

                <p className="history-total">
                  Total: ₹{item.totalAmount}
                </p>

                <p className="history-date">
                  Purchased on:{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
