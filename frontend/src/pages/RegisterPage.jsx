import React, { useState } from 'react';
import Landingnavbar from '../components/LandingNavbar';

const apiUrl = import.meta.env.VITE_API_URL;

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    bio: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords don't match.");
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'student',
          avatarUrl: '',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          department: '',
          bio: '',
        });
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('Server error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Landingnavbar />
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-purple-100 to-white bg-opacity-60 backdrop-blur-md flex flex-col items-center justify-center px-4 py-12">
        {isLoading ? (
          isSubmitted ? (
            <div className="bg-white bg-opacity-70 p-8 rounded-xl shadow-lg text-center w-full max-w-md border border-purple-200">
              <h2 className="text-2xl font-bold mb-4 text-green-600">
                Registration Successful 🎉
              </h2>
              <p className="text-gray-700">
                Please check your email to verify your account before logging in.
              </p>
            </div>
          ) : (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white bg-opacity-80 text-purple-700 p-6 rounded-2xl shadow-2xl text-center border border-purple-200 max-w-sm w-full">
                <p className="text-lg font-semibold mb-2">⏳ Creating your account...</p>
                <div className="animate-spin h-8 w-8 border-4 border-purple-700 border-t-transparent rounded-full mx-auto mt-4"></div>
              </div>
            </div>
          )
        ) : (
          <div className="w-full max-w-md bg-white bg-opacity-70 p-8 rounded-2xl shadow-lg border border-purple-200">
            <h2 className="text-3xl font-bold mb-6 text-purple-700">Create an Account</h2>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <input
                className="w-full px-4 py-2 bg-white bg-opacity-90 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 bg-white bg-opacity-90 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 bg-white bg-opacity-90 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 bg-white bg-opacity-90 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <input
                className="w-full px-4 py-2 bg-white bg-opacity-90 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                required
              />
              <textarea
                name="bio"
                className="w-full min-h-24 px-4 py-2 bg-white bg-opacity-90 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Short Bio (e.g. I'm a front-end enthusiast!)"
                value={formData.bio}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-200 to-purple-200 hover:from-green-300 hover:to-purple-300 text-gray-800  font-bold py-2 rounded-lg shadow-md transition"
              >
                Register
              </button>
              {message && <p className="text-green-600 mt-2">{message}</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
