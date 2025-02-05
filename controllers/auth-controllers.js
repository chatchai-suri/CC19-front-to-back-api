
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

exports.login = (req, res, next) => {
  //code
  try {
    console.log(akkk)
    res.json({message: "Hello login"})
  } catch (error) {
    next(error)
  }
}

