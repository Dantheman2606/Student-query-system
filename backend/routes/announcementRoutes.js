// routes/announcementRoutes.js
const express = require('express');
const router = express.Router();
const AnnouncementController=require("../controllers/Announcements");
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware ,AnnouncementController.createAnnouncement); // Add Announcement
router.get('/', authMiddleware, AnnouncementController.getAnnouncement);    // View Announcements

module.exports = router;
