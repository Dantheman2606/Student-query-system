const express = require('express');
const router = express.Router();

const replyController = require('../controllers/reply');
const authMiddleware = require('../middleware/authMiddleware');

// router.post('/:id/reply', authMiddleware, replyController.replyToQuery);
router.post('/:id/reply-to-reply', authMiddleware, replyController.replyToReply);
router.get('/:id/replies', authMiddleware, replyController.getReplies);
router.put('/:id/upvote', authMiddleware, replyController.upvoteReply);
router.put('/:id/downvote', authMiddleware, replyController.downvoteReply);

module.exports = router;