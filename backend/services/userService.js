// services/userService.js
const { userCollection } = require("../models/users");
const cloudinaryService = require('../utils/cloudinaryService');
const bcrypt = require("bcryptjs");
const { sendAccountReactivationEmail } = require("../utils/emailService");
const { sendAccountDeactivationEmail } = require("../utils/emailService");


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

    const userData = userDoc.data();
    await userRef.update({ status: newStatus });

    if (newStatus === "inactive") {
      await sendAccountDeactivationEmail(userData.email, userData.firstName, userData.lastName);
    } else {
      await sendAccountReactivationEmail(userData.email, userData.firstName, userData.lastName);
    }

    return {
      success: true,
      message: "Estado del usuario actualizado exitosamente",
      status: newStatus
    };
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
    let newP = userDoc.data().profile_picture;

    if (!userDoc.exists) {
      return { success: false, status: 404, message: "Usuario no encontrado" };
    }

    const allowedFields = ["name", "lastname", "profile_picture", "phone"];
    const fieldsToUpdate = {};

    // Verificar y preparar los campos que se desean actualizar
    for (const key of allowedFields) {
      if (updateData[key] && key !== "profile_picture") {
        fieldsToUpdate[key] = updateData[key];
      }
    }

    // Procesar imagen si viene incluida
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (updateData.profile_picture) {
      const fileBuffer = updateData.profile_picture.buffer;
      const mimeType = updateData.profile_picture.mimetype;
      const fileName = userId;

      if (!allowedMimeTypes.includes(mimeType)) {
        return {
          success: false,
          status: 400,
          message: "Tipo de imagen no permitido. Solo JPG, PNG o WEBP.",
        };
      }

      const base64Image = fileBuffer.toString('base64');
      const resPicture = await cloudinaryService.uploadImageToCloudinary(base64Image, fileName, mimeType);
      newP = resPicture;
      console.log(resPicture);
      if (resPicture) {
        fieldsToUpdate.profile_picture = resPicture;
      } else {
        return {
          success: false,
          status: 500,
          message: "Error al subir la imagen de perfil",
          error: resPicture,
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
    return { success: true, profileImage: newP, message: "Perfil actualizado correctamente" };
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

//Servicio para saber si el usuario tiene una contraseña
exports.userHasPassword = async (userId) => {
  try {
    const userDoc = await userCollection.doc(userId).get();
    if (!userDoc.exists) {
      return { success: false, status: 404, hasPassword: false, message: "Usuario no encontrado" };
    }

    const userData = userDoc.data();
    const hasPassword = userData.password != null;

    return { success: true, hasPassword };
  } catch (error) {
    console.error("Error al verificar si tiene contraseña:", error);
    return { success: false, status: 500, hasPassword: false, message: "Error del servidor" };
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


