import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../redux/slices/jobSlice";
import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import ApplyModal from "../components/jobs/ApplyModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";


// --- Premium Skeleton Loader ---
const JobSkeleton = () => (
  <div className="p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] animate-pulse flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div className="space-y-3 w-full">
      <div className="h-5 bg-[var(--color-border)] rounded w-1/3"></div>
      <div className="flex gap-4">
        <div className="h-4 bg-[var(--color-border)] rounded w-24"></div>
        <div className="h-4 bg-[var(--color-border)] rounded w-24"></div>
      </div>
    </div>
    <div className="h-10 bg-[var(--color-border)] rounded-full w-28 shrink-0"></div>
  </div>
);

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, status } = useSelector((state) => state.jobs);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isScraping, setIsScraping] = useState(false)
  const { user } = useSelector((state) => state.auth)



  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // Staggers the load!
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  const handleScrapeJobs = async () => {
    setIsScraping(true)
    try {
      await axios.post(`${API_BASE_URL}/api/jobs/scrape`, {}, { withCredentials: true })

      dispatch(fetchJobs())

      alert("Successfully scraped new remote jobs!")
    } catch (err) {
      console.error(err)
      alert("Failed to scrape jobs. Make sure your backend is running.")

    } finally {
      setIsScraping(false)
    }
  }

  return (
    <div className="mx-auto py-12 px-6 min-h-screen relative" style={{ maxWidth: "800px" }}>

      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-10 gap-4"
      >
        <div>

          <h1 className="text-4xl font-serif font-bold mb-2 tracking-tight" style={{ color: "var(--color-text)" }}>
            Job Board
          </h1>
          <p style={{ color: "var(--color-text-muted)" }}>
            Discover remote opportunities from around the web.
          </p>
        </div>
        <div className="flex items-center gap-4">
          
          {/* SCRAPE BUTTON: Only show to ADMINS */}
          {user?.role === "admin" && (
            <button
              onClick={handleScrapeJobs}
              disabled={isScraping}
              className="px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-bg-subtle)] transition-all disabled:opacity-50"
              style={{ color: "var(--color-text)" }}
            >
              {isScraping ? "Scraping Web..." : "🔄 Sync Jobs"}
            </button>
          )}

          {/* POST JOB BUTTON: Show to EMPLOYERS OR ADMINS */}
          {(user?.role === "employer" || user?.role === "admin") && (
            <Link to="/jobs/create" className="btn-accent px-5 py-2.5 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all">
              + Post a Job
            </Link>
          )}

        </div>
      </motion.div>

      {/* List Section */}
      {status === "loading" ? (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(n => <JobSkeleton key={n} />)}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {jobs.length === 0 ? (
            <p className="text-center py-12 text-lg" style={{ color: "var(--color-text-secondary)" }}>No jobs found.</p>
          ) : (
            jobs.map((job) => (
              <motion.div
                variants={itemVariants}
                key={job._id}
                className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group backdrop-blur-md bg-opacity-60"
                style={{
                  backgroundColor: "var(--color-bg)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <Link to={`/jobs/${job._id}`}>

                    <h3 className="text-xl font-semibold group-hover:text-[var(--color-accent)] transition-colors" style={{ color: "var(--color-text)" }}>
                      {job.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-4 mt-2 text-sm" style={{ color: "var(--color-text-secondary)" }}>
                    <span className="flex items-center gap-1.5 bg-[var(--color-bg-subtle)] px-2.5 py-1 rounded-md">
                      <Briefcase size={14} /> {job.company}
                    </span>
                    <span className="flex items-center gap-1.5 bg-[var(--color-bg-subtle)] px-2.5 py-1 rounded-md">
                      <MapPin size={14} /> {job.location}
                    </span>
                  </div>

                  {/* Job Description (Truncated & HTML Stripped) */}
                  <p
                    className="mt-4 text-sm leading-relaxed line-clamp-3"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {/* Strip HTML tags safely for the preview card */}
                    {job.description?.replace(/<[^>]*>?/gm, '')}
                  </p>
                </div>

                {job.isExternal ? (
                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]"
                    style={{ backgroundColor: "var(--color-bg-subtle)", color: "var(--color-text)" }}
                  >
                    Apply <ExternalLink size={14} />
                  </a>
                ) : (
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-5 py-2.5 rounded-full text-sm font-medium transition-transform active:scale-95 btn-accent shadow-md"
                  >
                    Apply Now
                  </button>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </div>
  );
};

export default Jobs;