const express = require('express')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3030
const socketio = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

//static folder
app.use(express.static(path.join(__dirname, "publick")))

//start sever
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

//socket request from web client

const connections = [null, null]


io.on('connection', socket => {
    //console.log('Nove pripojeni')

    //najdi dostupne cislo hrace
    let playerIndex = -1
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = i
            break
        }
    }


    //tell the number of player
    socket.emit('player-number', playerIndex)

    console.log(`Player ${playerIndex} has connected`)

    //ignoruj tretiho
    if (playerIndex === -1) return

    connections[playerIndex] = false

    // sdelit pripojeni ostatim
    socket.broadcast.emit('player-connection', playerIndex)
})