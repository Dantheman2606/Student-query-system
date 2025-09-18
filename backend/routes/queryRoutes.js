const express = require('express');
const router = express.Router();

const queryController = require('../controllers/query');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, queryController.createQuery);
router.get('/tags', authMiddleware, queryController.getQueryByTags);
router.get('/', authMiddleware, queryController.getAllQueries);
router.get('/:id', authMiddleware, queryController.getQueryById);
router.delete('/:id', authMiddleware, queryController.deleteQueryById);

// voting routes
router.put('/:id/upvote', authMiddleware, queryController.upvoteQuery);
router.put('/:id/downvote', authMiddleware, queryController.downvoteQuery);
router.get('/:id/votes', authMiddleware, queryController.voteCountOfQuery);

// reply route
const replyController = require('../controllers/reply');
router.post('/:id/reply', authMiddleware, replyController.replyToQuery);

module.exports = router;