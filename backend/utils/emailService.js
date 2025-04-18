// utils/emailService.js
const nodemailer = require("nodemailer");

// Configurar el transporter para cuentas de Outlook o Hotmail
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Envía un correo de confirmación de reserva a un cliente
 * @param {string} to - Correo electrónico del cliente
 * @param {string} classData - Arreglo de informacion de la clase
 */
exports.sendConfirmationEmail = async (to, classData) => {
    const mailOptions = {
      from: `"Adana Pilates" <${process.env.EMAIL_SENDER}>`,
      to,
      subject: "Confirmación de Reserva - Adana Pilates",
      html: `
        <h2>¡Reserva confirmada! 🧘‍♀️</h2>
        <p>Hola,</p>
        <p>Has reservado exitosamente tu clase de <strong>${classData.title}</strong>.</p>
        <ul>
          <li><strong>Instructor:</strong> ${classData.instructor}</li>
          <li><strong>Fecha:</strong> ${classData.date}</li>
          <li><strong>Hora:</strong> ${classData.time}</li>
        </ul>
        <p>Te esperamos con mucha energía ✨</p>
        <p>— El equipo de Adana</p>
      `
    };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación enviado a:", to);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};
