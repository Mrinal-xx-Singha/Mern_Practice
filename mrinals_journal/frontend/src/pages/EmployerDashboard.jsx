import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'
import { Download, Loader2, Sparkles } from "lucide-react";
import axios from "axios"
import toast from "react-hot-toast"


const EmployerDashboard = () => {
    const [applications, setApplications] = useState([])
    const [analizingId, setAnalyzingId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/jobs/employer/applications`, {
                    withCredentials: true
                })
                setApplications(data)

            } catch (error) {
                console.error("Failed to load applications", error)

            } finally {
                setLoading(false)
            }
        }
        fetchApplications()
    }, [])

    const handleAnalyze = async (applicationId) => {
        setAnalyzingId(applicationId)
        const loadingToast = toast.loading("✨ Gemini is reading the resume....")

        try {
            const { data } = await axios.post(
                `${API_BASE_URL}/api/ai/match-resume`,
                { applicationId },
                { withCredentials: true }
            )
            // Update local state so score renders instantly
            setApplications((prev) => prev.map((app) => app._id === applicationId ? { ...app, matchScore: data.matchScore, matchSummary: data.matchSummary } : app))

            toast.success("Resume analyzed!", { id: loadingToast })

        } catch (error) {
            console.error("AI Match Error:", error)
            toast.error(error.response?.data?.error || "Failed to analyze resume", { id: loadingToast })
        } finally {
            setAnalyzingId(null)
        }
    }

    const getScoreBadge = score => {
        if (score >= 80) return { label: "Great Match", color: "#16a34a", bg: "#dcfce7" }

        if (score >= 60) return { label: "Good Match", color: "#ca8a04", bg: "#fef9c3" }

        return { label: "Weak Match", color: "#dc2626", bg: "#fee2e2" }
    }

    if (loading) return <div className='text-center py-20'>Loading candidates</div>

    return (
        <div className='mx-auto py-12 px-6 min-h-screen '
            style={{ maxWidth: "1100px" }}
        >
            <h1
                className=' text-3xl font-serif font-bold mb-8'
                style={{ color: "var(--color-text)" }}
            >Candidate Applications</h1>

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
                                            {new Date(app.createdAt).toLocaleDateString()}
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