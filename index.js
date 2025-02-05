const express = require("express")


const app = express()


PORT=8888
app.listen(PORT, ()=> console.log(`Server at localhost:${PORT}`))
