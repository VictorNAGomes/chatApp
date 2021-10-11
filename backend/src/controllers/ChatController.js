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

  async showInvitations (req, res) {
    try {
      const { id } = req.params
      let allInvites = []
      const invitations = await Chat.showInvitations(id)
      for (const invitation of invitations) {
        const user = await User.findById(invitation.invite_from)
        allInvites = [
          ...allInvites,
          user[0]
        ]
      }
      
      res.statusCode = 200
      res.json({status: true, invitations: allInvites})
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }



  async sendMessage (req, res) {
    try {
      const { from, to, msg } = req.body
      const user1 = await User.findById(from)
      const user2 = await User.findById(to)
      if (user1.length > 0 && user2.length > 0) {
        const data = {
          from_user: from,
          to_user: to,
          msg
        }

        await Chat.sendMessage(data)
        await Chat.setChatting(true, data)

        res.statusCode = 200
        res.json({status: true, msg: "Mensagem enviada com sucessos"})
      } else {
        res.statusCode = 404
        res.json({status: false, msg: "Usuário não encontrado"})
      }
    } catch (err) {
      res.statusCode = 500
      res.json({status: false, error: err})
    }
  }

  async showContacts (req, res) {
    try {
      const { id } = req.params
      const user = await User.findById(id)
      if (user.length > 0) {
        const contacts = await Chat.showContacts(id)
        if (contacts.length > 0) {
          res.statusCode = 200
          res.json({status: true, contacts})
        } else {
          res.statusCode = 404
          res.json({status: true, msg: "Nenhum contato encontrado"})
        }
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