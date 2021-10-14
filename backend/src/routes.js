const express = require('express')

const UserController = require('./controllers/UserController')
const ChatController = require('./controllers/ChatController')

const router = express.Router()

router.post('/user', UserController.create)
router.get('/users', UserController.findAll)
router.get('/user/:userName', UserController.search)

router.post('/invitation/send', ChatController.sendInvitation)
router.post('/invitation/accept', ChatController.acceptInvitation)
router.post('/invitation/decline', ChatController.declineInvitation)
router.get('/invitations/:id', ChatController.showInvitations)
router.post('/message/send', ChatController.sendMessage)
router.get('/contacts/:id', ChatController.showContacts)

module.exports = router;