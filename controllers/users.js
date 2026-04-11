const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required (username, email, password)' });
    }

    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ id: newUser._id, username: newUser.username, email: newUser.email });
    } catch (err) {
        if (err.message === 'Email already exists') {
            return res.status(409).json({ message: err.message });
        }
        res.status(400).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.email, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ id: updatedUser._id, username: updatedUser.username, email: updatedUser.email });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const success = await userService.deleteUser(req.params.email);
        if (!success) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
