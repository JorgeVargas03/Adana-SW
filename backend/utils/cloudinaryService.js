const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configurar Cloudinary con las credenciales del archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para subir una imagen a Cloudinary
exports.uploadImageToCloudinary = async (input, filename, mimeType, folder = undefined) => {
  try {
    let dataUri;

    if (Buffer.isBuffer(input)) {
      // Si el input es un Buffer, convertirlo a una cadena base64
      const base64 = input.toString('base64');
      dataUri = `data:${mimeType};base64,${base64}`;
    } else if (typeof input === 'string' && input.startsWith('data:')) {
      // Si el input ya es una cadena base64 con el prefijo adecuado
      dataUri = input;
    } else if (typeof input === 'string') {
      // Si el input es una cadena base64 sin el prefijo
      dataUri = `data:${mimeType};base64,${input}`;
    } else {
      throw new Error('El tipo de input no es válido. Debe ser un Buffer o una cadena base64.');
    }

    // Subir la imagen a Cloudinary
    const result = await cloudinary.uploader.upload(dataUri, {
      folder: folder || 'users_profile', // Puedes cambiar el nombre de la carpeta según tus necesidades
      public_id: filename,       // Opcional: establecer un nombre público para la imagen
      overwrite: true,           // Opcional: sobrescribir si ya existe una imagen con el mismo public_id
    });

    // Devolver la URL segura de la imagen subida
    return result.secure_url;
  } catch (error) {
    console.error('Error al subir la imagen a Cloudinary:', error);
    throw error;
  }
};

exports.destroyImageFromCloudinary = async (publicId) => {
  const folder = 'connixia-uploads/';
  try {
    const result = await cloudinary.uploader.destroy(folder + publicId,{invalidate: true});
    return { result, success: true, message: "Imagen eliminada correctamente de Cloudinary" };
  } catch (error) {
    console.error('Error al destruir la imagen en Cloudinary:', error);
    throw error;
  }
};

exports.listResources = async () => {
  const res = await cloudinary.api.resources({
    resource_type: 'image',
    type: 'upload',
    max_results: 50 // hasta cierto tope (usa paginación con next_cursor)
  });
  return { res, success: true, message: "Imágenes listadas correctamente de Cloudinary" };
};
