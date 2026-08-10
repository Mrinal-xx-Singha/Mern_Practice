import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { fetchJobs } from "../redux/slices/jobSlice"
import { Briefcase, MapPin, ExternalLink } from "lucide-react";


const Jobs = () => {
    const dispatch = useDispatch()
    const { jobs, status } = useSelector((state) => state.jobs)

    useEffect(() => {
        dispatch(fetchJobs())

    }, [dispatch])

    console.log(jobs)
    if (status === "loading") {
        return (
            <div className="flex justify-center items-center min-h-screen text-(--color-text-secondary)">
                <p className="animate-pulse">Loading job opportunities...</p>
            </div>
        )
    }
    return (
        <div className='mx-auto py-12 px-6 min-h-screen ' style={{ maxWidth: '800px' }}>
            <h1 className='text-3xl font-serif font-bold mb-2'
                style={{ color: "var(--color-text)" }}
            >Job Board</h1>
            <p
                className='mb-8'
                style={{ color: "var(--color-text-muted" }}
            >Discover remote opportunities from around the web</p>
            <div className='space-y-4'>
                {jobs.length === 0 ? (
                    <p
                        className='var(--color-text-secondary)'

                    >No jobs found..</p>
                ) : (

                    jobs.map((job) => (
                        <div key={job._id}

                            className='p-5 rounded-lg border flex flex-col sm:flex-row sm:text-center justify-between gap-4 transition-all hover:border-(--color-accent)'

                            style={{
                                backgroundColor: "var(--color-bg)",
                                borderColor: 'var(--color-border)'
                            }}
                        >
                            <div>
                                <h3 className='text-lg font-semibold'
                                    style={{ color: "var(--color-text)" }}
                                >{job.title}</h3>
                                <div
                                    className='text-lg font-semibold'

                                    style={{ color: "var(--color-text-secondary)" }}
                                >
                                    <span className='flex items-center gap-1'>
                                        <Briefcase size={14} />{job.company}
                                    </span>
                                    <span className='flex items-center gap-1'>
                                        <MapPin size={14} />{job.location}

                                    </span>

                                </div>
                            </div>
                            {job.isExternal ? (
                                <a
                                    href={job.applyLink}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors'
                                    style={{ backgroundColor: "var(--color-bg-subtle)", color: 'var(--color-text)' }}
                                >
                                    Apply<ExternalLink size={14} />
                                </a>

                            ) : (
                                <button>Apply Now</button>
                            )}

                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default Jobs