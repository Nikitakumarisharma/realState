"use client"
import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="max-w-4xl mx-auto text-center mb-12 bg-white  p-6 rounded-lg">
      <h2 className="text-3xl font-bold text-purple-600">Why Choose Us?</h2>
      <div className="mt-6 grid md:grid-cols-2 gap-6 text-gray-700">
        <div className="bg-gray-200 p-4 rounded-lg">
          ✅ <strong>Verified & Legal Plots</strong>
          <p>All our properties have clear documentation for secure transactions.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          ✅ <strong>Prime Locations</strong>
          <p>We offer plots in high-demand areas with easy connectivity.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          ✅ <strong>High Investment Growth</strong>
          <p>Our properties ensure long-term appreciation and value.</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          ✅ <strong>Complete Assistance</strong>
          <p>We guide you through site visits, legal formalities, and ownership transfer.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
