// Informational landing page that explains how the application works
// and displays developer profile details along with project overview.

import Footer from "../components/Footer";

export default function Author() {
  return (
    <>
      <div className="project-title-wrapper">
        <h1 className="project-title">
          🍬 Sweet Shop Management System
        </h1>
      </div>

      <div className="home-wrapper">
        <div className="home-info">
          <h2 className="home-section-title">How This Application Works</h2>

          <p className="home-desc">
            This is a role-based Sweet Shop Management System built using
            React, Node.js, Express, and MongoDB. It demonstrates authentication,
            authorization, and real-world CRUD operations.
          </p>

          <h3>🔑 Authentication Flow</h3>
          <ul className="home-steps">
            <li>🆕 New users must <strong>Register</strong> to create an account</li>
            <li>🔐 After registration, users <strong>Login</strong> using email & password</li>
            <li>✅ Secure access is handled using <strong>JWT authentication</strong></li>
          </ul>

          <h3>👤 User Role (Customer)</h3>
          <ul className="home-steps">
            <li>🍭 View all available sweets</li>
            <li>🔍 Search sweets by name</li>
            <li>🛒 Purchase sweets by selecting quantity</li>
            <li>🚫 Cannot add, update, or delete sweets</li>
          </ul>

          <h3>🧑‍💼 Admin Capabilities</h3>
          <ul className="home-steps">
            <li>➕ Add new sweets to inventory</li>
            <li>✏️ Update sweet price & quantity</li>
            <li>🗑️ Delete sweets</li>
            <li>📦 Manage stock efficiently</li>
          </ul>

          <p className="home-note">
            This project demonstrates role-based authentication, JWT security,
            RESTful APIs, and a modern React user interface.
          </p>
        </div>

        <div className="profile-card">
          <img
            src="/profile.jpg"
            alt="Profile"
            className="profile-img"
          />

          <h3>Bibhash Kumar</h3>
          <p className="profile-role">MERN Developer</p>

          <p className="profile-edu">
            B.Tech – Computer Science & Engineering
          </p>

          <p className="profile-edu">
            Chandigarh University
          </p>

          <div className="profile-links">
            <a
              href="https://www.linkedin.com/in/bibhash4587/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              href="https://github.com/bibhashkumar45"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>

          <a
            href="https://drive.google.com/file/d/1p8J1q6UVUp40AWmBvC5uZnmjX_vqkYJo/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="resume-btn"
          >
            View Resume
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
