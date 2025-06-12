const router = require("express").Router()
const UserController = require("../controllers/user.controller")
const validate = require("../utils/validate")

router.post("/register",validate.register,UserController.register)
router.post("/login",validate.login,UserController.login)


module.exports = router