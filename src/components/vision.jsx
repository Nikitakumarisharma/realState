"use client";
import React from "react";
import { FaEye, FaBullseye } from "react-icons/fa";

const VisionMission = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-green-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-16">
        <h2 className="text-4xl font-extrabold text-green-700 text-center mb-10">
          Our Vision & Mission
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Vision Section */}
          <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-green-600">
            <div className="flex items-center mb-4">
              <FaEye className="text-green-600 text-3xl mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our vision is to revolutionize the real estate market by making 
              land ownership a seamless and transparent process. We strive 
              to create an ecosystem where investors, homeowners, and businesses 
              can secure premium plots in rapidly developing areas with 
              confidence. By leveraging innovation, sustainability, and strategic 
              partnerships, we envision a future where every individual can invest 
              in land hassle-free, ensuring long-term prosperity and wealth generation.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white shadow-lg rounded-xl p-8 border-l-4 border-green-600">
            <div className="flex items-center mb-4">
              <FaBullseye className="text-green-600 text-3xl mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to provide secure, legally verified plots that 
              guarantee high returns and contribute to urban growth. We are 
              committed to delivering transparent and hassle-free real 
              estate solutions that empower individuals to invest in prime 
              locations with confidence. With integrity, innovation, and a 
              customer-first approach, we aim to build long-term relationships 
              and drive positive economic impact in the real estate sector.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
