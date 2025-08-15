// routes/announcementRoutes.js
const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const facultyMiddleware = require('../middleware/facultyMiddleware');

const AnnouncementController=require("../controllers/Announcements");

router.post('/', authMiddleware ,facultyMiddleware ,AnnouncementController.createAnnouncement); // Add Announcement
router.get('/', authMiddleware, AnnouncementController.getAnnouncement);    // View Announcements
router.get('/:id', authMiddleware, AnnouncementController.getAnnouncementById); // Get Announcement by ID
router.put('/:id', authMiddleware, facultyMiddleware, AnnouncementController.editAnnouncement); // Edit Announcement
router.delete('/:id', authMiddleware, facultyMiddleware, AnnouncementController.deleteAnnouncement); // Delete Announcement

module.exports = router;
