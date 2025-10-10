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
        const existingVote = reply.votes.find(vote => vote.userId.toString() === userId);
        if(existingVote){
            if(existingVote.type === 'downvote'){
                // Remove existing downvote (toggle off)
                reply.votes = reply.votes.filter(vote => vote.userId.toString() !== userId && vote.type === 'downvote');
                reply.netVotes += 1;
            }
            else if(existingVote.type === 'upvote'){
                // Switch from upvote to downvote (-2)
                existingVote.type = 'downvote';
                reply.netVotes -= 2;
            }
            await reply.save();
            return res.status(200).json({ message: 'Reply downvote toggled', votes: reply.netVotes });
        }
        else{
            // Fresh downvote
            reply.votes.push({ userId, type: 'downvote' });
            reply.netVotes -= 1;
            await reply.save();
            return res.status(200).json({ message: 'Reply downvoted successfully', votes: reply.netVotes });
        }
        } catch (error) {
        console.error('Error downvoting reply:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = downvoteReply;
