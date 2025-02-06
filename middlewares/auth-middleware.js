const createError = require("../utils/createError")
const jwt = require("jsonwebtoken")

exports.authCheck = async (req, res, next) => {
  try {
    // code
    // received header from client
    const authorization = req.headers.authorization
    console.log("*",authorization)
    // check wheter token was send
    if(!authorization) {
      return createError(400, "Missing Token")
    }
    const token = authorization.split(" ")[1]

    //verify token
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      // console.log("**",err)
      // console.log("***",decode)
      if(err) {
        return createError(401, "Unauthorized !!")
      }
      //create property user = decode = payload + createdAt + expireAt
      req.user = decode;
      // console.log(req)
      next()
    })
    // console.log(token)
    console.log("Hello, middleware")
    
  } catch (error) {
    next(error)
  }
}