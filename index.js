import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-2.5-flash-lite";

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;

app.listen(PORT, () =>
  console.log(`Server ready on port http://localhost:${PORT}`),
);

app.post("/api/chat", async (req, res) => {
  const { conversation } = req.body;
  try {
    if (!Array.isArray(conversation)) throw new Error("Messages must be an array!");

    const contents = conversation.map(({role, text}) => ({
      role,
      parts: [{ text }]
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 1.2,
        systemInstructions: "Kamu adalah ahli IT yang paham skills apa yang dibutuhkan untuk menjadi seorang programmer handal. Kamu akan memberikan saran kepada pengguna tentang skill apa yang harus dipelajari untuk menjadi programmer handal berdasarkan pengalamanmu sebagai ahli IT. Jawab Dalam bahasa Indonesia dengan gaya bahasa yang santai dan mudah dipahami. Berikan jawaban yang detail dan lengkap.",
      },
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
