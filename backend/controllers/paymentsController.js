const paymentService = require("../services/paymentService");
const classService = require("../services/classService");


/* INICIO - CONTROLADORES PARA CREAR Y CAPTURAR ORDEN DE PAGO - EXCLUSIVO PARA 1 CLASE     */

//Servicio para capturar pago y reserver clase
/*exports.capturePaymentAndReserve = async (req, res) => {
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

//Crear orden de pago para una clase
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
}; */
/* FIN - CONTROLADORES PARA CREAR Y CAPTURAR ORDEN DE PAGO - EXCLUSIVO PARA 1 CLASE     */

/* --------------------------------------------------------------------------------------*/

/* INICIO - CONTROLADORES PARA CREAR Y CAPTURAR ORDEN DE PAGO - UTIL PARA 1 O MAS CLASES     */

//Controlador para crear orden pago para 1 o mas clases
exports.createOrder = async (req, res) => {
    const { userId, selectedClasses } = req.body;

    if (!userId || !Array.isArray(selectedClasses) || selectedClasses.length === 0) {
        return res.status(400).json({ success: false, message: "Datos insuficientes para crear la orden" });
    }

    try {
        let total = 0;
        const classDescriptions = [];

        // Obtener datos de cada clase y acumular el total
        for (const { classId, instructorId } of selectedClasses) {
            const instructorDoc = await userCollection.doc(instructorId).get();
            if (!instructorDoc.exists) {
                return res.status(404).json({ success: false, message: `Instructor no encontrado: ${instructorId}` });
            }

            const instructorData = instructorDoc.data();
            const classData = instructorData.classes?.[classId];

            if (!classData) {
                return res.status(404).json({ success: false, message: `Clase no encontrada: ${classId}` });
            }

            total += parseFloat(classData.price);
            classDescriptions.push(classData.title);
        }

        // Aplicar descuento si aplica
        const descuento = selectedClasses.length >= 3 ? 0.10 : 0;
        const totalConDescuento = total * (1 - descuento);

        // Crear orden de pago
        const result = await paymentService.createPayment({
            price: totalConDescuento,
            title: `Paquete de ${selectedClasses.length} clase(s): ${classDescriptions.join(", ")}`
        });

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

//Controlador para capturar y registrar el pago (1 o mass clases)
exports.capturePaymentAndReserve = async (req, res) => {
    const { orderId, userId, selectedClasses } = req.body;
  
    try {
      // Validar entrada mínima
      if (!Array.isArray(selectedClasses) || selectedClasses.length === 0) {
        return res.status(400).json({ success: false, message: "No se proporcionaron clases para reservar" });
      }
  
      // 1. Obtener los datos de cada clase y calcular total con posible descuento
      let totalCalculado = 0;
      const preparedClasses = [];
  
      for (const { classId, instructorId } of selectedClasses) {
        const instructorDoc = await userCollection.doc(instructorId).get();
        if (!instructorDoc.exists) {
          return res.status(404).json({ success: false, message: `Instructor ${instructorId} no encontrado` });
        }
  
        const instructorData = instructorDoc.data();
        const classData = instructorData.classes?.[classId];
  
        if (!classData) {
          return res.status(404).json({ success: false, message: `Clase ${classId} no encontrada` });
        }
  
        totalCalculado += parseFloat(classData.price || 0);
  
        preparedClasses.push({ classId, instructorId, classData });
      }
  
      // 2. Calcular descuento si aplica
      const descuento = selectedClasses.length >= 3 ? 0.10 : 0;
      const totalConDescuento = totalCalculado * (1 - descuento);
  
      // 3. Capturar el pago en PayPal
      const paymentResult = await paymentService.captureAndRegisterPayment(orderId, userId, {
        price: totalConDescuento,
        title: `Reserva de ${selectedClasses.length} clase(s)`,
      });
  
      if (!paymentResult.success) {
        return res.status(400).json({ success: false, message: "Pago no capturado" });
      }
  
      // 4. Reservar múltiples clases
      const reservaResult = await classService.reserveMultipleClasses(userId, selectedClasses);
  
      if (!reservaResult.success) {
        return res.status(400).json({
          success: false,
          message: "Pago hecho, pero ocurrió un error al reservar las clases",
          results: reservaResult.results
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Pago capturado y clases reservadas",
        results: reservaResult.results,
        descuento_aplicado: descuento > 0,
        total_pagado: totalConDescuento.toFixed(2),
      });
  
    } catch (error) {
      console.error("Error en captura y reserva múltiple:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  };
  

