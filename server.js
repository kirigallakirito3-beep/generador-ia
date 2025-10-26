// server.js

import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

// Crear la app de Express
const app = express();
app.use(cors());
app.use(express.json()); // Para poder leer JSON en el body

// Configurar OpenAI con la API Key de Render
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de configurar esta variable en Render
});
const openai = new OpenAIApi(configuration);

// Endpoint para generar código
app.post("/api/generar", async (req, res) => {
  try {
    const { prompt, idioma, historial } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "No se recibió prompt" });
    }

    // Llamada a OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Eres un asistente que genera código de apps según la descripción del usuario." },
        ...historial,
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const respuesta = completion.choices[0].message.content;

    // Actualizar historial
    const nuevoHistorial = [...historial, { role: "user", content: prompt }, { role: "assistant", content: respuesta }];

    res.json({ respuesta, historial: nuevoHistorial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al generar código con OpenAI" });
  }
});

// Puerto dinámico que Render asigna
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
