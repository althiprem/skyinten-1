import React, { useEffect, useState } from "react";
import coursesData from "../../data/CourseData";
import CourseGrid from "../dashboard/CourseGrid";
import "../../styles/pages/Courses.css"

const MyCourses = () => {
  const [unlockedCourses, setUnlockedCourses] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("unlockedCourses")) || [];
    setUnlockedCourses(saved);
  }, []);

  // Show only unlocked courses or free courses
  const coursesToShow = coursesData.filter(
    (course) => unlockedCourses.includes(course.id) || course.isFree
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">My Courses</h2>
      <CourseGrid courses={coursesToShow} />
    </div>
  );
};

export default MyCourses;
