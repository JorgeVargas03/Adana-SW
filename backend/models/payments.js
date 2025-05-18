// models/payments.js
const { db } = require("../config/database.config");

const paymentsCollection = db.collection("payments");

module.exports = { paymentsCollection };
