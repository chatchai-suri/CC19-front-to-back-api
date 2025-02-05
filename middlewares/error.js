// create fucntion handle error

const handleErrors = (err, req, res, next) => {
  // code
  console.log("step 3 handle Error")
  res
  .status(err.statusCode || 500)
  .json({message: err.message || "Somthing wrong!!"})
}

module.exports = handleErrors