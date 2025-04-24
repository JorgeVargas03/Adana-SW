const express = require("express");
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const paqueteRoutes = require("./routes/paquete.routes");

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/adana-api/v1/users",userRoutes);
app.use("/adana-api/v1/classes", classRoutes);
app.use("/adana-api/v1/payments", paymentsRoutes);
app.use("/api", paqueteRoutes);

//  Middleware para rutas no definidas (404 global)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint no encontrado. Verifica la ruta solicitada.",
    attemptedUrl: `${req.method} ${req.originalUrl}`
  });
});
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`URL base: https://localhost:${PORT}/`);
});



