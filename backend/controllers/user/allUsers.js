// This is for admin purposes, to retrieve all the users

const User = require('../../models/User');

// GET /api/users/
// const allUsers = async (req, res) => {
//   try {

//     // Only admin can access this
//     if (req.user.role !== 'admin') {
//       return res.status(403).json({ message: 'Access denied: Admins only' });
//     }

//     const users = await User.find().select('-password'); // Hide password

//     res.status(200).json(users);

//   } catch (error) {
//     console.error('Error fetching users:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// ---- new 
// GET /api/users  returns everyone except admins

// GET /api/users?role=student  only students

// GET /api/users?role=faculty  only faculty

const allUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const roleFilter = req.query.role;
    const query = roleFilter ? { role: roleFilter } : { role: { $ne: 'admin' } };

    const users = await User.find(query).select('-password');
    res.status(200).json(users);

  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = allUsers;


