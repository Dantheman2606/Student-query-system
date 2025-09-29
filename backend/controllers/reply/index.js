const replyToQuery = require('../../controllers/reply/replyToQuery')
const replyToReply = require('../../controllers/reply/replyToReply');
const getReplies = require('../../controllers/reply/getReplies');
const upvoteReply = require('../../controllers/reply/upvoteReply');
const downvoteReply = require('../../controllers/reply/downvoteReply');

module.exports = {
    replyToQuery,
    replyToReply,
    getReplies,
    upvoteReply,
    downvoteReply
};