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



