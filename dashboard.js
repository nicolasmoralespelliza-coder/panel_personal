import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase.js";

window.mostrarSeccion = function(id) {
  document.querySelectorAll('.seccion').forEach(s => s.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
};

window.logout = function() {
  signOut(auth).then(() => {
    window.location = "index.html";
  });
};
