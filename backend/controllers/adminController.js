// controllers/adminController.js

const adminService = require("../services/adminService");

// Controlador para obtener el reporte de reservas por mes
exports.getReservationsReport = async (req, res) => {
  const { month, year } = req.query;

  // Validar que los parámetros mes y año estén presentes
  if (!month || !year) {
    return res.status(400).json({ success: false, message: "Mes y año son requeridos" });
  }

  try {
    const result = await adminService.getReservationsReport(month, year);

    if (result.success) {
      // Enviar los datos al cliente (Insomnia)
      return res.status(200).json(result.data);  
    } else {
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("Error al obtener el reporte de reservas:", error);
    return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
