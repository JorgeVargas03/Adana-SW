// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//Middlewares
const upload = require('../middleware/uploadMiddleware');
//Esta implementacion queda temporalmente desactivada hasta se llegue a la parte de autenticacion de usuarios
//const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', userController.getAllUsers);
router.patch('/:userId/status', userController.updateUserStatus);
router.patch('/profile/:userId/updateProfile', upload.single('profile_picture'), userController.updateUserProfile);
router.put('/profile/:userId/updatePassword', userController.updatePassword);
router.get('/profile/:userId/hasPassword', userController.getHasPassword);
router.get('/:userId/info', userController.getUserById);

module.exports = router;
