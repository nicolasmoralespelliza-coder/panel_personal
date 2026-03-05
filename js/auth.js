import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* MENSAJE */
function mostrarMensaje(texto){

  const toast = document.getElementById("toast");

  toast.textContent = texto;

  toast.classList.add("show");

  setTimeout(()=>{
    toast.classList.remove("show");
  },3000);

}


/* LOGIN */
window.login = function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)

    .then(() => {

      mostrarMensaje("✅ Login correcto");

    })

    .catch(err => {

      mostrarMensaje("❌ " + err.message);

    });

};


/* REGISTRO */
window.registro = function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)

    .then(() => {

      mostrarMensaje("✅ Usuario creado");

    })

    .catch(err => {

      mostrarMensaje("❌ " + err.message);

    });

};
