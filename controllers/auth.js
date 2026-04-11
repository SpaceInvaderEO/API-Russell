const authService = require('../services/authService');

/**
 * Gère la connexion des utilisateurs.
 * Vérifie les identifiants, génère un token JWT et définit un cookie sécurisé.
 * 
 * @param {Object} req - Objet de requête Express contenant email et password dans le body.
 * @param {Object} res - Objet de réponse Express.
 */
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

/**
 * Gère la déconnexion des utilisateurs.
 * Supprime le cookie de session contenant le token.
 * 
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 */
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
};
