import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DoubtCard from "../components/DoubtCard";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AllDoubts = () => {
  const navigate = useNavigate();
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const res = await fetch(`${apiUrl}/queries`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch doubts");

        const data = await res.json();
        setDoubts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoubts();
  }, []);

  

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-black">
      <Navbar onLogout={handleLogout} />
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-8">All Doubts</h1>

          {loading && <p className="text-gray-500">Loading doubts...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}

          

          {!loading && !error && (
            <div className="flex flex-col gap-6">
              {doubts.map((d) => (
                
                <DoubtCard
                  key={d._id}
                  id={d._id}
                  title={d.title}
                  body={d.content}
                  replyCount={d.replies.length}
                  author={d.postedBy}
                  date={d.datePosted}
                  votes={d.netVotes}
                  voteData={d.votes}
                  tag={d.tags}
                  // onVote={handleVote}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AllDoubts;
