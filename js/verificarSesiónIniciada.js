let codigos_excel = [];

let agentes_excel = [];

let codigo_local = localStorage.getItem("codigo_local");

console.log("Código local:", codigo_local);

const URL_API_SHEET = "https://script.google.com/macros/s/AKfycbyUdb29_JoA8zVs08w6f5jO5nvs6sfagkpRXsETZsrs1E_oKjeTjQP5GijzTWn_GBrxeg/exec";
fetch(URL_API_SHEET)
    .then(res => res.json())
    .then(data => {
      codigos_excel = data.Agentes.map(entry => entry.Código);
      agentes_excel = data.Agentes.map(entry => entry.Agente);
      console.log("Códigos:", codigos_excel);
      console.log("Agentes:", agentes_excel);

      if (codigos_excel.includes(codigo_local)) {
      const index = codigos_excel.indexOf(codigo_local);
      const agente = agentes_excel[index];
       // Guardar el agente en localStorage
      alert(`¡Bienvenido, ${agente}!`);
       // Redirigir a la página principal
    } else
    {
      alert("Código no encontrado. Por favor, verifica el código e inténtalo de nuevo.");
      localStorage.removeItem("login"); // Eliminar el estado de sesión iniciada
      window.location.href = "login.html";
    }



    })
    .catch(err => console.error("Error al leer datos de la hoja:", err));
    


