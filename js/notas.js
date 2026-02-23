import { auth, db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid;
auth.onAuthStateChanged(user => uid = user.uid);

window.agregarNota = async () => {
  if (!nuevaNota.value) return;

  await addDoc(collection(db, "usuarios", uid, "notas"), {
    texto: nuevaNota.value,
    fecha: new Date()
  });

  nuevaNota.value = "";
};

onSnapshot(
  () => collection(db, "usuarios", uid, "notas"),
  snap => {
    listaNotas.innerHTML = "";
    snap.forEach(n => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <p>${n.data().texto}</p>
        <button onclick="borrarNota('${n.id}')">🗑</button>
      `;
      listaNotas.appendChild(div);
    });
  }
);

window.borrarNota = async (id) => {
  await deleteDoc(doc(db, "usuarios", uid, "notas", id));
};
