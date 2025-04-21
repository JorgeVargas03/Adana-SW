// services/userService.js
const { userCollection } = require("../models/users");
const driveService = require('../utils/driveService');
const bcrypt = require("bcryptjs");


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

    // Verificar y preparar los campos que se desean actualizar
    for (const key of allowedFields) {
      if (updateData[key] && key !== "profile_picture") {
        fieldsToUpdate[key] = updateData[key];
      }
    }

    // Procesar imagen si viene incluida
    if (updateData.profile_picture && updateData.profile_picture.base64) {
      const b64 = updateData.profile_picture.base64;
      const mimeType = updateData.profile_picture.mimeType || "image/jpeg";

      const resPicture = await driveService.uploadImageToGoogleDrive(b64, userId, mimeType);

      if (resPicture.success) {
        fieldsToUpdate.profile_picture = resPicture.url; // Aquí guardamos la URL que regresa el Web App
      } else {
        return {
          success: false,
          status: 500,
          message: "Error al subir la imagen de perfil",
          error: resPicture.error
        };
      }
    }

    // Verifica si hay algo que actualizar
    if (Object.keys(fieldsToUpdate).length === 0) {
      return {
        success: false,
        status: 400,
        message: "No se proporcionaron datos válidos para actualizar"
      };
    }

    await userRef.update(fieldsToUpdate);

    return { success: true, message: "Perfil actualizado correctamente" };
  } catch (error) {
    console.error("Error al actualizar perfil del usuario:", error);
    return { success: false, status: 500, message: "Error interno del servidor" };
  }
};

// Servicio para actualizar la contraseña del usuario
exports.updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const userRef = userCollection.doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return { success: false, status: 404, message: "Usuario no encontrado" };
    }

    const userData = userDoc.data();
    const isMatch = await bcrypt.compare(currentPassword, userData.password);

    if (!isMatch) {
      return { success: false, status: 401, message: "La contraseña actual es incorrecta" };
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await userRef.update({ password: hashedNewPassword });

    return { success: true, message: "Contraseña actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar contraseña:", error);
    return { success: false, status: 500, message: "Error interno del servidor" };
  }
};

// Servicio para obtener usuario por ID
exports.getUserById = async (userId) => {
  try {
    const userDoc = await userCollection.doc(userId).get();

    if (!userDoc.exists) {
      return { success: false, status: 404, message: "Usuario no encontrado" };
    }

    const userData = userDoc.data();
    return {
      success: true,
      data: {
        id: userDoc.id,
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        role: userData.role,
        status: userData.status,
        gender: userData.gender,
        phone: userData.phone,
        profile_picture: userData.profile_picture || null,
        // Agrega otros campos si es necesario
      }
    };
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    return { success: false, status: 500, message: "Error interno del servidor" };
  }
};


