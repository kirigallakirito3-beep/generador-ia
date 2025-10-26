// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Inicializar cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de configurar tu variable de entorno en Render
});

// Endpoint para generar código
app.post("/api/generar", async (req, res) => {
  try {
    const { prompt, lenguaje } = req.body;

    if (!prompt || !lenguaje) {
      return res.status(400).json({ error: "Faltan datos en la solicitud" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Genera código en ${lenguaje} para esto: ${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    const respuesta = completion.choices[0].message.content;
    res.json({ codigo: respuesta });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando el código" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
