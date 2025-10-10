const Reply = require('../../models/reply');

const upvoteReply = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // Assuming user ID is available in req.user
    

    try {
        // Find the reply by ID
        const reply = await Reply.findById(id);
        if (!reply) {
            return res.status(404).json({ message: 'Reply not found' });
        }
        const existingVote = reply.votes.find(vote => vote.userId.toString() === userId);
        if(existingVote){
            if(existingVote.type === 'upvote'){
                // Remove existing upvote (toggle off)
                reply.votes = reply.votes.filter(vote => vote.userId.toString() !== userId && vote.type === 'upvote');
                reply.netVotes -= 1;
            }
            else if(existingVote.type === 'downvote'){
                // Switch from downvote to upvote (+2)
                existingVote.type = 'upvote';
                reply.netVotes += 2;
            }
            await reply.save();
            return res.status(200).json({ message: 'Reply upvote toggled', votes: reply.netVotes });
        }
        else{
            // Fresh upvote
            reply.votes.push({ userId, type: 'upvote' });
            reply.netVotes += 1;
            await reply.save();

            return res.status(200).json({ message: 'Reply upvoted successfully', votes: reply.netVotes });
        }
    } catch (error) {
        console.error('Error upvoting reply:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = upvoteReply;