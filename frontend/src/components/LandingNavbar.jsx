import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white bg-opacity-70 backdrop-blur-md shadow-lg shadow-purple-100 border border-purple-200 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-purple-700">
        <h1 className="text-2xl font-bold text-purple-700 hover:text-green-600 transition">
          <a href="/">CampusConnect</a>
        </h1>

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
          <a
            href="#features"
            className="hover:text-green-600 transition font-medium"
          >
            Features
          </a>
          <a href="#about" className="hover:text-green-600 transition font-medium">
            About
          </a>
          <a
            href="/login"
            className="px-4 py-2 border border-gray-600 bg-gradient-to-r from-green-100 to-purple-100 hover:from-green-200 hover:to-purple-200 text-white rounded-lg shadow-md transition font-semibold"
          >
            <div className="text-gray-800 ">
              Login
            </div>
            
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-purple-600 hover:text-green-600 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-3 text-sm bg-white bg-opacity-70 backdrop-blur-md border-t border-purple-200 text-purple-700 font-medium">
          <a href="#features" className="hover:text-green-600 transition">
            Features
          </a>
          <a href="#about" className="hover:text-green-600 transition">
            About
          </a>
          <a
            href="/login"
            className="px-4 py-2 bg-gradient-to-r from-green-400 to-purple-500 hover:from-green-500 hover:to-purple-600 text-white rounded-lg shadow-md transition w-max"
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
