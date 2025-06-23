"use client"

import Navbar from "@/components/Navbar";
import { Award, Briefcase, Clock, Heart, TrendingUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import OnBoarding from "@/components/OnBoarding";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the mobile menu's visibility
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Navbar container with a light background, padding, and shadow
    <div className="flex flex-col h-screen items-center w-full">
    <nav className="bg-white p-4 shadow-md rounded-b-lg w-full">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Brand/Logo Section */}
        <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
          
          <span className="font-semibold text-xl tracking-tight">KHUJO.org</span>
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
            isOpen ? 'block' : 'hidden'
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
        </div>
      </div>
    </nav>

<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8 w-[90%] mt-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah Johnson!</h1>
              <p className="text-blue-100">Ready to make a difference today?</p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
    </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 w-[90%]">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Skills</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Availability</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Matches</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
        <div className="">
<OnBoarding/>

        </div>
    </div>

        
// stasts
  );
}