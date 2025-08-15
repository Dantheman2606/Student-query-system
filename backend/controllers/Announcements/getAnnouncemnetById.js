const Announcement = require('../../models/announcement');

const getAnnouncementById = async (req, res) => {
    const { id } = req.params;

    try {
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        res.status(200).json(announcement);
    } catch (error) {
        console.error('Error fetching announcement:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = getAnnouncementById;
