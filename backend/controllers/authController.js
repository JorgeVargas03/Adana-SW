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

//Función para registrar a un usuario con Google
exports.loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    // 1. Verificar el ID token de Google con Firebase Admin
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { uid, email, name } = decodedToken;

    // 2. Buscar si ya existe ese usuario en Firestore
    const userSnapshot = await userCollection.where("email", "==", email).get();

    let userDoc;
    let user;

    if (!userSnapshot.empty) {
      // Usuario ya existe → login
      userDoc = userSnapshot.docs[0];
      user = userDoc.data();
    } else {
      // Usuario no existe → registrar nuevo
      const userData = {
        name: name || "",
        lastname: "",
        email,
        role: "cliente" || "instructor",
        isVerified: true,
        registeredAt: new Date().toISOString()
      };

      const newUserRef = await userCollection.add(userData);
      userDoc = await newUserRef.get();
      user = userData;
      user.id = newUserRef.id;
    }

    // 3. Generar token JWT
    const token = jwt.sign(
      {
        userId: userDoc.id,
        name: user.name,
        lastname: user.lastname || "",
        email: user.email,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "Inicio de sesión con Google exitoso",
      token,
      user: {
        id: userDoc.id,
        name: user.name,
        lastname: user.lastname || "",
        email: user.email,
        role: user.role
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
      return res.status(400).json({ message: "Correo o ocntraseña incorrectos" });
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

    const time = "30m";
    // Generar un token JWT
    const token = jwt.sign(
      { userId: userDoc.id, 
        username: user.username,
        userlastname: user.lastname,
        useremail: user.email,
        userrole: user.role
      },
      SECRET_KEY,
      { expiresIn: time }
    );

    res.status(200).json({
      message: `Inicio de sesión exitoso. Sesión válida durante: ${time}`,
      token,
      user: {
        id: userDoc.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
  
  }
};

//Función para iniciar sesión con Google
exports.signinWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name } = decodedToken;

    // Buscar el usuario en Firestore
    const userSnapshot = await userCollection.where("email", "==", email).get();

    if (userSnapshot.empty) {
      return res.status(404).json({
        message: "No existe una cuenta asociada a ese correo. Por favor, regístrate primero."
      });
    }

    const userDoc = userSnapshot.docs[0];
    const user = userDoc.data();

    const token = jwt.sign(
      {
        userId: userDoc.id,
        name: user.name,
        lastname: user.lastname || "",
        email: user.email,
        role: user.role
      },
      SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      message: "Inicio de sesión con Google exitoso",
      token,
      user: {
        id: userDoc.id,
        name: user.name,
        lastname: user.lastname || "",
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    res.status(500).json({ message: "Error al verificar token de Google" });
  }
};
