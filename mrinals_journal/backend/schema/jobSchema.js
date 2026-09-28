const { z } = require("zod")

const createJobSchema = z.object({
    title: z.string({ error: "Job title is required" }).trim().min(3, "Job title must be atleast 3 characters").max(100, "Job title cannot exceed 100 characters"),
    company: z.string({ error: 'Company name is required' }).trim().min(2, "Company name must be at least 2 characters").max(100, "Company name cannot exceed 100 characters"),
    location: z.string({ error: "Location is required" }).trim().min(2, "Location must be at least 2 characters"),
    description: z.string({ error: "Job description is required" }).trim().min(10, "Job description must be at least 10 characters"),

    salaryRange: z.string().trim().default("Not specified").optional()



})

// Schema for updating an application's status
const updateStatusSchema = z.object({
    status: z.enum(['pending', 'reviewed', 'accepted', 'rejected'], {
        error: "Status must be 'pending' ,'reviewed', 'accepted', or 'rejected' "
    })
})


module.exports = {
    createJobSchema,
    updateStatusSchema
}