import { auth, db } from "./firebase.js";
import {
  collection, addDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid;
auth.onAuthStateChanged(user => uid = user.uid);

window.agregarGasto = async () => {
  if (!concepto.value || !monto.value) return;

  await addDoc(collection(db, "usuarios", uid, "gastos"), {
    concepto: concepto.value,
    monto: Number(monto.value),
    fecha: new Date()
  });

  concepto.value = "";
  monto.value = "";
};

onSnapshot(
  () => collection(db, "usuarios", uid, "gastos"),
  snap => {
    listaGastos.innerHTML = "";
    let total = 0;

    snap.forEach(g => {
      total += g.data().monto;
      const li = document.createElement("li");
      li.textContent = `${g.data().concepto} - $${g.data().monto}`;
      listaGastos.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
    listaGastos.appendChild(totalLi);
  }
);
