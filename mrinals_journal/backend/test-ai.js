const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: "Fix grammar: Hello world this is test",
    });
    console.log("Success:", response.text);
  } catch (err) {
    console.error("Failure:", err);
  }
}

test();
