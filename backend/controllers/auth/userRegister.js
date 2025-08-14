const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = require('../../utils/sendVerificationEmail');

// Environment variable fallback
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// POST /api/auth/register
const userRegister = async (req, res) => {
  try {
    const { name, email, password, role, department, avatarUrl, bio } = req.body;

    // Check required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Name, email, password, and role are required.' });
    }

    // Prevent duplicate registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // TO prevent tampering of request
    if (role === 'admin') {
      return res.status(403).json({ message: 'You cannot register as admin' });
    }

    const crypto = require('crypto');

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = Date.now() + 1000 * 60 * 60 * 24; // 24 hrs

    // Create new user (password will be hashed via pre-save middleware)
    const newUser = new User({
      name,
      email,
      password,
      role: role === 'faculty' ? 'faculty' : 'student', department: department || '',
      avatarUrl: avatarUrl || '',
      bio: bio || '',
      verified: false,
      verificationToken,
      verificationTokenExpiry
    });

    await newUser.save();

    await sendVerificationEmail(newUser, verificationToken);

    // Generate JWT token
    // const token = jwt.sign(
    //   { id: newUser._id, role: newUser.role },
    //   JWT_SECRET,
    //   { expiresIn: '7d' }
    // );

    // Send response (no password)
    res.status(201).json({
      //token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: newUser.department,
        avatarUrl: newUser.avatarUrl,
        bio: newUser.bio,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = userRegister;
