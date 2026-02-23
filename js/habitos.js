import { auth, db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid;
auth.onAuthStateChanged(user => uid = user.uid);

window.agregarHabito = async () => {
  if (!nuevoHabito.value) return;

  await addDoc(collection(db, "usuarios", uid, "habitos"), {
    nombre: nuevoHabito.value,
    hecho: false
  });

  nuevoHabito.value = "";
};

onSnapshot(
  () => collection(db, "usuarios", uid, "habitos"),
  snap => {
    listaHabitos.innerHTML = "";
    snap.forEach(h => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${h.data().nombre}
        <input type="checkbox" ${h.data().hecho ? "checked" : ""} 
          onchange="toggleHabito('${h.id}', ${h.data().hecho})">
      `;
      listaHabitos.appendChild(li);
    });
  }
);

window.toggleHabito = async (id, estado) => {
  await updateDoc(doc(db, "usuarios", uid, "habitos", id), {
    hecho: !estado
  });
};
