const express = require("express")
const router = express.Router()
const { authCheck } = require("../middlewares/auth-middleware")

// Import controller
const userController = require("../controllers/user-controllers")


//@ENDPOINT http://localhost:8888/api/users
router.get("/users", authCheck, userController.listUsers)

router.patch("/user/update-role", authCheck, userController.updateRole)

router.delete("/user/:id", authCheck, userController.deleteUser)

module.exports = router

