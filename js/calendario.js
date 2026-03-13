import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {

  const calendarEl = document.getElementById("calendar");

  if (!calendarEl) return;

  auth.onAuthStateChanged(async user => {
    if (!user) return;

    let eventos = [];

    // TAREAS
    const tareasSnap = await getDocs(collection(db, "usuarios", user.uid, "tareas"));
    tareasSnap.forEach(doc => {
      const data = doc.data();

      if (data.fecha) {
        eventos.push({
          title: "✅ " + data.texto,
          start: data.fecha.toDate(),
          color: "#22c55e"
        });
      }
    });

    // GASTOS
    const gastosSnap = await getDocs(collection(db, "usuarios", user.uid, "gastos"));
    gastosSnap.forEach(doc => {
      const data = doc.data();

      if (data.fecha) {
        eventos.push({
          title: "💸 " + data.concepto + " $" + data.monto,
          start: data.fecha.toDate(),
          color: "#ef4444"
        });
      }
    });

    // NOTAS
    const notasSnap = await getDocs(collection(db, "usuarios", user.uid, "notas"));
    notasSnap.forEach(doc => {
      const data = doc.data();

      if (data.fecha) {
        eventos.push({
          title: "📝 " + data.texto,
          start: data.fecha.toDate(),
          color: "#3b82f6"
        });
      }
    });

    // HABITOS
    const habitosSnap = await getDocs(collection(db, "usuarios", user.uid, "habitos"));
    habitosSnap.forEach(doc => {
      const data = doc.data();

      if (data.fecha) {
        eventos.push({
          title: "🔁 " + data.nombre,
          start: data.fecha.toDate(),
          color: "#a855f7"
        });
      }
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {

      initialView: "dayGridMonth",

      locale: "es",

      height: 650,

      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay"
      },

      events: eventos

    });

    calendar.render();

  });

});
