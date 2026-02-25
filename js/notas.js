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
      const div = document.createElement("div");
      div.textContent = n.data().texto;

      const btnBorrar = document.createElement("button");
      btnBorrar.textContent = "Borrar";
      btnBorrar.onclick = () =>
        deleteDoc(doc(db, "usuarios", user.uid, "notas", n.id));

      div.appendChild(btnBorrar);
      lista.appendChild(div);
    });
  });

  btn.addEventListener("click", async () => {
    if (!input.value.trim()) return;
    await addDoc(notasRef, { texto: input.value });
    input.value = "";
  });
});
