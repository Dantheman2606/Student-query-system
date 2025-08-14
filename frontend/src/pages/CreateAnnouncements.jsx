import React,{useState} from "react";
import LandingNavbar from "../components/LandingNavbar";

const apiUrl = import.meta.env.VITE_API_URL;

const CreateAnnouncements = () => {

    const handleSubmit=async (e) => {
      e.preventDefault();
    }

    const navigate = useNavigate();
    


  return (
    <div>
      <LandingNavbar />
      <h1>Create Announcements</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter announcement title"
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="Enter announcement content"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition"
        >
          Create Announcement
        </button>
      </form>
    </div>
  );
};

export default CreateAnnouncements;
