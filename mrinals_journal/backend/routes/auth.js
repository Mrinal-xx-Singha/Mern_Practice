const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const {
  registerSchema,
  loginSchema,
  demoLoginSchema,
} = require("../schema/authSchema");
const {
  register,
  login,
  demoLogin,
  refreshToken,
  logout,
} = require("../controllers/authController");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/demo-login", validate(demoLoginSchema), demoLogin);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;