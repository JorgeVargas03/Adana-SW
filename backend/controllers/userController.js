// controllers/userController.js
const userService = require('../services/userService');

//Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  const response = await userService.getAllUsers();

  if (!response.success) {
    return res.status(404).json({ message: response.message });
  }

  return res.status(200).json(response.data);
};

//Cambiar el estado de un usuario
exports.updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { status } = req.body;

  // Validar que se proporcionó un nuevo estado
  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  const response = await userService.updateUserStatusService(userId, status);

  if (!response.success) {
    return res.status(404).json({ message: response.message });
  }

  return res.status(200).json({ message: response.message });
};

// Controlador para actualizar el perfil de un usuario
exports.updateUserProfile = async (req, res) => {
  const userId = req.params.userId;
  const { name, lastname, phone } = req.body; // El texto sigue igual
  const profilePictureFile = req.file; // <- El archivo viene aquí

  const updateData = { name, lastname, phone };

  // Si viene imagen nueva
  if (profilePictureFile) {
    updateData.profile_picture = profilePictureFile; // Mandamos el archivo a servicio
  }

  const result = await userService.updateUserProfile(userId, updateData);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message, error: result.error });
  }

  return res.status(200).json({ message: result.message, profileP: result.profileImage });
};


// Controlador para actualizar la contraseña del usuario
exports.updatePassword = async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Se requieren la contraseña actual y la nueva contraseña" });
  }

  const result = await userService.updateUserPassword(userId, currentPassword, newPassword);
  return res.status(result.status || 200).json({ message: result.message });
};

// Controlador para saber si un usuario tiene una contraseña registrada
exports.getHasPassword = async (req, res) => {
  const userId = req.params.userId;

  const result = await userService.userHasPassword(userId);
  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json({ hasPassword: result.hasPassword });
};


// Controlador para obtener usuario por ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  const result = await userService.getUserById(userId);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json(result.data);
};


// Controlador para subir una imagen a Cloudinary (libre)
exports.uploadImageProfile = async (req, res) => {
  const imageFile = req.file;
  const { filename } = req.body;

  // Validar que se proporcionó una imagen
  if (!imageFile) {
    return res.status(400).json({ message: "Se requiere una imagen" });
  }

  // Validar que se proporcionó un nombre de archivo
  if (!filename) {
    return res.status(400).json({ message: "Se requiere un nombre de archivo" });
  }

  const result = await userService.uploadImageProfile(imageFile, filename);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json({ 
    success: result.success,
    profileImageUrl: result.profileImageUrl, 
    message: result.message 
  });
};
