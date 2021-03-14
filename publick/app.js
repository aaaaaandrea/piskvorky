const infoDisplay = document.getElementById('info')
let currentPlayer = 'player0'
let playerNum = 0
let p0Ready = false
let p1Ready = false



const socket = io()

//player num
socket.on('player-number', num => {
    if(num === -1){
        infoDisplay.innerHTML = "Server full"
    } else {
        playerNum = parseInt(num)
        if(playerNum === 1) currentPlayer = "player1"
        console.log(playerNum)
    }
})

//connected disconnected

socket.on('player-connection', num =>{
    console.log(`Player number ${num} has connected or disconnected`)
})
