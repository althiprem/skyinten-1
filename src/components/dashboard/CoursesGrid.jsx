import React from "react";
import "../../styles/components/dashcoursecard.css";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="course-card__thumbnail"
      />
      <div className="course-card__content">
        <h3 className="course-card__title">{course.title}</h3>
        <div className="course-card__progress">
          <div className="progress-bar">
            <div
              className="progress-bar__fill"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{course.progress}% Complete</span>
        </div>
      </div>
    </div>
  );
};

const CourseGrid = ({ purchasedCourses, onNavigate }) => {
  const isLimited = purchasedCourses.length <= 3;
  return (
    <div className="course-grid-container">
      <header className="course-grid-header">
        <h2 className="course-grid-title">My Courses</h2>
        {!isLimited && (
          <button
            className="view-all-btn"
            onClick={() => onNavigate("explore")}
          >
            View all
          </button>
        )}
      </header>
      <div className="course-grid">
        {purchasedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
