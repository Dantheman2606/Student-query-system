
const Announcement = require('../../models/announcement');



const getAnnouncement = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ datePosted: -1 });
        res.json(announcements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports =getAnnouncement;