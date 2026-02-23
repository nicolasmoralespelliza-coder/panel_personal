// Importaciones del SDK de Firebase (versión modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuración REAL de tu proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCNBRO2d8H9wX4IbcC8ws15XfKOJFM781o",
  authDomain: "panel-personal-5eba6.firebaseapp.com",
  projectId: "panel-personal-5eba6",
  storageBucket: "panel-personal-5eba6.appspot.com",
  messagingSenderId: "788694625133",
  appId: "1:788694625133:web:07931ec4eed42cd7304864",
  measurementId: "G-XV8EF5BTXK"
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Authentication
export const auth = getAuth(app);

// Confirmación en consola
console.log("🔥 Firebase inicializado correctamente (REAL)");
