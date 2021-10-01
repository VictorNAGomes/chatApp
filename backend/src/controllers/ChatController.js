const Chat = require('../models/Chat')
const User = require('../models/User')

class ChatController {
  async sendInvitation (req, res) {
    try{
      const { from, to } = req.body
      const user1 = await User.findById(from)
      const user2 = await User.findById(to)
      if (user1.length > 0 && user2.length > 0) {
        const data = {
          invite_from: from,
          invite_to: to
        }

        await Chat.sendInvitation(data)

        res.statusCode = 200
        res.json({status: true, msg: "Solicitação enviada"})
      } else {
        res.statusCode = 404
        res.json({status: false, msg: "Usuário não encontrado"})
      }
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }

  async acceptInvitation (req, res) {
    try {
      const { from, to } = req.body
      const user1 = await User.findById(from)
      const user2 = await User.findById(to)
      if (user1.length > 0 && user2.length > 0) {
        const data = {
          invite_from: from,
          invite_to: to
        }

        await Chat.deleteInvitation(data)

        res.statusCode = 200
        res.json({status: true, msg: "Solicitação apagada com sucesso"})
      } else {
        res.statusCode = 404
        res.json({status: false, msg: "Usuário não encontrado"})
      }
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }

  async declineInvitation (req, res) {
    try {
      const { from, to } = req.body
      const user1 = await User.findById(from)
      const user2 = await User.findById(to)
      if (user1.length > 0 && user2.length > 0) {
        const data = {
          invite_from: from,
          invite_to: to
        }

        await Chat.deleteInvitation(data)

        res.statusCode = 200
        res.json({status: true, msg: "Solicitação apagada com sucesso"})
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

module.exports = new ChatController()