import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebaseConfig";
import axios from "axios";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();

  try {
    const response = await axios.post("http://localhost:3001/auth/google/login", {
      idToken
    });

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(user)); //user
    console.log(token);
    console.log("Usuario recibido:", user);
    return user;

  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Lanza un error personalizado
      throw { code: 'USER_NOT_FOUND', message: 'Usuario no registrado', profile: result.user };
    }
  }
};

export const completeRegistration = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/auth/google/finishRegister", userData);

    const { token, user } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    console.log(token);
    return user;

  } catch (error) {
    console.error(error);
  }
};
