const express = require('express');
const router = express.Router();

const queryController = require('../controllers/query');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, queryController.createQuery);
router.get('/tags', authMiddleware, queryController.getQueryByTags);
router.get('/', authMiddleware, queryController.getAllQueries);
router.get('/:id', authMiddleware, queryController.getQueryById);

module.exports = router;