// src/pages/Courses.jsx
import React from "react";
import "../styles/pages/Courses.css"; // ✅ optional CSS

const courses = [
  {
    id: 1,
    title: "React Basics",
    description: "Learn the fundamentals of React including components, props, and hooks.",
    image: "https://via.placeholder.com/600x300?text=React+Basics",
  },
  {
    id: 2,
    title: "JavaScript Mastery",
    description: "Deep dive into ES6+, async programming, and advanced concepts.",
    image: "https://via.placeholder.com/600x300?text=JavaScript+Mastery",
  },
  {
    id: 3,
    title: "Tailwind CSS",
    description: "Design beautiful UIs quickly with utility-first Tailwind classes.",
    image: "https://via.placeholder.com/600x300?text=Tailwind+CSS",
  },
  {
    id: 4,
    title: "Node.js & Express",
    description: "Backend development with Node.js and Express for REST APIs.",
    image: "https://via.placeholder.com/600x300?text=Node+Express",
  },
];

const Courses = () => {
  return (
    <div className="courses-container">
      <h1 className="courses-title">📚 Our Courses</h1>
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.image} alt={course.title} className="course-img" />
            <div className="course-content">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
