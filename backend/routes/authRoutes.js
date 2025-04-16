// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/get', authController.getAllUsers);
router.

module.exports = router;
