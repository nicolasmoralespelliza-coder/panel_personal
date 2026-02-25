import { auth } from "./firebase.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll("[data-seccion]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".seccion").forEach(s => s.classList.remove("activa"));
      document.getElementById(btn.dataset.seccion).classList.add("activa");
    });
  });

  document.getElementById("btnLogout").addEventListener("click", async () => {
    await signOut(auth);
    window.location = "index.html";
  });

});
