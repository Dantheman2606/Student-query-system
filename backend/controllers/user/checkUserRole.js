const User = require('../../models/User');


const checkUserRole = async (req, res) => {

    try {
    const { userId } = req.body;

    if(!userId) {
      return res.status(400).json({ isFaculty: 'false' });
    }

    const user = await User.findById(userId).select('role');

    if (!user) {
      return res.status(404).json({ isFaculty: false });
    }

    res.json({ isFaculty: user.role === 'faculty' });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkUserRole;