// Admin page component used to update an existing sweet’s details,
// fetches the current sweet data by ID and allows editing price,
// quantity, and name with basic validation.

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

export default function UpdateSweet() {
  const { id } = useParams();

  const [sweet, setSweet] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    api.get(`/sweets/${id}`).then((res) => {
      setSweet(res.data);
    });
  }, [id]);

  async function submit(e) {
    e.preventDefault();

    if (!sweet.name || !sweet.price || !sweet.quantity) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await api.put(`/sweets/${id}`, {
        name: sweet.name,
        price: Number(sweet.price),
        quantity: Number(sweet.quantity),
      });

      toast.success("Sweet updated successfully");

      setTimeout(() => {
        window.location.href = "/dash";
      }, 1200);
    } catch {
      toast.error("Update failed");
    }
  }

  return (
    <div className="form-card">
      <h2>Update Sweet</h2>

      <form onSubmit={submit}>
        <div className="form-group">
          <label>Sweet Name</label>
          <input
            type="text"
            value={sweet.name}
            onChange={(e) =>
              setSweet({ ...sweet, name: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            value={sweet.price}
            onChange={(e) =>
              setSweet({ ...sweet, price: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label>Available Quantity</label>
          <input
            type="number"
            value={sweet.quantity}
            onChange={(e) =>
              setSweet({ ...sweet, quantity: e.target.value })
            }
          />
        </div>

        <button type="submit">Update Sweet</button>
      </form>
    </div>
  );
}
