const User = require('../../models/User');

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware (verified JWT)

    const { name, bio, department, avatarUrl } = req.body;

    const updatedData = {
      ...(name && { name }),
      ...(bio && { bio }),
      ...(department && { department }),
      ...(avatarUrl && { avatarUrl })
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

module.exports = updateUserProfile;
