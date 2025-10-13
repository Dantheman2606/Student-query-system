import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isFaculty, setIsFaculty] = useState(false);
  const navigate = useNavigate();

  function handleAddAnnouncement() {
    navigate("/createAnnouncements");
  }

  function handleViewAnnouncements() {
    navigate("/home");
  }

  function handlePostDoubt() {
    navigate("/askDoubt");
  }

  function handleViewDoubts() {
    navigate("/allDoubts");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.role === "faculty") {
          setIsFaculty(true);
        }
      } catch (err) {
        console.error("Invalid token", err);
        setIsFaculty(false);
      }
    } else {
      setIsFaculty(false);
    }
  }, []);

  return (
<aside className="hidden lg:block w-64 sticky top-0 h-screen overflow-y-auto bg-gradient-to-b from-green-50 via-purple-100 to-white shadow-lg shadow-purple-100 p-6">
      {isFaculty && (
        <div className="bg-white rounded-2xl border border-purple-100 px-4 py-3 text-center cursor-pointer hover:bg-purple-50 transition">
          <button onClick={handleAddAnnouncement}>
            <h2 className="text-lg font-bold text-purple-500">Add Announcement</h2>
          </button>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-purple-100 px-4 py-3 text-center cursor-pointer hover:bg-purple-50 mt-4 transition">
        <button onClick={handlePostDoubt}>
          <h2 className="text-lg font-bold text-green-500">Post a Doubt</h2>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-purple-100 px-4 py-3 text-center cursor-pointer hover:bg-purple-50 mt-4 transition">
        <button onClick={handleViewDoubts}>
          <h2 className="text-lg font-bold text-purple-500">View all Doubts</h2>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-purple-100 px-4 py-3 text-center cursor-pointer hover:bg-purple-50 mt-4 transition">
        <button onClick={handleViewAnnouncements}>
          <h2 className="text-lg font-bold text-green-500">View Announcements</h2>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
