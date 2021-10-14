const User = require('../models/User')
const userValidation = require('../validations/validation')

class UserController {
  async create (req, res) {
    try{
      const { userName, password } = req.body

      res.utilized = false

      userValidation.userName(userName, res)
      userValidation.password(password, res)

      if (res.utilized === false) {
        const user = await User.findByName(userName)
        if (user.length === 0) {
          const data = {
            userName,
            password
          }

          await User.create(data)

          res.statusCode = 201
          res.json({status: true, msg: "Usuário inserido com sucesso"})
        } else {
          res.statusCode = 406
          res.json({status: false, msg: "Usuário já foi inserido"})
        }
      }
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }

  async findAll (req, res) {
    try {
      const users = await User.findAll()

      res.statusCode = 200
      res.json({status: true, users})
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }

  async search (req, res) {
    try {
      const { userName } = req.params

      const users = await User.search(userName)
      if (users.length > 0) {
        res.statusCode = 200
        res.json({status: true, users})
      } else {
        res.statusCode = 404
        res.json({status: false, msg: "Usuário não encontrado"})
      }
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }
}

module.exports = new UserController()