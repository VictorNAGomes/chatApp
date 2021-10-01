const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', socket => {
  console.log('User logged in :)')
  socket.on('chatMessage', msg => {
    io.emit('chatMessage', msg)
  })
})



server.listen(8080, () => console.log('Server running on port 8080'))