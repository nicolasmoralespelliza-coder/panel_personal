import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loader = document.getElementById("loader");

function mostrarLoader(){
  loader.style.display="block";
}

function ocultarLoader(){
  loader.style.display="none";
}

function mostrarMensaje(texto){

  const modal = document.getElementById("modalMensaje");
  const textoMensaje = document.getElementById("textoMensaje");

  textoMensaje.textContent = texto;
  modal.classList.add("show");

}

window.cerrarMensaje = function(){

  const modal = document.getElementById("modalMensaje");
  modal.classList.remove("show");

}

window.login = function(){

  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  mostrarLoader();

  signInWithEmailAndPassword(auth,email,password)

  .then(()=>{
    ocultarLoader();
    mostrarMensaje("✅ Login correcto");

    setTimeout(()=>{
      window.location.href="dashboard.html";
    },1500);

  })

  .catch(err=>{
    ocultarLoader();
    mostrarMensaje("❌ "+err.message);
  });

}


window.registro = function(){

  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;

  mostrarLoader();

  createUserWithEmailAndPassword(auth,email,password)

  .then(()=>{
    ocultarLoader();
    mostrarMensaje("✅ Usuario creado");
  })

  .catch(err=>{
    ocultarLoader();
    mostrarMensaje("❌ "+err.message);
  });

}


window.verPassword=function(){

  const pass=document.getElementById("password");

  if(pass.type==="password"){
    pass.type="text";
  }else{
    pass.type="password";
  }

}
