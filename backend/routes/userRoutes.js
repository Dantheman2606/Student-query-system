const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/user');
const router = express.Router();

router.get('/', authMiddleware, userController.allUsers);
router.get('/:id', authMiddleware, userController.getUserProfile);
router.put('/updateUserProfile', authMiddleware, userController.updateUserProfile);
router.delete('/deleteUserProfile', authMiddleware, userController.deleteUserProfile);
router.post('/checkUserRole', authMiddleware, userController.checkUserRole);

module.exports = router;