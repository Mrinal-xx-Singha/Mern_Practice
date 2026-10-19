
const User = require("../models/User")

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Admin
 */
exports.getUsersAdmin = async (req, res) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

/**
 * @route   PATCH /api/admin/users/:id/role
 * @desc    Update user role
 * @access  Admin
 */

exports.updateUserRoleAdmin = async (req, res) => {
    const { role } = req.body;
    if (!["user", "admin", "employer"].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.role = role;
        await user.save();
        res.json({
            message: "User role updated",
            user: { id: user._id, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to update role" });
    }
}

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete a user account
 * @access  Admin
 */

exports.deleteUserAdmin = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User account deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
}