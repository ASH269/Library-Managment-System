import React from "react";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiUsers,
  FiAward,
  FiClock,
  FiMapPin
} from "react-icons/fi";
import "./about.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero-section">
        <div className="about-container">

          <h1 className="about-hero-title">
            About VIT Central Library
          </h1>

          <p className="about-hero-subtitle">
            Supporting learning, research, and academic excellence across the VIT campus
          </p>

        </div>
      </section>


      {/* MISSION SECTION */}
      <section className="about-mission-section">

        <div className="about-container">

          <div className="about-mission-content">

            <div className="about-mission-text">

              <h2 className="about-section-title">
                Our Mission
              </h2>

              <p className="about-mission-paragraph">
                VIT Central Library supports the academic and research
                requirements of students, faculty, and researchers by
                providing access to a wide range of books, journals,
                electronic resources, and digital services.
              </p>

              <p className="about-mission-paragraph">
                With modern technology and continuously expanding
                resources, the library provides an environment that
                encourages learning, research, collaboration, and
                intellectual growth.
              </p>

            </div>

            <div className="about-mission-image">

              <img
                src="/assets/libraryinterior.jpg"
                alt="VIT Central Library"
                className="about-mission-img"
              />

            </div>

          </div>

        </div>

      </section>


      {/* LIBRARY MILESTONE HISTORY */}
      <section className="about-history-section">

        <div className="about-container">

          <h2 className="about-section-title about-history-title">
            Library Milestone History
          </h2>

          <div className="about-timeline">

            {/* 1984 */}
            <div className="about-timeline-item">

              <div className="about-timeline-year">
                1984
              </div>

              <div className="about-timeline-content">

                <h3 className="about-timeline-event">
                  Foundation
                </h3>

                <p className="about-timeline-description">
                  The Central Library was established alongside
                  Vellore Engineering College to support the
                  information and academic needs of its students
                  and faculty.
                </p>

              </div>

            </div>


            {/* 1998 */}
            <div className="about-timeline-item">

              <div className="about-timeline-year">
                1998
              </div>

              <div className="about-timeline-content">

                <h3 className="about-timeline-event">
                  Digital Inception
                </h3>

                <p className="about-timeline-description">
                  The library introduced an in-house library
                  management system developed using Visual Basic,
                  beginning its transition towards computerized
                  library services.
                </p>

              </div>

            </div>


            {/* 2010s */}
            <div className="about-timeline-item">

              <div className="about-timeline-year">
                2010s
              </div>

              <div className="about-timeline-content">

                <h3 className="about-timeline-event">
                  Infrastructure Expansion
                </h3>

                <p className="about-timeline-description">
                  The Central Library developed into a large,
                  multi-floor facility with approximately 7,770
                  square metres of space, providing expanded
                  academic resources and facilities for the
                  campus community.
                </p>

              </div>

            </div>


            {/* 2019 */}
            <div className="about-timeline-item">

              <div className="about-timeline-year">
                2019
              </div>

              <div className="about-timeline-content">

                <h3 className="about-timeline-event">
                  Smart Library Transformation
                </h3>

                <p className="about-timeline-description">
                  The library migrated to KOHA, a web-centric
                  open-source integrated library management system,
                  along with RFID technology, biometric integration,
                  self check-in and check-out kiosks, Web-OPAC,
                  and online renewal services.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* STATISTICS */}
      <section className="about-stats-section">

        <div className="about-container">

          <h2 className="about-stats-title">
            Library at a Glance
          </h2>

          <div className="about-stats-grid">

            <div className="about-stat-card">

              <FiBook
                size={40}
                className="about-stat-icon"
              />

              <h3 className="about-stat-number">
                7,770+
              </h3>

              <p className="about-stat-label">
                Sq. Metres of Space
              </p>

            </div>


            <div className="about-stat-card">

              <FiUsers
                size={40}
                className="about-stat-icon"
              />

              <h3 className="about-stat-number">
                VIT
              </h3>

              <p className="about-stat-label">
                Campus Community
              </p>

            </div>


            <div className="about-stat-card">

              <FiAward
                size={40}
                className="about-stat-icon"
              />

              <h3 className="about-stat-number">
                KOHA
              </h3>

              <p className="about-stat-label">
                Library Management System
              </p>

            </div>


            <div className="about-stat-card">

              <FiClock
                size={40}
                className="about-stat-icon"
              />

              <h3 className="about-stat-number">
                1984
              </h3>

              <p className="about-stat-label">
                Library Established
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* FACILITIES */}
      <section className="about-facilities-section">

        <div className="about-container">

          <h2 className="about-section-title">
            Our Facilities
          </h2>

          <div className="about-facilities-grid">

            <div className="about-facility-card">

              <img
                src="/assets/readingroom.webp"
                alt="Reading Room"
                className="about-facility-img"
              />

              <h3 className="about-facility-name">
                Reading Room
              </h3>

              <p className="about-facility-description">
                A comfortable study environment designed to
                support focused learning and individual study.
              </p>

            </div>


            <div className="about-facility-card">

              <img
                src="/assets/computerlab.jpeg"
                alt="Computer Lab"
                className="about-facility-img"
              />

              <h3 className="about-facility-name">
                Digital Resources
              </h3>

              <p className="about-facility-description">
                Access to computers, digital resources, online
                databases, and electronic learning materials.
              </p>

            </div>


            <div className="about-facility-card">

              <img
                src="/assets/groupstudyroom.jpeg"
                alt="Group Study Room"
                className="about-facility-img"
              />

              <h3 className="about-facility-name">
                Group Study Spaces
              </h3>

              <p className="about-facility-description">
                Dedicated spaces that encourage collaborative
                learning, discussions, and academic interaction.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CTA SECTION */}
      <section className="about-cta-section">

        <div className="about-container">

          <h2 className="about-cta-title">
            Explore VIT Central Library
          </h2>

          <p className="about-cta-subtitle">
            Discover books, academic resources, and digital
            services available to the VIT community.
          </p>

          <div className="about-cta-buttons">

            <Link
              to="/books"
              className="about-btn about-btn-primary"
            >
              <FiBook className="about-icon" />
              Explore Books
            </Link>

            <Link
              to="/contactus"
              className="about-btn about-btn-secondary"
            >
              Contact Library
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default AboutUs;