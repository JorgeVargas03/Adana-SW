// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgrpxFGEaAPept-u5kwnVu8IFGY53OgAo",
  authDomain: "adana-sw.firebaseapp.com",
  projectId: "adana-sw",
  storageBucket: "adana-sw.firebasestorage.app",
  messagingSenderId: "416286152074",
  appId: "1:416286152074:web:d1c2b781b33fce9f2a2473",
  measurementId: "G-1VHTDM7E77"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
