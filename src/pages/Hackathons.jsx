// src/pages/Hackathons.jsx
import React, { useState } from "react";
import "../styles/pages/Hackathons.css";
import { NavLink } from "react-router-dom";
import SkyintenLogo from "../assets/icons/skyinten-white-vector.svg";
import BackButton from "../components/BackButton";
import axios from "axios";

const Hackathons = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Mobile: "",
    College_Name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost/skyintern/php/db.php", {
        action: "hackathon_register",
        ...formData,
      });

      if (response.data.success) {
        alert("✅ Registration successful!");
        setFormData({ name: "", email: "", Mobile: "", College_Name: "" });
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (err) {
      alert("⚠️ Error submitting form. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hackathons-page">
      {/* Header */}
      <header className="navHome">
        <div className="navHome__inner">
          <NavLink to="/" className="navHome__brand">
            <img
              src={SkyintenLogo}
              alt="Skyinten Logo"
              className="navHome__brandIcon"
            />
            <span className="navHome__brandText">Skyinten</span>
          </NavLink>
        </div>
        <div className="absolute top-6" style={{ right: "2in" }}>
          <BackButton />
        </div>
      </header>

      {/* Main Container */}
      <div className="hackathons-container dark-mode">
        <h1 className="hackathons-title fade-in">Hackathons</h1>

        {/* Upcoming Hackathon */}
        <div className="hackathon-section fade-in">
          <h2>Upcoming Hackathon</h2>
          <div className="hackathon-details">
            <p>
              <strong>Title:</strong> AI Builders Hackathon
            </p>
            <p>
              <strong>Date:</strong> Sep 14, 2025
            </p>
            <p>
              <strong>Time:</strong> 10:00 AM IST
            </p>
            <p>
              <strong>Theme:</strong> Building Assistive Learning Tools
            </p>
            <p>
              <strong>Team Size:</strong> 1–4 members
            </p>
            <p>
              <strong>Prize:</strong> ₹50,000
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="hackathon-section fade-in">
          <h2>Register for Hackathon</h2>
          <form className="hackathon-form" onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Mobile No</label>
            <input
              type="text"
              name="Mobile"
              value={formData.Mobile}
              onChange={handleChange}
              required
            />

            <label>College Name</label>
            <input
              type="text"
              name="College_Name"
              value={formData.College_Name}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Join Now"}
            </button>
          </form>
        </div>

        {/* Rules */}
        <div className="hackathon-section fade-in">
          <h2>Rules & Guidelines</h2>
          <ul>
            <li>Each team can have 1 to 4 members.</li>
            <li>Work must be submitted within 24 hours of the start time.</li>
            <li>Original projects only; plagiarism will disqualify teams.</li>
            <li>Maintain ethical guidelines throughout the event.</li>
          </ul>
        </div>

        {/* Past Hackathons */}
        <div className="hackathon-section fade-in">
          <h2>Past Hackathons</h2>
          <ul>
            <li>Global Hack 2024 — Built sustainable tech solutions.</li>
            <li>
              EduTech Challenge 2024 — Developed interactive learning tools.
            </li>
            <li>Health Innovators 2023 — Created health monitoring apps.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hackathons;
