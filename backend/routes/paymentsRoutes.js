const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentsController");

router.post("/paypal/capture", paymentController.capturePaymentAndReserve);
router.post("/paypal/create-order", paymentController.createOrder);


module.exports = router;
