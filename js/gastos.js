import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const concepto = document.getElementById("concepto");
const monto = document.getElementById("monto");
const listaGastos = document.getElementById("listaGastos");

auth.onAuthStateChanged(user => {
  if (!user) return;

  const gastosRef = collection(db, "usuarios", user.uid, "gastos");

  // 🔄 LISTAR GASTOS
  onSnapshot(gastosRef, snapshot => {
    listaGastos.innerHTML = "";
    let total = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      total += data.monto;

      const li = document.createElement("li");
      li.textContent = `${data.concepto} - $${data.monto}`;
      listaGastos.appendChild(li);
    });

    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
    listaGastos.appendChild(totalLi);
  });

  // ➕ AGREGAR GASTO
  window.agregarGasto = async () => {
    if (!concepto.value.trim() || !monto.value) return;

    await addDoc(gastosRef, {
      concepto: concepto.value.trim(),
      monto: Number(monto.value),
      fecha: new Date()
    });

    concepto.value = "";
    monto.value = "";
  };
});
