const userService = require('../services/userService');

/**
 * Récupère la liste de tous les utilisateurs (administrateurs).
 * Exclut les mots de passe de la réponse.
 * 
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Récupère un utilisateur spécifique par son adresse email.
 * 
 * @param {Object} req - Objet de requête Express avec l'email dans params.
 * @param {Object} res - Objet de réponse Express.
 */
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

/**
 * Crée un nouvel utilisateur administrateur.
 * Valide la présence des champs et vérifie que l'email est unique.
 * 
 * @param {Object} req - Objet de requête Express contenant les infos utilisateur.
 * @param {Object} res - Objet de réponse Express.
 */
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

/**
 * Met à jour les informations d'un utilisateur existant.
 * 
 * @param {Object} req - Objet de requête Express avec l'email et les nouvelles données.
 * @param {Object} res - Objet de réponse Express.
 */
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

/**
 * Supprime un utilisateur de la base de données.
 * 
 * @param {Object} req - Objet de requête Express avec l'email dans params.
 * @param {Object} res - Objet de réponse Express.
 */
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
