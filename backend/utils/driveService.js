const fs = require("fs");
const axios = require("axios");

// Servicio que permite subir una nueva imagen de perfil para un usuario
// Regresa como resultado la URL de la imagen y el id de la imagen
exports.uploadImageToGoogleDrive = async (file, filename) => {
    const imagenBuffer = fs.readFileSync(file);
    const base64Image = imagenBuffer.toString("base64");

    const payload = {
        base64: base64Image,
        filename: filename,
        mimeType: "image/jpeg"
    };

    const response = await axios.post("", payload, {
        headers: { "Content-Type": "application/json" }
    });

    return response.data;
};