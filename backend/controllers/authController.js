// controllers/userController.js
const { userCollection } = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { admin } = require("../config/database.config");
const { sendWelcomeEmail } = require('../utils/emailService');


const SECRET_KEY = process.env.JWT_SECRET;

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
  const { name, lastname, password, email, gender, phone, role } = req.body;

  try {
    // Verificar si ya existe un usuario con el mismo correo
    const existingUserSnapshot = await userCollection.where("email", "==", email).get();

    if (!existingUserSnapshot.empty) {
      return res.status(400).json({ message: "El usuario ya existe con ese correo electrónico" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Construir el objeto del nuevo usuario
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

    // Si el usuario es instructor, agregar un objeto vacío de clases
    if (role.toLowerCase() === "instructor") {
      userData.classes = {};
    }

    // Guardar en Firestore
    const newUserRef = await userCollection.add(userData);
    res.status(201).json({ message: "Usuario registrado exitosamente", id: newUserRef.id });

    //Enviar correo de bienvenida al usuario
    await sendWelcomeEmail(email, name, lastname);

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

//Función para iniciar sesion con Google
exports.loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { fullName, email, photoUrl } = decodedToken;


    // Buscar el usuario en Firestore
    const userSnapshot = await userCollection.where("email", "==", email).get();

    if (userSnapshot.empty) {
      return res.status(404).json({
        message: "No existe una cuenta asociada a ese correo. Por favor, regístrate primero.",
      });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const userToken = {
      userId: userDoc.id,
      name: user.name,
      lastname: user.lastname || "",
      email: user.email,
      role: user.role
    }

    //generar token
    const token = generateToken(userToken);

    res.status(200).json({
      message: "Inicio de sesión con Google exitoso",
      token,
      user: {
        id: userDoc.id,
        name: user.name,
        lastname: user.lastname || "",
        email: user.email,
        role: user.role,
        profile_picture: user.profile_picture || ""
      }
    });
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    res.status(500).json({ message: "Error al verificar token de Google" });
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
      return res.status(400).json({ message: "Correo o contraseña incorrectos" });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    // Comparar la contraseña proporcionada con la almacenada
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Verificar si ya confirmó su correo
    //if (!user.isVerified) {
    //  return res.status(403).json({ message: "Por favor, verifica tu correo electrónico para continuar." });
    //}

    const dataUserToken = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    }

    //Generar un token con JWT
    const token = generateToken(dataUserToken);

    res.status(200).json({
      message: `Inicio de sesión exitoso. Sesión válida durante: 30 minutos`,
      token,
      user: {
        id: userDoc.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        status: user.status, 
        profile_picture: user.profile_picture || ""
      }
    });

  } catch (error) {
    console.error("Error al iniciar sesion", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

function generateToken(userData) {
  const time = "30m";
  // Generar un token JWT
  const token = jwt.sign(
    userData,
    SECRET_KEY,
    { expiresIn: time }
  );

  return token;
}


// Función para completar registro después del login con Google
exports.completeGoogleRegistration = async (req, res) => {
  const { name, lastname, email, password, gender, phone, profile_picture } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUserSnapshot = await userCollection.where("email", "==", email).get();

    if (!existingUserSnapshot.empty) {
      return res.status(400).json({ message: "Este correo ya está registrado" });
    }

    let hashedPassword = null;

    // Si se proporciona contraseña, encriptarla
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const userData = {
      name,
      lastname,
      email,
      password: hashedPassword, // puede quedar como null o no enviado si no se puso
      role: "cliente",
      status: "active",
      gender,
      phone,
      profile_picture,
      registeredAt: new Date().toISOString()
    };

    const newUserRef = await userCollection.add(userData);

    const userDataToken = {
      id: newUserRef.id,
      name: name,
      lastname: lastname,
      email: email,
      role: newUserRef.role
    }
    //Generar token para el nuevo usuario
    const token = generateToken(userDataToken);

    res.status(201).json({
      message: "Registro completado exitosamente",
      token: token,
      user: {
        id:newUserRef.id,
        name,
        lastname,
        email,
        role: newUserRef.role,
        profile_picture
      }
    });

    //Enviar correo de bienvenida al usuario
    await sendWelcomeEmail(email, name, lastname);

  } catch (error) {
    console.error("Error al completar registro con Google:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
