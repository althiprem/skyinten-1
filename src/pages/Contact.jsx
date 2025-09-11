import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import "../styles/pages/Contact.css";
import BackButton from "../components/BackButton"

const Contact = () => {
  return (
    <div className="contact-page">
      
       <div className="absolute top-6" style={{ right: '2in' }}>
        <BackButton />
      </div>
      
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>We’re here to help and answer any questions you might have.</p>
      </div>

      {/* Contact Info Cards */}
      <div className="contact-cards">
        <div className="contact-card">
          <FaEnvelope className="icon email" />
          <h3>Email</h3>
          <p>support@skyintern.com</p>
        </div>
        <div className="contact-card">
          <FaPhone className="icon phone" />
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>
        <div className="contact-card">
          <FaMapMarkerAlt className="icon map" />
          <h3>Office</h3>
          <p>Hyderabad, India</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="contact-form">
        <h2>Send us a Message</h2>
        <form>
          <div className="form-group">
            <input type="text" required />
            <label>Your Name</label>
          </div>
          <div className="form-group">
            <input type="email" required />
            <label>Your Email</label>
          </div>
          <div className="form-group">
            <input type="text" required />
            <label>Subject</label>
          </div>
          <div className="form-group">
            <textarea rows="4" required></textarea>
            <label>Your Message</label>
          </div>
          <button type="submit" className="btn-submit">Send Message</button>
        </form>
      </div>

      {/* Social Media */}
      <div className="social-links">
        <p>Or connect with us on</p>
        <div className="icons">
          <a href=" " className="whatsapp"><FaWhatsapp /></a>:
          <a href=" " className="linkedin"><FaLinkedin /></a>:
          <a href=" " className="instagram"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
