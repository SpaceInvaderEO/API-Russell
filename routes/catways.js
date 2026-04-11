const express = require('express');
const router = express.Router();
const catwaysController = require('../controllers/catways');
const reservationsController = require('../controllers/reservations');
const auth = require('../middlewares/auth');

router.get('/', auth, catwaysController.getAllCatways);
router.get('/:id', auth, catwaysController.getCatwayById);
router.post('/', auth, catwaysController.createCatway);
router.put('/:id', auth, catwaysController.updateCatway);
router.delete('/:id', auth, catwaysController.deleteCatway);

router.get('/:id/reservations', auth, reservationsController.getReservationsByCatway);
router.get('/:id/reservations/:idReservation', auth, reservationsController.getReservationById);
router.post('/:id/reservations', auth, reservationsController.createReservation);
router.put('/:id/reservations/:idReservation', auth, reservationsController.updateReservation);
router.delete('/:id/reservations/:idReservation', auth, reservationsController.deleteReservation);

module.exports = router;
