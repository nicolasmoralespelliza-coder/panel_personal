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
const colores = document.querySelectorAll(".colores-postit span");

let colorSeleccionado = "#fde68a"; // color default

// Seleccionar color
colores.forEach(c => {
  c.addEventListener("click", () => {
    colores.forEach(x => x.classList.remove("activo"));
    c.classList.add("activo");
    colorSeleccionado = c.dataset.color;
  });
});

auth.onAuthStateChanged(user => {
  if (!user) return;

  const notasRef = collection(db, "usuarios", user.uid, "notas");

  onSnapshot(notasRef, snap => {
    lista.innerHTML = "";

    snap.forEach(n => {
      const nota = document.createElement("div");
      nota.className = "postit";
      nota.style.background = n.data().color || "#fde68a";

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
      color: colorSeleccionado,
      fecha: new Date()
    });

    input.value = "";
  });
});
