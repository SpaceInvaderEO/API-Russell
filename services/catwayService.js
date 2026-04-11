const Catway = require('../models/Catway');

/**
 * Récupère tous les catways de la base de données.
 * 
 * @returns {Promise<Array>} Liste de tous les catways.
 */
exports.getAllCatways = async () => {
    return await Catway.find();
};

/**
 * Récupère un catway par son numéro unique.
 * 
 * @param {number} catwayNumber - Le numéro du catway à rechercher.
 * @returns {Promise<Object|null>} Le catway trouvé ou null.
 */
exports.getCatwayById = async (catwayNumber) => {
    return await Catway.findOne({ catwayNumber });
};

/**
 * Crée un nouveau catway après avoir vérifié que son numéro n'existe pas déjà.
 * 
 * @param {Object} catwayData - Les données du nouveau catway.
 * @returns {Promise<Object>} Le catway créé.
 * @throws {Error} Si le numéro de catway existe déjà.
 */
exports.createCatway = async (catwayData) => {
    const existing = await Catway.findOne({ catwayNumber: catwayData.catwayNumber });
    if (existing) {
        throw new Error('Catway number already exists');
    }

    const catway = new Catway({
        catwayNumber: catwayData.catwayNumber,
        catwayType: catwayData.catwayType,
        catwayState: catwayData.catwayState
    });
    return await catway.save();
};

/**
 * Met à jour l'état d'un catway spécifique.
 * 
 * @param {number} catwayNumber - Le numéro du catway.
 * @param {Object} updateData - Les données à mettre à jour (notamment catwayState).
 * @returns {Promise<Object|null>} Le catway mis à jour ou null si inexistant.
 */
exports.updateCatway = async (catwayNumber, updateData) => {
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
        return null;
    }

    if (updateData.catwayState) {
        catway.catwayState = updateData.catwayState;
    }

    return await catway.save();
};

/**
 * Supprime un catway de la base.
 * 
 * @param {number} catwayNumber - Le numéro du catway à supprimer.
 * @returns {Promise<boolean>} True si supprimé, false sinon.
 */
exports.deleteCatway = async (catwayNumber) => {
    const result = await Catway.deleteOne({ catwayNumber });
    return result.deletedCount > 0;
};
