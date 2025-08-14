const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Hide password by default in queries
  },

  role: {
    type: String,
    enum: ['student', 'faculty'],
    required: true
  },

  department: {
    type: String,
    default: ''
  },

  avatarUrl: {
    type: String,
    default: '' // Placeholder image URL if needed
  },

  bio: {
    type: String,
    maxlength: 200,
    default: ''
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String
  },
  verificationTokenExpiry: {
    type: Date
  }

});

// Auto-hash password before saving
userSchema.pre('save', async function (next) {

  // this checks if password was modified or newly made
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Update `updatedAt` on update
userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

