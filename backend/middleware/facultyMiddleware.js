const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const facultyMiddleware = async (req, res, next) => {
    // if(req.user.role != 'faculty') {
    //     return res.status(403).json({
    //         message: "Only faculty is authorized to do this action!"
    //     })
    // }

    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('+role');

        if(user.role != 'faculty') {
            return res.status(403).json({
                message: "Only faculty is authorized to do this action!"
            })
        }
            next();

    }
    catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });

    }

};

module.exports = facultyMiddleware;