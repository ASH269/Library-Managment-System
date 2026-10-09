import { useEffect, useState } from "react";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import "./profile.css";
import { getAuthToken } from "../../utils/auth";
import {
  showErrorToast,
  showSuccessToast
} from "../../utils/toasthelper";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [issuedRequests, setIssuedRequests] = useState([]);
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books associated with the logged-in user
  const fetchIssuedBooks = async () => {
    try {
      const response = await axios.get(
        `${Server_URL}books/issued`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      );

      const books = response.data.issuedBooks || [];

      setIssuedBooks(
        books.filter(
          (book) => book.status === "Issued"
        )
      );

      setIssuedRequests(
        books.filter(
          (book) => book.status === "Requested"
        )
      );

      setReturnRequests(
        books.filter(
          (book) => book.status === "Requested Return"
        )
      );

    } catch (error) {
      console.error(
        "Error fetching library activity:",
        error.message
      );
    }
  };


  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${Server_URL}users/profile`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      );

      setUser(response.data.user);

    } catch (error) {
      console.error(
        "Error fetching profile:",
        error
      );
    }
  };


  useEffect(() => {

    const loadProfile = async () => {
      setLoading(true);

      await Promise.all([
        fetchProfile(),
        fetchIssuedBooks()
      ]);

      setLoading(false);
    };

    loadProfile();

  }, []);


  // Request book return
  const returnBook = async (borrowId) => {

    try {

      const response = await axios.put(
        `${Server_URL}books/returnrequest/${borrowId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`
          }
        }
      );

      showSuccessToast(response.data.message);

      fetchIssuedBooks();

    } catch (error) {

      console.error(
        "Error requesting book return:",
        error
      );

      showErrorToast(
        error.response?.data?.message ||
        "Unable to request book return."
      );
    }
  };


  // Loading state
  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p className="loading">
            Loading your library profile...
          </p>
        </div>
      </div>
    );
  }


  // Profile unavailable
  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-info card">
            <h2>
              Profile Unavailable
            </h2>

            <p>
              We couldn't load your library profile.
              Please try logging in again.
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="profile-page">

      <div className="profile-container">

        {/* PROFILE INFORMATION */}
        <div className="profile-info card">

          <h1>
            My Library Profile
          </h1>

          <div className="profile-details">

            <p>
              <strong>Name:</strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>Account Type:</strong>{" "}
              {user.role}
            </p>

          </div>

        </div>


        <div className="profile-sections">

          {/* ISSUED BOOKS */}
          <div className="section-card issued-books">

            <h2>
              📚 My Issued Books
            </h2>

            {issuedBooks.length === 0 ? (

              <p>
                You currently have no issued books.
              </p>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Fine</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {issuedBooks.map((book) => (

                    <tr key={book._id}>

                      <td>
                        {book.bookId.title}
                      </td>

                      <td>
                        {new Date(
                          book.issueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {new Date(
                          book.dueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <span className="badge issued">
                          {book.status}
                        </span>
                      </td>

                      <td>
                        ₹{book.fine}
                      </td>

                      <td>

                        <button
                          className="return-btn"
                          onClick={() =>
                            returnBook(book._id)
                          }
                        >
                          Request Return
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>


          {/* BOOK REQUESTS */}
          <div className="section-card issued-requests">

            <h2>
              📝 Book Requests
            </h2>

            {issuedRequests.length === 0 ? (

              <p>
                No pending book requests.
              </p>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Request Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {issuedRequests.map((book) => (

                    <tr key={book._id}>

                      <td>
                        {book.bookId.title}
                      </td>

                      <td>
                        {new Date(
                          book.issueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {new Date(
                          book.dueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <span className="badge requested">
                          {book.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>


          {/* RETURN REQUESTS */}
          <div className="section-card return-requests">

            <h2>
              🔄 Return Requests
            </h2>

            {returnRequests.length === 0 ? (

              <p>
                No pending return requests.
              </p>

            ) : (

              <table>

                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Request Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {returnRequests.map((book) => (

                    <tr key={book._id}>

                      <td>
                        {book.bookId.title}
                      </td>

                      <td>
                        {new Date(
                          book.issueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        {new Date(
                          book.dueDate
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <span className="badge return-requested">
                          {book.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProfilePage;