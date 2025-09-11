import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaUser,
  FaStar,
  FaCompass,
  FaSignOutAlt,
  FaMoneyBill,
  FaPhone
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/components/Sidebar.css";

const Sidebar = ({
  currentSection,
  onSectionChange,
  isMobile,
  showSidebar,
  setShowSidebar,
  sidebarRef,
}) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const handleNav = (key) => {
    if (key === "explore") {
      navigate("/explore");
    } else if (key === "contact") {
      navigate("/contact");
    } else if (key === "payment") {
      navigate("/payment");
    } else {
      onSectionChange(key);
    }

    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleLogout = () => {
    // Clear auth state
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user");

    // Redirect to Home
    navigate("/");
  };

  const menuItems = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "courses", label: "My Courses", icon: <FaBook /> },
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "achievements", label: "Achievements", icon: <FaStar /> },
    { key: "explore", label: "Explore Courses", icon: <FaCompass /> },
    { key: "payment", label: "Payment", icon: <FaMoneyBill /> },
    { key: "contact", label: "Contact Us", icon: <FaPhone /> },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`sidebar ${isMobile ? "mobile" : "desktop"} ${
        showSidebar ? "open" : ""
      }`}
    >
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          {menuItems.map((item) => (
            <li key={item.key} className="sidebar__list-item">
              <button
                className={`sidebar__link ${
                  currentSection === item.key ? "active" : ""
                }`}
                onClick={() => handleNav(item.key)}
              >
                <span className="sidebar__icon">{item.icon}</span>
                <span className="sidebar__label">{item.label}</span>
              </button>
            </li>
          ))}

          {/* Logout Button */}
          <li className="sidebar__list-item sidebar__logout">
            <button className="sidebar__link" onClick={() => setShowPopup(true)}>
              <span className="sidebar__icon">
                <FaSignOutAlt />
              </span>
              <span className="sidebar__label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Logout Popup */}
      {showPopup && (
        <div className="logout-popup">
          <h3>Confirm Logout</h3>
          <p>Are you sure you want to logout?</p>
          <div className="logout-popup__actions">
            <button className="btn btn--confirm" onClick={handleLogout}>
              Yes
            </button>
            <button className="btn btn--cancel" onClick={() => setShowPopup(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
