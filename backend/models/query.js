// models/Announcement.js
const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    upVotes : {
        type: Number,
        default: 0
    },
    downVotes: {
        type: Number,
        default: 0
    },
    postedBy: {  // Can be admin or teacher
        type: String,
        required: true
    },
    userId: {  // ID of the user who posted the announcement
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }],
    datePosted: {
        type: Date,
        default: Date.now
    },
    isEdited: {
        type: Boolean,
        default: false
    },
    dateEdited: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

const Query = mongoose.model('Query', querySchema, 'Queries');
module.exports = Query;
