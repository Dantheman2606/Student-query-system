const Query = require('../../models/query');

const upvoteQuery = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        // Find the query by ID
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Check if the user has already upvoted
        if (query.votes.some(vote => vote.userId.toString() === userId && vote.type === 'upvote')) {
            query.votes = query.votes.filter(vote => vote.userId.toString() !== userId && vote.type === 'upvote');
            query.netVotes -= 1;
            await query.save();
            return res.status(200).json({ message: 'Upvote removed', query });
        }

        // Add the user ID to the upvotes array
        query.votes.push({ userId, type: 'upvote' });
        query.netVotes += 1;
        await query.save();

        return res.status(200).json({ message: 'Query upvoted successfully', query });
    } catch (error) {
        console.error('Error upvoting query:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = upvoteQuery;