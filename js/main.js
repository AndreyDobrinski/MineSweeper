'use strict'




var gBoard;

var gLevel = {
    SIZE: 4,
    MINES: 2
};;
var gGame;
var gFirstClick;


var gTimeInterval;

const MINE = '💣'
const EMPTY = ''
const FLAG = '🚩'


function init() {
    restart()

    // gLevel = {
    //     SIZE: 4,
    //     MINES: 2
    // };

    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }

    gFirstClick = true

    gBoard = createBoard()
    // console.table(gBoard);
    renderBoard(gBoard)

}

function restart() {

    var elTime = document.querySelector('.time')
    elTime.innerText = 'Time :'
    var elBtn = document.querySelector('.smily')
    elBtn.innerText = '🙂'
    clearInterval(gTimeInterval)
}



function createRandomMinesPos(board, amountOfMines) {
    var empty = isEmpty(board)
    for (var i = 0; i < amountOfMines; i++) {
        var cell = getRandomIntInclusive(0, empty.length - 1)
        // getting a random empty cell
        var minePlacement = empty[cell]
        // placing the mine on the empty array
        board[minePlacement.i][minePlacement.j].isMine = true
        // setting the mine to true
        empty.splice(cell, 1)
        // removing the space from empty and placing 1 mine cell(then it repeats deppending on amountOfMines)
    }
}





function cellClicked(i, j) {
    if (!gGame.isOn) return
    // unclickable when game over
    var currCell = gBoard[i][j]
    var realCellsCount = gLevel.SIZE ** 2 - gLevel.MINES
    currCell.isShown = true
    gGame.shownCount++


    if (currCell.minesAroundCount === 0) {
        expandShown(gBoard, i, j)
    }
    // BUG WAS HERE

    if (gFirstClick) {
        gTimeInterval = setInterval(setTimer, 1000)
        gFirstClick = false
    }
    if (currCell.isMarked) {
        currCell.isShown = false
        return
    }



    if (currCell.isMine) {
        doGameLost()
    } else if (gGame.shownCount === realCellsCount) {
        doGameWon()
    }






    console.log(gGame.shownCount);
    renderBoard(gBoard)
    // change to renderCell later maybe
}



function cellMarked(i, j) {
    if (!gGame.isOn) return
    // unclickable when game over
    var currcell = gBoard[i][j]





    if (gFirstClick) {
        gTimeInterval = setInterval(setTimer, 1000)
        gFirstClick = false
    }
    // timer will start when there is a first flag
    if (!currcell.isMarked && !currcell.isShown) {
        // if the cell is not marked and not shown then allow to put the flag
        currcell.isMarked = true

    } else if (currcell.isMarked) {
        // if its flagged  ,  remove the flag
        currcell.isMarked = false
    }




    renderBoard(gBoard)
    // change to renderCell later maybe
}



function showMines() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j]
            if (currCell.isMine) {
                // if its mine
                currCell.isMarked = false
                // THIS FIXED THE FIRST BUG
                currCell.isShown = true
                // reveal all mines
            }
        }
    }
}


//  BUGS FOUND:
// 1. if you have a cell flaged and then you click on the bomb , if the cell was flaged it will show both
//the flag and the bomb //////// FIXED ////// //////

// 2. if you continu clicking on the same cell that was revealed , 
// victory will show up



function setGameLvl(elBtn) {
    var boardSize = elBtn.value
    var amountOfMines = elBtn.dataset.mine
    gLevel.SIZE = boardSize
    gLevel.MINES = amountOfMines
    init()
}




function expandShown(board, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > board.length - 1) continue
            if (i === row && j === col) continue
            else if (board[i][j].isMarked || board[i][j].isMine || board[i][j].isShown) continue
            else {
                board[i][j].isShown = true
                gGame.shownCount++
                // adding  gGame.shownCount++ and ( || board[i][j].isShown) fixed the bug , i am very happy
            }
        }
    }
}

// 3. having a  bug with expandShown where the victory doesent show up
//// FIXED //////



function doGameWon() {
    var elBtn = document.querySelector('.smily')
    elBtn.innerText = '😍'
    console.log('You won!');
    gGame.isOn = false
    clearInterval(gTimeInterval)
}



function doGameLost() {
    var elBtn = document.querySelector('.smily')
    elBtn.innerText = '☠️'
    showMines()
    console.log('you lost');
    gGame.isOn = false
    clearInterval(gTimeInterval)
}



//  add 3 lives
// work  more on css