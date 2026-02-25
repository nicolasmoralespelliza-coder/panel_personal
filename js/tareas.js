import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("nuevaTarea");
const btn = document.getElementById("btnAgregarTarea");
const lista = document.getElementById("listaTareas");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const tareasRef = collection(db, "usuarios", user.uid, "tareas");

  // ESCUCHAR TAREAS
  onSnapshot(tareasRef, snap => {
    lista.innerHTML = "";

    snap.forEach(d => {
      const li = document.createElement("li");
      li.className = "item-tarea";

      const span = document.createElement("span");
      span.textContent = d.data().texto;

      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "🗑️";
      btnBorrar.className = "btn-borrar";

      btnBorrar.addEventListener("click", async () => {
        await deleteDoc(doc(db, "usuarios", user.uid, "tareas", d.id));
      });

      li.appendChild(span);
      li.appendChild(btnBorrar);
      lista.appendChild(li);
    });
  });

  // AGREGAR TAREA
  btn.addEventListener("click", async () => {
    if (!input.value.trim()) return;

    await addDoc(tareasRef, {
      texto: input.value,
      fecha: new Date()
    });

    input.value = "";
  });
});
