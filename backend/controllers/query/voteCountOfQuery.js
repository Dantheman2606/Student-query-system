const Query = require('../../models/query');

const voteCountOfQuery = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the query by ID
        const query = await Query.findById(id);
        if (!query) {
            return res.status(404).json({ message: 'Query not found' });
        }
        return res.status(200).json({ netVotes: query.netVotes });
    } catch (error) {
        console.error('Error fetching vote count:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = voteCountOfQuery;
