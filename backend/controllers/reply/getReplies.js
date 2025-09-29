const Reply = require("../../models/reply");
const Query = require("../../models/query");

const getReplies = async (req, res) => {
  try {
    const { id } = req.params; // queryId

    // Check if query exists (optional, but safe)
    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({ error: "Query not found" });
    }

    // Fetch all replies for this query
    const replies = await Reply.find({ queryId: id })
    //   .populate("userId", "name email") // <-- populate with user info
      .lean();


    // Build a map of replies by _id
    const replyMap = {};
    replies.forEach((reply) => {
      reply.children = []; // prepare for nesting
      replyMap[reply._id] = reply;
    });

    // Organize into a tree
    const rootReplies = [];
    replies.forEach((reply) => {
      if (reply.parentId) {
        // If it has a parent, push into parent's children
        replyMap[reply.parentId]?.children.push(reply);
      } else {
        // Otherwise it's a top-level reply
        rootReplies.push(reply);
      }
    });

    res.status(200).json(rootReplies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = getReplies;
