const express =require("express")
const router = express.Router()
const authController = require("../controllers/auth-controllers")

//@ENDPOINT http://localhost:8888/api/register
router.post("/register", authController.register)
//@ENDPOINT http://localhost:8888/api/login
router.post("/login", authController.login)

// Export
module.exports = router