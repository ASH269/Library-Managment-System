import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

const AddBookForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Add normal form fields
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("category", data.category);
      formData.append("isbn", data.isbn);
      formData.append("totalCopies", data.totalCopies);
      formData.append("price", data.price);
      formData.append("description", data.description);

      // Add cover image
      if (data.coverImage && data.coverImage.length > 0) {
        formData.append("coverImage", data.coverImage[0]);
      }

      // Get logged-in admin/librarian token
      const authToken =
        localStorage.getItem("adminauthToken") ||
        localStorage.getItem("authToken");

      if (!authToken) {
        showErrorToast("Please login as admin or librarian first!");
        return;
      }

      const response = await axios.post(
        `${Server_URL}books/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Book response:", response.data);

      if (response.data.error) {
        showErrorToast(response.data.message);
      } else {
        showSuccessToast(
          response.data.message || "Book added successfully!"
        );
        reset();
      }

    } catch (error) {
      console.error(
        "Add Book Error:",
        error.response?.data || error.message
      );

      showErrorToast(
        error.response?.data?.message || "Failed to add book!"
      );
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        📚 Add a New Book
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 shadow-sm bg-light rounded"
      >

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Book Title</label>

          <input
            type="text"
            className="form-control"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <small className="text-danger">
              {errors.title.message}
            </small>
          )}
        </div>

        {/* Author */}
        <div className="mb-3">
          <label className="form-label">Author</label>

          <input
            type="text"
            className="form-control"
            {...register("author", {
              required: "Author is required",
            })}
          />

          {errors.author && (
            <small className="text-danger">
              {errors.author.message}
            </small>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label">Category</label>

          <select
            className="form-select"
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-fiction">Non-fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>

          {errors.category && (
            <small className="text-danger">
              {errors.category.message}
            </small>
          )}
        </div>

        {/* ISBN */}
        <div className="mb-3">
          <label className="form-label">ISBN</label>

          <input
            type="text"
            className="form-control"
            {...register("isbn", {
              required: "ISBN is required",
            })}
          />

          {errors.isbn && (
            <small className="text-danger">
              {errors.isbn.message}
            </small>
          )}
        </div>

        {/* Cover Image */}
        <div className="mb-3">
          <label className="form-label">
            Book Cover Image
          </label>

          <input
            type="file"
            className="form-control"
            accept="image/*"
            {...register("coverImage")}
          />
        </div>

        {/* Total Copies */}
        <div className="mb-3">
          <label className="form-label">
            Total Copies
          </label>

          <input
            type="number"
            className="form-control"
            {...register("totalCopies", {
              required: "Total copies are required",
              min: {
                value: 1,
                message: "At least 1 copy is required",
              },
            })}
          />

          {errors.totalCopies && (
            <small className="text-danger">
              {errors.totalCopies.message}
            </small>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label className="form-label">
            Price
          </label>

          <input
            type="number"
            step="0.01"
            className="form-control"
            {...register("price", {
              required: "Price is required",
            })}
          />

          {errors.price && (
            <small className="text-danger">
              {errors.price.message}
            </small>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="3"
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>

          {errors.description && (
            <small className="text-danger">
              {errors.description.message}
            </small>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Add Book
        </button>

      </form>
    </div>
  );
};

export default AddBookForm;