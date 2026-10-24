const Notification = require("../models/Notification");

/**
 * Creates and saves a notification document.
 *
 * @param {object} opts
 * @param {string} opts.recipient  - ObjectId of the user who receives it
 * @param {string} [opts.sender]   - ObjectId of the user who triggered it (optional)
 * @param {string} opts.type       - One of the enum values in Notification model
 * @param {string} opts.message    - Human-readable text shown in the UI
 * @param {string} [opts.link]     - Frontend route to navigate to on click
 *
 * @returns {Promise<void>}  — We intentionally don't await this in controllers
 *                             (fire-and-forget), so a notification failure never
 *                             breaks the main action.
 */
async function createNotification({ recipient, sender = null, type, message, link = "" }) {
    // Don't notify yourself (e.g. author comments on own post)
    if (recipient?.toString() === sender?.toString()) return;

    try {
        await Notification.create({ recipient, sender, type, message, link });
    } catch (err) {
        // Log but never throw — a failed notification must not fail the request
        console.error("Failed to create notification:", err.message);
    }
}

module.exports = createNotification;
