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
    localStorage.setItem("user", JSON.stringify(user));
    return user;

  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Lanza un error personalizado
      throw { code: 'USER_NOT_FOUND', message: 'Usuario no registrado', profile: result.user };
    }
  }
};
