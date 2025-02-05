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

