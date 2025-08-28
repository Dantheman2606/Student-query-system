const Query = require('../../models/query');
const Tag = require('../../models/tag');

const createQuery = async (req, res) => {
    const { title, content } = req.body;

    const userId = req.user.id;
    const postedBy = req.user.name;

    if(!title || !content || !postedBy || !userId) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {

        // Find the tag document for the given year
        // !!! EVERY YEAR, NEW YEAR TAG NEEDS TO BE ADDED TO TAGS TABLE
        const year = new Date().getFullYear();
        const yearTag = await Tag.findOne({ name: year });
        if (!yearTag) {
            return res.status(400).json({ error: `No tag found for year ${year}` });
        }


        const newQuery = new Query({
            title,
            content,
            postedBy,
            userId,
            tags: [yearTag._id]
        });

        await newQuery.save();
        console.log('New query created:', newQuery);
        res.status(201).json({
            message: "Query created successfully"
        });
    } catch (error) {
        console.error('Error creating query:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = createQuery;
