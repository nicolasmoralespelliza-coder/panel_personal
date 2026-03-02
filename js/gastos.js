import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  auth.onAuthStateChanged(user => {
    if (!user) return;

    const concepto = document.getElementById("gastoMotivo");
    const monto = document.getElementById("gastoMonto");
    const btn = document.getElementById("btnAgregarGasto");
    const lista = document.getElementById("listaGastos");

    if (!concepto || !monto || !btn || !lista) {
      console.error("Elementos de gastos no encontrados en el HTML");
      return;
    }

    const ref = collection(db, "usuarios", user.uid, "gastos");

    onSnapshot(ref, snap => {
      lista.innerHTML = "";
      let total = 0;

      snap.forEach(g => {
        const data = g.data();
        total += data.monto;

        const li = document.createElement("li");
        li.innerHTML = `
          ${data.concepto}
          <strong>$${data.monto}</strong>
        `;

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

});
