"use client";

import Link from "next/link";
import { useState } from "react";
import LogoutButton from "@/components/logout-button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu's visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-white p-4 shadow-md rounded-b-lg w-full">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Brand/Logo Section */}
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
          <span className="font-semibold text-xl tracking-tight">
            <a href="/">KHUJO.org</a>
          </span>
        </div>

        {/* Mobile menu button (hamburger icon) */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-gray-900 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50 transition duration-300 ease-in-out"
            aria-label="Toggle navigation"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Navigation links - hidden by default on small screens, shown on large screens */}
        {/* On mobile, visibility is controlled by the `isOpen` state */}
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
            isOpen ? "block" : "hidden"
          } transition-all duration-300 ease-in-out`}
        >
          {/* Links moved to the left by removing lg:justify-end and using lg:order-first */}
          <div className="text-sm lg:flex-grow lg:flex lg:items-center lg:order-first">
            <Link
              href="/v1/dashboard"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4 p-2 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Dashboard
            </Link>
            <Link
              href="/v1/dashboard/tasks"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-4 p-2 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Tasks
            </Link>
            <Link
              href="#profile"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out"
            >
              Profile
            </Link>
            
          </div>
          <div><LogoutButton/></div>
        </div>
      </div>
    </nav>
  );
}