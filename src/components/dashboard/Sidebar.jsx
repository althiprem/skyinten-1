import React from "react";
import {
  FaHome,
  FaBook,
  FaUser,
  FaTrophy,
  FaCompass,
  FaSignOutAlt,
  FaStar,
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

  const handleNav = (key) => {
    if (key === "explore") {
      navigate("/explore");
    } else {
      onSectionChange(key);
    }
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const menuItems = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "courses", label: "My Courses", icon: <FaBook /> },
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "achievements", label: "Achievements", icon: <FaStar /> },
    { key: "explore", label: "Explore Courses", icon: <FaCompass /> },
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
          <li className="sidebar__list-item sidebar__logout">
            <button
              className="sidebar__link"
              onClick={() => console.log("Logout clicked")}
            >
              <span className="sidebar__icon">
                <FaSignOutAlt />
              </span>
              <span className="sidebar__label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
