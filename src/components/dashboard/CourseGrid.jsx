import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CourseCard from "./CourseCard";
import "../../styles/components/dashcoursesGrid.css";

const CoursesGrid = ({ purchasedCourses = [], onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = purchasedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses-panel">
      <div className="courses-panel__header">
        <h1 className="courses-panel__title">My Courses</h1>
        <div className="courses-panel__search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search my courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="courses-panel__grid">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onResume={() => onNavigate("courses")}
            />
          ))}
        </div>
      ) : (
        <div className="courses-panel__empty">
          <p>
            {purchasedCourses.length > 0
              ? "No courses found matching your search."
              : "You haven’t purchased any courses yet."}
          </p>
          <button
            className="btn btn--primary"
            onClick={() => onNavigate("explore")}
          >
            Explore Courses
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursesGrid;
