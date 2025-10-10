import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const ExpandedDoubtCard = () => {
  const { id } = useParams();
  const [query, setQuery] = useState(null);
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMainReply, setNewMainReply] = useState("");

  // Fetch query and replies
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/queries/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setQuery(data);
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

  // Refetch replies
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
      console.error("Error fetching replies:", err);
    }
  };

  // Submit main reply
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
      console.error("Error submitting main reply:", err);
    }
  };

  // Recursive Reply component
  const Reply = ({ reply }) => {
    const [nestedReply, setNestedReply] = useState("");
    const [activeReplyBox, setActiveReplyBox] = useState(false);

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
        console.error("Error submitting nested reply:", err);
      }
    };

    return (
      <div className="ml-6 mt-4 border-l-2 border-gray-200 pl-4">
        <div className="flex items-center space-x-2">
          <span className="font-semibold">{reply.postedBy}</span>
          <span className="text-sm text-gray-500">
            {new Date(reply.datePosted).toLocaleDateString()}
          </span>
        </div>
        <p className="text-gray-800 mt-1">{reply.content}</p>

        {/* Reply actions */}
        <div className="flex items-center space-x-3 text-sm text-gray-500 mt-2">
          <button className="hover:text-blue-600">▲ {reply.netVotes}</button>
          <button className="hover:text-blue-600">▼</button>
          <button
            type="button"
            onClick={() => setActiveReplyBox((prev) => !prev)}
            className="hover:text-blue-600"
          >
            Reply
          </button>
        </div>

        {/* Nested reply box */}
        {activeReplyBox && (
          <div className="mt-3">
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

        {/* Render children recursively */}
        {reply.children?.length > 0 &&
          reply.children.map((child) => <Reply key={child._id} reply={child} />)}
      </div>
    );
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!query) return <p className="p-6">Query not found.</p>;

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-10">
      <div className="max-w-3xl w-full bg-[#f9fafb] rounded-xl shadow p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{query.title}</h1>
            <p className="text-sm text-gray-600">
              Posted by <span className="font-semibold">{query.postedBy}</span> •{" "}
              {new Date(query.datePosted).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button className="text-xl">▲</button>
            <span className="text-lg font-medium">{query.netVotes}</span>
            <button className="text-xl">▼</button>
          </div>
        </div>

        <p className="mt-4 text-gray-800">{query.content}</p>

        {query.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {query.tags.map((t, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-2 py-1 text-sm rounded-md"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Discussion Section */}
      <div className="max-w-3xl w-full mt-10">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Discussion</h2>

        {/* Main reply form */}
        <form onSubmit={handleMainReplySubmit} className="flex flex-col space-y-3 mb-6">
          <textarea
            value={newMainReply}
            onChange={(e) => setNewMainReply(e.target.value)}
            placeholder="Share your thoughts..."
            className="border rounded-lg p-3 resize-none h-24 focus:outline-blue-400"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-24 hover:bg-blue-700"
          >
            Reply
          </button>
        </form>

        {/* Replies */}
        <div>
          {replies.length > 0 ? (
            replies.map((r) => <Reply key={r._id} reply={r} />)
          ) : (
            <p className="text-gray-500">No replies yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpandedDoubtCard;
