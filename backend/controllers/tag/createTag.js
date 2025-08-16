const Tag = require('../../models/tag');

const createTag = async (req, res) => {
  try {
    const { name, isVisible, isSelectable } = req.body;
    const newTag = new Tag({ name, isVisible, isSelectable });
    await newTag.save();
    res.status(201).json({ message: 'Tag created successfully', tag: newTag });
  } catch (error) {
    res.status(500).json({ message: 'Error creating tag', error });
  }
};

module.exports = createTag;
