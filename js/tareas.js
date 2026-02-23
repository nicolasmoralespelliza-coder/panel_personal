import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid;
let tareasRef;

auth.onAuthStateChanged(user => {
  if (user) {
    uid = user.uid;
    tareasRef = collection(db, "usuarios", uid, "tareas");

    escucharTareas();
  }
});

function escucharTareas() {
  onSnapshot(tareasRef, snapshot => {
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
  });
}

window.agregarTarea = async () => {
  if (!nuevaTarea.value) return;

  await addDoc(tareasRef, {
    texto: nuevaTarea.value,
    completada: false,
    fecha: new Date()
  });

  nuevaTarea.value = "";
};

window.toggleTarea = async (id, estado) => {
  await updateDoc(doc(tareasRef, id), {
    completada: !estado
  });
};

window.borrarTarea = async (id) => {
  await deleteDoc(doc(tareasRef, id));
};
