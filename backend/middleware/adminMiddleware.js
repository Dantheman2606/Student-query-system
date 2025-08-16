const User = require('../models/user');

const adminMiddleware = async (req, res, next) => {
   
    const userId = req.user.id;

    try {
        const user = await User.findById(userId).select('+role');

        if(user.role != 'admin') {
            return res.status(403).json({
                message: "Only admin is authorized to do this action!"
            })
        }
            next();

    }
    catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });

    }

};

module.exports = adminMiddleware;