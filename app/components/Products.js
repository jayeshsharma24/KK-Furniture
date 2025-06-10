"use client";

import React, { useState, useRef } from 'react'; // Import useRef for direct DOM access
import { StarIcon, HeartIcon, EyeIcon } from '@heroicons/react/24/solid';

const Products = () => {
  // Dummy product data for demonstration
  const products = [
    {
      id: 1,
      name: "Wooden Sofa Chair",
      image: "work3.jpg",
      oldPrice: 160.00,
      currentPrice: 80.00,
      discount: "50% off",
      rating: 4.9,
      timer: { days: 5, hours: 12, mins: 30, secs: 25 } // Static timer for demo
    },
    {
      id: 2,
      name: "Circular Sofa Chair",
      image: "work4.jpg",
      oldPrice: 120.00,
      currentPrice: 108.00,
      discount: "10% off",
      rating: 5.0,
      timer: { days: 0, hours: 0, mins: 0, secs: 0 } // Static timer for demo
    },
    {
      id: 3,
      name: "Wooden Nightstand",
      image: "work5.jpg",
      oldPrice: 60.00,
      currentPrice: 54.00,
      discount: "10% off",
      rating: 4.8,
      timer: { days: 0, hours: 0, mins: 0, secs: 0 } // Static timer for demo
    },
    {
      id: 4,
      name: "Bean Bag Chair",
      image: "work9.jpg",
      oldPrice: 80.00,
      currentPrice: 72.00,
      discount: "10% off",
      rating: 4.7,
      timer: { days: 0, hours: 0, mins: 0, secs: 0 } // Static timer for demo
    },
    {
      id: 5,
      name: "Modern Dining Table",
      image: "work10.jpg",
      oldPrice: 400.00,
      currentPrice: 360.00,
      discount: "10% off",
      rating: 4.9,
      timer: { days: 0, hours: 0, mins: 0, secs: 0 } // Static timer for demo
    },
    {
      id: 6,
      name: "Contemporary Bookshelf",
      image: "work13.jpg",
      oldPrice: 200.00,
      currentPrice: 180.00,
      discount: "10% off",
      rating: 4.6,
      timer: { days: 0, hours: 0, mins: 0, secs: 0 } // Static timer for demo
    },
  ];

  // State for active product tab (currently for visual highlighting only)
  const [activeTab, setActiveTab] = useState('Latest Products');
  // State to track if the user is currently dragging/scrolling the carousel
  const [isDragging, setIsDragging] = useState(false);
  // Ref for the carousel container to directly access its DOM properties for scrolling
  const carouselRef = useRef(null);
  // Stores the initial mouse/touch X position when dragging starts
  const startX = useRef(0);
  // Stores the initial scroll position when dragging starts
  const scrollLeft = useRef(0);

  // --- Mouse Event Handlers for Dragging ---
  const handleMouseDown = (e) => {
    setIsDragging(true); // Set dragging state to true
    startX.current = e.pageX - carouselRef.current.offsetLeft; // Get initial mouse X position relative to element
    scrollLeft.current = carouselRef.current.scrollLeft; // Store initial scroll position
    // Add global event listeners to ensure dragging continues even if mouse moves off the carousel
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only process if dragging is active
    e.preventDefault(); // Prevent default browser actions like text selection during drag
    const x = e.pageX - carouselRef.current.offsetLeft; // Current mouse X position
    const walk = (x - startX.current); // Calculate distance moved
    carouselRef.current.scrollLeft = scrollLeft.current - walk; // Update scroll position
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Set dragging state to false
    // Remove global event listeners
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  // --- Touch Event Handlers for Swiping (Mobile) ---
  const handleTouchStart = (e) => {
    setIsDragging(true); // Set dragging state to true
    startX.current = e.touches[0].pageX - carouselRef.current.offsetLeft; // Get initial touch X position
    scrollLeft.current = carouselRef.current.scrollLeft; // Store initial scroll position
    // Add global event listeners for touch tracking
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return; // Only process if dragging is active
    e.preventDefault(); // Prevent default touch actions (e.g., page scrolling)
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft; // Current touch X position
    const walk = (x - startX.current); // Calculate distance moved
    carouselRef.current.scrollLeft = scrollLeft.current - walk; // Update scroll position
  };

  const handleTouchEnd = () => {
    setIsDragging(false); // Set dragging state to false
    // Remove global event listeners
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };


  return (
    // Main container for the product collection section
    <div className="bg-gray-50 py-12 sm:py-16 md:py-20 font-sans">
      <style>{`
        /* Custom scrollbar styling for a cleaner look */
        .no-scrollbar::-webkit-scrollbar {
          display: none; /* For Chrome, Safari, and Opera */
        }
        .no-scrollbar {
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
          scrollbar-width: none; /* For Firefox */
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-900 mb-8 sm:mb-10 leading-tight">
          Our Products Collections
        </h2>

        {/* Product Category Tabs */}
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-10 sm:mb-12 overflow-x-auto pb-2 no-scrollbar">
          {['All Products', 'Latest Products', 'Best Sellers', 'Featured Products'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium whitespace-nowrap transition-all duration-300
                ${activeTab === tab
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Carousel Container */}
        {/*
          - ref={carouselRef}: Attaches a ref to the div for direct DOM manipulation.
          - onMouseDown, onTouchStart: Initiates the drag/swipe functionality.
          - cursor-grab, active:cursor-grabbing: Visual feedback for draggable element.
        */}
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll no-scrollbar py-4 space-x-6 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          // Note: Mousemove, mouseup, touchmove, and touchend listeners are attached to the window
          // in their respective start handlers to ensure smooth dragging even if the pointer
          // leaves the carousel element during a drag.
        >
          {products.map((product) => (
            // Individual Product Card
            //
            // flex-none: Prevents the card from shrinking, essential for horizontal scrolling.
            // Responsive widths ensure 3.5 items (4th item partially visible) on larger screens.
            <div
              key={product.id}
              className={`flex-none w-[280px] sm:w-[300px] md:w-[320px] lg:w-[calc((100%-48px)/3.5)] xl:w-[calc((100%-60px)/4.5)]
                         bg-white rounded-lg shadow-xl overflow-hidden transform transition-all duration-300
                         ${!isDragging ? 'hover:scale-[1.01] hover:shadow-2xl' : ''} group`}
            >
              {/* Product Image with discount and action icons */}
              <div className="relative w-full h-48 sm:h-56 bg-gray-200 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/CCCCCC/666666?text=No+Image"; }}
                />
                {/* Discount Tag */}
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-md">
                    {product.discount}
                  </span>
                )}
                {/* Action Icons (Wishlist, Quick View) */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    aria-label="Add to wishlist"
                  >
                    <HeartIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                    aria-label="Quick view"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
                {/* Timer (visible only if days > 0) */}
                {product.timer.days > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-yellow-400 text-yellow-900 font-bold text-center py-1 flex justify-around text-xs sm:text-sm">
                    <span>{product.timer.days} Days</span>
                    <span>{product.timer.hours} Hrs</span>
                    <span>{product.timer.mins} Mins</span>
                    <span>{product.timer.secs} Secs</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
                {/* Rating */}
                <div className="flex items-center mt-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-2">{product.rating.toFixed(1)}</span>
                </div>
                {/* Prices */}
                <div className="flex items-baseline space-x-2">
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">${product.currentPrice.toFixed(2)}</p>
                  {product.oldPrice && (
                    <p className="text-sm sm:text-base text-gray-500 line-through">${product.oldPrice.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
