const express = require('express')

const UserController = require('./controllers/UserController')
const ChatController = require('./controllers/ChatController')

const router = express.Router()

router.post('/user', UserController.create)
router.get('/users', UserController.findAll)

router.post('/sendInvitation', ChatController.sendInvitation)
router.post('/acceptInvitation', ChatController.acceptInvitation)
router.post('/declineInvitation', ChatController.declineInvitation)

module.exports = router;