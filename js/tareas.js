import { auth, db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot, deleteDoc, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid;

auth.onAuthStateChanged(user => {
  if (user) uid = user.uid;
});

window.agregarTarea = async () => {
  const texto = nuevaTarea.value;
  if (!texto) return;

  await addDoc(collection(db, "usuarios", uid, "tareas"), {
    texto,
    completada: false
  });

  nuevaTarea.value = "";
};

onSnapshot(
  () => collection(db, "usuarios", uid, "tareas"),
  snapshot => {
    listaTareas.innerHTML = "";
    snapshot.forEach(d => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span style="text-decoration:${d.data().completada ? "line-through" : "none"}">
          ${d.data().texto}
        </span>
        <button onclick="toggleTarea('${d.id}', ${d.data().completada})">✔</button>
        <button onclick="borrarTarea('${d.id}')">🗑</button>
      `;
      listaTareas.appendChild(li);
    });
  }
);

window.toggleTarea = async (id, estado) => {
  await updateDoc(doc(db, "usuarios", uid, "tareas", id), {
    completada: !estado
  });
};

window.borrarTarea = async (id) => {
  await deleteDoc(doc(db, "usuarios", uid, "tareas", id));
};
