// models/Announcement.js
const mongoose = require('mongoose');
const { post } = require('../routes/queryRoutes');

const replySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    netVotes: {
        type: Number,
        default: 0
    },
    votes: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            type: { type: String, enum: ['upvote', 'downvote'] }
        }
    ],
    postedBy: {  // Can be admin or teacher
        type: String,
        required: true
    },
    userId: {  // ID of the user who posted the announcement
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    queryId: {  // ID of the query to which this reply belongs  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Query',
        required: true
    },
    parentId: {  // ID of the parent reply for nested replies
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reply',
        default: null
    },
    datePosted: {
        type: Date,
        default: Date.now
    }
});

const Reply = mongoose.model('Reply', replySchema, 'Replies');
module.exports = Reply;
