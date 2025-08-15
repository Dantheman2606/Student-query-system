const Announcement = require("../../models/announcement");
// const User = require("../../models/user");

const editAnnouncement = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const userId = req.user.id;
    

    try {
        const announcement = await Announcement.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json(announcement);
    } catch (error) {
        console.error('Error editing announcement:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
