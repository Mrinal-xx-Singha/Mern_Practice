const Job = require("../models/Job");
const Application = require("../models/Application");
const { scrapeWWRJobs } = require("../services/scraper");

// @desc    Get all active jobs (internal + external)
// @route   GET /api/jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc    Create a new job (Employer or Admin)
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
    try {
        const newJob = new Job({
            ...req.body,
            postedBy: req.user.id,
            isExternal: false,
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        console.error("Job Creation Error:", err);
        res.status(500).json({ error: "Failed to post job" });
    }
};

// @desc    Apply for a job with a resume
// @route   POST /api/jobs/:id/apply
exports.applyJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ error: "Job not found" });

        if (!req.file) return res.status(400).json({ error: "Resume PDF is required" });

        const application = new Application({
            job: job._id,
            applicant: req.user.id,
            resumeUrl: req.file.path,
            coverLetter: req.body.coverLetter || "",
        });

        await application.save();
        res.status(201).json(application);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to submit application" });
    }
};

// @desc    Trigger web scraper for external jobs (Admin only)
// @route   POST /api/jobs/scrape
exports.scrapeJobs = async (req, res) => {
    try {
        const result = await scrapeWWRJobs();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Scraping Failed" });
    }
};

// @desc    Get all applications for employer's jobs
// @route   GET /api/jobs/employer/applications
exports.getEmployerApplications = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user.id }).select("_id");
        const jobIds = jobs.map((job) => job._id);

        const applications = await Application.find({ job: { $in: jobIds } })
            .populate("job", "title company")
            .populate("applicant", "username email avatar")
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc    Get all applications submitted by logged-in candidate
// @route   GET /api/jobs/my-applications
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.id })
            .populate("job", "title company location salaryRange isActive")
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        console.error("My applications error:", error);
        res.status(500).json({ error: "Failed to fetch your applications" });
    }
};

// @desc    Update application status (Employer or Admin)
// @route   PATCH /api/jobs/applications/:id/status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate("job", "postedBy");

        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        const isOwner = application.job?.postedBy?.toString() === req.user.id;
        const isAdmin = req.user.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({
                error: "Access denied. You can only update applications for your own jobs.",
            });
        }

        application.status = status;
        await application.save();

        res.json({ message: "Status updated successfully", application });
    } catch (err) {
        console.error("Update application status error:", err);
        res.status(500).json({ error: "Failed to update application status" });
    }
};