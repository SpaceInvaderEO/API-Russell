const express = require('express');
const router = express.Router();
const catwaysController = require('../controllers/catways');
const auth = require('../middlewares/auth');

router.get('/', auth, catwaysController.getAllCatways);
router.get('/:id', auth, catwaysController.getCatwayById);
router.post('/', auth, catwaysController.createCatway);
router.put('/:id', auth, catwaysController.updateCatway);
router.delete('/:id', auth, catwaysController.deleteCatway);

module.exports = router;
