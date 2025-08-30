import React from "react";
import { useParams, Link } from "react-router-dom";
import coursesData from "../data/CourseData";
import SkyintenLogo from "../assets/icons/skyinten-white-vector.svg";
import "../styles/pages/CourseDetails.css";
import BackButton from "../components/BackButton";

const CourseDetails = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === parseInt(id));

  if (!course) {
    return <h2 className="text-center text-red-500 mt-10">Course not found</h2>;
  }

  return (
    <div className="min-h-screen flex flex-col">
        <div className="absolute top-6 right-6">
        <BackButton />
      </div>
      {/* 🔹 Header */}
      <header className="navHome">
        <div className="navHome__inner">
          <Link to="/" className="navHome__brand">
            <img src={SkyintenLogo} alt="Skyinten Logo" className="navHome__brandIcon" />
            <span className="navHome__brandText">Skyinten</span>
          </Link>
        </div>
        
      </header>

      {/* 🔹 Layout */}
      <div className="courseDetailsPage">
        {/* Left: Modules */}
        <aside className="courseSidebar">
          <h3>Modules</h3>
          <ul>
            <li>📘 Introduction</li>
            <li>⚡ Basics</li>
            <li>🛠️ Hands-on Practice</li>
            <li>🚀 Final Project</li>
          </ul>
        </aside>

        {/* Center: Video */}
        <main className="courseMain">
          <h2>{course.title}</h2>
          <p>{course.description}</p>

          <div className="courseVideo">
            <iframe
              src={course.videoUrl}
              title={course.title}
              allowFullScreen
            ></iframe>
          </div>
        </main>

        {/* Right: Progress */}
        <aside className="courseProgress">
          <h3>Progress</h3>
          <div className="progressBar">
            <div className="progressBarFill"></div>
          </div>
          <p>65% completed</p>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
