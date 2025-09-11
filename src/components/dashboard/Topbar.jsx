import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import "../../styles/components/Topbar.css";
import avatar from '../../assets/images/naruto.png'


const Topbar = ({
  userName,
  onMenuToggle,
  isMobile,
  currentSection,
  onNavigate,
  showSidebar,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);


  // // Logout function need to change

  const handleLogout = () =>{
    localStorage.removeItem("isAuthenticated"); 
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  

  return (


    <header className="topbar">
      <div className="topbar__left">
        {isMobile && (
          <button
            className="topbar__menu-btn"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            {showSidebar ? <FaTimes /> : <FaBars />}
          </button>
        )}
        <div
          className="topbar__logo-container"
          onClick={() => onNavigate("home")}
        >
          <img
            src="/src/assets/icons/skyinten-violet-vector.svg"
            alt="SkyIntern logo"
            className="topbar__logo-img"
          />
          <span className="topbar__logo-text">SkyIntern</span>
        </div>
      </div>
      <div className="topbar__center">
        <h1 className="topbar__title">
          {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)}
        </h1>
      </div>
      <div className="topbar__right">
        <button className="topbar__notification" aria-label="Notifications">
          <FaBell />
        </button>
        
        <div className="topbar__profile" ref={profileRef}>
  <button
    className="topbar__avatar-btn"
    onClick={() => setProfileMenuOpen((v) => !v)}
    aria-haspopup="menu"
    aria-expanded={profileMenuOpen}
  >
    <img
      src="/src/assets/images/profile-placeholder.png"
      alt={`${userName} avatar`}
      className="topbar__avatar"
    />
  </button>

  {profileMenuOpen && (
    <div className="topbar__dropdown" role="menu">
      <img
        src={avatar}
        alt="profile avatar"
        className="w-16 h-16 rounded-full object-cover"
        style={{ borderRadius: "100%" }}
        width={110}
        height={110}
      />

      <div className="topbar__user-info-section">
        <FaUserCircle className="topbar__user-icon" />
        <div className="topbar__user-details">
          <span className="topbar__dropdown-username">{userName}</span>
          <span className="topbar__dropdown-email">
            User@skyintern.com
          </span>
        </div>
      </div>

      <button
        className="topbar__dropdown-item logout"
        onClick={() => setShowLogoutPopup(true)}  // 👈 trigger popup
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  )}

  {/* ✅ Logout Popup */}
  {showLogoutPopup && (
    <div className="logout-popup">
      <h3>Confirm Logout</h3>
      <p>Are you sure you want to logout?</p>
      <div className="logout-popup__actions">
        <button
          className="btn btn--confirm"
          onClick={() => {
            setShowLogoutPopup(false);
            handleLogout();
          }}
        >
          Yes
        </button>
        <button
          className="btn btn--cancel"
          onClick={() => setShowLogoutPopup(false)}
        >
          No
        </button>
      </div>
    </div>
  )}    
        </div>
      </div>
    </header>
  );
};

export default Topbar;
