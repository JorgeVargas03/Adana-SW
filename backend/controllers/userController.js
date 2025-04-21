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
  const { name, lastname, profile_picture } = req.body;

  const updateData = { name, lastname, profile_picture };

  const result = await userService.updateUserProfile(userId, updateData);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  return res.status(200).json({ message: result.message });
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

// Controlador para obtener usuario por ID
exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  const result = await userService.getUserById(userId);

  if (!result.success) {
    return res.status(result.status).json({ message: result.message });
  }

  res.status(200).json(result.data);
};



