const Query = require("../../models/query");
const Reply = require("../../models/reply");

const replyToReply = async (req, res) => {
  try {
    const { id } = req.params; // replyId
    const { content } = req.body;
    const { queryId } = req.body;

    // Check if parent reply exists
    const parentReply = await Reply.findById(id);
    if (!parentReply) {
      return res.status(404).json({ error: "Reply not found" });
    }

    // Create the new reply
    const newReply = new Reply({
      content,
      userId: req.user.id, // assuming user is authenticated
      queryId: queryId,
      parentId: id,
      postedBy: req.user.name // assuming user name is available in req.user
    });

    await newReply.save();

    // Add the new reply to the parent reply's children
    // parentReply.children.push(newReply._id);
    // await parentReply.save();

    res.status(201).json(newReply);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = replyToReply;
