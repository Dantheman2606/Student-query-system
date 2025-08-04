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
          role: 'student',        // force role here
          avatarUrl: '',          // optional fallback
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // setIsLoading(false);
        setIsSubmitted(true);
        //setMessage('A verification email has been sent to your email address.');
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
    }
  };





  return (
    <>
      <Landingnavbar />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-12">

        {isLoading ?
          isSubmitted ? (
            <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                Registration Successful 🎉
              </h2>
              <p className="text-gray-300">
                Please check your email to verify your account before logging in.
              </p>
            </div>
          ) : (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-2xl text-center border border-gray-700 max-w-sm w-full">
                <p className="text-lg font-semibold mb-2">⏳ Creating your account...</p>
                <div className="animate-spin h-8 w-8 border-4 border-white border-t-transparent rounded-full mx-auto mt-4"></div>
              </div>
            </div>

          ) : (
            <>
              <div className="bg-gray-900 text-white flex   px-4">
                <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
                  <h2 className="text-3xl font-bold mb-6">Create an Account</h2>

                  <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
                    <input
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      name="department"
                      placeholder="Department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      className="w-full min-h-24 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Short Bio (e.g. I'm a front-end enthusiast!)"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg shadow transition"
                    >
                      Register
                    </button>
                    {message && <p className="text-green-400 mt-2">{message}</p>}
                    {error && <p className="text-red-400 mt-2">{error}</p>}
                  </form>
                </div>

              </div>
            </>
          )}

      </div>

    </>
  );

}
