const Query = require('../../models/query');
const Reply = require('../../models/reply');

const replyToQuery = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id;
        const postedBy = req.user.name; // Assuming user role is available in req.user
        const { id } = req.params; // Query ID

        if (!content || !postedBy || !userId) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if the query exists
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ error: 'Query not found' });
        }   
        const newReply = new Reply({
            content,
            postedBy,
            userId,
            queryId: id
        });
        await newReply.save();

        // Add the reply to the query's replies array
        query.replies.push(newReply._id);
        await query.save();
        console.log('New reply added:', newReply);
        res.status(201).json({
            message: "Reply added successfully"
        });
    } catch (error) {
        console.error('Error replying to query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = replyToQuery;
    