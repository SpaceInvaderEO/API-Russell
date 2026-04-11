const catwayService = require('../services/catwayService');

/**
 * Récupère la liste de tous les catways.
 * 
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 */
exports.getAllCatways = async (req, res) => {
    try {
        const catways = await catwayService.getAllCatways();
        res.status(200).json(catways);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Récupère un catway spécifique par son identifiant (numéro).
 * 
 * @param {Object} req - Objet de requête Express contenant l'ID dans params.
 * @param {Object} res - Objet de réponse Express.
 */
exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catwayService.getCatwayById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(catway);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Crée un nouveau catway.
 * Valide la présence des champs obligatoires et le type de catway.
 * 
 * @param {Object} req - Objet de requête Express contenant les données du catway.
 * @param {Object} res - Objet de réponse Express.
 */
exports.createCatway = async (req, res) => {
    const { catwayNumber, catwayType, catwayState } = req.body;
 
    if (!catwayNumber || !catwayType || !catwayState) {
        return res.status(400).json({ message: 'All fields are required (catwayNumber, catwayType, catwayState)' });
    }
 
    if (!['long', 'short'].includes(catwayType)) {
        return res.status(400).json({ message: 'Invalid catwayType (must be long or short)' });
    }

    try {
        const newCatway = await catwayService.createCatway(req.body);
        res.status(201).json(newCatway);
    } catch (err) {
        if (err.message === 'Catway number already exists') {
            return res.status(409).json({ message: err.message });
        }
        res.status(400).json({ message: err.message });
    }
};

/**
 * Met à jour l'état d'un catway existant.
 * 
 * @param {Object} req - Objet de requête Express contenant l'ID et les données de mise à jour.
 * @param {Object} res - Objet de réponse Express.
 */
exports.updateCatway = async (req, res) => {
    try {
        const updatedCatway = await catwayService.updateCatway(req.params.id, req.body);
        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json(updatedCatway);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * Supprime un catway de la base de données.
 * 
 * @param {Object} req - Objet de requête Express contenant l'ID dans params.
 * @param {Object} res - Objet de réponse Express.
 */
exports.deleteCatway = async (req, res) => {
    try {
        const success = await catwayService.deleteCatway(req.params.id);
        if (!success) {
            return res.status(404).json({ message: 'Catway not found' });
        }
        res.status(200).json({ message: 'Catway deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
