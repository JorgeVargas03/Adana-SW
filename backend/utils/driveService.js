const axios = require("axios");

const appURL = process.env.WEB_APP_URL;

// Servicio que permite subir una nueva imagen de perfil para un usuario
// Recibe base64, nombre de archivo y tipo MIME
// Regresa la URL de la imagen y el ID del archivo en Drive
exports.uploadImageToGoogleDrive = async (base64, filename, mimeType) => {
  const payload = {
    base64,
    filename,
    mimeType: mimeType || "image/jpeg" // fallback por si no lo mandan
  };

  const response = await axios.post(appURL, payload, {
    headers: { "Content-Type": "application/json" }
  });

  return response.data;
};
