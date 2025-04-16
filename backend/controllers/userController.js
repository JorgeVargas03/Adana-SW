// controllers/userController.js
const { userCollection } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userService = require("../services/userService");

const SECRET_KEY = process.env.JWT_SECRET;

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { name, lastname, password, email, gender, phone, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Build the base user object
    const userData = {
      name,
      lastname,
      email,
      password: hashedPassword,
      role,
      status: "active",
      gender,
      phone,
      registeredAt: new Date().toISOString(),
    };

    // If the user is an instructor, add an empty object for classes
    if (role.toLowerCase() === "instructor") {
      userData.classes = {};
    }

    // Save to Firestore
    const newUserRef = await userCollection.add(userData);
    res.status(201).json({ message: "Usuario registrado exitosamente", id: newUserRef.id });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};


// Función para iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por nombre de usuario en Firestore
    const userSnapshot = await userCollection
      .where("email", "==", email)
      .get();
    if (userSnapshot.empty) {
      return res.status(400).json({ message: "Usuario no encontrado!" });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const time = "30m";
    // Generar un token JWT
    const token = jwt.sign(
      { userId: userDoc.id, username: user.username },
      SECRET_KEY,
      { expiresIn: time }
    );

    res.status(200).json({ token, info: `Inicio de sesion exitoso, sesion valida durante: ${time}` });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

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

  const response = await updateUserStatusService(userId, status);

  if (!response.success) {
    return res.status(404).json({ message: response.message });
  }

  return res.status(200).json({ message: response.message });
};


/*
const validateCredentials = async (username, password) => {
  // Validar que el username no tenga espacios y no supere los 16 caracteres
  if (!username || username.includes(" ") || username.length > 16) {
    return { valid: false, message: "El nombre de usuario no es válido, no se admite dejar en blanco, usar espacios, o exceder de 16 caracteres" };
  }

  // Validar que la contraseña tenga al menos 8 caracteres y no tenga espacios
  if (!password || password.length < 8 || password.includes(" ")) {
    return { valid: false, message: "La contraseña no cumple con los requisitos. Requisitos: mínimo 8 caracteres, NO espacios en blanco" };
  }

  try {
    // Verificar si el usuario ya existe en Firestore
    const userSnapshot = await userCollection.where("username", "==", username).get();
    if (!userSnapshot.empty) {
      return { valid: false, message: "El nombre de usuario ya está en uso" };
    }

    return { valid: true, message: "Credenciales válidas" };
  } catch (error) {
    return { valid: false, message: "Error al validar credenciales" };
  }
};

*/