// server.js
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Debes configurar en Render
});

// Historial global por sesión simple
let historial = [];

app.post("/api/generar", async (req, res) => {
  try {
    const { prompt, idioma } = req.body;

    historial.push({ role: "user", content: prompt });

    const mensajes = [
      { role: "system", content: `Eres una IA experta en programación y hablas en ${idioma}.` },
      ...historial
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: mensajes,
    });

    const respuesta = completion.choices[0].message.content;
    historial.push({ role: "assistant", content: respuesta });

    res.json({ respuesta, historial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando código" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Servidor corriendo en puerto ${PORT}`));
