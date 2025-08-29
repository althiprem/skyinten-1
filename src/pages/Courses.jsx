// src/pages/Courses.jsx
import React from "react";
import CourseGrid from "../components/dashboard/CourseGrid.jsx";
import coursesData from "../data/CourseData.js";
import "../styles/pages/Courses.css";

const Courses = () => {
  return (
    <div className="course-card bg-white shadow-md rounded-lg p-4 border border-gray-200">

      <h2 className="text-2xl font-bold mb-6 text-center">Our Courses</h2>
      <CourseGrid courses={coursesData} />
    </div>
  );
};

export default Courses;
