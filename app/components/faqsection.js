"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
// import Image from 'next/image'; // Keeping the import, but using a standard <img> tag for broader compatibility

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What types of furniture do you offer?",
      answer: "We offer a wide range of handcrafted furniture for every room, including living room sets, dining tables, bedroom suites, and custom-built pieces tailored to your unique specifications. Our collection features various styles from modern minimalist to classic traditional."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and secure bank transfers. For larger orders, we also offer flexible financing options. Please contact our sales team for more details on financing."
    },
    {
      question: "Can I track my furniture delivery?",
      answer: "Yes, once your order has been dispatched from our warehouse, you will receive an email with a tracking number and a link to our delivery partner's website. You can use this to monitor the real-time status and estimated delivery time of your furniture."
    },
    {
      question: "What is your return policy?",
      answer: "We want you to be completely satisfied with your purchase. You can return most items within 30 days of delivery for a full refund or exchange, provided they are in their original condition and packaging. Custom orders may have different return conditions; please refer to our full return policy page for comprehensive details."
    },
    {
      question: "What materials are used in your furniture?",
      answer: "We pride ourselves on using high-quality, sustainably sourced materials. Our furniture is crafted from premium solid woods like oak, walnut, and maple, durable upholstery fabrics, and eco-friendly finishes. We prioritize ethical sourcing and craftsmanship to ensure longevity and beauty."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // The main section container with a subtle gradient background and responsive padding.
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden min-h-[500px] bg-gradient-to-br from-gray-50 to-gray-200 font-sans">
      {/* Decorative Pot Image with Animation */}
      {/* This element is hidden on small screens (md:block) and adjusted for larger screens. */}
      {/* Using a placeholder image for broader compatibility as next/image requires Next.js context. */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute left-0 bottom-0 z-0 pointer-events-none hidden md:block" // Hidden on small screens
        style={{ transform: 'translateY(20%)' }} // Reverted to original translateY(20%)
      >
        {/* Using a standard <img> tag with a placeholder for 'pot.png' */}
        <img
          src="pot.png" // Placeholder for /pot.png
          alt="Decorative Pot"
          // Responsive width and rounded corners for the pot image.
          className="object-contain w-[150px] sm:w-[200px] md:w-[250px] lg:w-[300px] rounded-full z-50"
        />
      </motion.div>

      {/* Main content wrapper to center and limit width, with responsive padding. */}
      <div className="relative max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 z-10">
        {/* Section title with responsive text size and spacing. */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-gray-500 mb-10 sm:mb-14 tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>

        {/* Container for the accordion items with vertical spacing. */}
        <div className="space-y-4 sm:space-y-5">
          {faqs.map((faq, index) => (
            // Each FAQ item, wrapped with motion.div for animations.
            <motion.div
              key={index}
              initial={false} // Prevents initial animation for Framer Motion, letting CSS transitions handle
              // Animates background and border colors based on the open state.
              animate={{ backgroundColor: openIndex === index ? '#E0E7FF' : '#FFFFFF', borderColor: openIndex === index ? '#C7D2FE' : '#D1D5DB' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              // Responsive styling for card appearance, including rounded corners and shadow effects.
              className={`rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.005] hover:shadow-lg
                ${openIndex === index
                  ? 'border-2 border-indigo-200' // Styling for the open state (subtle indigo border)
                  : 'border border-gray-200' // Styling for the closed state (light gray border)
                }
              `}
            >
              {/* Button to toggle the accordion, with responsive padding and text styling. */}
              <button
                className={`flex justify-between items-center w-full p-4 sm:p-5 text-left font-semibold
                  text-base sm:text-lg rounded-xl
                  ${openIndex === index
                    ? 'text-indigo-800' // Text color when open
                    : 'text-gray-800 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white'
                  }
                `}
                onClick={() => toggleAccordion(index)}
                // Accessibility attributes for screen readers.
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
              >
                <span className="flex-1 pr-4">{faq.question}</span>
                {/* Dynamically displays ChevronUp or ChevronDown icon based on state. */}
                {openIndex === index ? (
                  <ChevronUpIcon className="h-6 w-6 ml-2 flex-shrink-0 text-indigo-600" /> // Icon when open
                ) : (
                  <ChevronDownIcon className="h-6 w-6 ml-2 flex-shrink-0 text-gray-400 group-hover:text-indigo-500" /> // Icon when closed
                )}
              </button>

              {/* Collapsible answer content with smooth height transition. */}
              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                className={`transition-all duration-500 ease-in-out overflow-hidden
                  ${openIndex === index
                    ? 'max-h-screen opacity-100 py-3 px-4 sm:px-5' // Visible state
                    : 'max-h-0 opacity-0' // Hidden state
                  }
                `}
              >
                {/* Answer text with responsive font size and consistent color. */}
                <p className="text-sm sm:text-base leading-relaxed text-gray-700">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
