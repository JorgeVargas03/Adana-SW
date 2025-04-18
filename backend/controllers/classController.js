// controllers/classController.js
const classService = require("../services/classService");

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

    const response = await classService.createClass(instructorId, classData);

    if (!response.success) {
      return res.status(400).json({ message: response.message });
    }

    return res.status(201).json({ message: response.message, classId: response.classId });
  };


// Obtener todas las clases disponibles con su disponibilidad en colores
exports.getCalendarAvailability = async (req, res) => {
  try {
    const result = await classService.getAvailableClasses();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(404).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Controlador para reservar clase
exports.reserveClass = async (req, res) => {
  //const userId = req.userId; // Asumimos que el middleware de auth inyecta el ID del usuario
  const userId = req.params.userId;
  const { classId, instructorId } = req.body;

  if (!classId || !instructorId) {
    return res.status(400).json({ message: "Faltan datos requeridos" });
  }

  const result = await classService.reserveClass(userId, classId, instructorId);

  if (result.success) {
    return res.status(200).json({ message: result.message });
  } else {
    return res.status(400).json({ message: result.message });
  }
};



//Obtener el historial de clases creadas
exports.getAllClassesHistory = async (req, res) => {
  try {
    const result = await classService.getAllClassesHistory();

    if (!result.success) {
      return res.status(500).json({ message: result.message });
    }

    return res.status(200).json(result.data);
  } catch (error) {
    console.error("Error en controlador de historial de clases:", error);
    return res.status(500).json({ message: "Error del servidor." });
  }
};

