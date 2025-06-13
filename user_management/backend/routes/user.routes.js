const router = require("express").Router()
const UserController = require("../controllers/user.controller")
const validate = require("../utils/validate")
const auth =require("../middlewares/auth.middleware")



router.post("/register",validate.register,UserController.register)
router.post("/login",validate.login,UserController.login)
router.get("/profile",auth,UserController.profile)

module.exports = router