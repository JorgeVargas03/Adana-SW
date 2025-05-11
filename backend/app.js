const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const paymentsRoutes = require("./routes/paymentsRoutes");

// Habilita CORS para permitir solicitudes desde tu frontend
const allowedOrigins = [
  process.env.URL_LOCAL,
  process.env.URL_RENDER, // reemplaza con tu URL real de Render
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
}));
//const paqueteRoutes = require("./routes/paquete.routes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/adana-api/v1/users", userRoutes);
app.use("/adana-api/v1/classes", classRoutes);
app.use("/adana-api/v1/payments", paymentsRoutes);
//app.use("/api", paqueteRoutes);

// Middleware para rutas no definidas (404 global)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint no encontrado. Verifica la ruta solicitada.",
    attemptedUrl: `${req.method} ${req.originalUrl}`
  });
});

const PORT = process.env.PORT || 3001;

app.use(express.json({ limit: '2mb' })); // Limitar el tamaño del JSON a 2MB
app.use(express.urlencoded({ limit: '2mb', extended: true }));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  console.log(`URL base: http://localhost:${PORT}/`);
});



