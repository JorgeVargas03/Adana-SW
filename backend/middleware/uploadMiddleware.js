const multer = require('multer');

// Configuración de multer (temporal en memoria)
const storage = multer.memoryStorage(); 

const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Validar tipo de archivo (opcional)
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Solo se permiten imágenes'), false);
    }
    cb(null, true);
  },
});

module.exports = upload;
