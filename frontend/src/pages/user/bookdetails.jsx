import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaTags,
  FaBarcode,
  FaRupeeSign,
  FaInfoCircle
} from "react-icons/fa";
import { RiBookmarkLine } from "react-icons/ri";
import "./bookdetails.css";
import {
  showErrorToast,
  showSuccessToast
} from "../../utils/toasthelper";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isIssuing, setIsIssuing] = useState(false);

  // Request a book
  async function issueBook(bookid) {
    try {
      setIsIssuing(true);

      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        showErrorToast("Please login to request a book.");
        return;
      }

      const response = await axios.post(
        `${Server_URL}books/borrow/request-issue/${bookid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { error, message } = response.data;

      if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
      }

    } catch (error) {
      showErrorToast(
        error.response?.data?.message ||
          "Something went wrong! Please try again."
      );
    } finally {
      setIsIssuing(false);
    }
  }


  // Fetch selected book
  useEffect(() => {

    async function fetchBook() {

      try {
        setIsLoading(true);

        const response = await axios.get(
          `${Server_URL}books/${id}`
        );

        setBook(response.data);
        setError(null);

      } catch (error) {

        console.error("Error fetching book:", error);

        setError(
          "Unable to load the book information. Please try again later."
        );

      } finally {
        setIsLoading(false);
      }
    }

    fetchBook();

  }, [id]);


  // Loading state
  if (isLoading) {
    return (
      <div className="loading-container">

        <motion.div
          className="spinner"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        ></motion.div>

        <p>
          Loading book information...
        </p>

      </div>
    );
  }


  // Error state
  if (error) {
    return (
      <motion.div
        className="error-message"
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
      >
        {error}
      </motion.div>
    );
  }


  // Book not found
  if (!book) {
    return (
      <div className="not-found-container">

        <RiBookmarkLine className="not-found-icon" />

        <h2>
          Book Not Available
        </h2>

        <p>
          The requested book could not be found
          or may have been removed from the collection.
        </p>

      </div>
    );
  }


  return (
    <motion.div
      className="book-details-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >

      <div className="book-details">

        {/* BOOK COVER */}
        <motion.div
          className="book-cover"
          whileHover={{ scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >

          <img
            src={
              book.coverImage ||
              "/default-book-cover.jpg"
            }
            alt={book.title}
            className="book-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-book-cover.jpg";
            }}
          />

          {book.availableCopies !== undefined && (
            <div
              className={`availability-badge ${
                book.availableCopies > 0
                  ? "available"
                  : "unavailable"
              }`}
            >
              {book.availableCopies > 0
                ? `${book.availableCopies} Available`
                : "Out of Stock"}
            </div>
          )}

        </motion.div>


        {/* BOOK INFORMATION */}
        <div className="book-info">

          <div className="book-header">

            <h1 className="book-title">
              {book.title}
            </h1>

            <p className="book-author">
              by {book.author}
            </p>

          </div>


          {/* BOOK DETAILS */}
          <div className="book-meta">

            <div className="meta-item">

              <FaTags className="meta-icon" />

              <div>
                <span className="meta-label">
                  Category
                </span>

                <span className="meta-value">
                  {book.category}
                </span>
              </div>

            </div>


            <div className="meta-item">

              <FaBarcode className="meta-icon" />

              <div>
                <span className="meta-label">
                  ISBN
                </span>

                <span className="meta-value">
                  {book.isbn}
                </span>
              </div>

            </div>


            <div className="meta-item">

              <FaRupeeSign className="meta-icon" />

              <div>
                <span className="meta-label">
                  Price
                </span>

                <span className="meta-value">
                  ₹{book.price}
                </span>
              </div>

            </div>

          </div>


          {/* DESCRIPTION */}
          <div className="book-description">

            <h3>

              <FaInfoCircle className="description-icon" />

              Description

            </h3>

            <p>
              {book.description ||
                "No description available for this book."}
            </p>

          </div>


          {/* REQUEST BOOK */}
          <div className="action-buttons">

            <motion.button
              className={`issue-button ${
                book.availableCopies !== undefined &&
                book.availableCopies <= 0
                  ? "disabled"
                  : ""
              }`}

              onClick={() =>
                issueBook(book._id)
              }

              whileHover={{
                scale: 1.05
              }}

              whileTap={{
                scale: 0.95
              }}

              disabled={
                isIssuing ||
                (book.availableCopies !== undefined &&
                  book.availableCopies <= 0)
              }
            >

              {isIssuing ? (

                <span className="button-loader"></span>

              ) : (

                <>
                  <FaBookOpen className="button-icon" />

                  {book.availableCopies !== undefined &&
                  book.availableCopies <= 0
                    ? "Out of Stock"
                    : "Request This Book"}
                </>

              )}

            </motion.button>

          </div>

        </div>

      </div>

    </motion.div>
  );
}

export default BookDetails;