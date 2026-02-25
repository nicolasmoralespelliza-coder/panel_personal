import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const concepto = document.getElementById("concepto");
const monto = document.getElementById("monto");
const btn = document.getElementById("btnAgregarGasto");
const lista = document.getElementById("listaGastos");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const ref = collection(db, "usuarios", user.uid, "gastos");

  onSnapshot(ref, snap => {
    lista.innerHTML = "";
    let total = 0;

    snap.forEach(g => {
      total += g.data().monto;

      const li = document.createElement("li");
      li.textContent = `${g.data().concepto} - $${g.data().monto}`;

      const borrar = document.createElement("button");
      borrar.textContent = "Borrar";
      borrar.onclick = () =>
        deleteDoc(doc(db, "usuarios", user.uid, "gastos", g.id));

      li.appendChild(borrar);
      lista.appendChild(li);
    });

    const liTotal = document.createElement("li");
    liTotal.innerHTML = `<strong>Total: $${total}</strong>`;
    lista.appendChild(liTotal);
  });

  btn.addEventListener("click", async () => {
    if (!concepto.value || !monto.value) return;

    await addDoc(ref, {
      concepto: concepto.value,
      monto: Number(monto.value),
      fecha: new Date()
    });

    concepto.value = "";
    monto.value = "";
  });
});
