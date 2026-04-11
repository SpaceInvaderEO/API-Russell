const reservationService = require('../services/reservationService');

/**
 * Récupère la liste de toutes les réservations du port.
 * 
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 */
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Récupère toutes les réservations d'un catway spécifique.
 * 
 * @param {Object} req - Objet de requête Express avec l'ID du catway dans params.
 * @param {Object} res - Objet de réponse Express.
 */
exports.getReservationsByCatway = async (req, res) => {
    try {
        const reservations = await reservationService.getReservationsByCatway(req.params.id);
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Récupère les détails d'une réservation spécifique.
 * 
 * @param {Object} req - Objet de requête Express avec l'identifiant de la réservation.
 * @param {Object} res - Objet de réponse Express.
 */
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await reservationService.getReservationById(req.params.idReservation);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Crée une nouvelle réservation pour un catway donné.
 * Vérifie la présence des champs et la validité des dates (début < fin).
 * 
 * @param {Object} req - Objet de requête Express contenant les infos de réservation.
 * @param {Object} res - Objet de réponse Express.
 */
exports.createReservation = async (req, res) => {
    const { clientName, boatName, startDate, endDate } = req.body;
 
    if (!clientName || !boatName || !startDate || !endDate) {
        return res.status(400).json({ message: 'All fields are required (clientName, boatName, startDate, endDate)' });
    }
 
    if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'startDate must be before endDate' });
    }

    try {
        const newReservation = await reservationService.createReservation(req.params.id, req.body);
        res.status(201).json(newReservation);
    } catch (err) {
        if (err.message === 'Catway not found') {
            return res.status(404).json({ message: err.message });
        }
        res.status(400).json({ message: err.message });
    }
};

/**
 * Supprime une réservation spécifique.
 * 
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 */
exports.deleteReservation = async (req, res) => {
    try {
        const success = await reservationService.deleteReservation(req.params.idReservation);
        if (!success) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Met à jour les informations d'une réservation.
 * 
 * @param {Object} req - Objet de requête Express.
 * @param {Object} res - Objet de réponse Express.
 */
exports.updateReservation = async (req, res) => {
    try {
        const updatedReservation = await reservationService.updateReservation(req.params.idReservation, req.body);
        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(updatedReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
