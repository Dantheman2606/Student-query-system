const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isSelectable: {
    type: Boolean,
    default: true
  }
});

const Tag = mongoose.model('Tag', tagSchema, 'Tags');

module.exports = Tag;