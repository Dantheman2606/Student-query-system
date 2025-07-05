const User = require('../../models/User');

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) return res.status(400).json({ message: 'Missing token' });

  const user = await User.findOne({ verificationToken: token });

  if (!user || user.verificationTokenExpiry < Date.now()) {
    return res.status(400).json({ message: 'Invalid or expired token' });
  }

  user.verified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;

  await user.save();

  res.status(200).json({ message: 'Email verified successfully' });
};

module.exports = verifyEmail;
