// script.js

// Elementos del HTML
const generarBtn = document.getElementById("generarBtn");
const descripcion = document.getElementById("descripcion");
const resultado = document.getElementById("resultado");
const lenguajeSelect = document.getElementById("lenguaje");

// Historial de la sesión
let historial = [];

// Función para enviar la solicitud al backend
generarBtn.addEventListener("click", async () => {
  const prompt = descripcion.value.trim();
  if (!prompt) {
    alert("Escribe algo antes de generar la app.");
    return;
  }

  const idioma = "es"; // Puedes cambiar a "en" para inglés
  const lenguaje = lenguajeSelect.value;

  try {
    const response = await fetch("https://TU_LINK_RENDER/api/generar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        prompt: `${prompt} (Generar en ${lenguaje})`, 
        idioma, 
        historial 
      }),
    });

    const data = await response.json();

    if (data.respuesta) {
      // Actualiza el historial
      historial = data.historial;
      // Muestra la respuesta de la IA
      resultado.textContent = data.respuesta;
    } else {
      resultado.textContent = "Error: no se recibió respuesta de la IA.";
    }
  } catch (error) {
    console.error(error);
    resultado.textContent = "Error al conectar con el servidor.";
  }
});
