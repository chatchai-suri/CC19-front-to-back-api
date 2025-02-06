const prisma = require("../configs/prisma")

// 1. List all users
// 2. Update Role
// 3. Delete Role

exports.listUsers = async (req, res, next) => {
  // code
  try {
    console.log("*",req.user)
    const users = await prisma.profile.findMany({
      // select: {
      //   id: true,
      //   email: true,
      //   firstname: true,
      //   lastname: true,
      //   role: true,
      //   createAt: true,
      //   updateAT: true,
      // }
      omit: {
        password: true,
      }
    })
    console.log("**",users)
    res.json({message: "Hello, List users"})
  } catch (error) {
    next(error)
  }
}

exports.updateRole =  async (req, res, next) => {
  // code
  try {
    const {id, role} = req.body
    console.log(id, role)

    const updated = await prisma.profile.update({
      where: {id: Number(id)},
      data: {role: role}
    })
    res.json({message: "Hello, Update Success"})
  } catch (error) {
    next(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const deleted = await prisma.profile.delete({
      where: {
        id: Number(id)
      }
    })
    console.log(id)
    res.json({message: "Hello, Delete Success"})
  } catch(error) {
    next(error)
  }
}



