//GAME

let button = document.getElementById('button')
let infoDisplay = document.getElementById('info')

let connected0 = document.getElementById('connected0')
let connected1 = document.getElementById('connected1')
let connected = [connected0, connected1]

let turn0 = document.getElementById('turn0')
let turn1 = document.getElementById('turn1')
let turn = [turn0, turn1]

let tableRow = document.getElementsByTagName('tr')
let tableCell = document.getElementsByTagName('td')
let tableSlot = document.querySelector('.slot')
let color = ['red', 'blue']
let clicks = 0
let blockColor, position
let playerNum = 0
//let currentPlayer = 0 //red


button.addEventListener('click', () => {
    const socket = io()
    // priradi cislo hraci
    socket.on('playerNumber', num => {
        if (num == -1) {
            infoDisplay.innerHTML = 'Server is full'
        } else {
            infoDisplay.innerHTML = ''
            playerNum = parseInt(num)
            console.log('You are ' + playerNum)
        }
    })
    //zmena barvy pri pripojeni
    socket.on('colorChange', data => {
        connected[data.num].style.color = data.color
    })

    //prijme zpravy ze serveru a vypise do console
    socket.on('message', message => {
        console.log(message)
    })

   /* if (clicks % 2 == playerNum) {
        turn[playerNum].innerHTML = '●'
    }else turn[playerNum].innerHTML = ''*/

    for (let i = 0; i < tableCell.length; i++) {

        tableCell[i].addEventListener('click', (e) => {
            e.preventDefault()
            // kontrola jestli pole neni obsazeno
            if (clicks % 2 == playerNum && tableCell[i].style.backgroundColor == 'white') {
                socket.emit('clicks')
                blockColor = [i, color[playerNum]]
                socket.emit('blockColor', blockColor)
            }

            /* // zjisteni pozice na tabulce, jen pro kontrolu
             position = [e.target.parentElement.rowIndex, e.target.cellIndex]
             // odeslani pozice na server
             socket.emit('position', position)*/
        })
        tableCell[i].style.backgroundColor = 'white'
    }


    socket.on('clicksPlus', function plusClick() {
        clicks++
    })

    socket.on('changeColor', changedBlock => {
        tableCell[changedBlock[0]].style.backgroundColor = changedBlock[1]
    })
})