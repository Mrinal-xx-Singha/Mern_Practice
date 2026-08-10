const mongoose = require("mongoose")
const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        company: { type: String, required: true, trim: true },
        location: { type: String, required: true },
        description: {
            type: String, required: true
        },
        salaryRange: { type: String, default: 'Not specified' },

        postedBy: {
            type: mongoose.Schema.Types.ObjectId, ref: "User", default: null
        },
        isExternal: { type: Boolean, default: false },
        applyLink: { type: String, default: "" },
        isActive: { type: Boolean, default: true }
    },
    { timestamps: true }
)


module.exports = mongoose.model("Job", jobSchema)
