import React, { useState } from 'react'
import axios from "axios"
import { API_BASE_URL } from "../config/api"
import toast from "react-hot-toast"

const CreateJob = () => {
    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        salaryRange: "",
        description: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await axios.post(`${API_BASE_URL}/api/jobs`, form, {
                withCredentials: true
            })
            toast.success("Job posted successfully!")
            window.location.href = "/jobs"
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to post jobs")

        } finally {
            setIsLoading(false)
        }

    }
    return (
        <div
            className='mx-auto py-12 px-6 min-h-screen'

            style={{ maxWidth: "600px" }}
        >
            <h1
                className='text-3xl font-serif font-bold mb-6 '

                style={{ color: "var(--color-text)" }}
            >Post an Opportunity</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <input
                    type='text'
                    placeholder='Job Title (eg. Senior React Developer)'
                    required
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className='w-full p-3 rounded-md outline-none border'
                    style={{
                        backgroundColor: "var(--color-bg)",
                        borderColor: "var(--color-border)",
                        color: "var(--color-text)"
                    }}
                />
                <div className='flex gap-5'>
                    <input
                        type="text"
                        placeholder="Company Name"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-1/2 p-3 rounded-md outline-none border"
                        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                    <input
                        type="text"
                        placeholder="Location (e.g. Remote, NY)"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="w-1/2 p-3 rounded-md outline-none border"
                        style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                    />
                </div>
                <input
                    type="text"
                    placeholder="Salary Range (Optional)"
                    value={form.salaryRange}
                    onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
                    className="w-full p-3 rounded-md outline-none border"
                    style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                />
                <textarea
                    placeholder="Job Description..."
                    required
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full p-3 rounded-md outline-none border min-h-37.5 resize-y"
                    style={{ backgroundColor: "var(--color-bg)", borderColor: "var(--color-border)", color: "var(--color-text)" }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-accent py-3 rounded-md disabled:opacity-50"
                >
                    {isLoading ? "Posting..." : "Post Job"}
                </button>

            </form>



        </div>
    )
}

export default CreateJob