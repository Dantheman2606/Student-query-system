import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LandingNavbar from '../components/LandingNavbar';


const apiUrl = import.meta.env.VITE_API_URL;


const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorData = await response.json();
      // throw new Error(errorData.message || 'Login failed');
      // console.log(errorData);
      setLoginError(errorData.message);
    }
    else {
      const data = await response.json();
      // console.log(data);

      // Store JWT in local storage
      localStorage.setItem('token', data.token);

      // console.log('Login successful:', data);
      // Redirect or show success UI
      navigate('/home');
    }

    

  } catch (error) {
    console.error('Login error:', error.message);
    // Show error message to user
  }
};


  return (
    <>
    <LandingNavbar />
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">Login to CampusConnect</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg shadow transition"
          >
            Login
          </button>
        </form>

        <div className='text-center pt-5 text-red-400'>
          {loginError}
        </div>
        {/* Optional Links */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Register
          </a>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default LoginPage;
