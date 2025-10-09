const Query = require('../../models/query');

const downvoteQuery = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user

    try {
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }

        // Check if the user has upvoted or downvoted before
        const existingVote = query.votes.find(vote => vote.userId.toString() === userId);

        if (existingVote) {
            if (existingVote.type === 'downvote') {
                // Remove existing downvote (toggle off)
                query.votes = query.votes.filter(vote => vote.userId.toString() !== userId);
                query.netVotes += 1;
                await query.save();
                return res.status(200).json({ message: 'Downvote removed', votes: query.netVotes });
            } else if (existingVote.type === 'upvote') {
                // Switch from upvote to downvote (net -2)
                existingVote.type = 'downvote';
                query.netVotes -= 2;
                await query.save();
                return res.status(200).json({ message: 'Switched from upvote to downvote', votes: query.netVotes });
            }
        } else {
            // Fresh downvote
            query.votes.push({ userId, type: 'downvote' });
            query.netVotes -= 1;
            await query.save();
            return res.status(200).json({ message: 'Downvoted successfully', votes: query.netVotes });
        }

    } catch (error) {
        console.error('Error downvoting query:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = downvoteQuery;
