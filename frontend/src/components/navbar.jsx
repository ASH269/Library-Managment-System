import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">

        {/* Logo / Brand */}
        <Link
          className="library-brand"
          to="/"
          onClick={closeMenu}
        >
          <span className="brand-icon">📖</span>
          <span>KLA Library</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`menu-button ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <div className={`navigation-area ${menuOpen ? "open" : ""}`}>

          <div className="navigation-links">

            <Link
              className="custom-nav-link"
              to="/"
              onClick={closeMenu}
            >
              Home
            </Link>

            <Link
              className="custom-nav-link"
              to="/books"
              onClick={closeMenu}
            >
              Books
            </Link>

            <Link
              className="custom-nav-link"
              to="/category"
              onClick={closeMenu}
            >
              Categories
            </Link>

            <Link
              className="custom-nav-link"
              to="/aboutus"
              onClick={closeMenu}
            >
              About
            </Link>

            <Link
              className="custom-nav-link"
              to="/contactus"
              onClick={closeMenu}
            >
              Contact
            </Link>

          </div>

          {/* Login / Profile */}
          <div className="account-area">

            {token ? (
              <div className="profile-area">

                <Link
                  className="profile-button"
                  to="/user"
                  onClick={closeMenu}
                >
                  👤 Profile
                </Link>

                <button
                  className="logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>
            ) : (
              <div className="auth-buttons">

                <Link
                  className="login-button"
                  to="/login"
                  onClick={closeMenu}
                >
                  Login
                </Link>

                <Link
                  className="signup-button"
                  to="/register"
                  onClick={closeMenu}
                >
                  Create Account
                </Link>

              </div>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
}