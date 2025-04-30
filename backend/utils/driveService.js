const axios = require("axios");

const appURL = process.env.WEB_APP_URL;

// Servicio que permite subir una nueva imagen de perfil para un usuario
// Recibe buffer o base64, nombre de archivo y tipo MIME
exports.uploadImageToGoogleDrive = async (input, filename, mimeType) => {
  // Si input es un buffer (archivo real), conviértelo a base64
  let base64;

  if (Buffer.isBuffer(input)) {
    base64 = input.toString('base64');
  } else {
    base64 = input; // Si ya era base64, lo usamos como está
  }

  const payload = {
    base64,
    filename,
    mimeType: mimeType || "image/jpeg",
  };

  const response = await axios.post(appURL, payload, {
    headers: { "Content-Type": "application/json" }
  });

  return response.data;
};
