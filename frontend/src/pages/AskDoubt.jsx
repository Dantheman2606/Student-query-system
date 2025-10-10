import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { jwtDecode } from "jwt-decode";

export default function PostDoubtPage() {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]); // store only ObjectIds
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

  // Handle tag selection (only ObjectIds)
  const handleTagSelect = (tagId) => {
    if (selectedTags.includes(tagId)) {
      // if already selected, remove it (toggle)
      setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    } else {
      // else add it
      setSelectedTags((prev) => [...prev, tagId]);
    }
  };

  // Handle remove (for × button, optional)
  const handleTagRemove = (tagId) => {
    setSelectedTags((prev) => prev.filter((id) => id !== tagId));
  };

  // Submit form
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          tags: selectedTags, // only ObjectIds here
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
      navigate("/allDoubts"); // redirect to all doubts page
    } catch (err) {
      console.error("Error posting doubt:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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

                {/* Selected tags display */}
                <div className="flex flex-wrap gap-3 mb-3">
                  {selectedTags.map((tagId) => {
                    const tagObj = tagsList.find((t) => t._id === tagId);
                    return (
                      <span
                        key={tagId}
                        className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm flex items-center gap-2"
                      >
                        {tagObj ? tagObj.name : "Unknown Tag"}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tagId)}
                          className="text-blue-500 hover:text-red-500 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>

                {/* Selectable tag buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {tagsList.map((tag) => (
                    <button
                      key={tag._id}
                      type="button"
                      onClick={() => handleTagSelect(tag._id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                        selectedTags.includes(tag._id)
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
