import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("nuevaTarea");
  const lista = document.getElementById("listaTareas");
  const btn = document.getElementById("btnAgregarTarea");

  auth.onAuthStateChanged(user => {
    if (!user) return;

    const ref = collection(db, "usuarios", user.uid, "tareas");

    onSnapshot(ref, snap => {
      lista.innerHTML = "";
      snap.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d.data().texto;
        lista.appendChild(li);
      });
    });

    btn.addEventListener("click", async () => {
      if (!input.value.trim()) return;
      await addDoc(ref, { texto: input.value.trim() });
      input.value = "";
    });
  });
});
