const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Authentifie un utilisateur au moyen de son email et mot de passe.
 * Si l'authentification réussit, un token JWT est généré.
 * 
 * @param {string} email - L'adresse email de l'utilisateur.
 * @param {string} password - Le mot de passe en clair.
 * @returns {Promise<Object|null>} Retourne un objet contenant le token et les infos utilisateur, ou null en cas d'échec.
 */
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
