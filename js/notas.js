const btnAgregarNota = document.getElementById("btnAgregarNota");
const nuevaNota = document.getElementById("nuevaNota");
const listaNotas = document.getElementById("listaNotas");

let colorSeleccionado = "#fde68a";

// Selección de color
document.querySelectorAll(".colores-postit span").forEach(color => {
  color.addEventListener("click", () => {

    document.querySelectorAll(".colores-postit span")
      .forEach(c => c.classList.remove("activo"));

    color.classList.add("activo");

    colorSeleccionado = color.dataset.color;
  });
});

// Agregar nota
btnAgregarNota.addEventListener("click", () => {

  if (nuevaNota.value.trim() === "") return;

  const div = document.createElement("div");
  div.classList.add("postit");
  div.style.background = colorSeleccionado;
  div.innerHTML = `
    ${nuevaNota.value}
    <button>Borrar</button>
  `;

  // Botón borrar
  div.querySelector("button").addEventListener("click", () => {
    div.remove();
  });

  listaNotas.appendChild(div);
  nuevaNota.value = "";
});
