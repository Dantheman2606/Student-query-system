import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnnouncementCard from '../components/AnnouncementCard';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const apiUrl = import.meta.env.VITE_API_URL;


// Main Home Page
const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    async function fetchAnnouncements() {
    
    try {
    const response = await fetch(`${apiUrl}/announcements`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
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
      setAnnouncements(data);

      
    }

    

  } catch (error) {
    console.error('Login error:', error.message);
    // Show error message to user
  }
}
    fetchAnnouncements();
  }, []);

  // replace this shit with API call later
  // const announcements = [
  //   {
  //     title: 'System Maintenance',
  //     content: 'The portal will be down tonight for maintenance.',
  //     postedBy: 'Admin',
  //     datePosted: '2025-08-12T14:30:00',
  //   },
  //   {
  //     title: 'Exam Schedule Released',
  //     content: 'Check the exams section for your updated schedule.',
  //     postedBy: 'Prof. Sharma',
  //     datePosted: '2025-08-10T10:00:00',
  //   },
  // ];
const onEdit = async (id, updatedData) => {
  try {
    const response = await fetch(`${apiUrl}/announcements/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: updatedData.title,
        content: updatedData.content
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error updating announcement:", errorData.message || errorData);
      return; // stop execution if error
    }

    const result = await response.json();
    console.log("Announcement updated:", result);

    // If backend returns only updated announcement:
    setAnnouncements(prev =>
      prev.map(ann => ann._id === id ? result : ann)  
    );

  } catch (error) {
    console.error("Network or server error:", error);
  }
}
const onDelete = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/announcements/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error deleting announcement:", errorData.message || errorData);
      return;
    }

    console.log(`Announcement with ID ${id} deleted successfully`);

    // Remove the deleted announcement from state
    setAnnouncements(prev =>
      prev.filter(ann => ann._id !== id)
    );

  } catch (error) {
    console.error("Network or server error:", error);
  }
}


  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-black">
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
            <div className="bg-[#F2F2F2] rounded-3xl border-2 border-blue-400 shadow-md shadow-blue-900/50 px-12 py-8 text-center">
              <h2 className="text-3xl font-extrabold text-[#043d00]">New Announcements</h2>
              
            </div>
          </div>

          {/* Announcements List */}
          <div className="space-y-4 max-w-auto mx-auto">
            {announcements.map((a, index) => (
              <AnnouncementCard
                key={index}
                id ={a._id}
                title={a.title}
                content={a.content}
                postedBy={a.postedBy}
                datePosted={a.datePosted}
                onEdit={onEdit}
                onDelete={onDelete}
                userId={a.userId}
              />
            ))}
          </div>
          
  {/* title,
  content,
  postedBy,
  datePosted,
  onEdit,
  onDelete,
  userId */}
        </main>
      </div>
    </div>
  )
};

export default HomePage;
