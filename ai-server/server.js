import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

if (!process.env.ARVAN_API_KEY) {
  console.error("ARVAN_API_KEY is missing.");
  process.exit(1);
}

if (!process.env.ARVAN_BASE_URL) {
  console.error("ARVAN_BASE_URL is missing.");
  process.exit(1);
}

const client = new OpenAI({
  apiKey: process.env.ARVAN_API_KEY,
  baseURL: process.env.ARVAN_BASE_URL,
});

/* --------------------------------
   Health Check
--------------------------------- */

app.get("/", (req, res) => {
  res.send("KIZUNA AI Server is running.");
});

/* --------------------------------
   AI Connection Test
--------------------------------- */

app.get("/test-ai", async (req, res) => {
  try {
    const response = await client.chat.completions.create({
      model: "GPT-4.1-Mini",
      messages: [
        {
          role: "user",
          content: "فقط بنویس: اتصال KIZUNA برقرار است",
        },
      ],
    });

    return res.json({
      message: response.choices[0]?.message?.content,
    });
  } catch (error) {
    console.error("AI connection error:", error);

    return res.status(500).json({
      error: "AI connection failed.",
      details:
        error instanceof Error
          ? error.message
          : "Unknown AI connection error.",
    });
  }
});

/* --------------------------------
   Persian Synopsis
--------------------------------- */

app.post("/api/translate", async (req, res) => {
  try {
    const { text } = req.body;

    if (typeof text !== "string" || !text.trim()) {
      return res.status(400).json({
        error: "A non-empty text value is required.",
      });
    }

    const response = await client.chat.completions.create({
      model: "GPT-4.1-Mini",
      messages: [
        {
          role: "system",
          content: 
`You are the Persian-language synopsis assistant for KIZUNA, a manga discovery application.

Your output must always be fluent, natural, readable Persian suitable for a manga synopsis.

Follow these rules carefully:

1. If the source text is meaningful English, translate it accurately and naturally into Persian.

2. If the source is Faker-generated, pseudo-Latin, lorem-ipsum-like, grammatically meaningless, corrupted, or otherwise impossible to translate meaningfully, DO NOT transliterate its Latin words into Persian.

3. For meaningless synthetic input, write a short and coherent Persian manga-style synopsis instead of producing phonetic Persian spellings.

4. When creating a synopsis from meaningless synthetic input, use only recognizable concepts if any exist. Do not invent specific character names, locations, events, powers, relationships, or plot details that are not supported by the source.

5. If almost no meaningful information can be recovered from the source, produce a short neutral synopsis about an unspecified protagonist facing an uncertain journey or conflict. Keep it generic rather than fabricating detailed story information.

6. Never produce Persian phonetic spellings of meaningless Latin or pseudo-Latin words.

7. Preserve real character names, place names, and established manga terminology only when they are clearly identifiable.

8. Do not mention that the source is fake, generated, corrupted, Faker-generated, pseudo-Latin, or meaningless.

9. Do not explain your reasoning or translation decisions.

10. Return only the final Persian synopsis. Do not include a heading, quotation marks, notes, markdown, or commentary.
          `.trim(),
        },
        {
          role: "user",
          content: text.trim(),
        },
      ],
    });

    const translatedText =
      response.choices[0]?.message?.content?.trim();

    if (!translatedText) {
      throw new Error(
        "The AI returned an empty translation."
      );
    }
    return res.json({
      translatedText,
      targetLanguage: "fa",
    });
  } catch (error) {
    console.error("Translation error:", error);

    return res.status(500).json({
      error: "Translation failed.",
      details:
        error instanceof Error
          ? error.message
          : "Unknown translation error.",
    });
  }
});

/* --------------------------------
   AI Manga Discovery
--------------------------------- */

app.post("/api/discover", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return res.status(400).json({
        error: "A non-empty prompt is required.",
      });
    }

    const response = await client.chat.completions.create({
      model: "GPT-4.1-Mini",
      messages: [
        {
          role: "system",
          content: 
`You are the discovery intelligence for KIZUNA, a manga discovery application.

Your job is to understand what kind of manga the user wants and convert their natural-language request into structured search preferences.

Available manga genre IDs:

1 = Action
2 = Adventure
8 = Drama
10 = Fantasy
14 = Horror
22 = Romance
24 = Sci-Fi
36 = Slice of Life
37 = Supernatural

Rules:
- Select only genres strongly supported by the user's request.
- Return at most 3 genre IDs.
- If no genre is clearly implied, return an empty genres array.
- minScore must be a number from 0 to 10 or null.
- Use orderBy "score" when the user wants highly rated or best-rated manga.
- Otherwise use orderBy "popularity".
- sort must always be "desc".
- Return valid JSON only.
- Do not include markdown.
- Do not include explanations outside the JSON.

Required JSON structure:

{
  "genres": [],
  "minScore": null,
  "orderBy": "popularity",
  "sort": "desc"
}
          `.trim(),
        },
        {
          role: "user",
          content: prompt.trim(),
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const content =
      response.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error(
        "The AI returned an empty discovery response."
      );
    }

    const preferences = JSON.parse(content);

    return res.json({
      preferences,
    });
  } catch (error) {
    console.error("Discovery error:", error);

    return res.status(500).json({
      error: "AI discovery failed.",
      details:
        error instanceof Error
          ? error.message
          : "Unknown discovery error.",
    });
  }
});

/* --------------------------------
   Start Server
--------------------------------- */

app.listen(PORT, () => {
  console.log(
    `KIZUNA AI Server running on http://localhost:${PORT}`
  );
});