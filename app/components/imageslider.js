// components/imageslider.js
"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Image data array for the slider
const images = [
  { src: "/home1.jpg" },
  { src: "/home2.jpg" },
  { src: "/home3.jpg" },
  { src: "/home4.jpg" },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to navigate to the previous slide
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Function to navigate to the next slide, memoized for stability in useEffect dependencies
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]); // Dependency: images.length (constant)

  // useEffect hook to handle auto-slide functionality
  useEffect(() => {
    let intervalId; // Declare variable to hold interval ID

    // If not hovered, start the auto-slide interval
    if (!isHovered) {
      intervalId = setInterval(() => nextSlide(), 3000); // Auto-slide every 3 seconds
    }

    // Cleanup function: This runs when the component unmounts or before the effect re-runs.
    return () => {
      if (intervalId) { // Clear the interval only if it was set
        clearInterval(intervalId);
      }
    };
  }, [isHovered, nextSlide]); // Dependencies: re-run effect if isHovered or nextSlide changes

  return (
    // Main container for the image slider.
    // It's fixed to the viewport top-left, takes full width.
    // Height:
    //   - h-[55vh]: Default for very small screens (55% of viewport height).
    //   - md:h-[60vh]: For medium screens (e.g., larger phones, tablets).
    //   - lg:h-auto lg:aspect-[21/9]: For large screens (desktops), revert to aspect ratio for a wider look.
    // Its z-index (10) is lower than the Navbar's (50) to allow the Navbar to overlay it.
    // <div className="fixed top-0 left-0 w-full h-[55vh] md:h-[60vh] lg:h-auto lg:aspect-[21/9] z-10 overflow-hidden">
    <div className="relative w-full h-[55vh] md:h-[60vh] lg:h-auto lg:aspect-[21/9] overflow-hidden">

      {/* Inner container for the actual image and controls */}
      <div
        className="relative w-full h-full group" // Fills the fixed parent (main slider container)
        onMouseOver={() => setIsHovered(true)} // Pause auto-slide on hover
        onMouseLeave={() => setIsHovered(false)} // Resume auto-slide on mouse leave
      >
        {/* Next.js Image component for efficient image loading and optimization */}
        <Image
          src={images[currentIndex].src} // Current image based on currentIndex
          alt={`Slider Image ${currentIndex + 1}`}
          fill // Makes the image fill the parent container
          className="object-cover transition-all duration-500 ease-in-out cursor-pointer" // Covers the area, maintains aspect ratio, smooth transition
          priority // Prioritize loading for the first image
        />

        {/* Hero Section Text/CTA Overlay */}
        {/* Positioned absolutely over the image, with a higher z-index (20) to be visible */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center z-20">
          {/* Subtle semi-transparent black overlay for better text readability on varying images */}
          <div className="absolute inset-0 bg-black opacity-30"></div> 
          
          {/* Content wrapper for headline, paragraph, and button, ensuring they are above the subtle overlay */}
          <div className="relative z-30 px-4"> {/* Added horizontal padding to ensure text doesn't touch edges */}
            {/* Adjusted base text size for even smaller screens, scaling up for larger ones */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-md">
              Elevate Your Home with <br /> KK Furniture
            </h1>
            {/* Adjusted base text size and margin for even smaller screens, scaling up */}
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-2xl mx-auto drop-shadow-sm">
              Discover timeless designs and unparalleled comfort for every room.
            </p>
            {/* Adjusted padding and text size for even smaller screens, scaling up */}
            <button className="mt-5 px-5 py-2 text-sm sm:px-6 sm:py-3 sm:text-base bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-amber-500 focus:ring-opacity-50">
              Shop Our Collections
            </button>
          </div>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#111927] hover:bg-[#1a222f] text-white p-2 rounded-full z-30 opacity-75 hover:opacity-100 transition-opacity" // Z-index (30) ensures it's above text overlay
        >
          <ChevronLeft className="text-gray-400 group-hover:text-white" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#111927] hover:bg-[#1a222f] text-white p-2 rounded-full z-30 opacity-75 hover:opacity-100 transition-opacity" // Z-index (30) ensures it's above text overlay
        >
          <ChevronRight className="text-gray-400 group-hover:text-white" />
        </button>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center z-30"> {/* Z-index (30) ensures it's above text overlay */}
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-10 mx-1 rounded-xl cursor-pointer ${
              index === currentIndex ? "bg-[#f69b3f]" : "bg-gray-300"
            } transition-all duration-500 ease-in-out`}
            onClick={() => setCurrentIndex(index)} // Allows clicking indicators to change slide
          ></div>
        ))}
      </div>
    </div>
  );
}
