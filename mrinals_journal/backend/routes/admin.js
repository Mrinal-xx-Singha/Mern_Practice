const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const requireAdmin = require("../middleware/requireAdmin");
const { getUsersAdmin, updateUserRoleAdmin, deleteUserAdmin } = require("../controllers/adminController");

// All routes here require admin access
router.use(auth, requireAdmin);

router.get("/users", getUsersAdmin);


router.patch("/users/:id/role", updateUserRoleAdmin);

router.delete("/users/:id", deleteUserAdmin);

module.exports = router;
