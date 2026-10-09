import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./adminnavbar.css";

export default function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

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
    <nav className="admin-main-navbar">

      <div className="admin-navbar-container">

        {/* Brand */}
        <Link
          className="admin-library-brand"
          to="/admin"
          onClick={closeMenu}
        >
          <span className="admin-brand-icon">📖</span>
          <span>KLA Library</span>
        </Link>


        {/* Mobile menu */}
        <button
          className="admin-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>


        {/* Navigation */}
        <div
          className={`admin-navigation-area ${
            menuOpen ? "open" : ""
          }`}
        >

          <div className="admin-navigation-links">

            <Link
              className="admin-nav-link"
              to="/admin"
              onClick={closeMenu}
            >
              Dashboard
            </Link>


            {/* Books */}
            <div className="admin-books-dropdown">

              <button className="admin-nav-link admin-books-button">
                Books ▾
              </button>

              <div className="admin-dropdown-menu">

                <Link
                  to="/admin/addbook"
                  className="admin-dropdown-item"
                  onClick={closeMenu}
                >
                  Add Book
                </Link>

                <Link
                  to="/admin/viewbook"
                  className="admin-dropdown-item"
                  onClick={closeMenu}
                >
                  Manage Books
                </Link>

              </div>

            </div>


            {/* Librarian requests */}
            {role === "librarian" && (
              <>
                <Link
                  className="admin-nav-link"
                  to="/admin/issuerequest"
                  onClick={closeMenu}
                >
                  Issue Requests
                </Link>

                <Link
                  className="admin-nav-link"
                  to="/admin/returnrequest"
                  onClick={closeMenu}
                >
                  Return Requests
                </Link>
              </>
            )}


            <Link
              className="admin-nav-link"
              to="/admin/issued"
              onClick={closeMenu}
            >
              Borrowed Books
            </Link>


            {/* Admin only */}
            {role === "admin" && (
              <Link
                className="admin-nav-link"
                to="/admin/addlibrarian"
                onClick={closeMenu}
              >
                Add Librarian
              </Link>
            )}

          </div>


          {/* Account */}
          <div className="admin-account-area">

            {token ? (

              <div className="admin-profile-area">

                <span className="admin-role-label">
                  {role === "admin"
                    ? "Administrator"
                    : "Librarian"}
                </span>

                <button
                  className="admin-logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>

              </div>

            ) : (

              <Link
                className="admin-login-button"
                to="/admin-login"
              >
                Admin Login
              </Link>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}