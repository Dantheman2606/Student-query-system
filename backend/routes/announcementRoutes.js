// routes/announcementRoutes.js
const express = require('express');
const router = express.Router();
const AnnouncementController=require("../controllers/Announcements")

router.post('/',AnnouncementController.createAnnouncement); // Add Announcement
router.get('/', AnnouncementController.getAnnouncement);    // View Announcements

module.exports = router;
