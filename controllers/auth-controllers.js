
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

exports.currentUser = async (req, res, next) => {
  try {
    res.json({message: "Hello, current user"})
  } catch (error) {
    next (error)
  }
}

