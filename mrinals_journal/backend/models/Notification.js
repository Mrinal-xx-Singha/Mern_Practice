const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        // Who receives this notification
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true, // fast lookups by user
        },

        // Who triggered it (null for system notifications)
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        // What kind of event happened
        type: {
            type: String,
            enum: [
                "new_application",      // employer: someone applied to your job
                "application_update",   // applicant: your application status changed
                "new_comment",          // post author: someone commented
                "post_bookmarked",      // post author: someone bookmarked your post
            ],
            required: true,
        },

        // Human-readable message shown in the dropdown
        message: {
            type: String,
            required: true,
        },

        // Optional deep-link so clicking the notification navigates somewhere
        link: {
            type: String,
            default: "",
        },

        // Has the user seen/clicked this?
        read: {
            type: Boolean,
            default: false,
            index: true,
        },
    },
    { timestamps: true }
);

// Automatically delete notifications older than 30 days
// MongoDB's TTL index handles this — no cron job needed
notificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

module.exports = mongoose.model("Notification", notificationSchema);
