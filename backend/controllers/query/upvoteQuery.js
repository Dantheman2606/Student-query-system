const Query = require('../../models/query');

const upvoteQuery = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Check if the user has already voted
        const existingVote = query.votes.find(vote => vote.userId.toString() === userId);

        if (existingVote) {
            if (existingVote.type === 'upvote') {
                // Remove existing upvote (toggle off)
                query.votes = query.votes.filter(vote => vote.userId.toString() !== userId);
                query.netVotes -= 1;
                await query.save();
                return res.status(200).json({ message: 'Upvote removed', votes: query.netVotes });
            } else if (existingVote.type === 'downvote') {
                // Switch from downvote to upvote (+2)
                existingVote.type = 'upvote';
                query.netVotes += 2;
                await query.save();
                return res.status(200).json({ message: 'Switched from downvote to upvote', votes: query.netVotes });
            }
        } else {
            // Fresh upvote
            query.votes.push({ userId, type: 'upvote' });
            query.netVotes += 1;
            await query.save();
            return res.status(200).json({ message: 'Upvoted successfully', votes: query.netVotes });
        }

    } catch (error) {
        console.error('Error upvoting query:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = upvoteQuery;
