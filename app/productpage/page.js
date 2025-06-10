"use client";

import React, { useState } from 'react';
import { PlusIcon, MinusIcon, ShoppingCartIcon } from '@heroicons/react/24/solid'; // Importing icons for quantity and add to cart buttons

const Productpage = () => {
  // Define the product data, including name, description, price, and an array of image URLs.
  // Using placehold.co for image URLs to ensure the component is runnable and visually complete.
  const product = {
    name: "Elegant Wooden Chair",
    description: "Crafted from sustainable oak, this elegant chair combines modern design with ultimate comfort. Its minimalist aesthetic makes it a perfect fit for any contemporary living space or dining area. Features a gracefully curved ergonomic backrest and a plush, durable fabric cushion in a neutral tone, ensuring both style and lasting comfort. Assembly required.",
    price: 249.99,
    images: [
      "https://placehold.co/800x600/F0F0F0/333333?text=Chair+View+1",
      "https://placehold.co/800x600/D0D0D0/333333?text=Chair+Side+View",
      "https://placehold.co/800x600/C0C0C0/333333?text=Chair+Details",
      "https://placehold.co/800x600/B0B0B0/333333?text=Chair+Lifestyle",
      "https://placehold.co/800x600/A0A0A0/333333?text=Chair+Back",
    ]
  };

  // State to keep track of the currently displayed main image.
  const [mainImage, setMainImage] = useState(product.images[0]);
  // State to manage the quantity of the product to be added to the cart.
  const [quantity, setQuantity] = useState(1);

  // Function to handle clicking on a thumbnail image, updating the main image.
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  // Function to increment the product quantity.
  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Function to decrement the product quantity, ensuring it doesn't go below 1.
  const decrementQuantity = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1));
  };

  // Function to simulate adding the product to the cart.
  // In a real application, this would typically involve API calls or state management.
  const handleAddToCart = () => {
    // A simple alert is used here for demonstration purposes.
    // In a production environment, consider using a non-blocking toast notification or modal.
    console.log(`Added ${quantity} of ${product.name} to cart.`);
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  return (
    // Main container for the entire product page, with a light gray background and responsive padding.
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header section for the page. */}
      <header className="w-full max-w-6xl mx-auto py-4 mb-8 bg-white shadow-md rounded-lg flex items-center justify-center">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">Product Details</h1>
      </header>

      {/* Main content area for the product, organized in a responsive flex layout. */}
      <main className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex md:items-start p-6 sm:p-8">
        {/* Left column: Image gallery */}
        <div className="md:w-1/2 flex flex-col items-center md:items-start mb-6 md:mb-0 md:pr-6 lg:pr-10">
          {/* Large main product image display. */}
          <div className="w-full mb-4 rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
              // Adding onerror to fallback to a default placeholder if the image fails to load
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/CCCCCC/666666?text=Image+Unavailable"; }}
            />
          </div>

          {/* Container for thumbnail images, with responsive spacing and scrollability. */}
          <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 justify-center md:justify-start w-full">
            {product.images.map((image, index) => (
              // Each thumbnail image, with a click handler to change the main image.
              <div
                key={index}
                className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-200 ease-in-out
                  ${mainImage === image ? 'border-indigo-500 shadow-md transform scale-105' : 'border-gray-200 hover:border-gray-400'}`}
                onClick={() => handleThumbnailClick(image)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover rounded-md"
                  // Fallback for thumbnail images
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/EEEEEE/999999?text=Thumb"; }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Product details, quantity controls, and add to cart button. */}
        <div className="md:w-1/2 md:pl-6 lg:pl-10">
          {/* Product Name */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">{product.name}</h2>
          {/* Product Price */}
          <p className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4 sm:mb-6">${product.price.toFixed(2)}</p>
          {/* Product Description */}
          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">{product.description}</p>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-3 mb-6 sm:mb-8">
            <span className="text-gray-700 font-medium text-base sm:text-lg">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
              {/* Decrement quantity button */}
              <button
                onClick={decrementQuantity}
                className="p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                aria-label="Decrease quantity"
              >
                <MinusIcon className="h-5 w-5 text-gray-700" />
              </button>
              {/* Quantity display */}
              <span className="px-4 py-2 sm:px-5 sm:py-3 text-lg sm:text-xl font-semibold text-gray-900 w-16 text-center select-none">
                {quantity}
              </span>
              {/* Increment quantity button */}
              <button
                onClick={incrementQuantity}
                className="p-2 sm:p-3 bg-gray-200 hover:bg-gray-300 transition-colors duration-200 rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                aria-label="Increase quantity"
              >
                <PlusIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center px-6 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 transform hover:scale-[1.005] active:scale-95"
          >
            <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
            Add to Cart
          </button>
        </div>
      </main>
    </div>
  );
};

export default Productpage;
