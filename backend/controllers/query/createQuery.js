const Query = require('../../models/query');

const createQuery = async (req, res) => {
    const { title, content } = req.body;

    const userId = req.user.id;
    const postedBy = req.user.name;

    if(!title || !content || !postedBy || !userId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newQuery = new Query({
            title,
            content,
            postedBy,
            userId
        });

        await newQuery.save();
        res.status(201).json({
            message: "Query created successfully"
        });
    } catch (error) {
        console.error('Error creating query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = createQuery;
