// Import paired styles
import '../../styles/components/FooterHome.css';
import React from "react";
import "../../styles/components/FooterHome.css";
import logo from "../../assets/icons/skyinten-white-vector.svg";
import { FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function FooterHome() {
  const year = new Date().getFullYear();

  return (
    <footer className="footHome">
  <div className="footHome__container">
    {/* Brand Column */}
    <div className="footHome__brand">
      <div className="footHome__brandRow">
        <img src={logo} alt="Skyinten Logo" className="footHome__logo" />
        <span className="footHome__brandName">Skyinten</span>
      </div>
      <p className="footHome__tagline">Where ambition meets execution.</p>
    </div>

    {/* Center Column */}
    <div className="footHome__centerBlock">
      <nav className="footHome__links">
        <a href="#">Features</a>
        <a href="#">Courses</a>
        <a href="#">Hackathons</a>
        <a href="#">Privacy</a>
      </nav>
      <div className="footHome__bottom">
        © 2025 Skyinten. All rights reserved.
      </div>
    </div>

    {/* CTA Column */}
    <div className="footHome__right">
      <div className="footHome__cta">
        <span className="footHome__ctaText">Ready to rise?</span>
        <a href="#" className="footHome__ctaBtn">Explore Courses →</a>
      </div>
      <div className="footHome__socials">
        <a href="#"><i className="fab fa-twitter" /></a>
        <a href="#"><i className="fab fa-linkedin" /></a>
        <a href="#"><i className="fab fa-youtube" /></a>
      </div>
    </div>
  </div>
</footer>

  );
}
