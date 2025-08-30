// src/pages/Dashboard.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/pages/Dashboard.css";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DashHome from "../components/dashboard/DashHome";
import Profile from "../components/dashboard/Profile";
import Accomplishments from "../components/dashboard/Accomplishments";
import MyCourses from "../components/dashboard/MyCourse"
import avatar from "../assets/images/naruto.png";
import BackButton from "../components/BackButton";

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const hackathon = {
    title: "AI Builders Hackathon",
    date: "Sep 14, 2025",
    time: "10:00 AM IST",
    theme: "Building Assistive Learning Tools",
    teamSize: "1–4",
    prize: "₹50,000",
    banner: "/images/hackathons/ai-builders-banner.jpg",
  };

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setShowSidebar(!mobile);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setShowSidebar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, showSidebar]);

  const handleMenuToggle = () => setShowSidebar((prev) => !prev);

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <DashHome userName="" onNavigate={setCurrentSection} hackathon={hackathon} />;
      case "courses":
        return <MyCourses />; // ✅ show unlocked courses from coursesData.js
      case "profile":
        return <Profile />;
      case "achievements":
        return <Accomplishments />;
      default:
        return <DashHome userName="" onNavigate={setCurrentSection} hackathon={hackathon} />;
    }
  };

  return (
    
    <div className="dashboard">
     
      {isMobile && showSidebar && <div className="overlay" onClick={() => setShowSidebar(false)} />}
      <Sidebar
        sidebarRef={sidebarRef}
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isMobile={isMobile}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div className="dashboard__content">
        <Topbar
          userName=""
          onMenuToggle={handleMenuToggle}
          isMobile={isMobile}
          currentSection={currentSection}
          onNavigate={setCurrentSection}
          showSidebar={showSidebar}
        />
        <main className="dashboard__main">{renderSection()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
