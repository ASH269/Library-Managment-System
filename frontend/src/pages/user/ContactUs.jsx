import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
} from "react-icons/fi";
import "./contact.css";
import { Server_URL } from "../../utils/config";
import {
  showErrorToast,
  showSuccessToast,
} from "../../utils/toasthelper";

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = Server_URL + "users/contact";
      await axios.post(url, data);

      showSuccessToast(
        "Your message has been sent! We will get back to you soon."
      );

      reset();
    } catch (error) {
      console.error(error);

      showErrorToast(
        "There was a problem sending your message. Please try again later."
      );
    }
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-container">
          <h1>Contact Us</h1>
          <p>
            We're here to help with any questions about the
            KLA University Campus Library.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info-section">
        <div className="contact-container">

          <div className="contact-info-grid">

            {/* Address */}
            <div className="contact-info-card">
              <FiMapPin className="contact-icon" size={28} />

              <h3>Visit Us</h3>

              <p>
                KLA University Campus Library
                <br />
                University Campus, Andhra Pradesh
              </p>
            </div>

            {/* Email */}
            <div className="contact-info-card">
              <FiMail className="contact-icon" size={28} />

              <h3>Email Us</h3>

              <p>
                library@klauniversity.edu
                <br />
                library.support@klauniversity.edu
              </p>
            </div>

            {/* Phone */}
            <div className="contact-info-card">
              <FiPhone className="contact-icon" size={28} />

              <h3>Call Us</h3>

              <p>
                Library Help Desk
                <br />
                Mon-Fri, 9:00 AM - 5:00 PM
              </p>
            </div>

            {/* Hours */}
            <div className="contact-info-card">
              <FiClock className="contact-icon" size={28} />

              <h3>Library Hours</h3>

              <p>
                Mon-Fri: 8:00 AM - 9:00 PM
                <br />
                Sat-Sun: 9:00 AM - 6:00 PM
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="contact-container">

          <div className="contact-form-wrapper">

            <div className="contact-form-text">
              <h2>Send Us a Message</h2>

              <p>
                Have questions about books, library resources,
                membership, or services? Fill out the form below
                and our library team will get back to you.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="contact-form"
            >

              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Full Name</label>

                <input
                  {...register("name", {
                    required: true,
                  })}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                />

                {errors.name && (
                  <span className="error">
                    Name is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />

                {errors.email && (
                  <span className="error">
                    Valid email is required
                  </span>
                )}
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject">
                  Subject
                </label>

                <select
                  {...register("subject", {
                    required: true,
                  })}
                  id="subject"
                >
                  <option value="">
                    Select a subject
                  </option>

                  <option value="general">
                    General Inquiry
                  </option>

                  <option value="books">
                    Book Availability
                  </option>

                  <option value="membership">
                    Library Membership
                  </option>

                  <option value="borrow">
                    Borrow / Return Query
                  </option>

                  <option value="resources">
                    Library Resources
                  </option>

                  <option value="feedback">
                    Feedback / Suggestions
                  </option>

                  <option value="other">
                    Other
                  </option>
                </select>

                {errors.subject && (
                  <span className="error">
                    Subject is required
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">
                  Message
                </label>

                <textarea
                  {...register("message", {
                    required: true,
                  })}
                  id="message"
                  rows="6"
                  placeholder="Enter your message here..."
                ></textarea>

                {errors.message && (
                  <span className="error">
                    Message is required
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="contact-submit-btn"
              >
                <FiSend className="btn-icon" />
                Send Message
              </button>

            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;