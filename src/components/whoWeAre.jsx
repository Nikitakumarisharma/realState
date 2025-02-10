"use client";
import React from "react";

const WhoWeAre = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-8xl mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="relative flex justify-center">
            <img 
              src="/assets/aboutPlot.jpeg" 
              alt="Who We Are" 
              className="rounded-xl shadow-lg h-[400px] object-cover border-4 border-orange-500"
            />
            <div className="absolute top-4 bg-orange-600 text-white px-4 py-1 rounded-full text-sm">
              Trusted Real Estate
            </div>
          </div>

          {/* Right: Content */}
          <div className="text-left">
            <h2 className="text-4xl font-extrabold text-orange-600 mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              <span className="font-semibold text-black">Express Way Real Estate</span> is a trusted name in the real estate industry, specializing in selling premium plots in prime locations. Whether you're looking for residential, commercial, or investment opportunities, we offer well-planned plots with clear titles and modern infrastructure.
            </p>
            <p className="mt-4 text-gray-700 text-lg">
              Our team ensures <span className="font-semibold text-black">hassle-free transactions</span>, transparency, and competitive pricing. With a commitment to customer satisfaction, we help you find the perfect plot that meets your needs and budget.
            </p>
            <div className="mt-6">
              <a 
                href="/contact" 
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
