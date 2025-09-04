// src/pages/Courses.jsx
import React from "react";
import CourseGrid from "../components/dashboard/CourseGrid.jsx";
import coursesData from "../data/CourseData.js";
import "../styles/pages/Courses.css";
import BackButton from "../components/BackButton.jsx"
import { NavLink } from "react-router-dom";
import SkyintenLogo from "../assets/icons/skyinten-white-vector.svg";


const Courses = () => {
  return (
    
    <header className="navHome">
    {/* <div className="course-card bg-white shadow-md rounded-lg p-4 border border-gray-200"> */}
       <div className="absolute top-6" style={{ right: '2in' }}>
        <BackButton />
      </div>
          {/* </div> */}
       <div className="navHome__inner">
          <NavLink to="/" className="navHome__brand">
            <img
              src={SkyintenLogo}
              alt="Skyinten Logo"
              className="navHome__brandIcon"
            />
            <span className="navHome__brandText">Skyinten</span>
          </NavLink>
        </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Our Courses</h2>
      <CourseGrid courses={coursesData} />
    </header>
  );
};

export default Courses;
