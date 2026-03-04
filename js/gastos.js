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
    const tipoInput = document.getElementById("gastoTipo");
    const btn = document.getElementById("btnAgregarGasto");
    const lista = document.getElementById("listaGastos");
    const filtroMes = document.getElementById("filtroMes");
    const canvas = document.getElementById("graficoGastos");

    const totalIngresosEl = document.getElementById("totalIngresos");
    const totalEgresosEl = document.getElementById("totalEgresos");
    const balanceFinalEl = document.getElementById("balanceFinal");

    const hoy = new Date();
    const mesActual = hoy.toISOString().slice(0, 7);
    if (filtroMes) filtroMes.value = mesActual;

    const ref = query(
      collection(db, "usuarios", user.uid, "gastos"),
      orderBy("fecha", "desc")
    );

    let grafico;
    let gastosData = [];

    onSnapshot(ref, snap => {

      gastosData = [];

      snap.forEach(g => {
        gastosData.push({
          id: g.id,
          ...g.data()
        });
      });

      renderizar();
    });

    btn.addEventListener("click", async () => {

      if (!conceptoInput.value || !montoInput.value) return;

      await addDoc(collection(db, "usuarios", user.uid, "gastos"), {
        concepto: conceptoInput.value,
        monto: Number(montoInput.value),
        tipo: tipoInput.value,
        fecha: new Date()
      });

      conceptoInput.value = "";
      montoInput.value = "";
    });

    filtroMes?.addEventListener("change", renderizar);

    function renderizar() {

      lista.innerHTML = "";

      let ingresos = 0;
      let egresos = 0;

      let categorias = {};

      const mesSeleccionado = filtroMes?.value;

      gastosData.forEach(g => {

        const fecha = g.fecha?.toDate();
        const mesDoc = fecha ? fecha.toISOString().slice(0, 7) : null;

        if (mesSeleccionado && mesDoc !== mesSeleccionado) return;

        if (g.tipo === "ingreso") {
          ingresos += g.monto;
        } else {
          egresos += g.monto;
        }

        if (!categorias[g.concepto]) {
          categorias[g.concepto] = 0;
        }

        categorias[g.concepto] += g.monto;

        const li = document.createElement("li");

        li.innerHTML = `
          ${g.concepto}
          <strong style="color:${g.tipo === "ingreso" ? "limegreen" : "red"}">
            ${g.tipo === "ingreso" ? "+" : "-"}$${g.monto.toLocaleString()}
          </strong>
        `;

        const borrar = document.createElement("button");
        borrar.textContent = "Borrar";
        borrar.onclick = () =>
          deleteDoc(doc(db, "usuarios", user.uid, "gastos", g.id));

        li.appendChild(borrar);
        lista.appendChild(li);
      });

      const balance = ingresos - egresos;

      totalIngresosEl.textContent = "$" + ingresos.toLocaleString();
      totalEgresosEl.textContent = "$" + egresos.toLocaleString();
      balanceFinalEl.textContent = "$" + balance.toLocaleString();

      actualizarGrafico(ingresos, egresos);
    }

    function actualizarGrafico(ingresos, egresos) {

      if (!canvas) return;

      if (grafico) grafico.destroy();

      grafico = new Chart(canvas, {
        type: "doughnut",
        data: {
          labels: ["Ingresos", "Egresos"],
          datasets: [{
            data: [ingresos, egresos],
            backgroundColor: ["#16a34a", "#dc2626"]
          }]
        },
        options: {
          responsive: true
        }
      });
    }

  });

});
