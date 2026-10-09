import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${Server_URL}users/login`,
        data
      );

      console.log("Login response:", response.data);

      const token = response.data.token;
      const role = response.data.user.role;

      localStorage.setItem("authToken", token);
      localStorage.setItem("role", role);

      showSuccessToast("Login Successful!");

      if (role === "admin" || role === "librarian") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );

      showErrorToast(
        error.response?.data?.message || "Login Failed!"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h2 className="login-title">User Login</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              className="form-input"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <span className="error-text">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              className="form-input"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <span className="error-text">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="forgot-password">
            <button
              type="button"
              className="forgot-btn"
              onClick={() => navigate("/forgetPassword")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="btn-submit"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}