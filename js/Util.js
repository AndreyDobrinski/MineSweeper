'use strict'

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}




function isEmpty(board) {
    var empties = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var coord = { i: i, j: j };
            empties.push(coord);
        }
    }
    return empties;
}




function countNeighbors(board, row, col) {
    var count = 0
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board.length - 1) continue
            if (i === row && j === col) continue
            if (board[i][j].isMine === true) {
                count++
            }
        }
    }

    return count
}



function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

// to render disiered cell 
function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector(cellSelector);
    elCell.innerHTML = value;
}




function setTimer() {
    var elTimer = document.querySelector('.time')
    gGame.secsPassed += 1
    elTimer.innerText = 'Time : ' + gGame.secsPassed
}







window.oncontextmenu = () => {
    return false;
}
// to disable left click