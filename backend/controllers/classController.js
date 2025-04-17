// controllers/classController.js
const { classService } = require("../services/classService");

// Controlador para crear una nueva clase
exports.createNewClass = async (req, res) => {
    const instructorId = req.params.instructorId;
    const classData = req.body;
  
    // Validar que se hayan recibido todos los campos necesarios
    const requiredFields = ["title", "description", "price", "schedule", "capacity"];
    const missingFields = requiredFields.filter(field => !classData[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Faltan campos obligatorios: ${missingFields.join(", ")}` });
    }
  
    const response = await classService.createClass()
  
    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }
  
    return res.status(201).json({ message: response.message, classId: response.classId });
  };