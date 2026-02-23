iimport { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("nuevaTarea");
  const lista = document.getElementById("listaTareas");
  const btn = document.getElementById("btnAgregar");

  if (!input || !lista || !btn) {
    console.error("Elementos HTML de tareas no encontrados");
    return;
  }

  auth.onAuthStateChanged(user => {
    if (!user) return;

    const tareasRef = collection(db, "usuarios", user.uid, "tareas");

    // LISTENER CORRECTO
    onSnapshot(tareasRef, snapshot => {
      lista.innerHTML = "";
      snapshot.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc.data().texto;
        lista.appendChild(li);
      });
    });

    // AGREGAR TAREA
    btn.addEventListener("click", async () => {
      if (!input.value.trim()) return;

      await addDoc(tareasRef, {
        texto: input.value.trim(),
        fecha: new Date()
      });

      input.value = "";
    });
  });
});
