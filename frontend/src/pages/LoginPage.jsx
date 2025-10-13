import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';

const apiUrl = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setLoginError(errorData.message);
      } else {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-purple-100 to-white bg-opacity-60 backdrop-blur-md flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white bg-opacity-70 rounded-2xl p-8 shadow-lg border border-purple-200">
          <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
            Login to CampusConnect
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white bg-opacity-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg shadow-md transition"
            >
              Login
            </button>
          </form>
          {loginError && (
            <div className="mt-4 text-red-500 text-sm">{loginError}</div>
          )}
          {/* Optional Links */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="/register" className="text-purple-600 hover:underline">
              Register
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
