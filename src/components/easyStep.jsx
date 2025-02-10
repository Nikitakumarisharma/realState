"use client"
import React from "react";

const steps = [
  
    {
      "icon": "🎯",
      "title": "Choose Your Plot",
      "description": "Explore available plots in prime locations and select the one that best suits your needs and investment goals."
    },
    {
      "icon": "💳",
      "title": "Pay the Booking Charge",
      "description": "Secure your desired plot by paying a minimal booking charge and initiate the ownership process."
    },
    {
      "icon": "💸",
      "title": "Complete Payment & Own It",
      "description": "Finalize the payment process, complete the necessary documentation, and become the proud owner of your chosen plot."
    }
  
];

function EasySteps() {
  return (
    <div className="p-12 text-center font-poppins bg-gray-200">
      <h2 className=" text-3xl font-bold text-black lg:mb-8 mb-2"><span className="text-purple-700 text-4xl">3</span> Easy Steps</h2>
      <div className="flex flex-col md:flex-row justify-center items-center lg:gap-12 gap-2">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-black">
            <h3 className="text-2xl font-semibold mt-4">{step.icon}</h3>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-sm mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EasySteps;
