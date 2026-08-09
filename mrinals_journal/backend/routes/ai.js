const express = require("express")
const auth = require("../middleware/auth")
const { GoogleGenAI } = require("@google/genai")

const router = express.Router()
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

router.post("/enhance", async (req, res) => {
    try {
        const { action, content } = req.body


        if (!content) {
            return res.status(400).json({ erro: "Content is required" })
        }


        let prompt = ""

        switch (action) {
            case "fix_grammer":
                prompt = `You are a professional technical editor. Fix any grammar and spelling errors in the following text
                .Preserve the original Markdown formatting and tone. Do Not add any introductory text,
                just return the fixed text:\n\n${content}`;
                break;
            case "generate_title":
                prompt = `Read the following article and generate a catchy, SEO-friendly title(max 60 characters). Return Only the title,
                no quotes or extra text:\n\n${content}
                `;
                break;
            case "summarize":
                prompt = `Generate a concise 3-bullet point TL;DR summary of the following text. Format it as a 
                Markdown list. Do NOT add introductory text:\n\n${content}`
                break;
            default:
                return res.status(400).json({ error: "Invalid action" })
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })


        res.json({ result: response.text.trim() })


    } catch (error) {
        console.error("AI Generate Error:", error)
        res.status(500).json({ error: "Failed to generate AI content" })

    }
})

module.exports = router