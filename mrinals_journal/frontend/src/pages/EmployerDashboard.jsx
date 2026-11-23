import React, { useState } from 'react'
import { API_BASE_URL } from '../config/api'
import {
    Download, Loader2, Sparkles, Users,
    Clock,
    CheckCircle2,
    TrendingUp,
    FileSpreadsheet
} from "lucide-react";
import axios from "axios"
import toast from "react-hot-toast"
import { getScoreBadge } from "../utils/badges";
import { useApplications } from "../hooks/useApplications";
import { timeAgo } from '../utils/timeAgo';


const EmployerDashboard = () => {
    const { applications, setApplications, loading } = useApplications(`${API_BASE_URL}/api/jobs/employer/applications`);
    const [analizingId, setAnalyzingId] = useState(null)

    const handleAnalyze = async (applicationId) => {
        setAnalyzingId(applicationId)
        const loadingToast = toast.loading("✨ Gemini is reading the resume....")

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/api/ai/match-resume`,
                { applicationId },
                { withCredentials: true }
            )
            setApplications((prev) => prev.map((app) => app._id === applicationId ? { ...app, matchScore: data.matchScore, matchSummary: data.matchSummary } : app))

            toast.success("Resume analyzed!", { id: loadingToast })

        } catch (error) {
            console.error("AI Match Error:", error)
            toast.error(error.response?.data?.error || "Failed to analyze resume", { id: loadingToast })
        } finally {
            setAnalyzingId(null)
        }
    }
    const handleStatusChange = async (applicationId, newStatus) => {
        try {
            await axios.patch(`${API_BASE_URL}/api/jobs/applications/${applicationId}/status`, {
                status: newStatus
            }, {
                withCredentials: true
            })
            setApplications((prev) => prev.map((app) => app._id === applicationId ? { ...app, status: newStatus } : app))

            toast.success("Status updated!")
        } catch (error) {
            console.error("Status update error:", error)
            toast.error(error?.response?.data?.error || "Failed to update status")

        }
    }
    // Derived KPI Metrics
    const totalApplicants = applications.length
    const pendingCount = applications.filter((a) => a.status === "pending").length
    const acceptedCount = applications.filter((a) => a.status === "accepted").length


    //  Calculate averaeg match score for analyzed resumes

    const scoredApps = applications.filter((a) => typeof a.matchScore === "number" && a.matchScore > 0)
    const averageScore = scoredApps.length ? Math.round(scoredApps.reduce((acc, curr) => acc + curr.matchScore, 0) / scoredApps.length) + "%" : "N/A"


    // Client side csv export
    const handleExportCSV = () => {
        if (!applications.length) {
            toast.error("No applications to export")
            return
        }
        // CSV Header
        const headers = ["Candidate Name", "Email", "Job Title", "Date Applied", "AI Match Score", "Status", "Resume Link"]

        // Format each appliaction as a csv line (escaping quotes for safety)
        const rows = applications.map((app) => [
            `"${(app.applicant?.username || "Unknown").replace(/"/g, '""')}"`,
            `"${(app.applicant?.email || "").replace(/"/g, '""')}"`,
            `"${(app.job?.title || "Deleted Job").replace(/"/g, '""')}"`,
            `"${new Date(app.createdAt).toLocaleDateString()}"`,
            `"${app.matchScore !== null && app.matchScore !== undefined ? app.matchScore + "%" : "Not Analyzed"}"`,
            `"${app.status || "pending"}"`,
            `"${app.resumeUrl || ""}"`
        ])
        const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")

        // Create browser Blob and trigger download
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", `candidates_export_${new Date().toISOString().slice(0, 10)}.csv`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)


        toast.success("Exported candidate applications! ")
    }

    return (
        <div className='mx-auto py-12 px-6 min-h-screen '
            style={{ maxWidth: "1100px" }}
        >
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8'>
                <div>
                    <h1
                        className=' text-3xl font-serif font-bold mb-8'
                        style={{ color: "var(--color-text)" }}
                    >Candidate Applications</h1>
                    <p className='text-sm'
                    
                    style={{color:"var(--color-text-secondary)"}}>
                        Track applicant resumes, Gemini AI fit scores, and hiring status.
                    </p>

                </div>
                {applications.length > 0 && (
                    <button
                    onClick={handleExportCSV}
                    className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border shadow-sm transition-all cursor-pointer hover:bg-[var(--color-bg-subtle)] active:scale-95'
                    style={{
                        borderColor:"var(--color-border)",
                        color:"var(--color-text)",
                        backgroundColor:"var(--color-bg-card)"
                    }}
                    >
                        <FileSpreadsheet size={16} className='text-emerald-500'/>
                        <span>Export CSV</span>

                    </button>
                )}

            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
              
                {/* 1. Total Candidates */}
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Total Applicants</span>
                        <Users size={16} className="text-indigo-500" />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>{totalApplicants}</p>
                </div>
                {/* 2. Pending Review */}
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Pending Review</span>
                        <Clock size={16} className="text-amber-500" />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>{pendingCount}</p>
                </div>
                {/* 3. Accepted */}
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Accepted</span>
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>{acceptedCount}</p>
                </div>
                {/* 4. Average AI Match */}
                <div className="p-4 rounded-xl border" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: "var(--color-text-muted)" }}>Avg. Match Score</span>
                        <TrendingUp size={16} className="text-purple-500" />
                    </div>
                    <p className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>{averageScore}</p>
                </div>
            </div>

            {applications.length === 0 ? (
                <p style={{ color: "var(--color-bg-subtle)" }}>No applications yet.</p>
            ) : (
                <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <th className="p-4 font-medium" style={{ width: "30%" }}>Candidate</th>
                                <th className="p-4 font-medium" style={{ width: "25%" }}>Job Applied For</th>
                                <th className="p-4 font-medium" style={{ width: "15%" }}>Date</th>
                                <th className='p-4 font-medium text-center' style={{ width: "18%" }}>AI Match</th>
                                <th className="p-4 font-medium text-right" style={{ width: "12%" }}>Resume</th>
                                <th className='p-4 font-medium text-center' style={{ width: "16%" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => {
                                const badge = app.matchScore !== null && app.matchScore !== undefined ? getScoreBadge(app.matchScore) : null

                                return (
                                    <tr key={app._id} style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>
                                        <td className="p-4 flex items-center gap-3">
                                            <img src={app.applicant.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>{app.applicant.username}</p>
                                                <p className="text-xs">{app.applicant.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-medium" style={{ color: "var(--color-text)" }}>
                                            {app.job?.title || "Deleted Job"}
                                        </td>
                                        <td className="p-4 text-sm">
                                            {timeAgo(app.createdAt)}
                                        </td>
                                        <td className="p-4 text-center">
                                            {analizingId === app._id ? (
                                                <span
                                                    className='inline-flex items-center gap-1.5 text-xs'
                                                    style={{ color: "var(--color-text-muted)" }}
                                                >
                                                    <Loader2
                                                        size={14}
                                                        className='animate-spin'
                                                    />
                                                </span>
                                            ) : badge ? (
                                                <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-default '
                                                    style={{ backgroundColor: badge.bg, color: badge.color }}
                                                    title={app.matchSummary}
                                                >
                                                    {app.matchScore}% - {badge.label}
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() => handleAnalyze(app._id)}
                                                    className='inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer transition-colors'

                                                    style={{ backgroundColor: "var(--color-bg)", color: "var(--color-text)", border: "1px solid var(--color-border)" }}
                                                >
                                                    <Sparkles
                                                        size={13} style={{ color: "var(--color-accent)" }}
                                                    />
                                                    Analyze
                                                </button>
                                            )}
                                        </td>
                                        <td className='p-4 text-right'>

                                            <a
                                                href={app.resumeUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 btn-accent px-4 py-2 rounded-lg text-sm"
                                            >
                                                <Download size={16} /> PDF
                                            </a>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <select
                                                value={app.status || "pending"}
                                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                className='text-xs font-semibold px-2.5 py-1.5 rounded-lg border outline-none cursor-pointer'

                                                style={{
                                                    backgroundColor: "var(--color-bg)",
                                                    color: "var(--color-text)",
                                                    borderColor: "var(--color-border)"
                                                }}
                                            >
                                                <option value="pending">⏳ Pending</option>
                                                <option value="reviewed">👀 Reviewed</option>
                                                <option value="accepted">✅ Accepted</option>
                                                <option value="rejected">❌ Rejected</option>
                                            </select>
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default EmployerDashboard