import React, { useEffect, useState } from 'react'
import axios from "axios"
import { API_BASE_URL } from "../config/api"
import { Briefcase, Download, MapPin, Calendar, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"

const MyApplications = () => {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/jobs/my-applications`, {
                    withCredentials: true,
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

    const getStatusBadge = (status) => {
        switch (status) {
            case 'accepted':
                return { label: "Accepted", color: "#059669", bg: "#d1fae5" }
            case 'reviewed':
                return { label: "Reviewed", color: "#2563eb", bg: "#dbeafe" }
            case "rejected":
                return { label: "Rejected", color: "#dc2626", bg: "#fee2e2" }
            case "pending":
            default:
                return { label: 'Pending', color: "#d97706", bg: "#fef3c7" }
        }
    }

    if (loading) {
        return (
            <div className='text-center py-20'
                style={{ color: "var(--color-text-secondary)" }}
            >Loading Your Applications</div>
        )
    }
    return (
        <div className='mx-auto py-12 px-6 min-h-screen'
            style={{ maxWidth: "1100px" }}
        >
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h1
                        className='text-3xl font-serif font-bold'
                        style={{ color: "var(--color-text)" }}
                    >My Applications</h1>
                    <p className='text-sm mt-1' style={{ color: "var(--color-text-secondary)" }}>
                        Track the status of all jobs you have applied to
                    </p>

                </div>
                <Link to="/jobs" className='btn-accent px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2'>

                    <Briefcase size={16} /> Browse Jobs
                </Link>
            </div>
            {applications.length === 0 ? (
                <div className='text-center py-16 px-4 rounded-xl border'
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}

                >
                    <Briefcase size={40} className='mx-auto mb-4 opacity-40 '
                        style={{ color: "var(--color-text)" }}
                    />
                    <h3 className='text-lg font-semibold mb-2'
                        style={{ color: "var(--color-text)" }}
                    >
                        No applications yet
                    </h3>
                    <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--color-text-secondary)" }}>
                        You haven't applied for any jobs yet. Browse our job board and apply with your resume!
                    </p>
                    <Link to="/jobs" className="btn-accent px-5 py-2.5 rounded-lg text-sm inline-flex items-center gap-2">
                        Explore Remote Jobs
                    </Link>

                </div>
            ) : (
                <div className='rounded-xl border overflow-hidden'
                    style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-subtle)" }}
                >
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                                <th className='p-4 font-medium ' style={{ width: '32%' }}>Job & Company</th>
                                <th className='p-4 font-medium ' style={{ width: '22%' }}>Location & Salary</th>
                                <th className='p-4 font-medium ' style={{ width: '15%' }}>Applied On</th>
                                <th className='p-4 font-medium text-center' style={{ width: '15%' }}>Status</th>
                                <th className='p-4 font-medium text-right' style={{ width: '13%' }}>Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => {
                                const badge = getStatusBadge(app.status)
                                return (
                                    <tr key={app._id} style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)" }}>

                                        <td className='p-4'>
                                            {app.job ? (
                                                <Link
                                                    to={`/jobs/${app.job._id}`}
                                                    className="font-semibold text-sm hover:underline inline-flex items-center gap-1.5"
                                                    style={{ color: "var(--color-text)" }}
                                                >
                                                    {app.job.title}
                                                    <ExternalLink size={13} className="opacity-60" />
                                                </Link>
                                            ) : (
                                                <p className="font-semibold text-sm" style={{ color: "var(--color-text-muted)" }}>
                                                    Job Listing Removed
                                                </p>

                                            )}
                                            <p
                                                className='text-xs mt-0.5'
                                                style={{ color: "var(--color-text-secondary)" }}
                                            >{app.job.company || "Unknown Company"}</p>
                                        </td>
                                        <td className='p-4 text-xs'>
                                            <div className='flex items-center gap-1.5'
                                                style={{ color: "var(--color-text)" }}
                                            >
                                                <MapPin
                                                    size={13} className='opacity-70'
                                                />
                                                <span>{app.job?.location || "Remote"}</span>
                                            </div>
                                            <p className='mt-1 text-[11px]' style={{ color: "var(--color-text-muted)" }}>
                                                {app.job?.salaryRange || "Not specified"}
                                            </p>

                                        </td>
                                        <td className='p-4 text-sm'>
                                            <div className='flex items-center gap-1.5'>
                                                <Calendar className='opacity-70' size={13} />
                                                <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </td>

                                        <td className='p-4 text-center'>
                                            <span
                                            className='inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider cursor-default'
                                            style={{backgroundColor:badge.bg,color:badge.color}}
                                            >
                                                {badge.label}
                                            </span>
                                        </td>
                                        <td className='p-4 text-right'>
                                            <a 
                                            
                                            href={app.resumeUrl}
                                            target='_blank'
                                            rel='noreferrer'
                                            className='inline-flex items-center gap-1.5 btn-accent px-3 py-1.5 rounded-lg text-xs'
                                            >
                                                <Download size={14}/> PDF

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

export default MyApplications