// src/pages/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import coursesData from "../data/CourseData";
import SkyintenLogo from "../assets/icons/skyinten-white-vector.svg";
import "../styles/pages/CourseDetails.css";
import BackButton from "../components/BackButton";

const CourseDetails = () => {
  const { id } = useParams();
  const course = coursesData.find((c) => c.id === parseInt(id));

  const [activeModule, setActiveModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  // ✅ Load progress from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem(`course-${id}-progress`)
    );
    if (savedProgress) {
      setCompletedModules(savedProgress);
    }
  }, [id]);

  // ✅ Save progress whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `course-${id}-progress`,
      JSON.stringify(completedModules)
    );
  }, [completedModules, id]);

  if (!course) {
    return (
      <h2 className="text-center text-red-500 mt-10">Course not found</h2>
    );
  }

  // ✅ Safely handle modules + progress
  const modules = course.modules || [];
  const progress = modules.length
    ? (completedModules.length / modules.length) * 100
    : 0;

  const handleModuleClick = (mod) => {
    setActiveModule(mod);
  };

  const handleCompleteModule = (modId) => {
    if (!completedModules.includes(modId)) {
      setCompletedModules([...completedModules, modId]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-6 right-6">
        <BackButton />
      </div>

      {/* Header */}
      <header className="navHome">
        <div className="navHome__inner">
          <Link to="/" className="navHome__brand">
            <img
              src={SkyintenLogo}
              alt="Skyinten Logo"
              className="navHome__brandIcon"
            />
            <span className="navHome__brandText">Skyinten</span>
          </Link>
        </div>
      </header>

      {/* Layout */}
      <div className="courseDetailsPage">
        {/* Sidebar: Modules */}
        <aside className="courseSidebar">
          <h3>Modules</h3>
          <ul>
            {modules.length > 0 ? (
              modules.map((mod) => (
                <li
                  key={mod.id}
                  className={`cursor-pointer hover:text-blue-600 ${
                    completedModules.includes(mod.id) ? "line-through" : ""
                  }`}
                  onClick={() => handleModuleClick(mod)}
                >
                  {mod.title}
                </li>
              ))
            ) : (
              <li>No modules available</li>
            )}
          </ul>
        </aside>

        {/* Main: Video or Module */}
        <main className="courseMain">
          {!activeModule ? (
            <>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="courseVideo">
                <iframe
                  src={course.videoUrl}
                  title={course.title}
                  allowFullScreen
                ></iframe>
              </div>
            </>
          ) : (
            <>
              <h2>{activeModule.title}</h2>
              <p>{activeModule.content}</p>
              {!completedModules.includes(activeModule.id) && (
                <button
                  onClick={() => handleCompleteModule(activeModule.id)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                >
                  Mark Complete
                </button>
              )}
            </>
          )}
        </main>

        {/* Progress */}
        <aside className="courseProgress">
          <h3>Progress</h3>
          <div className="progressBar">
            <div
              className="progressBarFill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}% completed</p>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
