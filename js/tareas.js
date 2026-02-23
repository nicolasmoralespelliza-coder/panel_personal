import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("nuevaTarea");
  const lista = document.getElementById("listaTareas");
  const btn = document.getElementById("btnAgregar");

  auth.onAuthStateChanged(user => {
    if (!user) return;

    const tareasRef = collection(db, "usuarios", user.uid, "tareas");

    // ESCUCHAR
    onSnapshot(tareasRef, snapshot => {
      lista.innerHTML = "";
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().texto;
        lista.appendChild(li);
      });
    });

    // AGREGAR
    btn.onclick = async () => {
      if (!input.value) return;
      await addDoc(tareasRef, { texto: input.value });
      input.value = "";
    };
  });
});
