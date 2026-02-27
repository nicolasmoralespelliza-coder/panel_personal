document.addEventListener("DOMContentLoaded", () => {

  const btnAgregarNota = document.getElementById("btnAgregarNota");
  const nuevaNota = document.getElementById("nuevaNota");
  const listaNotas = document.getElementById("listaNotas");

  let colorSeleccionado = "#fde68a";

  // Selector de colores
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
    div.setAttribute("draggable", "true");
    div.style.background = colorSeleccionado;
    div.textContent = nuevaNota.value;

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";

    btnBorrar.addEventListener("click", () => {
      div.remove();
    });

    div.appendChild(btnBorrar);

    agregarEventosDrag(div);

    listaNotas.appendChild(div);
    nuevaNota.value = "";
  });

  // Función drag
  function agregarEventosDrag(elemento) {

    elemento.addEventListener("dragstart", () => {
      elemento.classList.add("dragging");
    });

    elemento.addEventListener("dragend", () => {
      elemento.classList.remove("dragging");
    });
  }

  listaNotas.addEventListener("dragover", e => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(listaNotas, e.clientY);

    if (afterElement == null) {
      listaNotas.appendChild(dragging);
    } else {
      listaNotas.insertBefore(dragging, afterElement);
    }
  });

  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".postit:not(.dragging)")];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }

});
