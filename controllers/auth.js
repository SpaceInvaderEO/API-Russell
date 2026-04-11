const authService = require('../services/authService');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await authService.authenticate(email, password);
        if (!result) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
        });

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
};
