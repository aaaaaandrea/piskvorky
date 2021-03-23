const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

//set static folder
app.use(express.static(path.join(__dirname, 'publick')))

const connections = [null, null]

//run when client connects
io.on('connection', socket => {
    // console.log('New ws conection')

    //najdi dostupne cislo hrace
    let playerIndex = -1
    for (const i in connections) {
        if (connections[i] == null) {
            playerIndex = i
            break
        }
    }

    socket.emit('playerNumber', playerIndex)

    //ignoruj 3 hrace

    if (playerIndex == -1) return

    connections[playerIndex] = false


    //privitaci zprava
    socket.emit('message', 'welcome')

    //broadcast uzivatel pripojeni
    socket.broadcast.emit('message', `Player ${playerIndex} joined`)

    //broadcast pri odpojeni
    socket.on('disconnect', () => {
        connections[playerIndex] = null
        io.emit('message', `Player ${playerIndex} left the game`)
    })

    //pocita kolikrat bzlo kliknuto na pole
    socket.on('clicks', () => {
        io.emit('clicksPlus')
    })

    //nasloucha jestli nekdo kliknul na pole a pote meni barvu
    socket.on('blockColor', (blockColor) => {
        io.emit('changeColor', blockColor)
    })

    /* //nasloucha zpravu o pozici
     socket.on('position', (position) => {
         io.emit('message', position)
     })*/




})

const PORT = 3030 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))