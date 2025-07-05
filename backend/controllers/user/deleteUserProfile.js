const User = require('../../models/User');

const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // user ID from JWT middleware

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};

module.exports = deleteUserProfile;
