// script.js

// Elementos del HTML
const generarBtn = document.getElementById("generarBtn");
const descripcion = document.getElementById("descripcion");
const resultado = document.getElementById("resultado");
const lenguajeSelect = document.getElementById("lenguaje");

// Historial local para la sesión
let historial = [];

// Evento click del botón
generarBtn.addEventListener("click", async () => {
  const prompt = descripcion.value.trim();
  if (!prompt) {
    alert("Escribe algo antes de generar la app.");
    return;
  }

  const idioma = "es"; // Cambiar a "en" si quieres inglés
  const lenguaje = lenguajeSelect.value;

  try {
    // --- Fetch al backend con tu URL real ---
    const response = await fetch("https://generador-ia-7m7r.onrender.com", {
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
      // Actualizar historial
      historial = data.historial;
      // Mostrar resultado en el <pre>
      resultado.textContent = data.respuesta;
    } else {
      resultado.textContent = "Error: no se recibió respuesta de la IA.";
    }
  } catch (error) {
    console.error(error);
    resultado.textContent = "Error al conectar con el servidor.";
  }
});

