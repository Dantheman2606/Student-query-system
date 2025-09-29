const Reply = require('../../models/reply');

const downvoteReply = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user
    try {
        // Find the reply by ID
        const reply = await Reply.findById(id);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }

        // Check if the user has already downvoted
        if (reply.votes.some(vote => vote.userId.toString() === userId && vote.type === 'downvote')) {
            reply.votes = reply.votes.filter(vote => vote.userId.toString() !== userId && vote.type === 'downvote');
            reply.netVotes += 1;
            await reply.save();
            return res.status(200).json({ message: 'Downvote removed', reply });
        }

        // Add the user ID to the downVotes array
        reply.votes.push({ userId, type: 'downvote' });
        reply.netVotes -= 1;
        await reply.save();

        return res.status(200).json({ message: 'Reply downvoted successfully', reply });
    } catch (error) {
        console.error('Error downvoting reply:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = downvoteReply;
