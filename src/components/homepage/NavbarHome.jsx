// Import paired styles
import '../../styles/components/NavbarHome.css';
import { useState, useEffect } from "react";
import {
  FaHome,
  FaBook,
  FaQuoteRight,
  FaEnvelope,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import SkyintenLogo from "../../assets/icons/skyinten-violet-vector.svg";
import "../../styles/components/NavbarHome.css";

export default function NavbarHome({ openModal }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && open) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const links = [
    { id: 1, href: "#", icon: <FaHome />, text: "Home" },
    { id: 2, href: "#courses", icon: <FaBook />, text: "Courses" },
    { id: 3, href: "#", icon: <FaQuoteRight />, text: "Hackathons" },
    { id: 4, href: "#contact", icon: <FaEnvelope />, text: "Contact" },
  ];

  return (
    <header className="navHome">
      <div className="navHome__inner">
        {/* Brand */}
        <a href="#" className="navHome__brand">
          <img
            src={SkyintenLogo}
            alt="Skyinten Logo"
            className="navHome__brandIcon"
          />
          <span className="navHome__brandText">Skyinten</span>
        </a>

        {/* Centered Links */}
        <div className="navHome__centerWrap">
          <ul className="navHome__links">
            {links.map((link) => (
              <li key={link.id}>
                <a href={link.href}>
                  {link.icon} {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="navHome__actions">
          <button
            type="button"
            className="navHome__btn navHome__btn--ghost"
            onClick={() => openModal("login")}
          >
            <FaSignInAlt /> Log in
          </button>
          <button
            type="button"
            className="navHome__btn navHome__btn--primary"
            onClick={() => openModal("signup")}
          >
            <FaUserPlus /> Sign up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="navHome__toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navHome__menu ${open ? "open" : ""}`}>
        <ul className="navHome__menuLinks">
          {links.map((link) => (
            <li key={link.id}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.icon} {link.text}
              </a>
            </li>
          ))}
        </ul>
        <div className="navHome__mobileActions">
          <button
            type="button"
            className="navHome__btn navHome__btn--ghost"
            onClick={() => {
              setOpen(false);
              setTimeout(() => openModal("login"), 200);
            }}
          >
            <FaSignInAlt /> Log in
          </button>
          <button
            type="button"
            className="navHome__btn navHome__btn--primary"
            onClick={() => {
              setOpen(false);
              setTimeout(() => openModal("signup"), 200);
            }}
          >
            <FaUserPlus /> Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
