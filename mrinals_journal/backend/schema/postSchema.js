const { z } = require("zod")

const createPostSchema = z.object({
    title: z.string(
        { error: "Title is required" }
    ).trim().min(3, "Title must be at least 3 characters").max(150, "Title cannot exceed 150 characters"),

    content: z.string({ error: "Content is required" }).trim().min(10, "Content must be at least 10 characters"),
    category: z.string().trim().default("General").optional(),

    // Accepts either an array of tags (eg:['react','node']) or comma-separated string ('react,node')
    tags: z.union([z.array(z.string()), z.string()]).optional()

})

// Schema for editing existing post (all fields are optional for partial updates)

const updatePostSchema = createPostSchema.partial()

// Schema for emoji reactions
const reactionSchema = z.object({
    emoji: z.enum(["👍", "❤️", "😂", "😢"], {
        error: "Emoji must be one of: 👍, ❤️, 😂, 😢 "
    })
})

module.exports = {
    createPostSchema,
    updatePostSchema,
    reactionSchema
}