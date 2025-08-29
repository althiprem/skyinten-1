import React from "react";
import { useParams } from "react-router-dom";

const CourseDetail = () => {
  const { id } = useParams();

  // Check if course is paid
  const isPaid = localStorage.getItem(`paid_${id}`) === "true";

  return (
    <div className="p-6">
      {isPaid ? (
        <h1 className="text-2xl font-bold">Course {id} Content</h1>
      ) : (
        <p className="text-red-600">
          You need to purchase this course to view its content.
        </p>
      )}
    </div>
  );
};

export default CourseDetail;
