const { db } = require("../firebase");
const userCollection = db.collection("users");
const paymentsCollection = db.collection("payments");

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
