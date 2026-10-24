const Notification = require("../models/Notification");

/**
 * @route   GET /api/notifications
 * @desc    Get the logged-in user's 20 most recent notifications
 * @access  Private
 */
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.user.id })
            .sort({ createdAt: -1 })  // newest first
            .limit(20)
            .populate("sender", "username avatar")  // show who triggered it
            .lean();

        const unreadCount = await Notification.countDocuments({
            recipient: req.user.id,
            read: false,
        });

        res.json({ notifications, unreadCount });
    } catch (error) {
        console.error("Get notifications error:", error);
        res.status(500).json({ error: "Failed to fetch notifications" });
    }
};

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a single notification as read
 * @access  Private
 */
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            // findOne scoped to the logged-in user — prevents reading other users' notifications
            { _id: req.params.id, recipient: req.user.id },
            { read: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        res.json({ message: "Marked as read", notification });
    } catch (error) {
        console.error("Mark read error:", error);
        res.status(500).json({ error: "Failed to mark notification as read" });
    }
};

/**
 * @route   PATCH /api/notifications/read-all
 * @desc    Mark all of the logged-in user's notifications as read
 * @access  Private
 */
exports.markAllRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { recipient: req.user.id, read: false },
            { read: true }
        );

        res.json({ message: "All notifications marked as read" });
    } catch (error) {
        console.error("Mark all read error:", error);
        res.status(500).json({ error: "Failed to mark all as read" });
    }
};

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a single notification
 * @access  Private
 */
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findOneAndDelete({
            _id: req.params.id,
            recipient: req.user.id, // scoped to owner — security guard
        });

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        res.json({ message: "Notification deleted" });
    } catch (error) {
        console.error("Delete notification error:", error);
        res.status(500).json({ error: "Failed to delete notification" });
    }
};
