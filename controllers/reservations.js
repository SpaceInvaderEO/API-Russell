const reservationService = require('../services/reservationService');

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await reservationService.getAllReservations();
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getReservationsByCatway = async (req, res) => {
    try {
        const reservations = await reservationService.getReservationsByCatway(req.params.id);
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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

exports.createReservation = async (req, res) => {
    try {
        const newReservation = await reservationService.createReservation(req.params.id, req.body);
        res.status(201).json(newReservation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

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
