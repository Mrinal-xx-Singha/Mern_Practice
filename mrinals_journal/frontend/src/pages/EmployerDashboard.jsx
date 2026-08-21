import React, { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'
import { Download } from "lucide-react";
import axios from "axios"


const EmployerDashboard = () => {
    const [applications, setApplications] = useState([])
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


    if (loading) return <div className='text-center py-20'>Loading candidates</div>

    return (
        <div className='mx-auto py-12 px-6 min-h-screen '
            style={{ maxWidth: "1000px" }}
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
                                <th className="p-4 font-medium">Candidate</th>
                                <th className="p-4 font-medium">Job Applied For</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium text-right">Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
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
                                    <td className="p-4 text-right">
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
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default EmployerDashboard