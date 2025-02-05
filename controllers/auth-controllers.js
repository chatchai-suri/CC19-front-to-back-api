const createError = require("../utils/createError")

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

exports.login = (req, res, next) => {
  //code
  try {
    console.log(akkk)
    res.json({message: "Hello login"})
  } catch (error) {
    next(error)
  }
}

