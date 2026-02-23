import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

c// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNBRO2d8H9wX4IbcC8ws15XfKOJFM781o",
  authDomain: "panel-personal-5eba6.firebaseapp.com",
  projectId: "panel-personal-5eba6",
  storageBucket: "panel-personal-5eba6.firebasestorage.app",
  messagingSenderId: "788694625133",
  appId: "1:788694625133:web:07931ec4eed42cd7304864",
  measurementId: "G-XV8EF5BTXK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("🔥 Firebase REAL inicializado");
