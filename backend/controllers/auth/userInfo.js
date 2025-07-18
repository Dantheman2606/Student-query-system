const User = require('../../models/User');

// GET /api/auth/me
const userInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Populated by authMiddleware

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = userInfo;
