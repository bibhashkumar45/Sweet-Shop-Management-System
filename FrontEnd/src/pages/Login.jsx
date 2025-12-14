// Login page component that authenticates users using email and password,
// validates input, stores JWT token, loads user profile, and updates
// global authentication state after successful login.

import { useState, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";






export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function submit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      const me = await api.get("/auth/me");
      loginUser(me.data.user);

      toast.success("Login successful 🎉");
      navigate("/dash");
    } catch {
      toast.error("Invalid email or password ❌");
    }
  }

  return (
    <>
      <div className="container auth-wrapper">
        <div className="auth-card">
          <h2>Login</h2>

          <form onSubmit={submit}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn-small" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
