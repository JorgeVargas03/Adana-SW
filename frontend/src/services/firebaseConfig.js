// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "TU_API_KEY", 
    authDomain: "adana-sw.firebaseapp.com",
    projectId: "adana-sw",
    storageBucket: "adana-sw.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID", 
    appId: "TU_APP_ID", 
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };