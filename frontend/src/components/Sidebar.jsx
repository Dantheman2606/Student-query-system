import React, { useState,useEffect } from 'react';
import {jwtDecode}  from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-[#0F1A2C] p-6">
//       <div className="bg-[#0D1525] rounded-2xl border border-blue-400 shadow-lg shadow-blue-900/50 px-4 py-3 text-center">
//         <h2 className="text-lg font-bold text-purple-400">New</h2>
//         <h2 className="text-lg font-bold text-purple-400">Announcements</h2>
//       </div>
//     </aside>
//   );
// };
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
        // decoded will look like: { id, name, role: "faculty", exp, iat }
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
  <aside className="hidden lg:block w-64 bg-indigo-950 shadow-lg shadow-black/50 p-6">
    {/* Faculty-only button */}
    {isFaculty && (
      <div className="bg-[#0D1525] rounded-2xl border border-gray-500 px-4 py-3 text-center cursor-pointer hover:bg-blue-900/20">
        <button onClick={handleAddAnnouncement}>
          <h2 className="text-lg font-bold text-white">Add Announcement</h2>
        </button>
      </div>
    )}

    {/* Post a Doubt */}
    <div className="bg-[#0D1525] rounded-2xl border border-gray-500 px-4 py-3 text-center cursor-pointer hover:bg-blue-900/20 mt-4">
      <button onClick={handlePostDoubt}>
        <h2 className="text-lg font-bold text-white">Post a Doubt</h2>
      </button>
    </div>

    {/* View Doubts */}
    <div className="bg-[#0D1525] rounded-2xl border border-gray-500 px-4 py-3 text-center cursor-pointer hover:bg-blue-900/20 mt-4">
      <button onClick={handleViewDoubts}>
        <h2 className="text-lg font-bold text-white">View all Doubts</h2>
      </button>
    </div>

    {/* View Announcements */}
    <div className="bg-[#0D1525] rounded-2xl border border-gray-500 px-4 py-3 text-center cursor-pointer hover:bg-blue-900/20 mt-4">
      <button onClick={handleViewAnnouncements}>
        <h2 className="text-lg font-bold text-white">View Announcements</h2>
      </button>
    </div>
  </aside>
);

};

export default Sidebar;

