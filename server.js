const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'publick')))

//run when client connects
io.on('connection', socket => {
    // console.log('New ws conection')

    socket.emit('message', 'welcome')

    //broadcast uzivatel pripojeni
    socket.broadcast.emit('message', 'New player joined')

    //broadcast pri odpojeni
    socket.on('disconnect', () => {
        io.emit('message', 'Player has left the game')
    })

    //nasloucha zpravu o pozici
    socket.on('position', (position) => {
        io.emit('message', position)
    })
})

const PORT = 3030 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))