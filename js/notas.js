import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("nuevaNota");
const btn = document.getElementById("btnAgregarNota");
const lista = document.getElementById("listaNotas");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const notasRef = collection(db, "usuarios", user.uid, "notas");

  onSnapshot(notasRef, snap => {
    lista.innerHTML = "";

    snap.forEach(n => {
      const nota = document.createElement("div");
      nota.className = "postit";

      nota.innerHTML = `
        <p>${n.data().texto}</p>
        <button class="borrar-postit">✕</button>
      `;

      nota.querySelector("button").onclick = () =>
        deleteDoc(doc(db, "usuarios", user.uid, "notas", n.id));

      lista.appendChild(nota);
    });
  });

  btn.addEventListener("click", async () => {
    if (!input.value.trim()) return;

    await addDoc(notasRef, {
      texto: input.value,
      fecha: new Date()
    });

    input.value = "";
  });
});
