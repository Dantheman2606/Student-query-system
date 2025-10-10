// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

// export default function PostDoubtPage() {
//   const apiUrl = import.meta.env.VITE_API_URL; // Vite
//   // const apiUrl = process.env.REACT_APP_API_URL; // CRA

//   const [title, setTitle] = useState("");
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [body, setBody] = useState("");
//   const [tagsList, setTagsList] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   // Fetch selectable tags for logged-in user
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const res = await fetch(`${apiUrl}/tags/selectable`, {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         setTagsList(data); // assume it's an array like ["DBMS","Java","React"]
//       } catch (err) {
//         console.error("Error fetching tags:", err);
//       }
//     };
//     fetchTags();
//   }, [apiUrl]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await fetch(`${apiUrl}/doubts`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//           title,
//           hashtags: selectedTags, // send array of tags
//           body,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setError(errorData.message || "Failed to post doubt");
//         setLoading(false);
//         return;
//       }

//       await response.json();
//       navigate("/doubts");
//     } catch (err) {
//       console.error("Error posting doubt:", err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle multiple selection
//   const handleTagChange = (e) => {
//     const options = Array.from(e.target.selectedOptions).map((opt) => opt.value);
//     setSelectedTags(options);
//   };

//   return (
//     <>
//       <div className="flex flex-col h-screen">
//       {/* Navbar fixed at top */}
//       <Navbar />

//       <div className="flex flex-1">
//         {/* Sidebar on the left */}
//         <Sidebar />
//       <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6">Post a Doubt</h1>
//         {error && <p className="text-red-500 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Title</label>
//             <input
//               type="text"
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Tags Dropdown */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Tags</label>
//             <select
//               multiple
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//               value={selectedTags}
//               onChange={handleTagChange}
//             >
//               {tagsList.map((tag) => (
//                 <option key={tag._id} value={tag.name}>
//                   {tag.name}
//                 </option>
//               ))}
//             </select>

//             <p className="text-sm text-gray-500 mt-1">
//               Hold <b>Ctrl</b> (Windows) / <b>Cmd</b> (Mac) to select multiple tags
//             </p>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-lg font-medium mb-2">Description</label>
//             <textarea
//               className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px]"
//               value={body}
//               onChange={(e) => setBody(e.target.value)}
//               required
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
//           >
//             {loading ? "Posting..." : "Post Doubt"}
//           </button>
//         </form>
//       </div>
//       </div>
//       </div>
//     </>
//   );
// }

// failed to post a doubt fix that check json body stringify
// jwt decode for that user and password
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function PostDoubtPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [content, setContent] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch selectable tags for logged-in user
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch(`${apiUrl}/tags/selectable`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setTagsList(data); // [{_id, name}]
      } catch (err) {
        console.error("Error fetching tags:", err);
      }
    };
    fetchTags();
  }, [apiUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      const response = await fetch(`${apiUrl}/queries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title,
          tags: selectedTags,
          content,
          userID: decoded.id,
          postedby: decoded.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to post doubt");
        setLoading(false);
        return;
      }

      await response.json();
      // navigation to alldoubts page is here ,change this to all doubts page
      navigate("/Doubts");
    } catch (err) {
      console.error("Error posting doubt:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add tag to selected list
  const handleTagSelect = (tagName) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  // Remove tag
  const handleTagRemove = (tagName) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex-1 flex justify-center items-start overflow-y-auto p-10">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10">
            <h1 className="text-4xl font-bold text-blue-700 mb-8">
              Post a Doubt
            </h1>

            {error && <p className="text-red-500 mb-6">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-xl font-medium mb-3">Title</label>
                <input
                  type="text"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xl font-medium mb-3">Tags</label>

                <div className="flex flex-wrap gap-3 mb-3">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="text-blue-500 hover:text-red-500 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {tagsList.map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => handleTagSelect(tag.name)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${selectedTags.includes(tag.name)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                        }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xl font-medium mb-3">
                  Description
                </label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none min-h-[200px] text-lg"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-xl font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading ? "Posting..." : "Post Doubt"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}





