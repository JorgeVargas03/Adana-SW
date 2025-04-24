const express = require("express");
const router = express.Router();
const { confirmarCompraPaquete } = require("../controllers/paquete.controller");

router.post("/paquetes/confirmar-compra", confirmarCompraPaquete);

module.exports = router;
