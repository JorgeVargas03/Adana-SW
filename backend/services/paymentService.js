// services/paymentService.js
const axios = require("axios");
const { paymentsCollection } = require("../models/payments");

const CLIENT = process.env.PAYPAL_CLIENT_ID;
const SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com"; // cambiar a live en producción

const getAccessToken = async () => {
  const auth = Buffer.from(`${CLIENT}:${SECRET}`).toString("base64");
  const res = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, "grant_type=client_credentials", {
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data.access_token;
};

//Servicio para capturar y registrar pago (1 o mas clases)
exports.captureAndRegisterPayment = async (orderId, userId, classData) => {
  try {
    const accessToken = await getAccessToken();

    const captureRes = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const transaction = captureRes.data.purchase_units[0].payments.captures[0];

    // Guardar en Firestore
    const paymentId = `payment_${Date.now()}`;
    await paymentsCollection.doc(paymentId).set({
      client_id: userId,
      amount: parseFloat(classData.price),
      date: new Date().toISOString(),
      method: "PayPal",
      status: transaction.status.toLowerCase(),
    });

    return { success: true, paymentId, transaction };
  } catch (error) {
    console.error("Error al capturar pago:", error?.response?.data || error);
    return { success: false, message: "Error al capturar el pago" };
  }
};


exports.createPayment = async (classData) => {
  try {
    const accessToken = await getAccessToken();

    const res = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "MXN",
              value: classData.price.toFixed(2),
            },
            description: classData.title,
          }
        ],
        application_context: {
          return_url: "http://localhost:5173/reservation", // URL a la que PayPal redirige tras aprobar
          cancel_url: "http://localhost:5173/reservation", // URL a la que redirige si se cancela
        }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error al crear pago con PayPal:", error.response?.data || error);
    return { success: false, message: "Error al iniciar pago con PayPal" };
  }
};


