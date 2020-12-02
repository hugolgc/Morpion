const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

io.on('connection', (socket) => {
  socket.on('init', (bool) => {
    io.emit('init', bool)
  })
  socket.on('getPlay', (array) => {
    io.emit('getPlay', array)
  })
})

server.listen(80)