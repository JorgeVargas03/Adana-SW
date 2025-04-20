const fs = require("fs");
const axios = require("axios");

const appURL = process.env.WEB_APP_URL;

exports.uploadImageToGoogleDrive = async (file, filename) => {
  const imagenBuffer = fs.readFileSync(file);
  const base64Image = imagenBuffer.toString("base64");

  const payload = {
    base64: base64Image,
    filename: filename,
    mimeType: "image/jpeg"
  };

  const response = await axios.post(appURL, payload, {
    headers: { "Content-Type": "application/json" }
  });

  return response.data;
};

