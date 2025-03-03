// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { get } from 'firebase/database';  
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

// Tu configuración de Firebase - Reemplaza con tus propias credenciales
const firebaseConfig = {
    apiKey: "AIzaSyC5oOJKWpG-8XeNJxETzw6E_jiqeEXh3sA",
    authDomain: "power-fittness.firebaseapp.com", // Basado en el nombre probable del proyecto
    databaseURL: "https://power-fittness-default-rtdb.firebaseio.com/",
    projectId: "project-385751675271", 
    storageBucket: "power-fittness.appspot.com", // Basado en el nombre probable del proyecto
    messagingSenderId: "385751675271", // Extraído del appId
    appId: "1:385751675271:web:7a01b08695b9b724af6322"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const googleProvider = new GoogleAuthProvider();

export { auth, database, googleProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, ref, set, get };