const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const handleErrors = require("./middlewares/error")
//Routing
const authRouter = require("./routes/auth-routes")
const userRouter = require("./routes/user-routes")

const app = express()

// Middlewares
app.use((cors())) // Allows cross domain
app.use(morgan("dev"))  // show log terminal
app.use(express.json()) // for read json

// Routing
app.use("/api", authRouter)
app.use("/api", userRouter)


app.use(handleErrors)

//Start Server
PORT=8888
app.listen(PORT, ()=> console.log(`Server is running on localhost:${PORT}`))
