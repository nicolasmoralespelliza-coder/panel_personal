import { auth, db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const btnAgregarNota = document.getElementById("btnAgregarNota");
const nuevaNota = document.getElementById("nuevaNota");
const listaNotas = document.getElementById("listaNotas");

let colorSeleccionado = "#fde68a";

/* ========================= */
/* ===== SELECTOR COLOR ==== */
/* ========================= */

document.querySelectorAll(".colores-postit span").forEach(color => {
  color.addEventListener("click", () => {

    document.querySelectorAll(".colores-postit span")
      .forEach(c => c.classList.remove("activo"));

    color.classList.add("activo");
    colorSeleccionado = color.dataset.color;
  });
});

/* ========================= */
/* ===== AUTH USER ========= */
/* ========================= */

auth.onAuthStateChanged(user => {

  if (!user) return;

  const notasRef = collection(db, "usuarios", user.uid, "notas");

  /* ========================= */
  /* ===== ESCUCHAR NOTAS ==== */
  /* ========================= */

  onSnapshot(notasRef, snap => {

    listaNotas.innerHTML = "";

    snap.forEach(d => {
      const data = d.data();

      crearNotaElemento(
        d.id,
        data.texto,
        data.color,
        data.x || 50,
        data.y || 50,
        user.uid
      );
    });

  });

  /* ========================= */
  /* ===== AGREGAR NOTA ====== */
  /* ========================= */

  btnAgregarNota.addEventListener("click", async () => {

    if (!nuevaNota.value.trim()) return;

    await addDoc(notasRef, {
      texto: nuevaNota.value,
      color: colorSeleccionado,
      x: 100,
      y: 100,
      fecha: new Date()
    });

    nuevaNota.value = "";
  });

});


/* ========================= */
/* ===== CREAR ELEMENTO ==== */
/* ========================= */

function crearNotaElemento(id, texto, color, x, y, uid) {

  const div = document.createElement("div");
  div.classList.add("postit");
  div.style.background = color;
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.position = "absolute";
  div.textContent = texto;

  /* ===== BOTON BORRAR ===== */

  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "X";
  btnBorrar.style.marginTop = "10px";

  btnBorrar.addEventListener("click", async () => {
    await deleteDoc(doc(db, "usuarios", uid, "notas", id));
  });

  div.appendChild(btnBorrar);

  /* ===== DRAG REAL ===== */

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  div.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - div.offsetLeft;
    offsetY = e.clientY - div.offsetTop;
    div.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    div.style.left = (e.clientX - offsetX) + "px";
    div.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", async () => {
    if (!isDragging) return;

    isDragging = false;
    div.style.cursor = "grab";

    await updateDoc(
      doc(db, "usuarios", uid, "notas", id),
      {
        x: parseInt(div.style.left),
        y: parseInt(div.style.top)
      }
    );
  });

  listaNotas.appendChild(div);
}
