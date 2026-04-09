const express = require('express');
const router = express.Router({ mergeParams: true });
const reservationsController = require('../controllers/reservations');
const auth = require('../middlewares/auth');

router.get('/', auth, reservationsController.getReservationsByCatway);
router.get('/:idReservation', auth, reservationsController.getReservationById);
router.post('/', auth, reservationsController.createReservation);
router.delete('/:idReservation', auth, reservationsController.deleteReservation);

module.exports = router;
