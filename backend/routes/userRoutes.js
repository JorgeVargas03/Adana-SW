// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Esta implementacion queda temporalmente desactivada hasta se llegue a la parte de autenticacion de usuarios
//const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', userController.getAllUsers);
router.patch('/:userId/status', userController.updateUserStatus);
router.patch('/profile/:userId/updateProfile', userController.updateUserProfile);
router.put('/profile/:userId/updatePassword', userController.updatePassword);
router.get('/:userId/info', userController.getUserById);

module.exports = router;
