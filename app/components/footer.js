"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <footer className="bg-white text-black px-4 py-8 sm:py-12 relative overflow-visible">
      <div className="max-w-7xl mx-auto relative">

        
        {/* ✅ Responsive Sofa Image with Proper Positioning */}
        <div className="
          absolute 
          z-50 
          pointer-events-none 
          right-2 
          -top-24 
          sm:-top-32 
          md:-top-40 
          lg:-top-48
        ">
          <Image
            src="/sofa1.png"
            alt="Sofa"
            width={500}
            height={500}
            className="
              object-contain 
              w-[200px] 
              sm:w-[250px] 
              md:w-[350px] 
              lg:w-[450px]
            "
          />
        </div>

        {/* Logo and Description */}
        <div className="mb-8 md:grid md:grid-cols-5 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/favicon.png"
                alt="KK Furniture Logo"
                width={120}
                height={40}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-700 text-xs xs:text-sm mb-4">
              KK Furniture brings timeless elegance to your home with handcrafted,
              sustainable furniture pieces designed for modern living.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {/* Facebook */}
              <a href="#" className="text-gray-700 hover:text-black transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-700 hover:text-black transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.153-1.772 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              {/* Twitter */}
              <a href="#" className="text-gray-700 hover:text-black transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="hidden md:block md:col-span-3"></div>
        </div>

        {/* Accordion Links */}
        <div className="mb-8 md:grid md:grid-cols-3 md:gap-8">
          {['shop', 'company', 'support'].map((section) => (
            <div key={section} className="mb-4 md:mb-0 flex flex-col items-center text-center">
              <h3
                className="font-semibold text-sm mb-4 md:hidden cursor-pointer"
                onClick={() => toggleAccordion(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <svg
                  className={`w-4 h-4 inline-block ml-2 transition-transform duration-300 ${
                    openAccordion === section ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </h3>
              <h3 className="font-semibold text-sm mb-4 hidden md:block">
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </h3>
              <ul
                className={`space-y-2 text-gray-700  text-xs transition-all duration-300 ease-in-out overflow-hidden ${
                  openAccordion === section
                    ? 'max-h-40 opacity-100'
                    : 'max-h-0 opacity-0 md:max-h-full md:opacity-100'
                }`}
              >
                {section === 'shop' && ['Living Room', 'Bedroom', 'Dining', 'Office'].map(item => (
                  <li key={item}><a href="#" className="hover:text-black transition-colors">{item}</a></li>
                ))}
                {section === 'company' && ['About Us', 'Our Story', 'Sustainability', 'Careers'].map(item => (
                  <li key={item}><a href="#" className="hover:text-black transition-colors">{item}</a></li>
                ))}
                {section === 'support' && ['Contact Us', 'FAQs', 'Shipping', 'Returns'].map(item => (
                  <li key={item}><a href="#" className="hover:text-black transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-black my-6"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-700 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} KK Furniture. All rights reserved.
          </div>
          <div>Made with ❤️ by Sharma Jayesh</div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-700 hover:text-black text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-700 hover:text-black text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-700 hover:text-black text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
