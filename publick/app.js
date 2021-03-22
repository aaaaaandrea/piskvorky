const socket = io()

socket.on('message', message => {
    console.log(message)
})

//GAME



let tableRow = document.getElementsByTagName('tr')
let tableCell = document.getElementsByTagName('td')
let tableSlot = document.querySelector('.slot')
let color = ['red','blue']
let clicks = 0

/*for (let i = 0; i<tableCell.length; i++){
    tableCell[i].addEventListener('click', (e) =>{
       console.log(`${e.target.parentElement.rowIndex}, ${e.target.cellIndex}`)
       
    })
}*/

for (let i = 0; i < tableCell.length; i++) {
    
    tableCell[i].addEventListener('click', (e) => {
        clicks ++
        e.preventDefault()
        tableCell[i].style.backgroundColor = color[clicks%2]
        let position = [e.target.parentElement.rowIndex, e.target.cellIndex]
        socket.emit('position', position)
    })
    tableCell[i].style.backgroundColor = 'white'
}


/*
Array.prototype.forEach.call(tableCell, (cell) => {
    box.push(cell)

    cell.addEventListener('click', (e)=>{
        e.preventDefault()
        cell.style.backgroundColor = 'red'
        let position = [e.target.parentElement.rowIndex, e.target.cellIndex ]
        box.push(position)
        socket.emit('position',position)
    })
    cell.style.backgroundColor = 'white'
})*/

