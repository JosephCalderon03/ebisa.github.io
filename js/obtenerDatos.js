// js/obtenerDatos.js

let codigos_excel = [];
let codigoIngresado = null;
let agentes_excel = [];


const URL_API_SHEET = "https://script.google.com/macros/s/AKfycbyUdb29_JoA8zVs08w6f5jO5nvs6sfagkpRXsETZsrs1E_oKjeTjQP5GijzTWn_GBrxeg/exec";

obtenerDatos();



function obtenerDatos() {
fetch(URL_API_SHEET)
    .then(res => res.json())
    .then(data => {
      codigos_excel = data.Agentes.map(entry => entry.Código);
      agentes_excel = data.Agentes.map(entry => entry.Agente);
      console.log("Códigos:", codigos_excel);
      console.log("Agentes:", agentes_excel);
    })
    .catch(err => console.error("Error al leer datos de la hoja:", err));
}




  function login() {
     // Asegurarse de que los datos se obtienen antes de validar el código
    obtenerDatos();
    
    
    
     const inputCodigo = document.getElementById("codigo").value.trim();


    if (codigos_excel.includes(inputCodigo)) {
      const index = codigos_excel.indexOf(inputCodigo);
      const agente = agentes_excel[index];
      localStorage.setItem("login", true); // Guardar el código en localStorage
      localStorage.setItem("codigo_local", inputCodigo); // Guardar el código en localStorage
      localStorage.setItem("agente", agente); // Guardar el agente en localStorage
      alert(`¡Bienvenido, ${agente}!`);
      window.location.href = "index.html"; // Redirigir a la página principal
    } else
    {
      alert("Código no encontrado. Por favor, verifica el código e inténtalo de nuevo.");
    }

  }