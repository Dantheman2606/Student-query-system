import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {jwtDecode}  from 'jwt-decode';


const apiUrl = import.meta.env.VITE_API_URL;

const CreateAnnouncements = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const token=localStorage.getItem('token');
     try {
      const decoded = jwtDecode(token);
    const response = await fetch(`${apiUrl}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: e.target.title.value,
        content: e.target.content.value,
        postedBy: decoded.name,
        userId: decoded.id
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      // throw new Error(errorData.message || 'Login failed');

      // remove this shit in production
      console.log(errorData);
      // setLoginError(errorData.message);
    }
    else {
      const data = await response.json();

      // remove this shit in production
      console.log(data);
      
    }
    navigate('/home');
    

  } catch (error) {
    console.error('Login error:', error.message);
    // Show error message to user
  }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [isSure,setIsSure] = useState(false);

  const onCreate = () => {
    setIsSure(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-5xl bg-white border border-gray-200 shadow-sm rounded-2xl p-8">
            <h1 className="text-center text-4xl font-semibold text-gray-800 mb-6">
              Create Announcement
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-xl font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full h-14 text-3xl border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                  placeholder="Enter announcement title"
                />
              </div>

              {/* Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-xl font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  rows="5"
                  className="w-full text-2xl border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition resize-none"
                  placeholder="Enter announcement content"
                />
              </div>

              {/* Submit Button */}
              <div className="flex">
                <button type="button" onClick={onCreate}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                >
                  Create
                </button>
              </div>
              {isSure && (<div className="flex flex-col justify-end items-center gap-4 mt-6 border-t pt-4">
                <h2 className="text-lg font-medium text-red-600">
                  Are you sure you want to create this announcement?
                </h2>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-sm transition-all"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="px-5 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition-all"
                  >
                    No
                  </button>
                </div>
              </div>)}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAnnouncements;
