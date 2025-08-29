import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/pages/courses.css"

const CourseGrid = ({ courses = [] }) => {
  const [unlockedCourses, setUnlockedCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("unlockedCourses")) || [];
    setUnlockedCourses(saved);
  }, []);

  const handleCourseClick = (course) => {
    if (unlockedCourses.includes(course.id)) {
      navigate(`/course/${course.id}`);
    } else if (course.isFree) {
      const updated = [...unlockedCourses, course.id];
      localStorage.setItem("unlockedCourses", JSON.stringify(updated));
      setUnlockedCourses(updated);
      navigate(`/course/${course.id}`);
    } else {
      navigate(`/payment/${course.id}`);
    }
  };

  if (!courses.length) {
    return <p className="text-center text-gray-500">No courses available.</p>;
  }

  return (
    <div className="courses-container"> {/* Wrap container */}
      <h2 className="courses-title">Our Courses</h2>
      <div className="courses-grid"> {/* Grid class */}
        {courses.map((course) => (
          <div key={course.id} className="course-card"> {/* Card class */}
            {course.image && (
              <img
                src={course.image}
                alt={course.title}
                className="course-image"
              />
            )}
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-desc">{course.description}</p>
              <button
                onClick={() => handleCourseClick(course)}
                className="course-btn"
              >
                {unlockedCourses.includes(course.id) || course.isFree
                  ? "Go to Course"
                  : "Unlock / Pay"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
