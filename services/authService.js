const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.authenticate = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return null;
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        token,
        userId: user._id,
        username: user.username
    };
};
