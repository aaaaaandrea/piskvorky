const infoDisplay = document.getElementById('info')
let currentPlayer = 'player0'
let playerNum = 0
let p0Ready = false
let p1Ready = false



const socket = io()

//player num
socket.on('player-number', num => {
    if (num === -1) {
        infoDisplay.innerHTML = "<h1>Server full</h1>"
    } else {
        playerNum = parseInt(num)
        if (playerNum === 1) currentPlayer = "player1"
        console.log(playerNum)
    }
})

//connected disconnected

socket.on('player-connection', num => {
    console.log(`Player number ${num} has connected or disconnected`)
})


//GAME

let tableRow = document.getElementsByTagName('tr')
let tableCell = document.getElementsByTagName('td')
let tableSlot = document.querySelector('.slot')

for (let i = 0; i<tableCell.length; i++){
    tableCell[i].addEventListener('click', (e) =>{
       console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
       
    })
}

Array.prototype.forEach.call(tableCell, (cell) => {
    cell.addEventListener('click', (e)=>{
        cell.style.backgroundColor = 'red'
    })
    cell.style.backgroundColor = 'white'
})

/*function changeColor (e){
    style.backgroundColor = 'red'
}*/
