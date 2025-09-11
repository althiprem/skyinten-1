// src/pages/Hackathons.jsx
import React, { useState } from "react";
import "../styles/pages/Hackathons.css";
import { NavLink } from "react-router-dom";
import SkyintenLogo from "../assets/icons/skyinten-white-vector.svg";
import BackButton from "../components/BackButton";

const Hackathons = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    Mobile: "",
    College_Name: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful!");
    setFormData({ name: "", email: "", Mobile: "", College_Name: "" });
  };

  return (
    <div className="hackathons-page">
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
        <div className="absolute top-6" style={{ right: '2in' }}>
        <BackButton />
      </div>
      </header>

      <div className="hackathons-container dark-mode">
        <h1 className="hackathons-title fade-in">Hackathons</h1>

        <div className="hackathon-section fade-in">
          <h2>Upcoming Hackathon</h2>
          <div className="hackathon-details">
            <p><strong>Title:</strong> AI Builders Hackathon</p>
            <p><strong>Date:</strong> Sep 14, 2025</p>
            <p><strong>Time:</strong> 10:00 AM IST</p>
            <p><strong>Theme:</strong> Building Assistive Learning Tools</p>
            <p><strong>Team Size:</strong> 1–4 members</p>
            <p><strong>Prize:</strong> ₹50,000</p>
          </div>
        </div>

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

            <label>Mobile_no</label>
            <input
                type="Number"
                name="Mobile"
                value={formData.Mobile_no}
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
            <button type="submit">Join Now</button>
          </form>
        </div>

        <div className="hackathon-section fade-in">
          <h2>Rules & Guidelines</h2>
          <ul>
            <li>Each team can have 1 to 4 members.</li>
            <li>Work must be submitted within 24 hours of the start time.</li>
            <li>Original projects only; plagiarism will disqualify teams.</li>
            <li>Maintain ethical guidelines throughout the event.</li>
          </ul>
        </div>

        <div className="hackathon-section fade-in">
          <h2>Past Hackathons</h2>
          <ul>
            <li>Global Hack 2024 — Built sustainable tech solutions.</li>
            <li>EduTech Challenge 2024 — Developed interactive learning tools.</li>
            <li>Health Innovators 2023 — Created health monitoring apps.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hackathons;
