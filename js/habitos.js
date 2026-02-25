import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("nuevoHabito");
const btn = document.getElementById("btnAgregarHabito");
const lista = document.getElementById("listaHabitos");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const ref = collection(db, "usuarios", user.uid, "habitos");

  onSnapshot(ref, snap => {
    lista.innerHTML = "";
    snap.forEach(h => {
      const li = document.createElement("li");
      li.textContent = h.data().texto;

      const borrar = document.createElement("button");
      borrar.textContent = "Borrar";
      borrar.onclick = () =>
        deleteDoc(doc(db, "usuarios", user.uid, "habitos", h.id));

      li.appendChild(borrar);
      lista.appendChild(li);
    });
  });

  btn.addEventListener("click", async () => {
    if (!input.value.trim()) return;
    await addDoc(ref, { texto: input.value });
    input.value = "";
  });
});
