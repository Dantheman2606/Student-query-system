import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnnouncementCard from '../components/AnnouncementCard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';


// Main Home Page
const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // replace this shit with API call later
  const announcements = [
    {
      title: 'System Maintenance',
      content: 'The portal will be down tonight for maintenance.',
      postedBy: 'Admin',
      datePosted: '2025-08-12T14:30:00',
    },
    {
      title: 'Exam Schedule Released',
      content: 'Check the exams section for your updated schedule.',
      postedBy: 'Prof. Sharma',
      datePosted: '2025-08-10T10:00:00',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1220] text-white">
      {/* Navbar */}
      <Navbar onLogout={handleLogout} />

      {/* Content Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Heading */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#0D1525] rounded-3xl border-2 border-blue-400 shadow-2xl shadow-blue-900/50 px-12 py-8 text-center">
              <h2 className="text-3xl font-extrabold text-purple-400">New Announcements</h2>
              
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {announcements.map((a, index) => (
              <AnnouncementCard
                key={index}
                title={a.title}
                content={a.content}
                postedBy={a.postedBy}
                datePosted={a.datePosted}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
