const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, usersController.getAllUsers);
router.get('/:email', auth, usersController.getUserByEmail);
router.post('/', auth, usersController.createUser);
router.put('/:email', auth, usersController.updateUser);
router.delete('/:email', auth, usersController.deleteUser);

module.exports = router;
