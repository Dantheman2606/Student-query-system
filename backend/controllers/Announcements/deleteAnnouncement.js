const Announcement = require("../../models/announcement");
// const User = require("../../models/user");

const deleteAnnouncement = async (req, res) => {
    const { id } = req.params;

    const userId = req.user.id;


    try {
        const announcement = await Announcement.findById(id)

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        if(announcement.userId.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this announcement' });
        }

        await Announcement.findByIdAndDelete(id);

        res.status(200).json({ message: 'Announcement deleted successfully' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = deleteAnnouncement;

        

//         if (!announcement) {
//             return res.status(404).json({ message: 'Announcement not found' });
//         }

//         if(announcement.userId.toString() !== userId) {
//             return res.status(403).json({ message: 'You are not authorized to edit this announcement' });
//         }

//         announcement.title = title;
//         announcement.content = content;
//         announcement.datePosted = Date.now();

//         await announcement.save();

//         res.status(200).json(announcement);
//     } catch (error) {
//         console.error('Error editing announcement:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

// module.exports = deleteAnnouncement;
