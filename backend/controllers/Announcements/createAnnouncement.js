// controllers/announcementController.js
const Announcement = require('../../models/announcement');

// POST - Create Announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, content, postedBy } = req.body;

        if (!title || !content || !postedBy) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = new Announcement({
            title,
            content,
            postedBy
        });

        await announcement.save();
        res.status(201).json({ message: 'Announcement posted successfully', announcement });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




module.exports=createAnnouncement;
    
    

