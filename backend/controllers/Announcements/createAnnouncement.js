// controllers/announcementController.js
const Announcement = require('../../models/announcement');
// const user = require('../../models/user');

// POST - Create Announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, content , postedBy} = req.body;
        const userId = req.user.id;

        if (!title || !content || !postedBy || !userId) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const announcement = new Announcement({
            title,
            content,
            postedBy,
            userId
        });

        await announcement.save();
        res.status(201).json({ message: 'Announcement posted successfully', announcement });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};




module.exports=createAnnouncement;
    
    

