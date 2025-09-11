import React, { useMemo } from "react";
import {
  FaArrowRight,
  FaClock,
  FaUsers,
  FaTrophy,
  FaGraduationCap,
} from "react-icons/fa";
import CourseCard from "./CourseCard";
import "../../styles/components/dashhome.css";
import BackButton from "../BackButton";

const DashHome = ({
  userName,
  onNavigate,
  purchasedCourses = [],
  hackathon,
}) => {
  const { enrolled, inProgress, completed } = useMemo(() => {
    const enrolledCount = purchasedCourses.length;
    const inProgressCount = purchasedCourses.filter(
      (c) => c.progress > 0 && c.progress < 100
    ).length;
    const completedCount = purchasedCourses.filter(
      (c) => c.progress === 100
    ).length;
    return {
      enrolled: enrolledCount,
      inProgress: inProgressCount,
      completed: completedCount,
    };
  }, [purchasedCourses]);

  const recentCourses = useMemo(
    () => purchasedCourses.slice(0, 3),
    [purchasedCourses]
  );

  const hack = hackathon || {
    title: "AI Builders Hackathon",
    date: "Sep 14, 2025",
    time: "10:00 AM IST",
    theme: "Building Assistive Learning Tools",
    teamSize: "1–4",
    prize: "₹50,000",
    banner: "/images/hackathons/ai-builders-banner.jpg",
  };
  return (
    <div className="dash-home">
     

      <div className="dash-home__main">
        <div className="dash-home__greeting">
          <h1 className="dash-home__greeting-title">Hello, {userName}!</h1>
          <p className="dash-home__greeting-subtitle">
            Your learning journey continues. Let's make today count.
          </p>
        </div>

        <div className="dash-home__stats">
          <div className="stat-card">
            <FaGraduationCap className="stat-card__icon" />
            <div className="stat-card__info">
              <p className="stat-card__label">Courses Enrolled</p>
              <h2 className="stat-card__value">{enrolled}</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaTrophy className="stat-card__icon" />
            <div className="stat-card__info">
              <p className="stat-card__label">Achievements</p>
              <h2 className="stat-card__value">5</h2>
            </div>
          </div>
          <div className="stat-card">
            <FaClock className="stat-card__icon" />
            <div className="stat-card__info">
              <p className="stat-card__label">Current Streak</p>
              <h2 className="stat-card__value">7 Days</h2>
            </div>
          </div>
        </div>

        <div className="dash-home__section">
          <div className="section-header">
            <h2 className="section-header__title">Recent Courses</h2>
            <button
              className="section-header__link"
              onClick={() => onNavigate("courses")}
            >
              View all courses <FaArrowRight />
            </button>
          </div>
          <div className="courses-grid">
            {recentCourses.length > 0 ? (
              recentCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onResume={() => onNavigate("courses")}
                />
              ))
            ) : (
              <p className="empty-state">
                No courses in progress. Explore new ones!
              </p>
            )}
          </div>
        </div>

        <div className="dash-home__section">
          <div className="section-header">
            <h2 className="section-header__title">Upcoming Hackathon</h2>
            <button
              className="section-header__link"
              onClick={() => onNavigate("explore Hackathons")}
            >
              Learn more <FaArrowRight />
            </button>
          </div>
          <div className="hackathon-card">
            <div className="hackathon-card__media">
              {hack.banner && (
                <img
                  src={hack.banner}
                  alt={hack.title}
                  className="hackathon-card__image"
                />
              )}
            </div>
            <div className="hackathon-card__content">
              <h3 className="hackathon-card__title">{hack.title}</h3>
              <p className="hackathon-card__desc">
                Ship something bold. Collaborate, prototype, and demo in 24
                hours.
              </p>
              <div className="hackathon-card__meta">
                <span>
                  <FaClock /> {hack.date} • {hack.time}
                </span>
                <span>
                  <FaUsers /> Teams: {hack.teamSize}
                </span>
                <span>
                  <FaTrophy /> Top prize: {hack.prize}
                </span>
              </div>
              <div className="hackathon-card__actions">
                <button
                  className="btn btn--primary"
                  onClick={() => onNavigate("Hackathon")}
                >
                  Join now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
