const Query = require('../../models/query');
const Tag = require('../../models/tag');

const getQueryByTags = async (req, res) => {
    try {
        // Get tags from query params, e.g. ?tags=tag1,tag2
        const { tags } = req.query;

        if (!tags) {
            return res.status(400).json({ message: 'Tags are required in query params' });
        }

        // Split string into array of tag names
        const tagNames = tags.split(',').map(t => t.trim());

        // Find tag IDs from names
        const tagDocs = await Tag.find({ name: { $in: tagNames } });
        const tagIds = tagDocs.map(tag => tag._id);
        console.log(tagDocs);

        if (tagIds.length === 0) {
            return res.status(404).json({ message: 'No matching tags found' });
        }

        // Find queries that contain any of these tag IDs
        const queries = await Query.find({ tags: { $in: tagIds } })
            .populate('tags', 'name')       // populate tag names
            .populate('userId', 'name')     // populate query owner
            // .populate({
            //     // path: 'replies',
            //     // populate: { path: 'userId', select: 'name' }
            // });

        res.status(200).json(queries);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = getQueryByTags;
