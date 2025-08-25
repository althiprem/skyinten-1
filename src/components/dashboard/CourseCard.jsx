import React from "react";
import { FaPlayCircle, FaCheckCircle, FaLock } from "react-icons/fa";
import "../../styles/components/dashcoursecard.css";

const CourseCard = ({ course, onResume }) => {
  const isCompleted = course.progress === 100;

  return (
    <div className="course-card">
      <div className="course-card__image-container">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="course-card__image"
        />
        <div className="course-card__overlay">
          <button
            className="course-card__play-btn"
            onClick={() => onResume(course.id)}
          >
            <FaPlayCircle />
          </button>
        </div>
      </div>
      <div className="course-card__content">
        <h4 className="course-card__title">{course.title}</h4>
        <div className="course-card__progress">
          <div
            className="course-card__progress-bar"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <div className="course-card__meta">
          <span className="course-card__progress-text">
            {isCompleted ? (
              <>
                <FaCheckCircle className="icon-completed" />
                Completed
              </>
            ) : (
              `${course.progress}% Complete`
            )}
          </span>
          <button
            className="course-card__action-btn"
            onClick={() => onResume(course.id)}
          >
            {isCompleted
              ? "Review"
              : course.progress > 0
              ? "Continue"
              : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
