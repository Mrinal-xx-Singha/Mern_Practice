import React from 'react'
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { ArrowLeft, Briefcase, MapPin } from "lucide-react"



const JobDetails = () => {
    const { id } = useParams()
    const { jobs } = useSelector((state) => state.jobs)
    const job = jobs.find((j) => j._id === id)


    if (!job) {
        return <div
            className='text-center py-20 text-xl'
        >Job not found.</div>
    }
    return (
        <div className="mx-auto py-12 px-6 min-h-screen" style={{ maxWidth: "800px" }}

        >
            {/* Back Button */}
            <Link to="/jobs" className="flex items-center gap-2 mb-8 hover:text-[var(--color-accent)] transition-colors" style={{ color: "var(--color-text-secondary)" }}>
                <ArrowLeft size={20} /> Back to Job Board
            </Link>

            {/* Header */}
            <div className='mb-10'>
                <h1
                    className='text-4xl font-serif font-bold mb-4'

                    style={{ color: "var(--color-text)" }}
                >{job.title}</h1>
                <div className='flex flex-wrap gap-4 text-sm'
                    style={{ color: "var(--color-text-secondary) " }}
                >


                    <span className='flex items-center gap-1.5 bg-(--color-bg-subtle) px-3 py-1.5 rounded-md'>
                        <Briefcase
                            size={16}
                        />{job.company}
                    </span>
                    <span className='flex items-center gap-1.5  bg-(--color-bg-subtle) px-3 py-1.5 rounded-md'>
                        <MapPin size={16} />{job.location}
                    </span>
                </div>
            </div>
            {/* The fulll Description */}
            <div
                className='prose prose-invert max-w-none'

                style={{ color: "var(--color-text)" }}

                dangerouslySetInnerHTML={{ __html: job.description }}
            >




            </div>
        </div>
    )
}

export default JobDetails