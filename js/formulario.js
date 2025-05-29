const URL_API_CLIENTES= "https://script.google.com/macros/s/AKfycbyUdb29_JoA8zVs08w6f5jO5nvs6sfagkpRXsETZsrs1E_oKjeTjQP5GijzTWn_GBrxeg/exec";

let clientes_excel = [];

const input = document.getElementById("cliente");
const lista = document.getElementById("lista_clientes");


fetch(URL_API_CLIENTES)
    .then(res => res.json())
    .then(data => {
      clientes_excel = data.clientes.map(entry => entry.Nombre);
      console.log("Clientes:", clientes_excel);



    clientes_excel.forEach(nombre => {
      const option = document.createElement("option");
      option.value = nombre;
      lista.appendChild(option)
       });
    
    
    })
    .catch(err => console.error("Error al leer datos de la hoja:", err));



    

      
   


    document.getElementById("formulario").addEventListener("submit", function(e) {
  e.preventDefault();
  const valorIngresado = input.value;

  // NUEVO: Verifica si el valor ingresado está en la lista
  if (clientes_excel.includes(valorIngresado)) {
    
    
     const formData = new URLSearchParams();
formData.append("cliente", valorIngresado);
formData.append("agente", localStorage.getItem("agente"));

fetch(URL_API_CLIENTES, {
  method: "POST",
  body: formData,
})
  .then(res => res.json())
  .then(data => {
    console.log("Respuesta del servidor:", data);
    alert("Datos enviados correctamente.");
  })
  .catch(err => {
    console.error("Error al enviar datos:", err);
    alert("Hubo un error al enviar los datos.");
  });
  
  
  
  
  
  } else {
    alert("Por favor selecciona un cliente válido de la lista.");
    input.focus();
  }
});
