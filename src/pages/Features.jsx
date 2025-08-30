import React from "react";
import  BackButton  from "../components/BackButton";

const Features = () => {
  return (
    <div className="relative min-h-screen p-6 bg-gray-50 flex flex-col items-center justify-start">
      {/* Back button top-right */}
      <div className="absolute top-6 right-6">
        <BackButton />
      </div>

      {/* Centered Title */}
      <h1 className="text-4xl font-extrabold text-indigo-600 text-center mt-20">
        Features
      </h1>

      {/* Description below */}
      <p className="mt-4 text-center text-gray-700 max-w-2xl">
        Here you can list all the amazing features of your platform. This
        description is centered under the title and looks clean on all screen sizes.
      </p>
    </div>
  );
};

export default Features;
