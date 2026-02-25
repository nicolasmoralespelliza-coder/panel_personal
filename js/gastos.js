import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

let uid;

const concepto = document.getElementById("concepto");
const monto = document.getElementById("monto");
const btn = document.getElementById("btnAgregarGasto");
const lista = document.getElementById("listaGastos");

auth.onAuthStateChanged(user => {
  if (!user) return;
  uid = user.uid;

  const gastosRef = collection(db, "usuarios", uid, "gastos");

  // ESCUCHAR CAMBIOS
  onSnapshot(gastosRef, snap => {
    lista.innerHTML = "";
    let total = 0;

    snap.forEach(doc => {
      const g = doc.data();
      total += g.monto;

      const li = document.createElement("li");
      li.textContent = `${g.concepto} - $${g.monto}`;
      lista.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
    lista.appendChild(totalLi);
  });

  // AGREGAR GASTO
  btn.addEventListener("click", async () => {
    if (!concepto.value || !monto.value) return;

    await addDoc(gastosRef, {
      concepto: concepto.value,
      monto: Number(monto.value),
      fecha: new Date()
    });

    concepto.value = "";
    monto.value = "";
  });
});
