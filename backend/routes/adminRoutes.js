// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para obtener el reporte de reservas por mes
router.get('/reservations', adminController.getReservationsReport);

module.exports = router;
