import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  auth.onAuthStateChanged(user => {
    if (!user) return;

    const conceptoInput = document.getElementById("gastoMotivo");
    const montoInput = document.getElementById("gastoMonto");
    const btn = document.getElementById("btnAgregarGasto");
    const lista = document.getElementById("listaGastos");
    const totalElemento = document.getElementById("totalGastos");
    const filtroMes = document.getElementById("filtroMes");
    const canvas = document.getElementById("graficoGastos");

    if (!conceptoInput || !montoInput || !btn || !lista) {
      console.error("Elementos de gastos no encontrados");
      return;
    }

    const ref = query(
      collection(db, "usuarios", user.uid, "gastos"),
      orderBy("fecha", "desc")
    );

    let grafico;

    onSnapshot(ref, snap => {
      lista.innerHTML = "";
      let total = 0;
      let categorias = {};

      const mesSeleccionado = filtroMes?.value;

      snap.forEach(g => {
        const data = g.data();
        const fecha = data.fecha?.toDate();
        const mesDoc = fecha ? fecha.toISOString().slice(0, 7) : null;

        if (mesSeleccionado && mesDoc !== mesSeleccionado) return;

        total += data.monto;

        // Agrupar por concepto
        if (!categorias[data.concepto]) {
          categorias[data.concepto] = 0;
        }
        categorias[data.concepto] += data.monto;

        const li = document.createElement("li");
        li.innerHTML = `
          ${data.concepto}
          <strong>$${data.monto.toLocaleString()}</strong>
        `;

        const borrar = document.createElement("button");
        borrar.textContent = "Borrar";
        borrar.onclick = () =>
          deleteDoc(doc(db, "usuarios", user.uid, "gastos", g.id));

        li.appendChild(borrar);
        lista.appendChild(li);
      });

      totalElemento.textContent = "$" + total.toLocaleString();

      actualizarGrafico(categorias);
    });

    btn.addEventListener("click", async () => {
      if (!conceptoInput.value || !montoInput.value) return;

      await addDoc(collection(db, "usuarios", user.uid, "gastos"), {
        concepto: conceptoInput.value,
        monto: Number(montoInput.value),
        fecha: new Date()
      });

      conceptoInput.value = "";
      montoInput.value = "";
    });

    filtroMes?.addEventListener("change", () => {
      // Forzar actualización llamando nuevamente snapshot (ya se actualiza solo)
    });

    function actualizarGrafico(categorias) {
      if (!canvas) return;

      const labels = Object.keys(categorias);
      const valores = Object.values(categorias);

      if (grafico) {
        grafico.destroy();
      }

      grafico = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: [{
            data: valores
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: getComputedStyle(document.body).getPropertyValue('--text')
              }
            }
          }
        }
      });
    }

  });

});
