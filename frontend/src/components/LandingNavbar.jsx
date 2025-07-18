import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // or use any other icon set
import { useNavigate } from 'react-router-dom';

const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 shadow w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold text-indigo-400">
          <a href='/'>
            CampusConnect
            </a></h1>

        {/* Desktop Links */}
        <nav className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
          <a href="#features" className="hover:text-indigo-300 transition">Features</a>
          <a href="#about" className="hover:text-indigo-300 transition">About</a>
          <a
            href="/login"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow transition"
          >
            Login
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="sm:hidden text-gray-300 hover:text-white transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="sm:hidden px-4 pb-4 flex flex-col gap-3 text-sm bg-gray-800 border-t border-gray-700 text-white">
          <a href="#features" className="hover:text-indigo-300 transition">Features</a>
          <a href="#about" className="hover:text-indigo-300 transition">About</a>
          <a
            href="/login"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow transition w-max"
          >
            Login
          </a>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
