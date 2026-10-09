import React, { useState, useEffect } from "react";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import "./allcategories.css";
import { Link } from "react-router-dom";
import Loader from "../../components/Preloader";
import { showErrorToast } from "../../utils/toasthelper";

export default function ViewAllCategories() {
  const [books, setBooks] = useState([]);
  const [filterBooks, setFilteredBooks] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const url = Server_URL + "books";
      const response = await axios.get(url);

      const { error, message, books } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        setBooks(books);
        setFilteredBooks(books);

        const categoryCountMap = {};

        books.forEach((book) => {
          const cat = book.category;
          categoryCountMap[cat] =
            (categoryCountMap[cat] || 0) + 1;
        });

        setCategoryCounts(categoryCountMap);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      showErrorToast("Unable to load library categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (selectedCategory) => {
    setActiveCategory(selectedCategory);

    if (selectedCategory === "All") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter(
        (book) => book.category === selectedCategory
      );

      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="all-categories-container">

      <div className="all-categories-row">

        {/* SIDEBAR */}
        <nav className="all-categories-sidebar">

          <h5 className="all-categories-sidebar-title">
            📚 Library Categories
          </h5>

          <ul className="all-categories-nav">

            <li
              className={`all-categories-nav-item ${
                activeCategory === "All" ? "active" : ""
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              All Books
            </li>

            {[...new Set(
              books.map((book) => book.category)
            )].map((category, index) => (

              <li
                key={index}
                className={`all-categories-nav-item ${
                  activeCategory === category ? "active" : ""
                }`}
                onClick={() =>
                  handleCategoryClick(category)
                }
              >
                {category}
              </li>

            ))}

          </ul>

        </nav>


        {/* MAIN CONTENT */}
        <main className="all-categories-main">

          <h2 className="all-categories-main-title">
            Explore Library Categories
          </h2>

          {loading ? (

            <Loader />

          ) : filterBooks.length > 0 ? (

            <div className="all-categories-grid">

              {[...new Set(
                filterBooks.map((book) => book.category)
              )].map((category, index) => (

                <div
                  key={index}
                  className="all-categories-card-wrapper"
                >

                  <div className="all-categories-card shadow-sm">

                    <img
                      src={
                        filterBooks.find(
                          (b) => b.category === category
                        )?.coverImage
                      }
                      className="all-categories-card-img"
                      alt={category}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x400?text=No+Image";
                      }}
                    />


                    <div className="all-categories-card-body">

                      <h5 className="all-categories-card-title">
                        {category}
                      </h5>

                      <p className="text-muted">
                        {categoryCounts[category] || 0} books
                      </p>

                      <Link
                        to={`/books?category=${encodeURIComponent(
                          category
                        )}`}
                        className="all-categories-btn"
                      >
                        View Books
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="all-categories-empty">

              <p>
                No books are currently available in this category.
              </p>

            </div>

          )}

        </main>

      </div>

    </div>
  );
}