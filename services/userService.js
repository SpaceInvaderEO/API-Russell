const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getAllUsers = async () => {
    return await User.find({}, '-password');
};

exports.getUserByEmail = async (email) => {
    return await User.findOne({ email }, '-password');
};

exports.createUser = async (userData) => {
    const existing = await User.findOne({ email: userData.email });
    if (existing) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = new User({
        username: userData.username,
        email: userData.email,
        password: hashedPassword
    });
    return await user.save();
};

exports.updateUser = async (email, updateData) => {
    const user = await User.findOne({ email });
    if (!user) {
        return null;
    }

    if (updateData.username) user.username = updateData.username;
    if (updateData.password) {
        user.password = await bcrypt.hash(updateData.password, 10);
    }

    return await user.save();
};

exports.deleteUser = async (email) => {
    const result = await User.deleteOne({ email });
    return result.deletedCount > 0;
};
