const Query = require('../../models/query');

const downvoteQuery = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user
    try {
        // Find the query by ID
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Check if the user has already downvoted
        if (query.votes.some(vote => vote.userId.toString() === userId && vote.type === 'downvote')) {
            query.votes = query.votes.filter(vote => vote.userId.toString() !== userId && vote.type === 'downvote');
            query.netVotes += 1;
            await query.save();
            return res.status(200).json({ message: 'Downvote removed', query });
        }

        // Add the user ID to the downVotes array
        query.votes.push({ userId, type: 'downvote' });
        query.netVotes -= 1;
        await query.save();

        return res.status(200).json({ message: 'Query downvoted successfully', query });
    } catch (error) {
        console.error('Error downvoting query:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = downvoteQuery;
