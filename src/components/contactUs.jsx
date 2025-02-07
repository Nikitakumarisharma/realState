"use client";
import React from "react";

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Contact Us Card */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Contact Us</h2>

        <div className="flex flex-col md:flex-row">
          {/* Left Side - Contact Emails */}
          <div className="w-full md:w-1/2 text-center md:border-r border-gray-300 p-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Reach Out to Us</h3>
            <p className="text-gray-600">For inquiries, contact us via email:</p>
            <div className="mt-4 space-y-2 text-lg">
              <p>📧 <a href="mailto:email1@example.com" className="text-blue-500 hover:underline">email1@example.com</a></p>
              <p>📧 <a href="mailto:email2@example.com" className="text-blue-500 hover:underline">email2@example.com</a></p>
              <p>📧 <a href="mailto:email3@example.com" className="text-blue-500 hover:underline">email3@example.com</a></p>
            </div>
          </div>

          {/* Right Side - Google Map */}
          <div className="w-full md:w-1/2 mt-6 md:mt-0 p-4">
            <h3 className="text-xl font-semibold text-gray-700 text-center mb-3">Our Location</h3>
            <div className="h-64 w-full rounded-lg overflow-hidden shadow-md">
              {/* 🔹 Replace the src with your Google Maps Embed Code */}
              <iframe
                title="Google Map"
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1923500659715!2d-122.41941568468235!3d37.77492927975919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c3e3e9491%3A0xf9d71b0ff1e0c1b6!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1647482325689!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
