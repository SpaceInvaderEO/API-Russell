const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservations');
const auth = require('../middlewares/auth');

router.get('/', auth, reservationsController.getAllReservations);

module.exports = router;
