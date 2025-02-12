"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/assets/carausal1.jpg",
  "/assets/carausal2.jpg",
  "/assets/carausal3.jpg",
];

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, []);

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000); // Auto-advance every 5 sec
    return () => clearInterval(timer);
  }, [nextImage]);

  return (
    <div className="relative h-[500px] w-full overflow-hidden z-10 mt-20">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 text-white z-20">
        <h2 className="lg:text-3xl text-xl font-bold mb-4 text-white">Land is not just a piece of soil, it's a dream. Invest today, shape tomorrow's future!</h2>

      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevImage}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition z-20"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition z-20"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
}
