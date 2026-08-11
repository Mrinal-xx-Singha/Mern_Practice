import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'



const ApplyModal = ({ job, onClose }) => {
    const [coverLetter, setCoverLetter] = useState("")
    const [resume, setResume] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!resume) return toast.error("Please upload your resume")
        setIsLoading(true)
        const formData = new FormData()
        formData.append("resume", resume)
        formData.append("coverLetter", coverLetter)

        try {
            await axios.post(`${API_BASE_URL}/api/jobs/${job._id}/apply`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            toast.success("Application submitted successfully!")
            onClose()
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to submit application")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
                className="w-full max-w-md rounded-xl shadow-2xl relative p-6"
                style={{ backgroundColor: "var(--color-bg)", border: "1px solid var(--color-border)" }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 transition-colors hover:text-(--color-accent)"
                    style={{ color: "var(--color-text-secondary)" }}
                >
                    <X size={20} />
                </button>
                <h2 className="text-2xl font-serif font-bold mb-1" style={{ color: "var(--color-text)" }}>
                    Apply for Role
                </h2>
                <p className="text-sm mb-6" style={{ color: "var(--color-text-secondary)" }}>
                    {job.title} at {job.company}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>
                            Cover Letter (Optional)
                        </label>
                        <textarea
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="w-full p-3 rounded-md outline-none border min-h-30 resize-y"
                            style={{ backgroundColor: "var(--color-bg-subtle)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                            placeholder="Tell the employer why you're a great fit..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>
                            Resume (PDF Only) *
                        </label>
                        <input
                            type="file"
                            accept=".pdf"
                            required
                            onChange={(e) => setResume(e.target.files[0])}
                            className="w-full p-2 text-sm"
                            style={{ color: "var(--color-text)" }}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full btn-accent py-3 mt-4 rounded-md disabled:opacity-50 transition-opacity"
                    >
                        {isLoading ? "Uploading Application..." : "Submit Application"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ApplyModal