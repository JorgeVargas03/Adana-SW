// routes/classRoutes.js

const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.post('/:instructorId/newClass', classController.createNewClass);
router.get('/availability', classController.getCalendarAvailability);
router.get('/', classController.getAllClassesHistory);


module.exports = router;
