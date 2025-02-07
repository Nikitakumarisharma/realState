"use client"
import React from "react";

const ProjectsAndSuccess = () => {
  return (
    <section className="max-w-4xl mx-auto text-center bg-white p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-indigo-600">Our Projects & Success Stories</h2>
      <p className="mt-4 text-gray-700">
        🚀 Over the past <strong>[X] years</strong>, we have successfully sold [Y] plots 
        in [City/State], helping numerous investors and families secure their dream land.
      </p>

      {/* Testimonials */}
      <div className="mt-6 bg-gray-200 p-4 rounded-lg text-gray-700">
        <p className="italic">
          "Buying a plot from <strong>Your Company Name</strong> was the best investment I made. 
          Their process was transparent, hassle-free, and legally verified."
        </p>
        <p className="font-bold mt-2">— Jane Doe, Happy Customer</p>
      </div>

      {/* Ongoing Projects */}
      <div className="mt-6 text-left">
        <h3 className="text-xl font-bold text-gray-800">📍 Ongoing Projects:</h3>
        <ul className="mt-2 list-disc list-inside text-gray-700">
          <li><strong>Project 1:</strong> 200 SYD plots available in [Location]</li>
          <li><strong>Project 2:</strong> Affordable 100 SYD plots near [Landmark]</li>
        </ul>
      </div>
    </section>
  );
};

export default ProjectsAndSuccess;
