'use strict'



function createBoard() {
    var board = []
    var size = gLevel.SIZE
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell
        }
    }



    createRandomMinesPos(board, gLevel.MINES)



    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            var currCell = board[i][j]
            var countNeigh = countNeighbors(board, i, j)
            currCell.minesAroundCount = countNeigh
        }
    }
    // console.log(size ** 2 - gLevel.MINES);
    return board
}





function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var cell = board[i][j]
            var className = getClassName({ i: i, j: j })
            var showColor = (cell.isShown) ? 'selected' : ''
            // when isShown is true , add color from 'selected
            strHtml += `<td class = "cell ${className} ${showColor}" onclick="cellClicked(this,${i},${j})" oncontextmenu="cellMarked(${i},${j})">`



            if (cell.isMarked) strHtml += FLAG
            if (cell.isShown) {
                // when isShown is setted to true , reveal them:
                if (cell.isMine) {
                    strHtml += MINE
                } else if (cell.minesAroundCount) {
                    strHtml += cell.minesAroundCount
                } else {
                    strHtml += EMPTY
                }



            }
            strHtml += `</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}
