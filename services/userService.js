const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * Récupère tous les utilisateurs de la base de données.
 * Les mots de passe sont exclus des résultats.
 * 
 * @returns {Promise<Array>} Liste de tous les utilisateurs.
 */
exports.getAllUsers = async () => {
    return await User.find({}, '-password');
};

/**
 * Récupère un utilisateur par son adresse email.
 * Le mot de passe est exclus du résultat.
 * 
 * @param {string} email - L'adresse email de l'utilisateur.
 * @returns {Promise<Object|null>} L'utilisateur trouvé ou null.
 */
exports.getUserByEmail = async (email) => {
    return await User.findOne({ email }, '-password');
};

/**
 * Crée un nouvel utilisateur administrateur.
 * Vérifie l'unicité de l'email et hache le mot de passe.
 * 
 * @param {Object} userData - Les données de l'utilisateur (username, email, password).
 * @returns {Promise<Object>} L'utilisateur créé.
 * @throws {Error} Si l'email existe déjà.
 */
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

/**
 * Met à jour les informations d'un utilisateur spécifié par son email.
 * Si un nouveau mot de passe est fourni, il est haché.
 * 
 * @param {string} email - L'email de l'utilisateur à modifier.
 * @param {Object} updateData - Les nouvelles données.
 * @returns {Promise<Object|null>} L'utilisateur mis à jour ou null si inexistant.
 */
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

/**
 * Supprime un utilisateur identifié par son email.
 * 
 * @param {string} email - L'email de l'utilisateur à supprimer.
 * @returns {Promise<boolean>} True si supprimé, false sinon.
 */
exports.deleteUser = async (email) => {
    const result = await User.deleteOne({ email });
    return result.deletedCount > 0;
};
