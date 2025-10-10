const Query = require('../../models/query');

const getAllQueries = async (req, res) => {

    try {
        const queries = await Query.find().populate('tags', 'name');
        res.status(200).json(queries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching queries', error });
    }
};

module.exports = getAllQueries;