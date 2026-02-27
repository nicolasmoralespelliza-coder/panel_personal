document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("toggleTema");

  // Cargar tema guardado
  const temaGuardado = localStorage.getItem("tema");

  if (temaGuardado) {
    document.body.setAttribute("data-theme", temaGuardado);
  }

  toggleBtn.addEventListener("click", () => {

    const temaActual = document.body.getAttribute("data-theme");

    if (temaActual === "light") {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("tema", "dark");
      toggleBtn.textContent = "🌙 Modo oscuro";
    } else {
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("tema", "light");
      toggleBtn.textContent = "☀️ Modo claro";
    }

  });

});
