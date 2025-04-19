// routes/classRoutes.js

const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

//Esta implementacion queda temporalmente desactivada hasta se llegue a la parte de autenticacion de usuarios
//const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/:instructorId/newClass', classController.createNewClass);
router.get('/availability', classController.getCalendarAvailability);
router.get('/', classController.getAllClassesHistory);
router.post('/reserve/:userId', classController.reserveClass);
router.get("/reserves/:userId", classController.getUserReservations);
router.get('/instructor/:instructorId/myClasses', classController.getInstructorClasses);




module.exports = router;
