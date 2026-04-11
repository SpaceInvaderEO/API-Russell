const Reservation = require('../models/Reservation');

/**
 * Récupère toutes les réservations enregistrées dans la base de données.
 * 
 * @returns {Promise<Array>} Liste de toutes les réservations.
 */
exports.getAllReservations = async () => {
    return await Reservation.find();
};

/**
 * Récupère les réservations associées à un numéro de catway spécifique.
 * 
 * @param {number} catwayNumber - Le numéro du catway.
 * @returns {Promise<Array>} Liste des réservations pour ce catway.
 */
exports.getReservationsByCatway = async (catwayNumber) => {
    return await Reservation.find({ catwayNumber });
};

/**
 * Récupère une réservation spécifique par son identifiant unique (MongoDB _id).
 * 
 * @param {string} idReservation - L'identifiant de la réservation.
 * @returns {Promise<Object|null>} La réservation trouvée ou null.
 */
exports.getReservationById = async (idReservation) => {
    return await Reservation.findById(idReservation);
};

const Catway = require('../models/Catway');

/**
 * Crée une nouvelle réservation après avoir vérifié l'existence du catway associé.
 * 
 * @param {number} catwayNumber - Le numéro du catway concerné.
 * @param {Object} reservationData - Les détails de la réservation (nom client, bateau, dates).
 * @returns {Promise<Object>} La réservation créée.
 * @throws {Error} Si le catway spécifié n'existe pas.
 */
exports.createReservation = async (catwayNumber, reservationData) => {
    const catway = await Catway.findOne({ catwayNumber });
    if (!catway) {
        throw new Error('Catway not found');
    }

    const reservation = new Reservation({
        catwayNumber: catwayNumber,
        clientName: reservationData.clientName,
        boatName: reservationData.boatName,
        startDate: reservationData.startDate,
        endDate: reservationData.endDate
    });
    return await reservation.save();
};

/**
 * Supprime une réservation spécifique de la base de données.
 * 
 * @param {string} idReservation - L'identifiant de la réservation à supprimer.
 * @returns {Promise<boolean>} True si la suppression a réussi, false sinon.
 */
exports.deleteReservation = async (idReservation) => {
    const result = await Reservation.deleteOne({ _id: idReservation });
    return result.deletedCount > 0;
};

/**
 * Met à jour les détails d'une réservation existante.
 * 
 * @param {string} idReservation - L'identifiant de la réservation.
 * @param {Object} updateData - Les nouvelles données de réservation.
 * @returns {Promise<Object|null>} La réservation mise à jour ou null si inexistante.
 */
exports.updateReservation = async (idReservation, updateData) => {
    const reservation = await Reservation.findById(idReservation);
    if (!reservation) {
        return null;
    }

    if (updateData.clientName) reservation.clientName = updateData.clientName;
    if (updateData.boatName) reservation.boatName = updateData.boatName;
    if (updateData.startDate) reservation.startDate = updateData.startDate;
    if (updateData.endDate) reservation.endDate = updateData.endDate;

    return await reservation.save();
};
