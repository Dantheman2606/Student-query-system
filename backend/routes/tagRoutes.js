const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const tagController = require('../controllers/tag');

router.post('/', authMiddleware, adminMiddleware, tagController.createTag);
router.get('/', authMiddleware, adminMiddleware, tagController.getAllTags);
router.get('/selectable', authMiddleware, tagController.getSelectableTags);

module.exports = router;