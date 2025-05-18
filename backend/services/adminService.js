// services/adminService.js

const { paymentsCollection } = require("../models/payments");
const { userCollection } = require("../models/users");
const moment = require("moment");

exports.getReservationsReport = async (month, year) => {
  try {
    const startOfMonth = moment(`${year}-${month}-01`).startOf('month').toISOString();
    const endOfMonth = moment(`${year}-${month}-01`).endOf('month').toISOString();

    const snapshot = await paymentsCollection
      .where('date', '>=', startOfMonth)
      .where('date', '<=', endOfMonth)
      .get();

    if (snapshot.empty) {
      return { success: true, data: [] };
    }

    // Usar map y Promise.all para manejar operaciones asíncronas
    const reportPromises = snapshot.docs.map(async (doc) => {
      const payment = doc.data();
      const paymentDate = moment(payment.date).toDate();

      if (paymentDate >= new Date(startOfMonth) && paymentDate <= new Date(endOfMonth)) {
        const userDoc = await userCollection.doc(payment.client_id).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const numOfClasses = parseInt(payment.details.match(/\d+/)[0]);

          return {
            client_name: userData.name,
            client_email: userData.email,
            amount: payment.amount,
            classes_bought: numOfClasses,
            date: payment.date,
            status: payment.status
          };
        }
      }
      return null;
    });

    const reportData = (await Promise.all(reportPromises)).filter(item => item !== null);
    return { success: true, data: reportData };

  } catch (error) {
    console.error('Error al obtener el reporte de reservas:', error);
    return { success: false, message: "Error al obtener el reporte de reservas" };
  }
};