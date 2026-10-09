import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
} from "react-icons/fi";
import "./footer.css";

const Footer = () => {
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="library-footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* About */}
          <div className="footer-column">
            <h3 className="footer-heading">KLA Library</h3>

            <p className="footer-about-text">
              A digital library platform designed to help students
              discover academic resources, manage borrowed books,
              and access learning materials with ease.
            </p>

            <div className="footer-social">

              <a
                href="#"
                className="social-icon"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>

              <a
                href="#"
                className="social-icon"
                aria-label="Twitter"
              >
                <FiTwitter />
              </a>

              <a
                href="#"
                className="social-icon"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>

              <a
                href="#"
                className="social-icon"
                aria-label="LinkedIn"
              >
                <FiLinkedin />
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-heading">Explore</h3>

            <ul className="footer-links">

              <li>
                <Link
                  to="/"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/books"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Books
                </Link>
              </li>

              <li>
                <Link
                  to="/category"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/aboutus"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contactus"
                  className="footer-link"
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>

            </ul>
          </div>


          {/* Contact */}
          <div className="footer-column">

            <h3 className="footer-heading">
              Library Support
            </h3>

            <ul className="footer-contact-info">

              <li className="contact-item">
                <FiMapPin className="contact-icon" />
                <span>
                  VIT-AP University Campus
                </span>
              </li>

              <li className="contact-item">
                <FiMail className="contact-icon" />
                <span>
                  Library Support Desk
                </span>
              </li>

              <li className="contact-item">
                <FiPhone className="contact-icon" />
                <span>
                  Library Help Desk
                </span>
              </li>

              <li className="contact-item">
                <FiClock className="contact-icon" />

                <div>
                  <p>
                    Mon-Fri: 8:00 AM - 8:00 PM
                  </p>

                  <p>
                    Saturday: 10:00 AM - 5:00 PM
                  </p>
                </div>

              </li>

            </ul>

          </div>

        </div>


        {/* Bottom */}
        <div className="footer-bottom">

          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} KLA Library.
            All rights reserved.
          </div>

          <div className="footer-legal">

            <Link
              to="/privacy"
              className="legal-link"
              onClick={handleLinkClick}
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="legal-link"
              onClick={handleLinkClick}
            >
              Terms of Use
            </Link>

            <Link
              to="/accessibility"
              className="legal-link"
              onClick={handleLinkClick}
            >
              Accessibility
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;