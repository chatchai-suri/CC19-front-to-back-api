// create fucntion handle error

const handleErrors = (err, req, res, next) => {
  // code
  res
  .status(err.statusCode || 500)
  .json({message: err.message || "Somthing wrong!!"})
}

module.exports = handleErrors