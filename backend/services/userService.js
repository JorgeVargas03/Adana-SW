// services/userService.js
const { userCollection } = require("../models/users");


//Obtener todos los usuarios registrados
exports.getAllUsers = async () => {
  try {
    const usersSnapshot = await userCollection.get();

    if (usersSnapshot.empty) {
      return { success: false, message: "No users found" };
    }

    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Server error" };
  }
}

//Cambiar el estado de un usuario, por ejemplo de activo a baneado
exports.updateUserStatusService = async (userId, newStatus) => {
  try {
    const userRef = userCollection.doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { success: false, message: "No se encontró el usuario" };
    }

    await userRef.update({ status: newStatus });
    return { success: true, message: "Estado del usuario actualizado exitosamente" };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, message: "Server error" };
  }
};

// Servicio para actualizar el perfil de un usuario
exports.updateUserProfile = async (userId, updateData) => {
  try {
    const userRef = userCollection.doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { success: false, status: 404, message: "Usuario no encontrado" };
    }

    const allowedFields = ["name", "lastname", "profile_picture"];
    const fieldsToUpdate = {};

    for (const key of allowedFields) {
      if (updateData[key]) {
        fieldsToUpdate[key] = updateData[key];
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return { success: false, status: 400, message: "No se proporcionaron datos válidos para actualizar" };
    }

    await userRef.update(fieldsToUpdate);

    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar perfil del usuario:", error);
    return { success: false, status: 500, message: "Error interno del servidor" };
  }
};
