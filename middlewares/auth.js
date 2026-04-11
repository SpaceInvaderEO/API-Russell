const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = null;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            throw new Error('No token found');
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.redirect('/index.html?error=unauthorized');
        }
        res.status(401).json({ message: 'Authentication required' });
    }
};
