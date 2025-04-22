import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../services/firebaseConfig";
import axios from "axios";

export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const idToken = await result.user.getIdToken();

  const response = await axios.post("http://localhost:3000/api/auth/google/signin", {
    idToken
  });

  const { token, user } = response.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};