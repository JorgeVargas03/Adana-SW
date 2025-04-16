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
      return { success: false, message: "User not found" };
    }

    await userRef.update({ status: newStatus });
    return { success: true, message: "User status updated successfully" };
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, message: "Server error" };
  }
};
