import React, { useState, useEffect, useRef } from "react";
import "../styles/pages/Dashboard.css";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import DashHome from "../components/dashboard/DashHome";
import CourseGrid from "../components/dashboard/CourseGrid";
import Profile from "../components/dashboard/Profile";
import Accomplishments from "../components/dashboard/Accomplishments";
import avatar from '../assets/images/naruto.png'

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState("home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  const purchasedCourses = [
    {
      id: 1,
      title: "React Mastery",
      thumbnail: "/images/courses/react.jpg",
      progress: 45,
    },
    {
      id: 2,
      title: "Advanced CSS",
      thumbnail: "/images/courses/css.jpg",
      progress: 100,
    },
    {
      id: 3,
      title: "Node.js API Design",
      thumbnail: "/images/courses/node.jpg",
      progress: 10,
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      thumbnail: "/images/courses/dsa.jpg",
      progress: 75,
    },
    {
      id: 5,
      title: "Python for Data Science",
      thumbnail: "/images/courses/python.jpg",
      progress: 30,
    },
    {
      id: 6,
      title: "Cybersecurity Fundamentals",
      thumbnail: "/images/courses/cyber.jpg",
      progress: 0,
    },
  ];

  const hackathon = {
    title: "AI Builders Hackathon",
    date: "Sep 14, 2025",
    time: "10:00 AM IST",
    theme: "Building Assistive Learning Tools",
    teamSize: "1–4",
    prize: "₹50,000",
    banner: "/images/hackathons/ai-builders-banner.jpg",
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, showSidebar]);

  const handleMenuToggle = () => setShowSidebar((prev) => !prev);

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return (
          <DashHome
            userName=" "
            onNavigate={setCurrentSection}
            purchasedCourses={purchasedCourses}
            hackathon={hackathon}
          />
        );
      case "courses":
        return (
          <CourseGrid
            purchasedCourses={purchasedCourses}
            onNavigate={setCurrentSection}
          />
        );
      case "profile":
        return <Profile />;
      case "achievements":
        return <Accomplishments />;
      default:
        return (
          <DashHome
            userName=""
            onNavigate={setCurrentSection}
            purchasedCourses={purchasedCourses}
            hackathon={hackathon}
          />
        );
    }
  };

  return (
    <div className="dashboard">
      {isMobile && showSidebar && (
        <div className="overlay" onClick={() => setShowSidebar(false)} />
      )}
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
