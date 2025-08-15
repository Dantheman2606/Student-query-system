import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
export default function AnnouncementCard({
  id,
  title,
  content,
  postedBy,
  datePosted,
  onEdit,
  onDelete,
  userId
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title, content });
  const[ isauthority,setIsAuthority]=useState(false);

  useEffect(()=>{
    try{
    const token=localStorage.getItem('token');
    const decoded = jwtDecode(token);
    if(decoded.role ==="faculty" && decoded.id===userId){
      setIsAuthority (true);
    }

    }catch(err){
      console.error('Your are not an admin :(',error.message);
    }
    
  }, []);
  const formattedDate = datePosted
    ? new Date(datePosted).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  const handleSave = () => {
    onEdit(id, editData);
    setIsEditing(false);
  };

  return (
    <article className="w-full bg-white border border-gray-200 shadow-md rounded-2xl p-6 transition-all hover:shadow-lg">
      {isEditing ? (
        <>
          {/* Edit Mode */}
          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={editData.content}
            onChange={(e) =>
              setEditData({ ...editData, content: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-lg h-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full text-lg font-semibold shadow-sm transition"
            >
              ✅ Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-5 py-3 rounded-full text-lg font-semibold shadow-sm transition"
            >
              ❌ Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* View Mode */}
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
                {title}
              </h1>
            </div>
            <time className="text-lg text-gray-500">{formattedDate}</time>
          </header>

          <div className="mt-4 text-lg text-gray-700 leading-relaxed">
            {content}
          </div>

          <footer className="mt-6 flex items-center justify-between text-sm text-gray-500">
            <p className="text-lg">
              Posted by{" "}
              <span className="text-gray-700 font-medium">{postedBy}</span>
            </p>
            {isauthority &&(<div className="flex gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-sm transition"
              >
                ✏️ Edit
              </button>
               <button
                onClick={() => onDelete(id)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-sm transition"
              >
                🗑 Delete
              </button>
            </div>)} 
          </footer>
        </>
      )}
    </article>
  );
}
