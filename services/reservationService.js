const Reservation = require('../models/Reservation');

exports.getAllReservations = async () => {
    return await Reservation.find();
};

exports.getReservationsByCatway = async (catwayNumber) => {
    return await Reservation.find({ catwayNumber });
};

exports.getReservationById = async (idReservation) => {
    return await Reservation.findById(idReservation);
};

exports.createReservation = async (catwayNumber, reservationData) => {
    const reservation = new Reservation({
        catwayNumber: catwayNumber,
        clientName: reservationData.clientName,
        boatName: reservationData.boatName,
        startDate: reservationData.startDate,
        endDate: reservationData.endDate
    });
    return await reservation.save();
};

exports.deleteReservation = async (idReservation) => {
    const result = await Reservation.deleteOne({ _id: idReservation });
    return result.deletedCount > 0;
};
