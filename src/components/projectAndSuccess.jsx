"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProjectsAndSuccess = () => {
  // Array of previous sold plot images
  const soldPlots = [
    "/assets/plot.ppg",
    // "/assets/plotMap.jpg",
    "/assets/sec144.jpg",
    "/assets/aboutPlot.jpeg",
    "/assets/sec144.jpg",
  ];

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <section className="max-w-6xl mx-auto text-center bg-white p-10 rounded-xl">
      <h2 className="text-4xl font-extrabold text-indigo-600 mb-6">
        Our Projects & Success Stories
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed">
        🚀 Over the past <strong>7 years</strong>, we have successfully sold <strong>Multiple</strong> plots 
        in <strong>[Delhi/UP]</strong>, helping numerous investors and families secure their dream land.
      </p>

      {/* Image Slider for Sold Plots */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🏡 Successful Sold Plots</h3>
        <div className="max-w-3xl mx-auto">
          <Slider {...settings}>
            {soldPlots.map((image, index) => (
              <div key={index} className="px-2">
                <img src={image} alt={`Sold Plot ${index + 1}`} className="rounded-lg shadow-md w-full h-auto object-cover" />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-12 bg-gray-100 p-6 rounded-lg text-gray-700 shadow-md">
        <p className="italic text-lg">
          "Buying a plot from <strong>EcpressWay Builders</strong> was the best investment I made. 
          Their process was transparent, hassle-free, and legally verified."
        </p>
        <p className="font-bold mt-3 text-indigo-600">— Happy Customer</p>
      </div>

      {/* Ongoing Projects */}
      <div className="mt-10 text-left">
        <h3 className="text-2xl font-bold text-gray-800">📍 Ongoing Projects:</h3>
        <ul className="mt-4 list-disc list-inside text-lg text-gray-700">
          <li><strong>Project 1:</strong> 137 plots available in Noida 144</li>
       
        </ul>
      </div>
    </section>
  );
};

export default ProjectsAndSuccess;
