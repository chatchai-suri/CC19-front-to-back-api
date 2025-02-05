# Server

## Step 1 create package.json
```bash
npm init -y
```
## Step 2 install package..., npx prisma init creates file gitignore (and its default) and .env
```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma
npx prisma init
```
## Step 3 Git
```bash
git init
git add .
git commit -m "init"
```
next Step
copy code fron repo only first time
```bash
git remote add origin https://github.com/chatchai-suri/CC19-front-to-back-api.git
git branch -M main
git push -u origin main
```
when update code
```bash
git add
git commit -m "comment about update"
git push
```

## Step 4 update package.json
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
```
and code index.js
```js
const express = require("express")


const app = express()

//Start Server
PORT=8888
app.listen(PORT, ()=> console.log(`Server is running on localhost:${PORT}`))
```

## Step 5 use middleware
```js
// Middlewares
app.use((cors())) // Allows cross domain
app.use(morgan("dev"))  // show log terminal
app.use(express.json()) // for read json

// Routing
```

## Step 6 Routing and Controller [Register]
/controllers/auth-controllers.js
```js
exports.register = (req, res, next) => {
  //code
  try {
    res.json({message: "Hello register"})
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({message: "Server Error!!"})
  }
}
```
/routes/auth-routes.js
```js
const express =require("express")
const router = express.Router()
const authController = require("../controllers/auth-controllers")

//@ENDPOINT http://localhost:8888/api/register
router.post("/register", authController.register)

module.exports = router
```

## Step 7 Routing and Controller and  endpoint [Login]
/controllers/auth-controllers.js
```js
exports.login = (req, res, next) => {
  //code
  try {
    console.log(asss)
    res.json({message: "Hello login"})
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({message: "Server Error !!!"})
  }
}
```

/routes/auth-routes.js
```js
//@ENDPOINT http://localhost:8888/api/register
router.post("/register", authController.register)
//@ENDPOINT http://localhost:8888/api/login
router.post("/login", authController.login)
```

## Step 8 Create Handle Error function
/middlewares/error.js
```js
const handleErrors = (err, req, res, next) => {
  // code
  res
  .status(err.statusCode || 500)
  .json({message: err.message || "Somthing wrong!!"})
}

module.exports = handleErrors
```
/auth-controllers udate logic by by statement next(error)
```js
exports.login = (req, res, next) => {
  //code
  try {
    console.log(akkk)
    res.json({message: "Hello login"})
  } catch (error) {
    next(error)
  }
}
```
index.js insert handle error at the end (before Server start)
```js
app.use(handleErrors)

//Start Server
PORT=8888
app.listen(PORT, ()=> console.log(`Server is running on localhost:${PORT}`))
```

## step 9 Create validation at each Controller and make function createError
/controllers/auth-controllers.js create validation statement
```js
exports.register = (req, res, next) => {
  try {
    // code
    // step 1 req.body
    const {email, firstname, lastname, password, confirmPassword} = req.body
    console.log(email, firstname, lastname, password, confirmPassword)
    // step 2 validate
    if(!email){
      return res.status(400).json({message: "Email is required"})
    }
    if(!firstname){
      return res.status(400).json({mssage: "Firstname is required"})
    }
    // step 3 Check already
    // step 4 Encrypt by bcrypt
    // step 5 Insert DB
    // step 6 Response
    res.json({message: "Hello register"})
  } catch (error) {
    console.log(error)
    res
    .status(500)
    .json({message: "Server Error !!!"})
  }
}
```
```plaintext
/utils/createError.js create function createError which able to reuse in many validation statement
```
```js
const createError = (code, message) => {
  // code
  console.log("Step1 Create error")
  const error = new Error(message)
  error.statusCode = code
  throw error
}

module.exports = createError
```
/controllers/auth-controllers.js update by utilize function createError and update catch state to use next(error)
```js
exports.register = (req, res, next) => {
  try {
    // code
    // step 1 req.body
    const {email, firstname, lastname, password, confirmPassword} = req.body
    console.log(email, firstname, lastname, password, confirmPassword)
    // step 2 validate
    if(!email){
      return createError(400, "Email is required")
    }
    if(!firstname){
      return createError(400, "Firstname is required")
    }
    // step 3 Check already
    // step 4 Encrypt by bcrypt
    // step 5 Insert DB
    // step 6 Response
    res.json({message: "Hello register"})
  } catch (error) {
    console.log("step 2 catch")
    next(error)

  }
}
```


|Method|Endpoint|Body|
|----|----|----|
|Post|/api/register|email,password|

## step 10 validate with zod and updat route
/middlewares/validators.js
```js
const {z} = require("zod")

// Test validator
exports.registerSchema = z.object({
  email: z.string().email("Email is required"),
  firstname: z.string().min(3, "Fistname: at least 3 charecters"),
  lastname: z.string().min(4, "Lastname: at least 4 charecters"),
  password: z.string().min(6, "Password: at least 6 charecters"),
  confirmPassword: z.string().min(6, "Confirmpassword: at least 6 charecters")
}).refine((data)=> data.password === data.confirmPassword, {
  message:"Confirm Password are not matched",
  path: ["confirmPassword"]
})

