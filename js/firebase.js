// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNBRO2d8H9wX4IbcC8ws15XfKOJFM781o",
  authDomain: "panel-personal-5eba6.firebaseapp.com",
  projectId: "panel-personal-5eba6",
  storageBucket: "panel-personal-5eba6.firebasestorage.app",
  messagingSenderId: "788694625133",
  appId: "1:788694625133:web:07931ec4eed42cd7304864",
  measurementId: "G-XV8EF5BTXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
