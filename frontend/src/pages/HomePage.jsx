import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Our Portal
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Connect with faculty and students. Ask, learn, and grow together.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
          <a
            href="/features"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition"
          >
            Features
          </a>
          <a
            href="/about"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition"
          >
            About
          </a>
          <a
            href="/login"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-md text-white transition"
          >
            Login
          </a>
           <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300"
      >
        Logout
      </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
