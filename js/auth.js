import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* FUNCION PARA MOSTRAR MENSAJE */
function mostrarMensaje(texto, tipo="success"){

  const toast = document.getElementById("toast");

  toast.textContent = texto;

  toast.className = "show " + tipo;

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  },3000);

}


/* LOGIN */
window.login = function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)

    .then(() => {

      mostrarMensaje("Login correcto", "success");

    })

    .catch(err => {

      mostrarMensaje(err.message, "error");

    });

};


/* REGISTRO */
window.registro = function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)

    .then(() => {

      mostrarMensaje("Usuario creado", "success");

    })

    .catch(err => {

      mostrarMensaje(err.message, "error");

    });

};
