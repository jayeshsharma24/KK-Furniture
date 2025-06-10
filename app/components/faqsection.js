"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What types of furniture do you offer?",
      answer: "We offer a wide range of handcrafted furniture for every room, including living room sofas and chairs, bedroom sets, dining tables and chairs, and office furniture. Our collections feature both modern and classic designs, all made with sustainable materials."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. We also offer financing options through our partners. Please visit our 'Payment Options' page for more details."
    },
    {
      question: "Can I track my furniture delivery?",
      answer: "Yes, once your order has been dispatched, you will receive a tracking number via email. You can use this number on our website's 'Track Your Order' page or the courier's website to get real-time updates on your delivery status."
    },
    {
      question: "What is your return policy?",
      answer: "We want you to be completely satisfied with your purchase. You can return most items within 30 days of delivery for a full refund or exchange. Custom-made items may be subject to different return conditions. Please refer to our 'Returns & Refunds' policy page for detailed information."
    },
    {
      question: "What materials are used in your furniture?",
      answer: "We pride ourselves on using high-quality, sustainably sourced materials, including solid hardwoods (oak, walnut, maple), responsibly harvested veneers, premium fabrics, genuine leather, and eco-friendly finishes. We prioritize durability and environmental responsibility in all our products."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="relative py-12 sm:py-16 bg-cover bg-center overflow-visible"
      style={{ backgroundImage: `url('/faq.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative max-w-3xl sm:max-w-4xl mx-auto px-4 z-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-white mb-8 sm:mb-12 tracking-tight drop-shadow-lg">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md transition-all duration-400 ease-in-out transform hover:scale-[1.005]
                ${openIndex === index
                  ? 'bg-green-800 border-2 border-green-700 text-white shadow-lg'
                  : 'bg-white/90 border border-gray-300 text-gray-900'
                }`
              }
            >
              <button
                className={`flex justify-between items-center w-full px-3 py-3 sm:px-4 sm:py-4 text-left font-semibold
                  text-sm sm:text-base md:text-lg rounded-lg
                  ${openIndex === index
                    ? 'text-white'
                    : 'text-gray-900 hover:text-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-white'
                  }`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
              >
                <span className="flex-1 pr-2">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUpIcon className="h-5 w-5 ml-2 flex-shrink-0 text-white" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 ml-2 flex-shrink-0 text-gray-400 group-hover:text-green-500" />
                )}
              </button>

              <div
                id={`faq-panel-${index}`}
                role="region"
                aria-labelledby={`faq-button-${index}`}
                className={`transition-all duration-400 ease-in-out overflow-hidden
                  ${openIndex === index
                    ? 'max-h-screen opacity-100 py-2 px-3 sm:px-4'
                    : 'max-h-0 opacity-0'
                  }`}
              >
                <p className={`text-xs sm:text-sm leading-relaxed ${openIndex === index ? 'text-gray-200' : 'text-gray-700'}`}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
