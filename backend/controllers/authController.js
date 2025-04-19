// controllers/userController.js
const { userCollection } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


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