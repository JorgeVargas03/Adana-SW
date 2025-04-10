// models/publicationModel.js
const { db } = require("../config/database.config");

// Definición de la colección "publications" en Firebase
const paymentsCollection = db.collection("payments");

module.exports = { paymentsCollection };
