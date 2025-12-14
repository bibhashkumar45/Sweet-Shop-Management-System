// Registration page component that creates a new user account,
// validates input data, automatically logs in the user after
// successful registration, and updates global auth state.

import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Register() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.warning("Please fill all fields");
      return;
    }

    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      await api.post("/auth/register", form);

      const loginRes = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", loginRes.data.token);

      const me = await api.get("/auth/me");
      loginUser(me.data.user);

      toast.success("Account created successfully");
     navigate("/dash");
    } catch {
      toast.error("Registration failed");
    }
  }

  return (
    <div className="container auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
