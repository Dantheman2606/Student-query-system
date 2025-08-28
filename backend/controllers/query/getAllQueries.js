const Query = require('../../models/Query');

const getAllQueries = async (req, res) => {
    try {
        const queries = await Query.find();
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching queries', error });
    }
};

module.exports = getAllQueries;