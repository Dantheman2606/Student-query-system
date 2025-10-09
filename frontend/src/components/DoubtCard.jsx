import { useState, useEffect } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import {jwtDecode}  from 'jwt-decode';


const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DoubtCard = ({ id, title, body, tag, author, date, votes, voteData }) => {
  const [userVote, setUserVote] = useState(null);
  const [netVotes, setNetVotes] = useState(votes);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token"); // make sure your logged-in user ID is stored




  // 🔹 Set initial userVote based on voteData
  useEffect(() => {

    const token = localStorage.getItem("token"); 

    try {
        const decoded = jwtDecode(token);

        setUserId(decoded.id);
    }
    catch (error) {
        console.log(error);
    }
    if (voteData && userId) {
      const existingVote = voteData.find(v => v.userId === userId);
      if (existingVote) setUserVote(existingVote.type); // 'upvote' or 'downvote'
    }
  }, [voteData, userId]);

  // 🔹 Fetch tags (API placeholder)
  useEffect(() => {
    const fetchTags = async () => {
      try {
        // TODO: Replace with your API call
        // const res = await fetch(`${apiUrl}/tags/${id}`);
        // const data = await res.json();
        // setTags(data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };

    fetchTags();
  }, [id]);

  // 🔹 Handle Upvote / Downvote
  const handleVote = async (type) => {
    if (isLoading) return; // prevent spam flood
    setIsLoading(true);

    // Toggle logic: if clicking same vote again, it resets
    const newVote = userVote === type ? null : type;

    // Optimistic UI update
    // let voteChange = 0;
    // if (userVote === type) voteChange = type === "upvote" ? -1 : 1; // removing vote
    // else if (!userVote) voteChange = type === "upvote" ? 1 : -1; // new vote
    // else voteChange = type === "upvote" ? 2 : -2; // switching vote

    // setNetVotes(prev => prev + voteChange);
    setUserVote(newVote);

    try {
      const response = await fetch(`${apiUrl}/queries/${id}/${type}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (typeof data.votes === "number") setNetVotes(data.votes);
    } catch (err) {
      console.error("Vote update failed:", err);
      // revert UI if failed
      setNetVotes(prev => prev - voteChange);
      setUserVote(userVote);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Safe truncate
  const truncateText = (text, wordLimit) => {
    if (!text || typeof text !== "string") return "";
    const words = text.split(" ");
    return words.length <= wordLimit
      ? text
      : words.slice(0, wordLimit).join(" ") + "...";
  };

  return (
    <div className="flex bg-white border border-gray-600 rounded-2xl hover:shadow-lg transition-all duration-300 p-6 gap-5 items-start">
      {/* Vote Section */}
      <div className="flex flex-col items-center justify-center w-14">
        <button
          onClick={() => handleVote("upvote")}
          disabled={isLoading}
          className={`p-2 rounded-full transition-all duration-200 ${
            userVote === "upvote"
              ? "text-blue-600 bg-blue-50 scale-110"
              : "text-black hover:text-blue-500 hover:bg-blue-50"
          }`}
        >
          <ArrowBigUp size={28} />
        </button>

        <span className="text-xl font-semibold text-gray-900 mt-1 mb-1">
          {netVotes}
        </span>

        <button
          onClick={() => handleVote("downvote")}
          disabled={isLoading}
          className={`p-2 rounded-full transition-all duration-200 ${
            userVote === "downvote"
              ? "text-red-600 bg-red-50 scale-110"
              : "text-gray-400 hover:text-red-500 hover:bg-red-50"
          }`}
        >
          <ArrowBigDown size={28} />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md font-medium">
            {tag || "General"}
          </span>
          <span className="text-sm text-gray-500">
            by <span className="font-medium">{author || "Anonymous"}</span> •{" "}
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-1 leading-snug">
          {title}
        </h2>
        <p className="text-gray-700 text-base leading-relaxed">
          {truncateText(body, 30)}
        </p>

        {/* Optional tag list (from API) */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t._id}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md"
              >
                {t.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtCard;
