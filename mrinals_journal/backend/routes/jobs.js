const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const validate = require("../middleware/validate");
const { createUpload } = require("../utils/cloudinary");
const { createJobSchema, updateStatusSchema } = require("../schema/jobSchema");
const {
    getAllJobs,
    createJob,
    applyJob,
    scrapeJobs,
    getEmployerApplications,
    getMyApplications,
    updateApplicationStatus,
} = require("../controllers/jobController");

const upload = createUpload("journal_resumes", ["pdf"]);

// Public routes
router.get("/", getAllJobs);

// Candidate routes
router.get("/my-applications", auth, getMyApplications);
router.post("/:id/apply", auth, upload.single("resume"), applyJob);

// Employer & Admin routes
router.post("/", auth, requireRole("employer", "admin"), validate(createJobSchema), createJob);
router.get("/employer/applications", auth, requireRole("employer", "admin"), getEmployerApplications);
router.patch("/applications/:id/status", auth, validate(updateStatusSchema), updateApplicationStatus);

// Admin-only routes
router.post("/scrape", auth, requireRole("admin"), scrapeJobs);

module.exports = router;