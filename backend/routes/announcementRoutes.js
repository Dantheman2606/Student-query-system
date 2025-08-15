// routes/announcementRoutes.js
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const facultyMiddleware = require('../middleware/facultyMiddleware');

const AnnouncementController=require("../controllers/Announcements");

router.post('/', authMiddleware ,facultyMiddleware ,AnnouncementController.createAnnouncement); // Add Announcement
router.get('/', authMiddleware, AnnouncementController.getAnnouncement);    // View Announcements
router.get('/:id', authMiddleware, AnnouncementController.getAnnouncementById); // Get Announcement by ID

module.exports = router;
