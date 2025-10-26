document.getElementById("generarBtn").addEventListener("click", () => {
    const descripcion = document.getElementById("descripcion").value;
    const resultado = document.getElementById("resultado");

    // Por ahora solo muestra lo que escribiste
    resultado.textContent = `Aquí se generará el código de la app según: "${descripcion}"`;

    // Luego conectaremos esto a la IA para que genere código real
});
