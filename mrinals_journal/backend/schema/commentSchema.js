const { z } = require("zod")

const createCommentSchema = z.object({
    content: z.string({ error: "Comment content is required" }).trim().min(1, "Comment cannot be empty").max(1000, "Comment cannot exceed 1000 characters"),

    parentId: z.string().nullable().optional()
})

module.exports = {
    createCommentSchema
}