const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const getUserProfile = async (req, res) => {

    try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('name email role department avatarUrl bio createdAt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = getUserProfile;