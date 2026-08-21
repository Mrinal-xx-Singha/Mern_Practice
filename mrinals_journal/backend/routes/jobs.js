const express = require("express")
const router = express.Router()
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
require("../utils/cloudinary"); // Ensures API keys are loaded!
const auth = require("../middleware/auth");
const Application = require("../models/Application")
const Job = require("../models/Job")
const { scrapeWWRJobs } = require("../services/scraper");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "journal_resumes",
        resource_type: "auto"
    }
})

const upload = multer({ storage })

// @route   GET /api/jobs
// @desc    Get all active jobs (internal + external)
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 })
        res.json(jobs)
    } catch (error) {

        res.status(500).json({ error: "Server Error" })
    }
})

// @route   POST /api/jobs
// @desc    Create a new job (Must be logged in, ideally an employer)
router.post("/", auth, async (req, res) => {
    try {
        if (req.user.role !== "employer" && req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied. Only employers can post jobs." })

        }

        const newJob = new Job({
            ...req.body,
            postedBy: req.user.id,
            isExternal: false
        })
        await newJob.save()
        res.status(201).json(newJob)
    } catch (err) {
        console.error("Job Creation Error:", err);
        res.status(500).json({ error: "Failed to post job" })
    }
})

// @route   POST /api/jobs/:id/apply
// @desc    Apply for a job with a resume

router.post("/:id/apply", auth, upload.single('resume'), async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) return res.status(404).json({ error: "Job not found" })

        if (!req.file) return res.status(400).json({ error: "Resume PDF is required" })


        const application = new Application({
            job: job._id,
            applicant: req.user.id,
            resumeUrl: req.file.path,
            coverLetter: req.body.coverLetter || "",
        })

        await application.save()
        res.status(201).json(application)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Failed to submit application" })

    }
})
// @route   POST /api/jobs/scrape
// @desc    Trigger the web scraper to fetch new external jobs
router.post("/scrape", auth, async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ error: "Only admins can scrape jobs" })
    }
    try {
        const result = await scrapeWWRJobs()
        res.json(result)

    } catch (error) {
        res.status(500).json({ error: "Scraping Failed" })
    }

})

router.get("/employer/applications", auth, async (req, res) => {
    try {
        if (req.user.role !== "employer" && req.user.role !== "admin") {
            return res.status(403).json({ error: "Access denied." })


        }
        // Find all the job ids created by the mployer
        const jobs = await Job.find({ postedBy: req.user.id }).select('_id')
        const jobIds = jobs.map(job => job._id)

        // Find all the applications for their specific jobs
        // Populate is SQL Join equivalent
        const applications = await Application.find({ job: { $in: jobIds } })
            .populate('job', "title company")
            .populate('applicant', "username email avatar")
            .sort({ createdAt: -1 })

        res.json(applications)

    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server Error" })
    }
})


module.exports = router