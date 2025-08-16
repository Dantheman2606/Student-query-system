const Tag = require('../../models/tag');

const getAllTags = async (req, res) => {
  try {
    const tags = await Tag.where('isSelectable').equals(true).select('-isSelectable -isVisible');
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tags', error });
  }
};

module.exports = getAllTags;
