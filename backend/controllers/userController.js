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
  