const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    getNotifications,
    markAsRead,
    markAllRead,
    deleteNotification,
} = require("../controllers/notificationController");

// All notification routes require authentication
router.use(auth);

router.get("/", getNotifications);                  // GET  /api/notifications
router.patch("/read-all", markAllRead);             // PATCH /api/notifications/read-all  
router.patch("/:id/read", markAsRead);             // PATCH /api/notifications/:id/read
router.delete("/:id", deleteNotification);         // DELETE /api/notifications/:id

module.exports = router;
