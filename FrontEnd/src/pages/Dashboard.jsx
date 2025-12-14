// Dashboard page that displays all available sweets, supports searching,
// handles purchase and delete actions based on user role, and loads data
// securely from the backend API.

import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import SweetCard from "../components/SweetCard";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [sweets, setSweets] = useState([]);
  const [search, setSearch] = useState("");

  async function load() {
    const res = await api.get("/sweets");
    setSweets(res.data);
  }

  async function searchSweet(e) {
    e.preventDefault();

    if (!search.trim()) {
      load();
      return;
    }

    const res = await api.get(`/sweets/search?name=${search}`);
    setSweets(res.data);
  }

  async function purchase(id, qty) {
    await api.post(`/sweets/${id}/purchase`, { qty });
    load();
  }

  async function del(id) {
    await api.delete(`/sweets/${id}`);
    load();
  }

  useEffect(() => {
    if (user) load();
  }, [user]);

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        Please login to view sweets
      </p>
    );
  }

  return (
    <>
      <div className="container">
        <h2>All Sweets</h2>
        <p style={{ color: "#666", marginBottom: "22px", fontSize: "15px" }}>
          Explore our wide range of sweets and choose what suits your taste.
        </p>

        <form className="search-bar" onSubmit={searchSweet}>
          <input
            type="text"
            placeholder="Search sweets by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <div className="grid">
          {sweets.map((s) => (
            <SweetCard
              key={s._id}
              sweet={s}
              isAdmin={user.role === "admin"}
              onPurchase={purchase}
              onDelete={del}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
