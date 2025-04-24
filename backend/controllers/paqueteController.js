const { db } = require("../firebase");
const userCollection = db.collection("users");
const paymentsCollection = db.collection("payments");
const classesCollection = db.collection("classes");

exports.confirmarCompraPaquete = async (req, res) => {
  try {
    const { userId, selectedClasses, totalFromFrontend, paypalTransactionId } = req.body;

    if (!userId || !selectedClasses || !paypalTransactionId) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // 1. Validar cantidad y calcular precio
    const precioPorClase = 300;
    const tieneDescuento = selectedClasses.length >= 3;
    const totalCalculado = selectedClasses.length * precioPorClase;
    const totalConDescuento = totalCalculado * (1 - (tieneDescuento ? 0.10 : 0));

    if (Math.abs(totalConDescuento - totalFromFrontend) > 1) {
      return res.status(400).json({ message: "El total no coincide con el esperado." });
    }

    // 2. Validar existencia y disponibilidad de cada clase
    for (const clase of selectedClasses) {
      const claseRef = classesCollection.doc(clase.id);
      const claseDoc = await claseRef.get();

      if (!claseDoc.exists) {
        return res.status(404).json({ message: `La clase '${clase.name}' no existe.` });
      }

      const data = claseDoc.data();
      if (data.reserved >= data.capacity) {
        return res.status(400).json({ message: `La clase '${clase.name}' ya no tiene cupos disponibles.` });
      }
    }

    // 3. Obtener datos del usuario
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ message: "Usuario no encontrado." });
    const userData = userDoc.data();

    // 4. Registrar en payments
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

    // 5. Agregar clases al perfil del usuario
    const nuevasClases = [...(userData.classes || []), ...selectedClasses];
    await userCollection.doc(userId).update({ classes: nuevasClases });

    // 6. Actualizar el contador de reservados en cada clase
    for (const clase of selectedClasses) {
      const claseRef = classesCollection.doc(clase.id);
      await claseRef.update({
        reserved: db.FieldValue.increment(1)
      });
    }

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
