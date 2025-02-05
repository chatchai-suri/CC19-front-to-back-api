const express =require("express")
const router = express.Router()
const authController = require("../controllers/auth-controllers")
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators")




//@ENDPOINT http://localhost:8888/api/register
router.post("/register", validateWithZod(registerSchema), authController.register)
//@ENDPOINT http://localhost:8888/api/login
router.post("/login", validateWithZod(loginSchema), authController.login)

router.get("/current-user", authController.currentUser)

// Export
module.exports = router