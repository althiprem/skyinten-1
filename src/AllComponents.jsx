/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\AuthModal.jsx --- */
// Import paired styles
import '../styles/components/AuthModal.css';
import { useEffect, useState } from "react";
import {
  signInWithGoogle,
  signInWithGithub,
  signUpWithEmail,
  signInWithEmail,
} from "../config/firebase";
import { FaGithub, FaGoogle, FaTimes } from "react-icons/fa";
import "../styles/components/AuthModal.css";

const ANIM_MS = 800; // open/close duration
const SWITCH_MS = 500; // login <-> signup transition duration

export default function AuthModal({ isOpen, type, onClose, onSuccess }) {
  const [localType, setLocalType] = useState(type);
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [switching, setSwitching] = useState(false); // controls login/signup transition
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Open/close logic
  useEffect(() => {
    if (isOpen) {
      setLocalType(type);
      setShow(true);
      setClosing(false);
    } else if (show) {
      setClosing(true);
      const t = setTimeout(() => {
        setShow(false);
        setClosing(false);
        setError("");
      }, ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [isOpen, type, show]);

  if (!show && !closing) return null;

  const handleClose = () => {
    setClosing(true);
    const t = setTimeout(() => {
      setShow(false);
      setClosing(false);
      setError("");
      onClose?.();
    }, ANIM_MS);
    return () => clearTimeout(t);
  };

  // Switch between login/signup smoothly
  const handleSwitchType = (newType) => {
    setSwitching(true);
    setTimeout(() => {
      setLocalType(newType);
      setSwitching(false);
    }, SWITCH_MS / 2); // halfway through fade-out, change type
  };

  // Email Auth
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    try {
      let cred;
      if (localType === "signup") {
        cred = await signUpWithEmail(email, password, name);
      } else {
        cred = await signInWithEmail(email, password);
      }
      onSuccess?.(cred.user);
      handleClose();
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle();
      onSuccess?.(result.user);
      handleClose();
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGithub();
      onSuccess?.(result.user);
      handleClose();
    } catch (err) {
      setError(err.message || "GitHub sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`authModal__overlay ${isOpen && !closing ? "show" : ""} ${
        closing ? "closing" : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`authModal__content ${isOpen && !closing ? "show" : ""} ${
          closing ? "closing" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="authModal__close" onClick={handleClose}>
          <FaTimes size={18} />
        </button>

        <div className={`authModal__inner ${switching ? "switching" : ""}`}>
          <h2 className="authModal__title">
            {localType === "signup" ? "Create Your Account" : "Welcome Back"}
          </h2>
          <p className="authModal__subtitle">
            {localType === "signup"
              ? "Join Skyinten and start your journey."
              : "Log in to continue learning."}
          </p>

          {error && <div className="authModal__error">{error}</div>}

          <form className="authModal__form" onSubmit={handleEmailAuth}>
            {localType === "signup" && (
              <div className="authModal__field">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                />
              </div>
            )}
            <div className="authModal__field">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                autoComplete="email"
                required
              />
            </div>
            <div className="authModal__field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                autoComplete={
                  localType === "signup" ? "new-password" : "current-password"
                }
                required
              />
            </div>
            <button
              className="authModal__submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : localType === "signup"
                ? "Sign Up"
                : "Log In"}
            </button>
          </form>

          <div className="authModal__divider">
            <span>OR</span>
          </div>

          <div className="authModal__social">
            <button
              className="authModal__socialBtn google"
              onClick={handleGoogleSignIn}
              disabled={loading}
              type="button"
            >
              <FaGoogle /> Continue with Google
            </button>
            <button
              className="authModal__socialBtn github"
              onClick={handleGithubSignIn}
              disabled={loading}
              type="button"
            >
              <FaGithub /> Continue with GitHub
            </button>
          </div>

          <p className="authModal__switch">
            {localType === "signup" ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="authModal__link"
                  onClick={() => handleSwitchType("login")}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <button
                  type="button"
                  className="authModal__link"
                  onClick={() => handleSwitchType("signup")}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\Accomplishments.jsx --- */
import React, { useEffect, useState } from "react";
import "../../styles/components/accomplishments.css";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [collapsedCategories, setCollapsedCategories] = useState({});

  // Fetch from backend
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("/api/achievements"); // Replace with your API endpoint
        if (!res.ok) throw new Error("Failed to fetch achievements");
        const data = await res.json();
        setAchievements(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Group by category
  const grouped = achievements.reduce((acc, item) => {
    const category = item.category || "Uncategorized";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  // Toggle collapse
  const toggleCategory = (category) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Inline card renderer
  const AchievementCard = ({ icon, title, description }) => (
    <div className="accomplishments__card">
      {icon && <div className="accomplishments__icon">{icon}</div>}
      <h3 className="accomplishments__cardTitle">{title}</h3>
      <p className="accomplishments__desc">{description}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="accomplishments accomplishments--loading">
        Loading achievements...
      </div>
    );
  }

  if (error) {
    return (
      <div className="accomplishments accomplishments--error">{error}</div>
    );
  }

  return (
    <div className="accomplishments">
      <h2 className="accomplishments__title">Achievements</h2>

      {Object.keys(grouped).map((category) => (
        <div key={category} className="accomplishments__category">
          <div
            className="accomplishments__categoryHeader"
            onClick={() => toggleCategory(category)}
          >
            <h3>{category}</h3>
            <span className="accomplishments__toggle">
              {collapsedCategories[category] ? "+" : "−"}
            </span>
          </div>

          {!collapsedCategories[category] && (
            <div className="accomplishments__grid">
              {grouped[category].map((item) => (
                <AchievementCard
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Achievements;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\CourseCard.jsx --- */
import React from "react";
import "../../styles/components/coursecard.css";

const CourseCard = ({ course, onResume }) => {
  return (
    <div className="courseCard">
      <img src={course.thumbnail} alt={course.title} className="courseCard__thumb" />
      <div className="courseCard__info">
        <h4 className="courseCard__title">{course.title}</h4>
        <div className="courseCard__progress">
          <div className="progressBar" style={{ width: `${course.progress}%` }} />
        </div>
        <div className="courseCard__meta">
          <span className="progressText">{course.progress}% complete</span>
          <button className="courseCard__resume" onClick={() => onResume(course.id)}>Resume</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\CourseGrid.jsx --- */
import React from "react";
import "../../styles/components/dashcoursesGrid.css";

const CoursesGrid = ({ purchasedCourses = [], onNavigate }) => {
  return (
    <div className="coursesGrid">
      <h2 className="coursesGrid__title">My Courses</h2>

      {purchasedCourses.length === 0 ? (
        <div className="coursesGrid__empty">
          <p>You haven’t purchased any courses yet.</p>
          <button
            className="coursesGrid__exploreBtn"
            onClick={() => onNavigate("explore")}
          >
            Explore Courses
          </button>
        </div>
      ) : (
        <>
          <div className="coursesGrid__list">
            {purchasedCourses.map((course) => (
              <div key={course.id} className="courseCard">
                <img src={course.thumbnail} alt={course.title} />
                <div className="courseCard__info">
                  <h4 className="courseCard__title">{course.title}</h4>
                  <div className="courseCard__progress">
                    <div
                      className="progressBar"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <div className="courseCard__meta">
                    <span className="progressText">
                      {course.progress}% complete
                    </span>
                    <button
                      className="courseCard__resume"
                      onClick={() => console.log(`Resume ${course.id}`)}
                    >
                      Resume
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="coursesGrid__footer">
            <button
              className="coursesGrid__exploreBtn"
              onClick={() => onNavigate("explore")}
            >
              Explore More Courses
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesGrid;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\DashHome.jsx --- */
import React, { useMemo } from "react";
import { FaArrowRight, FaClock, FaUsers, FaTrophy } from "react-icons/fa";
import CourseCard from "./CourseCard";
import "../../styles/components/dashhome.css";

const DashHome = ({ userName, onNavigate, purchasedCourses = [], hackathon }) => {
  const { enrolled, inProgress, completed } = useMemo(() => {
    const enrolledCount = purchasedCourses.length;
    const inProgressCount = purchasedCourses.filter(c => c.progress > 0 && c.progress < 100).length;
    const completedCount = purchasedCourses.filter(c => c.progress === 100).length;
    return { enrolled: enrolledCount, inProgress: inProgressCount, completed: completedCount };
  }, [purchasedCourses]);

  const hack = hackathon || {
    title: "AI Builders Hackathon",
    date: "Sep 14, 2025",
    time: "10:00 AM IST",
    theme: "Building Assistive Learning Tools",
    teamSize: "1�4",
    prize: "?50,000",
    banner: "/images/hackathons/ai-builders-banner.jpg",
  };

  return (
    <div className="home">
      <div className="home__greeting">
        <div className="home__greetingLeft">
          <h2>Welcome back, {userName}</h2>
          <p>Keep up the momentum � your learning streak is paying off.</p>
          <div className="home__streakRow">
            <div className="streakCard"><div className="streakCard__meta"><span className="streakCard__value">7 days</span><span className="streakCard__label">Current streak</span></div></div>
            <div className="streakCard"><div className="streakCard__meta"><span className="streakCard__value">5</span><span className="streakCard__label">Achievements</span></div></div>
          </div>
          <div className="home__courseSummary">
            <div className="summaryPill"><span className="summaryPill__label">Enrolled</span><span className="summaryPill__value">{enrolled}</span></div>
            <div className="summaryPill"><span className="summaryPill__label">In progress</span><span className="summaryPill__value">{inProgress}</span></div>
            <div className="summaryPill"><span className="summaryPill__label">Completed</span><span className="summaryPill__value">{completed}</span></div>
          </div>
        </div>
        <div className="home__greetingRight">
          <h3>Achievements</h3>
          <p>You�ve unlocked <strong>5 badges</strong> so far.</p>
          <button className="home__achievementsBtn" onClick={() => onNavigate("achievements")}>View all</button>
        </div>
      </div>
      <div className="home__courses">
        <div className="home__coursesHeader">
          <h3>Course progress</h3>
          <button className="home__seeAll" onClick={() => onNavigate("courses")}>See all <FaArrowRight /></button>
        </div>
        <div className="home__courseGrid">
          {purchasedCourses.map(course => (
            <CourseCard key={course.id} course={course} onResume={() => onNavigate("courses")} />
          ))}
        </div>
      </div>
      <div className="home__hackathon">
        <div className="hackathon__media">{hack.banner && <img src={hack.banner} alt={hack.title} />}</div>
        <div className="hackathon__content">
          <h3 className="hackathon__title">{hack.title}</h3>
          <div className="hackathon__facts">
            <span className="hackathon__fact"><FaClock /> {hack.date} � {hack.time}</span>
            <span className="hackathon__fact"><FaUsers /> Teams: {hack.teamSize}</span>
            <span className="hackathon__fact"><FaTrophy /> Top prize: {hack.prize}</span>
          </div>
          <p className="hackathon__desc">Ship something bold. Collaborate, prototype, and demo in 24 hours.</p>
          <div className="hackathon__actions">
            <button className="hackathon__cta" onClick={() => onNavigate("explore")}>Join now</button>
            <button className="hackathon__secondary" onClick={() => onNavigate("achievements")}>See past winners</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\Profile.jsx --- */
import React, { useState } from "react";
import "../../styles/components/dashprofile.css";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "Lingam",
    email: "lingam@example.com",
    phone: "9876543210",
    course: "Full Stack Development",
    photo: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.photo) {
      alert("Profile photo is mandatory!");
      return;
    }
    setEditMode(false);
    // Save logic here (API call or state update)
  };

  return (
    <div className="profile">
      <h2 className="profile__title">Student Profile</h2>

      {!editMode ? (
        <div className="profile__view">
          <img
            src={
              formData.photo
                ? URL.createObjectURL(formData.photo)
                : "/images/profile-placeholder.png"
            }
            alt="Profile"
            className="profile__photo"
          />
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Course:</strong> {formData.course}
          </p>
          <button
            className="profile__editBtn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="profile__form" onSubmit={handleSubmit}>
          <label>
            Profile Photo (required):
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Course:
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </label>
          <div className="profile__actions">
            <button type="submit" className="profile__saveBtn">
              Save
            </button>
            <button
              type="button"
              className="profile__cancelBtn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\Sidebar.jsx --- */
import React from "react";
import {
  FaHome,
  FaBook,
  FaUser,
  FaTrophy,
  FaCompass,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../styles/components/Sidebar.css";

const Sidebar = ({
  currentSection,
  onSectionChange,
  collapsed,
  setCollapsed,
  isMobile,
}) => {
  const navigate = useNavigate();

  const handleNav = (key) => {
    if (key === "explore") {
      navigate("/explore"); // go to a different page
      if (isMobile) setCollapsed(true);
      return;
    }
    onSectionChange(key);
    if (isMobile) setCollapsed(true);
  };

  const menuItems = [
    { key: "home", label: "Home", icon: <FaHome /> },
    { key: "courses", label: "My Courses", icon: <FaBook /> },
    { key: "profile", label: "Profile", icon: <FaUser /> },
    { key: "achievements", label: "Achievements", icon: <FaTrophy /> },
    { key: "explore", label: "Explore Courses", icon: <FaCompass /> },
    { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""} ${
        isMobile && !collapsed ? "mobile-open" : ""
      }`}
      onMouseEnter={() => !isMobile && setCollapsed(false)}
      onMouseLeave={() => !isMobile && setCollapsed(true)}
    >
      <div className="sidebar__top">
        <button className="sidebar__logo" onClick={() => handleNav("home")}>
          <img src="/src/assets/icons/skyinten-violet-vector.svg" alt="Logo" />
          {!collapsed && <span className="sidebar__logoText">SkyIntern</span>}
        </button>

        {isMobile && !collapsed && (
          <button
            className="sidebar__closeBtn"
            onClick={() => setCollapsed(true)}
          >
            <FaTimes />
          </button>
        )}
      </div>

      <nav className="sidebar__nav">
        {menuItems.map((item) => (
          <button
            key={item.key}
            className={`sidebar__link ${
              currentSection === item.key ? "active" : ""
            }`}
            onClick={() => handleNav(item.key)}
          >
            <span className="sidebar__icon">{item.icon}</span>
            {!collapsed && <span className="sidebar__label">{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\dashboard\Topbar.jsx --- */
import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaBell, FaSignOutAlt } from "react-icons/fa";
import "../../styles/components/Topbar.css";

const Topbar = ({
  userName,
  onMenuToggle,
  collapsed,
  isMobile,
  currentSection,
}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header
      className={`topbar ${
        isMobile
          ? "mobile-full"
          : collapsed
          ? "sidebar-collapsed"
          : "sidebar-expanded"
      }`}
    >
      <div className="topbar__left">
        {isMobile && (
          <button
            className="topbar__menuBtn"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
        )}
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
            className="topbar__avatarBtn"
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
              <div className="topbar__dropdownItem">Hi, {userName}</div>
              <button
                className="topbar__dropdownItem logout"
                onClick={() => console.log("Logout clicked")}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\CourseCarousel\CourseCard.jsx --- */
// Import paired styles
import '../../../styles/components/CourseCard.css';
// src/components/CourseCard.jsx
import { FaClock, FaSeedling, FaBookOpen, FaRocket } from "react-icons/fa";

export default function CourseCard({ title, duration, level, image }) {
  // Pick icon based on level
  const getLevelIcon = () => {
    switch (level.toLowerCase()) {
      case "beginner":
        return <FaSeedling className="courseCard__metaIcon" />;
      case "intermediate":
        return <FaBookOpen className="courseCard__metaIcon" />;
      case "advanced":
        return <FaRocket className="courseCard__metaIcon" />;
      default:
        return <FaBookOpen className="courseCard__metaIcon" />;
    }
  };

  return (
    <div className="courseCard">
      <div className="courseCard__imageWrap">
        <img src={image} alt={title} className="courseCard__image" />
      </div>
      <div className="courseCard__content">
        <h4 className="courseCard__title">{title}</h4>
        <div className="courseCard__meta">
          <span className="courseCard__metaItem">
            <FaClock className="courseCard__metaIcon" /> {duration}
          </span>
          <span className="courseCard__separator">|</span>
          <span className="courseCard__metaItem">
            {getLevelIcon()} {level}
          </span>
        </div>
        <button className="courseCard__cta">Start Learning</button>
      </div>
    </div>
  );
}

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\CourseCarousel\CourseCarousel.jsx --- */
// Import paired styles

import "../../../styles/components/CourseCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import CourseCard from "./CourseCard.jsx";
import { useRef, useEffect, useState } from "react";

export default function CourseCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const courses = [
    {
      title: "Python Essentials",
      duration: "6h",
      level: "Beginner",
      image: "/images/courses/python.jpg",
    },
    {
      title: "Java Programming",
      duration: "8h",
      level: "Intermediate",
      image: "/images/courses/java.jpg",
    },
    {
      title: "AI & ML Foundations",
      duration: "10h",
      level: "Advanced",
      image: "/images/courses/ai.jpg",
    },
    {
      title: "Data Analysis with Pandas",
      duration: "7h",
      level: "Intermediate",
      image: "/images/courses/data.jpg",
    },
    {
      title: "React Mastery",
      duration: "9h",
      level: "Advanced",
      image: "/images/courses/react.jpg",
    },
    {
      title: "Docker Deep Dive",
      duration: "5h",
      level: "Intermediate",
      image: "/images/courses/docker.jpg",
    },
  ];

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <section className="courseCarousel">
      <div className="courseCarousel__container">
        <h3 className="courseCarousel__title">Explore Our Top Courses</h3>

        <div className="courseCarousel__swiper">
          <div className="courseCarousel__nav">
            <button ref={prevRef} className="courseCarousel__arrow">
              ‹
            </button>
            <button ref={nextRef} className="courseCarousel__arrow">
              ›
            </button>
          </div>

          {swiperReady && (
            <Swiper
              modules={[Navigation, Autoplay]}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {courses.map((course) => (
                <SwiperSlide
                  key={course.title}
                  className="courseCarousel__slide"
                >
                  <CourseCard {...course} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\CTABanner.jsx --- */
// Import paired styles
import '../../styles/components/CTABanner.css';
import { useState } from "react";
import "../../styles/components/CTABanner.css";
import AuthModal from "../AuthModal"; // adjust path if needed

const CTABanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="ctaBanner">
      <div className="ctaBanner__container">
        <div className="ctaBanner__content">
          <h2 className="ctaBanner__headline">Start Your Surge</h2>
          <p className="ctaBanner__subtext">
            Join thousands of learners building momentum with Skyinten. Track
            progress, stay focused, and unlock your potential—starting now.
          </p>
        </div>

        {/* Keep <a> so CSS styling is unchanged */}
        <a
          href="#"
          className="ctaBanner__button"
          onClick={(e) => {
            e.preventDefault(); // stop navigation
            setIsModalOpen(true);
          }}
        >
          Create Your Account
        </a>
      </div>

      {/* Signup Modal */}
      <AuthModal
        isOpen={isModalOpen}
        type="signup"
        onClose={() => setIsModalOpen(false)}
        onSuccess={(user) => {
          console.log("Signed up:", user);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
};

export default CTABanner;

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\FeaturesSection.jsx --- */
// Import paired styles
import '../../styles/components/FeaturesSection.css';
// src/components/homepage/FeaturesSection.jsx
import "../../styles/components/FeaturesSection.css";
import {
  FaGraduationCap,
  FaLaptopCode,
  FaTrophy,
  FaBullseye,
  FaChartLine,
  FaLayerGroup,
} from "react-icons/fa";

export default function FeaturesSection() {
  const items = [
    {
      icon: <FaGraduationCap className="featHome__icon" />,
      title: "Elite Course Tracks",
      desc: "Industry-vetted, outcome-driven, and constantly updated. No filler. Just mastery.",
    },
    {
      icon: <FaLaptopCode className="featHome__icon" />,
      title: "Real-World Projects",
      desc: "Build what companies actually care about. Every module ends with something you can ship.",
    },
    {
      icon: <FaTrophy className="featHome__icon" />,
      title: "Internships & Hackathons",
      desc: "Get matched, get ranked, get hired. We turn effort into exposure.",
    },
    {
      icon: <FaBullseye className="featHome__icon" />,
      title: "Progress Engine",
      desc: "Smart streaks, weekly check-ins, and goal tracking that actually motivates.",
    },
    {
      icon: <FaChartLine className="featHome__icon" />,
      title: "Achievement Vault",
      desc: "Certifications, wins, and milestones — all in one place, ready to impress.",
    },
    {
      icon: <FaLayerGroup className="featHome__icon" />,
      title: "Unified Dashboard",
      desc: "Courses, goals, internships, and stats — one clean, customizable control panel.",
    },
  ];

  return (
    <section id="features" className="featHome">
      <div className="featHome__container">
        <h3 className="featHome__title">Why Top Learners Choose Us</h3>
        <div className="featHome__grid">
          {items.map((f) => (
            <div key={f.title} className="featHome__card">
              {f.icon}
              <h4 className="featHome__cardTitle">{f.title}</h4>
              <p className="featHome__cardDesc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\FooterHome.jsx --- */
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

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\HeroSection.jsx --- */
// Import paired styles
import '../../styles/components/HeroSection.css';
import { useState } from "react";
import "../../styles/components/HeroSection.css";
import { HiArrowNarrowRight } from "react-icons/hi";
import { GiOpenBook } from "react-icons/gi";
import AuthModal from "../AuthModal"; // adjust import path if needed

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="heroHome" aria-labelledby="heroTitle">
      <div className="heroHome__bgLayer" aria-hidden="true"></div>

      <div className="heroHome__container">
        <div className="heroHome__caption">
          <h1 id="heroTitle" className="heroHome__title">
            Learn. Build. Achieve.
          </h1>
          <p className="heroHome__subtitle">
            Track your progress, master new skills, and stay ahead in every
            challenge.
          </p>

          <div className="heroHome__actions">
            <button
              className="heroHome__btn heroHome__btn--primary"
              aria-label="Start learning now"
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
              <HiArrowNarrowRight className="heroHome__btnIcon heroHome__btnIcon--end" />
            </button>
            <button
              className="heroHome__btn heroHome__btn--ghost"
              aria-label="Browse available courses"
            >
              <GiOpenBook className="heroHome__btnIcon" />
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <AuthModal
        isOpen={isModalOpen}
        type="signup"
        onClose={() => setIsModalOpen(false)}
        onSuccess={(user) => {
          console.log("Signed up:", user);
          setIsModalOpen(false);
        }}
      />
    </section>
  );
}

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\NavbarHome.jsx --- */
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

/* --- C:\Users\Harsha\Desktop\SkyIntern\src\components\homepage\Testimonial.jsx --- */
// Import paired styles
import '../../styles/components/Testimonial.css';
import React from "react";
import "../../styles/components/testimonial.css";

const testimonials = [
  {
    name: "Meera K",
    role: "Career Switcher, Hyderabad",
    quote:
      "I was stuck in analysis paralysis. Skyinten gave me clarity, structure, and momentum.",
    avatar: "/avatars/meera.png",
  },
  {
    name: "Karthik Raj",
    role: "CS Student, Vizag",
    quote:
      "Every module felt like a power-up. I finally understood how to build, not just learn.",
    avatar: "/avatars/karthik.png",
  },
  {
    name: "Rohan Das",
    role: "Bootcamp Grad, Kakinada",
    quote:
      "I’ve tried 7 platforms. Only Skyinten made me consistent. That’s the real win.",
    avatar: "/avatars/rohan.png",
  },
];

const Testimonial = () => (
  <section className="testimonial-section">
    <h2 className="testimonial-heading">Real Voices. Real Impact.</h2>
    <div className="testimonial-grid">
      {testimonials.map((t, i) => (
        <div key={i} className="testimonial-card">
          <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
          <p className="testimonial-quote">“{t.quote}”</p>
          <div className="testimonial-meta">
            <strong>{t.name}</strong>
            <span className="testimonial-role">{t.role}</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonial;

