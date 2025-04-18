// routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/google', authController.loginWithGoogle);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/google/signin', authController.signinWithGoogle);

module.exports = router;