exports.loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(6, "Password: at least 6 charecters"),
})


exports.validateWithZod = (schema) => (req, res, next) => {
  try {
    console.log("Hello, middleware")
    schema.parse(req.body)
    next()
  } catch (error) {
    const errMsg = error.errors.map(item=> (item.message))
    const errTxt = errMsg.join(",")
    const mergeError = new Error(errTxt)
    next(mergeError)
  }
}
```
and update routes
/routes/auth-routes.js
```js
const express =require("express")
const router = express.Router()
const authController = require("../controllers/auth-controllers")
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators")




//@ENDPOINT http://localhost:8888/api/register
router.post("/register", validateWithZod(registerSchema), authController.register)
//@ENDPOINT http://localhost:8888/api/login
router.post("/login", validateWithZod(loginSchema), authController.login)

// Export
module.exports = router
```
## Step 11 Prisma and Database
11.1 /.env (file .env was created after command "npx prisma init"), correct as below
```plaintext
DATABASE_URL="mysql://root:pooSQL123@localhost:3306/landmark"
```

11.2 /prisma/schema.prisma  create model
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  USER
}
model Profile {
  id Int @id @default(autoincrement())
  email String @unique
  firstname String
  lastname String
  password String
  role Role @default(USER)
  createAt DateTime @default(now()) @map("create_at")
  updateAT DateTime @updatedAt @map("update_at")

  @@map("profile")
}
```

1.3 up model to DB
```bash
npx prisma migrate dev --name init or npm prisma db push
```

1.4 /configs/prisma.js (must create folder /configs) to export model
```js
const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

module.exports = prisma
```

## Step 12 update auth-controllers
```plain text
use DB for update logic of [Register] [Login]
import related lib: bcrypt, jwt
see detail step inside each controller
update file .env
```

```js
const prisma = require("../configs/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res, next) => {
  try {
    // code
    // step 1 req.body
    const {email, firstname, lastname, password, confirmPassword} = req.body
    console.log(email, firstname, lastname, password, confirmPassword)
    // step 2 validate
    // if(!email){
    //   return createError(400, "Email is required")
    // }
    // if(!firstname){
    //   return createError(400, "Firstname is required")
    // }
    // step 3 Check already
    const checkEmail = await prisma.profile.findFirst({
      where: {
        email: email,
      }
    })
    console.log(checkEmail)
    if(checkEmail) {
      return createError(400, "Email is already exist!!!")
    }

    // step 4 Encrypt by bcrypt
    // const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, 10)
    // console.log("*", hashedPassword)

    // step 5 Insert DB
    const profile = await prisma.profile.create({
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
        password: hashedPassword,
      }
    })
    // step 6 Response
    res.json({message: "Register Success"})
  } catch (error) {
    console.log("step 2 catch")
    next(error)

  }
}

exports.login = async (req, res, next) => {
  //code
  try {
    //Step 1 req.body
    const {email, password} = req.body
    // console.log("**", email, password)
    //Step 2 Check email and password
    const profile = await prisma.profile.findFirst({
      where: {
        email: email
      }
    })
    // console.log("***", profile)
    if(!profile) {
      return createError(400, "Email or Password is invalid")
    }

    const isMatch = bcrypt.compareSync(password, profile.password)

    if(!isMatch) {
      return createError(400, "Email or Password is invalid")
    }
    console.log("*", isMatch)
    
    //Step 3 Generate token
    const payload = {
      id:profile.id,
      email: profile.email,
      firstname: profile.firstname,
      lastname: profile.lastname,
      role: profile.role
    }
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1d"
    })

    console.log("**", payload)

    //Step 4 Response
    res.json({
      message: "Login Success",
      payload: payload,
      token: token,
    })
  } catch (error) {
    next(error)
  }
}
```
update file .env to add SECRET (use as SECRET Key)
```plain text
DATABASE_URL="mysql://root:pooSQL123@localhost:3306/landmark"

SECRET = cc19_workhard
```
## Step 13 create user-routes and user-controllers (without logic) and update index.js
/routes/user-routes
```js
const express = require("express")
const router = express.Router()

// Import controller
const userController = require("../controllers/user-controllers")


//@ENDPOINT http://localhost:8888/api/users
router.get("/users", userController.listUsers)

router.patch("/user/update-role", userController.updateRole)

router.delete("/user/:id", userController.deleteUser)

module.exports = router


```

/controllers/user-controllers
```js
// 1. List all users
// 2. Update Role
// 3. Delete Role

exports.listUsers = async (req, res, next) => {
  // code
  try {
    res.json({message: "Hello, List users"})
  } catch (error) {
    next(error)
  }
}

exports.updateRole =  async (req, res, next) => {
  // code
  try {
    res.json({message: "Hello, Update role"})
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  // code
  try {
    res.json({message: "Hello, Delete user"})
  } catch(error) {
    next(error)
  }
}
```
update index.js
```js
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

```