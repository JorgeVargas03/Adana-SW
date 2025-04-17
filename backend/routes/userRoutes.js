// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Esta implementacion queda temporalmente desactivada hasta se llegue a la parte de autenticacion de usuarios
//const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', userController.getAllUsers);
router.patch('/:userId/status', userController.updateUserStatus);

module.exports = router;
