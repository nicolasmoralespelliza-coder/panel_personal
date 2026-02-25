import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const input = document.getElementById("nuevoHabito");
const btn = document.getElementById("btnAgregarHabito");
const lista = document.getElementById("listaHabitos");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const ref = collection(db, "usuarios", user.uid, "habitos");

  onSnapshot(ref, snap => {
    lista.innerHTML = "";
    snap.forEach(doc => {
      const li = document.createElement("li");
      li.textContent = doc.data().texto;
      lista.appendChild(li);
    });
  });

  btn.addEventListener("click", async () => {
    if (!input.value.trim()) return;

    await addDoc(ref, {
      texto: input.value,
      fecha: new Date()
    });

    input.value = "";
  });
});
