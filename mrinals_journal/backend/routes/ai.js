const express = require("express")
const auth = require("../middleware/auth")
const { GoogleGenAI } = require("@google/genai")
const Application = require("../models/Application")
const axios = require("axios")
const pdfParse = require("pdf-parse")
const Job = require("../models/Job")


const router = express.Router()
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

router.post("/enhance", auth, async (req, res) => {
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

router.post("/match-resume", auth, async (req, res) => {
    try {
        const { applicationId } = req.body

        if (!applicationId) {
            return res.status(400).json({ error: "applicationId is required" })

        }
        // Fetch the application with job details
        const application = await Application.findById(applicationId)
            .populate("job", "title company description")
            .populate("applicant", "username")


        if (!application) {
            return res.status(400).json({ error: "Application not found" })

        }
        if (!application.job) {
            return res.status(404).json({ error: "Job no longer exists" })
        }

        // Download the PDF From Cloudinary
        const pdfResponse = await axios.get(application.resumeUrl, {
            responseType: "arraybuffer"
        })
        // Extract text from PDF 
        const pdfData = await pdfParse(Buffer.from(pdfResponse.data))
        const resumeText = pdfData.text?.trim()

        if (!resumeText) {
            return res.status(400).json({ error: "Could not extract text from resume" })

        }
        // Build The gemini Prompt
        const prompt = `You are an expert technical recruiter. Compare the following against the job description.
        Return your response in EXACTLY this JSON format and nothing else:
        {"score":<number 0-100>, "summary":"<one sentence explaining the match>"}
        --- JOB DESCRIPTION ---
        Title: ${application.job.title}
        Company: ${application.job.company}
        ${application.job.description}

        --- RESUME TEXT ---
        ${resumeText.substring(0, 5000)}
        `

        // Call Gemini 
        const aiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        })

        // Parse the AI response 
        const rawText = aiResponse.text.trim()

        // Extract the JSON from response (handles markdown code blocks too)
        const jsonMatch = rawText.match(/\{[\s\S]*?\}/)

        if (!jsonMatch) {
            return res.status(500).json({ error: "AI returned an unexpected format" })
        }

        const parsed = JSON.parse(jsonMatch[0])
        const matchScore = Math.min(100, Math.max(0, Number(parsed.score)))
        const matchSummary = parsed.summary || "No summary available"

        // Cache the result on the Application document
        application.matchScore = matchScore
        application.matchSummary = matchSummary
        await application.save()


        res.json({ matchScore, matchSummary })



    } catch (error) {
        console.error("AI Match Error:", error)
        res.status(500).json({ error: "Failed to analyze resume" })
    }
})

module.exports = router