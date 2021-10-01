const express = require('express');

const UserController = require('./controllers/UserController');

const router = express.Router();

router.post('/user', UserController.create)
router.get('/users', UserController.findAll)

module.exports = router;