import { useState, useEffect } from "react";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import {jwtDecode} from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const DoubtCard = ({
  id,
  title,
  body,
  replyCount,
  tag,
  author,
  date,
  votes,
  voteData,
}) => {
  const [userVote, setUserVote] = useState(null);
  const [netVotes, setNetVotes] = useState(votes);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (err) {
      console.log(err);
    }

    if (voteData && userId) {
      const existingVote = voteData.find((v) => v.userId === userId);
      if (existingVote) setUserVote(existingVote.type);
    }
  }, [voteData, userId]);

  // Placeholder for fetching tags
  useEffect(() => {
    const fetchTags = async () => {
      try {
        // Example API call
        // const res = await fetch(`${apiUrl}/tags/${id}`);
        // const data = await res.json();
        // setTags(data);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      }
    };
    fetchTags();
  }, [id]);

  const handleVote = async (type) => {
    if (isLoading) return;
    setIsLoading(true);

    const newVote = userVote === type ? null : type;
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
      setUserVote(userVote);
    } finally {
      setIsLoading(false);
    }
  };

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

        <span className="text-xl font-semibold text-gray-900 my-1">
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
      <a href={`/doubt/${id}`} className="flex-1 flex gap-4 items-stretch">
        {/* Left Side */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-md font-medium">
              {tag || "General"}
            </span>
            <span className="text-sm text-gray-500">
              by <span className="font-medium">{author || "Anonymous"}</span>
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mb-1 leading-snug">
            {title}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            {truncateText(body, 30)}
          </p>

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

        {/* Right Side: Date & Replies */}
        <div className="flex flex-col justify-between items-end ml-auto text-right">
          <span className="text-lg font-semibold text-gray-500">
            {new Date(date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </span>
          <span className="text-md mt-2">
            Replies: {replyCount}
          </span>
        </div>
      </a>
    </div>
  );
};

export default DoubtCard;
