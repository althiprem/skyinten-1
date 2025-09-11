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
    
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="navHome">
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
        <div className="absolute top-6" style={{ right: '2in' }}>
        <BackButton />
      </div>
      </header>
          {/* </div> */}

      <h2 className="text-2xl font-bold mb-6 text-center">Our Courses</h2>
      <CourseGrid courses={coursesData} />
    </div>
  );
};

export default Courses;
