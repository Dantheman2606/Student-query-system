// models/Announcement.js
const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
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
    datePosted: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply'
    }]
});

const Reply = mongoose.model('Reply', replySchema, 'Replies');
module.exports = Reply;
