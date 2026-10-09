import React, { useState, useEffect, useCallback } from "react";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import "./home.css";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiClock,
  FiUser,
  FiCalendar
} from "react-icons/fi";
import Preloader from "../../components/Preloader";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  const [stats, setStats] = useState({
    totalCategories: 0,
    totalBooks: 0,
    totalActiveStudents: 0
  });

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(Server_URL + "home");
      const data = response.data || {};

      const receivedCategories = Array.isArray(data.categories)
        ? data.categories
        : [];

      const receivedNewArrivals = Array.isArray(data.newArrivals)
        ? data.newArrivals
        : [];

      setCategories(receivedCategories);
      setNewArrivals(receivedNewArrivals);

      const receivedStats = data.stats || {};

      setStats({
        totalCategories:
          receivedStats.totalCategories ??
          data.totalCategories ??
          receivedCategories.length,

        totalBooks:
          receivedStats.totalBooks ??
          data.totalBooks ??
          0,

        totalActiveStudents:
          receivedStats.totalActiveStudents ??
          data.totalActiveStudents ??
          data.students ??
          0
      });

    } catch (error) {
      console.error("Error fetching home data:", error);

      setCategories([]);
      setNewArrivals([]);

      setStats({
        totalCategories: 0,
        totalBooks: 0,
        totalActiveStudents: 0
      });

    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="library-homepage">

      {/* HERO SECTION */}
      <header className="hero-section">
        <div className="hero-overlay"></div>

        <div className="container hero-content">

          <h1 className="hero-title">
            Welcome to KLA University Campus Library
          </h1>

          <p className="hero-subtitle">
            Explore books, academic resources, and learning materials
            available through our campus library
          </p>

          <div className="hero-buttons">
            <Link to="/books" className="btn btn-primary">
              <FiBook size={18} className="mr-2" />
              Browse Books
            </Link>
          </div>

        </div>
      </header>


      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">

          <div className="stats-grid">

            <div className="stat-cardhome">
              <FiBook className="stat-icon" />

              <h3>
                {stats?.totalCategories ?? 0}+
              </h3>

              <p>Book Categories</p>
            </div>


            <div className="stat-cardhome">
              <FiBook className="stat-icon" />

              <h3>
                {stats?.totalBooks ?? 0}+
              </h3>

              <p>Books Available</p>
            </div>


            <div className="stat-cardhome">
              <FiUser className="stat-icon" />

              <h3>
                {stats?.totalActiveStudents ?? 0}
              </h3>

              <p>Active Students</p>
            </div>

          </div>

        </div>
      </section>


      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">

          <h2 className="section-title">
            Explore Book Categories
          </h2>

          <p className="section-subtitle">
            Find books and resources for your academic needs
          </p>


          <div className="categories-grid">

            {categories.length > 0 ? (
              categories.map((cat, index) => (

                <div
                  key={index}
                  className="category-card"
                >

                  <div className="category-img-container">

                    <img
                      src={
                        cat.coverImage ||
                        "/images/default-subject.jpg"
                      }
                      alt={cat.category || "Category"}
                      loading="lazy"
                    />

                  </div>


                  <div className="category-info">

                    <h3>
                      {cat.category || "Category"}
                    </h3>

                    <p>
                      Books: {cat.count ?? 0}
                    </p>

                    <Link
                      to={`/books?category=${encodeURIComponent(
                        cat.category || ""
                      )}`}
                      className="btn btn-outline"
                    >
                      View Books
                    </Link>

                  </div>

                </div>

              ))
            ) : (
              <p>No categories available.</p>
            )}

          </div>


          <div className="text-center">

            <Link
              to="/category"
              className="btn btn-view-all"
            >
              View All Categories
            </Link>

          </div>

        </div>
      </section>


      {/* NEW ARRIVALS SECTION */}
      <section className="na-section">

        <div className="na-container">

          <h2 className="na-heading">
            New Arrivals
          </h2>

          <p className="na-subheading">
            Recently added books to the library collection
          </p>


          <div className="na-grid-container">

            {newArrivals.length > 0 ? (
              newArrivals.map((book, index) => (

                <div
                  key={index}
                  className="na-book-item"
                >

                  <div className="na-cover-wrapper">

                    <img
                      src={
                        book.coverImage ||
                        "/images/default-book.jpg"
                      }
                      alt={book.title || "Book"}
                      className="na-cover-image"
                      loading="lazy"
                    />

                  </div>


                  <div className="na-book-info">

                    <h3 className="na-book-title">
                      {book.title || "Untitled Book"}
                    </h3>

                    <p className="na-book-author">
                      {book.author || "Unknown Author"}
                    </p>

                    <span className="na-book-category">
                      {book.category || "General"}
                    </span>

                  </div>

                </div>

              ))
            ) : (
              <p>No new arrivals available.</p>
            )}

          </div>

        </div>

      </section>


      {/* LIBRARY HOURS */}
      <section className="hours-section">

        <div className="container">

          <h2 className="section-title">
            Library Hours
          </h2>


          <div className="hours-grid">

            <div className="hours-card">

              <FiClock className="hours-icon" />

              <h3>Regular Hours</h3>

              <p>
                Monday - Friday: 8:00 AM - 8:00 PM
              </p>

              <p>
                Saturday: 10:00 AM - 5:00 PM
              </p>

              <p>
                Sunday: Closed
              </p>

            </div>


            <div className="hours-card">

              <FiCalendar className="hours-icon" />

              <h3>Exam Period</h3>

              <p>
                Monday - Sunday: 7:00 AM - 11:00 PM
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}