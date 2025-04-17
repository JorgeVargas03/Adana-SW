// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.patch('/user/:userId/status', userController.updateUserStatus);

module.exports = router;
