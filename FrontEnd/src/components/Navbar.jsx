// Responsive navigation bar component that handles authentication-based
// links, dark/light theme switching, mobile dropdown behavior, and logout logic.

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (
        e.key === "Escape" ||
        (menuRef.current && !menuRef.current.contains(e.target))
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    document.addEventListener("keydown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
      document.removeEventListener("keydown", closeMenu);
    };
  }, []);

  function handleLogout() {
    logoutUser();
    toast.info("Logged out successfully 👋");
    setMenuOpen(false);
    setTimeout(() => navigate("/"), 1200);
  }

  return (
    <div className="navbar">
      <div className="navbar-top">
        <div className="logo">🍭 SweetMart</div>

        <button
          className="menu-btn"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          onKeyDown={(e) => e.key === "Enter" && setMenuOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      <div ref={menuRef} className={`nav-actions ${menuOpen ? "open" : ""}`}>
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}

        {user?.role === "user" && <Link to="/history">History</Link>}

        {user?.role === "admin" && (
          <Link className="add-btn" to="/add">
            + Add Sweet
          </Link>
        )}

        <button className="theme-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️" : "🌙"}
        </button>

        {user && <button onClick={handleLogout}>Logout</button>}
      </div>
    </div>
  );
}
