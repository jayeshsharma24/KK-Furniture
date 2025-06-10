// components/navbar.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const menuItems = ["Home", "About", "Gallery", "Contact"];

  return (
    // Reverted to your original Navbar classes, but with z-index for layering
  <nav className="sticky top-0 z-50 bg-white shadow-md">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between rounded-full">
    {/* Logo */}
    <div className="flex items-center gap-3">
      <Image src="/favicon.png" alt="Logo" width={50} height={50} />
      <span className="text-xl font-bold">KK Furniture</span>
    </div>

    {/* Desktop Menu */}
    <div className="hidden md:flex gap-6 items-center">
      {menuItems.map((item) => (
        <a
          key={item}
          href="#"
          className="relative group inline-block overflow-hidden text-lg font-medium"
        >
          <span className="transition-transform transform group-hover:scale-105 group-hover:text-amber-600 duration-200">
            {item}
          </span>
          <span className="absolute left-0 bottom-0 h-[2px] w-full bg-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        </a>
      ))}
    </div>

    {/* Desktop Icons */}
    <div className="hidden md:flex items-center gap-4">
      <Image
        src="/grocery.gif"
        alt="Cart"
        width={40}
        height={40}
        className="cursor-pointer"
      />
      <Image
        src="/user.gif"
        alt="User"
        width={40}
        height={40}
        className="cursor-pointer"
      />
    </div>

    {/* Hamburger Dropdown (Mobile) */}
    <div className="md:hidden relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-center w-10 h-10 text-3xl focus:outline-none rounded-md bg-white hover:bg-amber-100 transition"
        aria-label="Toggle Menu"
        type="button"
        aria-expanded={isOpen}
      >
        &#9776;
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 text-center">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block px-4 py-2 text-gray-700 hover:bg-amber-100 hover:text-amber-700 transition"
              >
                {item}
              </a>
            </li>
          ))}
          <li className="border-t border-gray-200 mt-1 pt-1 flex justify-center gap-6 px-4 pb-2">
            <Image
              src="/grocery.gif"
              alt="Cart"
              width={30}
              height={30}
              className="cursor-pointer"
            />
            <Image
              src="/user.gif"
              alt="User"
              width={30}
              height={30}
              className="cursor-pointer"
            />
          </li>
        </ul>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;