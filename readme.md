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
