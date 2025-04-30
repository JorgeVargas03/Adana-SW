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

// Controlador para reservar mas de una clase (paquete de clases)
exports.confirmarCompraPaquete = async (req, res) => {
  try {
    const { userId, selectedClasses, totalFromFrontend, paypalTransactionId } = req.body;

    if (!userId || !selectedClasses || !paypalTransactionId) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // 1. Validar cantidad de clases
    const descuento = selectedClasses.length >= 3 ? 0.10 : 0;
    const totalCalculado = selectedClasses.length * 300; // Suponiendo que cada clase cuesta $300
    const totalConDescuento = totalCalculado * (1 - descuento);

    // 2. Comparar con total enviado por frontend
    if (Math.abs(totalConDescuento - totalFromFrontend) > 1) {
      return res.status(400).json({ message: "El total no coincide con el esperado." });
    }

    // 3. Obtener info del usuario
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ message: "Usuario no encontrado." });

    const userData = userDoc.data();

    // 4. Guardar en payments
    const paymentData = {
      userId,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
      phone: userData.phone,
      classList: selectedClasses,
      datePayment: new Date().toISOString(),
      total: totalConDescuento,
      method: "PayPal",
      transactionId: paypalTransactionId
    };

    await paymentsCollection.add(paymentData);

    // 5. Actualizar clases del usuario
    await userCollection.doc(userId).update({
      classes: [...(userData.classes || []), ...selectedClasses]
    });

    return res.status(200).json({
      message: "Compra registrada con éxito",
      clasesAgregadas: selectedClasses.length,
      totalPagado: totalConDescuento
    });

  } catch (error) {
    console.error("Error al confirmar compra:", error);
    res.status(500).json({ message: "Error interno al confirmar compra" });
  }
};


// Controlador para consultar las reservas de un usuario
exports.getUserReservations = async (req, res) => {
  const userId = req.params.userId;

  const result = await classService.getUserReservations(userId);

  if (result.success) {
    res.status(200).json({ reservaciones: result.data });
  } else {
    res.status(result.status).json({ message: result.message });
  }
};

// Controlador para consultar clases de un instructor
exports.getInstructorClasses = async (req, res) => {
  const instructorId = req.params.instructorId;

  const result = await classService.getInstructorClasses(instructorId);

  if (result.success) {
    res.status(200).json({Clases: result.data});
  } else {
    res.status(result.status).json({ message: result.message });
  }
};

// Controlador para consultar el listado de alumnos de una clase
exports.getClassWithReservations = async (req, res) => {
  const { instructorId, classId } = req.params;

  const result = await classService.getClassWithReservations(instructorId, classId);

  if (!result.success) {
    return res.status(result.code).json({ message: result.message });
  }

  res.json(result.class);
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


