import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCgkgyy2CUV7z1tt-PcOljbQ9rTgKlQ-Qc",
    authDomain: "login-project-4b5c6.firebaseapp.com",
    projectId: "login-project-4b5c6",
    storageBucket: "login-project-4b5c6.appspot.com",
    messagingSenderId: "84665576373",
    appId: "1:84665576373:web:eba9e1b8fc555453a907fc",
    measurementId: "G-8PF4K6KTLY"
  };


  const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);