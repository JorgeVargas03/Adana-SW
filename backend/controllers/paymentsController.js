const paymentService = require("../services/paymentService");
const classService = require("../services/classService");

exports.capturePaymentAndReserve = async (req, res) => {
    const { orderId, userId, classId, instructorId } = req.body;

    try {
        // 1. Obtener datos necesarios
        const instructorDoc = await userCollection.doc(instructorId).get();
        const instructorData = instructorDoc.data();
        const classData = instructorData.classes[classId];

        // 2. Capturar el pago
        const paymentResult = await paymentService.captureAndRegisterPayment(orderId, userId, classData);

        if (!paymentResult.success) {
            return res.status(400).json({ success: false, message: "Pago no capturado" });
        }

        // 3. Hacer la reserva
        const reservationResult = await classService.reserveClass(userId, classId, instructorId);

        if (!reservationResult.success) {
            return res.status(400).json({ success: false, message: "Pago hecho, pero no se pudo reservar la clase" });
        }

        return res.json({ success: true, message: "Pago capturado y clase reservada exitosamente" });
    } catch (error) {
        console.error("Error al capturar y reservar:", error);
        return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
};

exports.createOrder = async (req, res) => {
  const { classId, instructorId } = req.body;

  try {
      const instructorDoc = await userCollection.doc(instructorId).get();
      if (!instructorDoc.exists) {
          return res.status(404).json({ success: false, message: "Instructor no encontrado" });
      }

      const instructorData = instructorDoc.data();
      const classData = instructorData.classes?.[classId];

      if (!classData) {
          return res.status(404).json({ success: false, message: "Clase no encontrada" });
      }

      const result = await paymentService.createPayment(classData);

      if (!result.success) {
          return res.status(500).json({ success: false, message: "No se pudo crear el pago" });
      }

      const orderId = result.data.id;
      const approvalLink = result.data.links.find(link => link.rel === "approve")?.href;

      if (!approvalLink) {
          return res.status(500).json({ success: false, message: "No se encontró el enlace de aprobación de PayPal" });
      }

      return res.json({
          success: true,
          orderId,
          approvalLink
      });

  } catch (error) {
      console.error("Error al crear la orden:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
