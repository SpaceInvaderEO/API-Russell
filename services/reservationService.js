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
