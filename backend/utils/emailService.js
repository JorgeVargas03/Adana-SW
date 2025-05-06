// utils/emailService.js
const nodemailer = require("nodemailer");

// Configurar el transporter para cuentas de Google
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Envía un correo de confirmación de reserva a un cliente
 * @param {string} destination - Correo electrónico del cliente
 * @param {string} classData - Arreglo de informacion de la clase
 */
exports.sendConfirmationEmail = async (destination, classData) => {
  //Convertir de fecha YYYY-MM-DD a una cadena
  const dateString = new Date(classData.date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formatedDate = dateString.toLocaleDateString('es-ES', options);

  const mailOptions = {
    from: `"Equipo Adana Pilates" <${process.env.EMAIL_SENDER}>`,
    to: destination,
    subject: "Confirmación de Reserva - Adana Pilates",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
      <h2 style="color: #4CAF50;">¡Reserva confirmada! 🧘‍♀️</h2>
      <p>Hola,</p>
      <p>Has reservado exitosamente tu clase de <strong>${classData.title}</strong>.</p>
      <ul style="list-style-type: none; padding: 0;">
        <li><strong>Instructor:</strong> ${classData.instructor}</li>
        <li><strong>Fecha:</strong> ${formatedDate}</li>
        <li><strong>Hora:</strong> ${classData.time}</li>
        <li><strong>Importe pagado:</strong>$${classData.totalPrice}</li>
      </ul>
      <p>Te esperamos con mucha energía ✨</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">

      <div style="font-size: 14px; color: #555;">
        <p><strong>— El equipo de Adana</strong></p>
        <p style="color: #388E3C; font-style: italic;">
          "Move beyond your possibilities..."
          <img src="https://cdn-icons-png.flaticon.com/512/427/427735.png" width="16" height="16" style="vertical-align: middle; margin-left: 5px;" alt="hoja ecológica"/>
        </p>
      </div>
    </div>
  `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación enviado a:", destination);
  } catch (error) {
    console.error("Error al enviar el correo de confirmación:", error);
  }
};

// Envía un correo de confirmación de reserva a un cliente, acepta desde 1, hasta mas reservas
exports.sendMultipleConfirmationEmail = async (destination, classesData = []) => {
  if (!classesData.length) return;

  // Generar bloques de HTML para cada clase
  const classesHtml = classesData.map(classItem => {
    const date = new Date(classItem.date);
    const formattedDate = date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
      <li style="margin-bottom: 15px;">
        <strong>${classItem.title}</strong><br>
        Instructor: ${classItem.instructor}<br>
        Fecha: ${formattedDate}<br>
        Hora: ${classItem.time}<br>
        Importe pagado: $${classItem.totalPrice}
      </li>
    `;
  }).join('');

  const mailOptions = {
    from: `"Equipo Adana Pilates" <${process.env.EMAIL_SENDER}>`,
    to: destination,
    subject: "Confirmación de Paquete de Clases - Adana Pilates",
    html: `
    <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
      <h2 style="color: #4CAF50;">¡Reservas confirmadas! 🧘‍♀️</h2>
      <p>Hola,</p>
      <p>Has reservado exitosamente las siguientes clases:</p>
      <ul style="list-style-type: none; padding: 0;">
        ${classesHtml}
      </ul>
      <p>¡Te esperamos con mucha energía y entusiasmo! ✨</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;">

      <div style="font-size: 14px; color: #555;">
        <p><strong>— El equipo de Adana</strong></p>
        <p style="color: #388E3C; font-style: italic;">
          "Move beyond your possibilities..."
          <img src="https://cdn-icons-png.flaticon.com/512/427/427735.png" width="16" height="16" style="vertical-align: middle; margin-left: 5px;" alt="hoja ecológica"/>
        </p>
      </div>
    </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de confirmación múltiple enviado a:", destination);
  } catch (error) {
    console.error("Error al enviar el correo múltiple:", error);
  }
};


/**
 * Envía un correo de bienvenida al nuevo usuario
 * @param {string} destination - Correo electrónico del usuario
 * @param {string} firstName - Nombre del usuario
 * @param {string} lastName - Apellido del usuario
 */
exports.sendWelcomeEmail = async (destination, firstName, lastName) => {
  const fullName = `${firstName} ${lastName}`;

  const mailOptions = {
    from: `"Equipo Adana Pilates" <${process.env.EMAIL_SENDER}>`,
    to: destination,
    subject: "¡Bienvenido a Adana Pilates! 💚",
    html: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f8f5; padding: 25px; border-radius: 12px;">
      <h1 style="color: #2e7d32;">¡Hola ${fullName}!</h1>
      <p style="font-size: 16px; color: #333;">
        Te damos la más cordial bienvenida a <strong>Adana Pilates</strong>, un espacio dedicado a tu bienestar, equilibrio y transformación personal.
      </p>
      
      <p style="font-size: 16px; color: #333;">
        Nos alegra muchísimo tenerte con nosotros. A partir de ahora formarás parte de una comunidad que valora el movimiento consciente, la salud integral y la conexión mente-cuerpo.
      </p>

      <div style="background-color: #ffffff; padding: 20px; margin: 20px 0; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <p style="margin: 0; font-size: 15px; color: #555;">
          Aquí encontrarás clases, talleres y un equipo dedicado a acompañarte en tu camino hacia una vida más plena. 💫
        </p>
      </div>

      <p style="font-size: 15px; color: #444;">
        Si tienes dudas o necesitas ayuda, no dudes en contactarnos. ¡Estamos aquí para ti!
      </p>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://adanapilates.com" target="_blank" style="
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          text-decoration: none;
          font-size: 16px;
          font-weight: bold;
          transition: background-color 0.3s ease;">
          Visita nuestro sitio web
        </a>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

      <p style="font-size: 14px; color: #666; text-align: center;">
        Con cariño,<br/>
        <strong>El equipo de Adana Pilates</strong><br/>
        <em>"Move beyond your possibilities..."</em> 🌿
      </p>
    </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de bienvenida enviado a:", destination);
  } catch (error) {
    console.error("Error al enviar el correo de bienvenida:", error);
  }
};
