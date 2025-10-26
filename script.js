// script.js

const generarBtn = document.getElementById("generarBtn");
const descripcion = document.getElementById("descripcion");
const resultado = document.getElementById("resultado");
const lenguajeSelect = document.getElementById("lenguaje"); // si agregas un select de lenguaje

// Historial local para la sesión
let historial = [];

generarBtn.addEventListener("click", async () => {
  const prompt = descripcion.value.trim();
  if (!prompt) {
    alert("Escribe algo antes de generar la app.");
    return;
  }

  // Puedes agregar un select en tu HTML para elegir idioma, por ahora español
  const idioma = "es";

  // Enviar petición al backend
  try {
    const response = await fetch("https://TU_LINK_RENDER/api/generar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, idioma, historial }),
    });

    const data = await response.json();

    if (data.respuesta) {
      // Guardamos el historial
      historial = data.historial;

      // Mostramos el resultado
      resultado.textContent = data.respuesta;
    } else {
      resultado.textContent = "Error: no se recibió respuesta de la IA.";
    }
  } catch (error) {
    console.error(error);
    resultado.textContent = "Error al conectar con el servidor.";
  }
});
