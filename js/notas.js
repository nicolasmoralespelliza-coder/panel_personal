import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const texto = document.getElementById("nuevaNota");
const btn = document.getElementById("btnAgregarNota");
const lista = document.getElementById("listaNotas");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const ref = collection(db, "usuarios", user.uid, "notas");

  onSnapshot(ref, snap => {
    lista.innerHTML = "";
    snap.forEach(doc => {
      const div = document.createElement("div");
      div.className = "nota";
      div.textContent = doc.data().texto;
      lista.appendChild(div);
    });
  });

  btn.addEventListener("click", async () => {
    if (!texto.value.trim()) return;

    await addDoc(ref, {
      texto: texto.value,
      fecha: new Date()
    });

    texto.value = "";
  });
});
