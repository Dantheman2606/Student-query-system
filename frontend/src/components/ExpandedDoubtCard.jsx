import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const ExpandedDoubtCard = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMainReply, setNewMainReply] = useState("");
  const [netVotes, setNetVotes] = useState(0);
  const [voteType, setVoteType] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (err) {
        console.error(err);
      }
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/queries/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setQuery(data);
        setNetVotes(data.netVotes);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReplies = async () => {
      try {
        const res = await fetch(`${apiUrl}/replies/${id}/replies`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setReplies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchReplies();
  }, [id]);

  useEffect(() => {
    if (query?.votes && userId) {
      const existingVote = query.votes.find((v) => v.userId === userId);
      if (existingVote) setVoteType(existingVote.type);
    }
  }, [query, userId]);

  const fetchRepliesAgain = async () => {
    try {
      const res = await fetch(`${apiUrl}/replies/${id}/replies`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        const data = await res.json();
        setReplies(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleQueryVote = async (id, type) => {
    try {
      const res = await fetch(`${apiUrl}/queries/${id}/${type}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Vote failed");
      const data = await res.json();
      setNetVotes(data.votes);
      const newVote = voteType === type ? null : type;
      setVoteType(newVote);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleMainReplySubmit = async (e) => {
    e.preventDefault();
    if (!newMainReply.trim()) return;
    try {
      const res = await fetch(`${apiUrl}/queries/${id}/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ content: newMainReply }),
      });
      if (res.ok) {
        await fetchRepliesAgain();
        setNewMainReply("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Recursive Reply Component
  const Reply = ({ reply }) => {
    const [nestedReply, setNestedReply] = useState("");
    const [activeReplyBox, setActiveReplyBox] = useState(false);
    const [replyNetVotes, setReplyNetVotes] = useState(reply.netVotes);
    const [replyVoteType, setReplyVoteType] = useState(null);

    const handleNestedReplySubmit = async (e) => {
      e.preventDefault();
      if (!nestedReply.trim()) return;
      try {
        const res = await fetch(
          `${apiUrl}/replies/${reply._id}/reply-to-reply`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: nestedReply, queryId: id }),
          }
        );
        if (res.ok) {
          await fetchRepliesAgain();
          setNestedReply("");
          setActiveReplyBox(false);
        }
      } catch (err) {
        console.error(err);
      }
    };

    useEffect(() => {
      if (reply.votes && userId) {
        const existingVote = reply.votes.find((v) => v.userId === userId);
        if (existingVote) setReplyVoteType(existingVote.type);
      }
    }, [reply.votes, userId]);

    const handleReplyVote = async (id, type) => {
      try {
        const res = await fetch(`${apiUrl}/replies/${id}/${type}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Vote failed");
        const data = await res.json();
        setReplyNetVotes(data.votes);
        const newVote = replyVoteType === type ? null : type;
        setReplyVoteType(newVote);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4">
        <div className="flex items-start space-x-3">
          <div className="flex flex-col items-center mt-1">
            <ArrowBigUp
              onClick={() => handleReplyVote(reply._id, "upvote")}
              className={`cursor-pointer ${
                replyVoteType === "upvote"
                  ? "text-blue-600 bg-blue-50 scale-110"
                  : "text-black hover:text-blue-500 hover:bg-blue-50"
              }`}
            />
            <span className="text-sm font-medium">{replyNetVotes}</span>
            <ArrowBigDown
              onClick={() => handleReplyVote(reply._id, "downvote")}
              className={`cursor-pointer ${
                replyVoteType === "downvote"
                  ? "text-red-600 bg-red-50 scale-110"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{reply.postedBy}</span>
              <span className="text-sm text-gray-500">
                {new Date(reply.datePosted).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-800 mt-1">{reply.content}</p>

            <button
              type="button"
              onClick={() => setActiveReplyBox((prev) => !prev)}
              className="text-sm text-blue-600 mt-1 hover:underline"
            >
              Reply
            </button>

            {activeReplyBox && (
              <div className="mt-2">
                <textarea
                  value={nestedReply}
                  onChange={(e) => setNestedReply(e.target.value)}
                  placeholder="Write your reply..."
                  className="border rounded-lg p-2 w-full resize-none focus:outline-blue-400"
                />
                <button
                  type="button"
                  onClick={handleNestedReplySubmit}
                  className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                  Reply
                </button>
              </div>
            )}

            {reply.children?.length > 0 &&
              reply.children.map((child) => <Reply key={child._id} reply={child} />)}
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!query) return <p className="p-6">Query not found.</p>;

  return (
    <div className="min-h-screen flex flex-col">
            <Navbar onLogout={handleLogout} />
            <div className="flex flex-1">
                    {/* Sidebar */}
                    <Sidebar />

    {/* Main content */}
    <div className="flex-1 bg-gray-50 p-6 overflow-auto">
      <div className="w-full max-w-6xl mx-auto">
        <button>
          <a href="/allDoubts" className="text-blue-600 hover:underline">
            &larr; Back to All Doubts
          </a>
        </button>
        <div className="bg-white rounded-xl shadow p-6 flex space-x-4">
          <div className="flex flex-col items-center mt-2">
            <ArrowBigUp
              onClick={() => handleQueryVote(id, "upvote")}
              className={`cursor-pointer ${
                voteType === "upvote"
                  ? "text-blue-600 bg-blue-50 scale-110"
                  : "text-black hover:text-blue-500 hover:bg-blue-50"
              }`}
            />
            <span className="text-lg font-medium">{netVotes}</span>
            <ArrowBigDown
              onClick={() => handleQueryVote(id, "downvote")}
              className={`cursor-pointer ${
                voteType === "downvote"
                  ? "text-red-600 bg-red-50 scale-110"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{query.title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Posted by <span className="font-semibold">{query.postedBy}</span> •{" "}
              {new Date(query.datePosted).toLocaleDateString()}
            </p>
            <p className="mt-4 text-gray-800">{query.content}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {query.tags?.map((t, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-md"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Discussion</h2>

          <form onSubmit={handleMainReplySubmit} className="flex flex-col space-y-3 mb-6">
            <textarea
              value={newMainReply}
              onChange={(e) => setNewMainReply(e.target.value)}
              placeholder="Share your thoughts..."
              className="border rounded-lg p-3 resize-none h-24 focus:outline-blue-400 w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md w-24 hover:bg-blue-700"
            >
              Reply
            </button>
          </form>

          {replies.length > 0 ? (
            replies.map((r) => <Reply key={r._id} reply={r} />)
          ) : (
            <p className="text-gray-500">No replies yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default ExpandedDoubtCard;
