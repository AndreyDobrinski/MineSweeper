'use strict'


function renderHints() {
    var strHtml = ''
    for (var i = 0; i < gLevel.HINTS; i++) {
        var cellClass = `hint-${i + 1}`
        strHtml += `<li><button class = "${cellClass}" onclick="getHint(this)"><span>💡</span></button></li>`
    }
    var elHint = document.querySelector('.game-hints')
    elHint.innerHTML = strHtml
}


function getHint(elBtn) {
    // elBtn.style.display='none'
    elBtn.style.visibility = 'hidden'
    gGame.isHint = true
}


/// bug num 5  is here
function showHint(elCell, row, col) {
    gGame.isHint = false
    gGame.shownCount--
    // when cell is shown dont count it as showncount
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > gBoard.length - 1) continue
            if (gBoard[i][j].minesAroundCount === 0) elCell.innerHTML = EMPTY
            else if (gBoard[i][j].minesAroundCount) elCell.innerHTML = gBoard[i][j].minesAroundCount // bug num 5 is here
            else if (gBoard[i][j].isMine) elCell.innerText = MINE // bug num 5 is here
            elCell.style.backgroundColor = 'red'

        }
    }
    // console.log(gBoard[i][j].minesAroundCount);
    gGame.isOn = false
    setTimeout(function () {
        gGame.isOn = true
        hideShownHint(elCell, row, col)
    }, 1000)
}




function hideShownHint(elCell, row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i > gBoard.length - 1) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j > gBoard.length - 1) continue
            if (!gBoard[i][j].isShown) {
                elCell.innerHTML = EMPTY
                elCell.style.backgroundColor = 'cyan'
            }
        }
    }
}




function renderLives() {
    var strHtml = ''
    for (var i = 0; i < gLevel.LIVES; i++) {
        var cellClass = `life-${i + 1}`
        strHtml += `<li><button class = "${cellClass}"><span>❤️</span></button></li>`
    }
    var elLife = document.querySelector('.game-lifes')
    elLife.innerHTML = strHtml
}



function renderSafeClick() {
    var strHtml = ''
    for (var i = 0; i < gLevel.HINTS; i++) {
        var cellClass = `safe-${i + 1}`
        strHtml += `<li><button class = "${cellClass}" onclick="safeClick(this)"><span>Safe Click</span></button></li>`
    }
    var elSafe = document.querySelector('.game-safeClicks')
    elSafe.innerHTML = strHtml
}

function safeClick(elBtn) {
    var cellFound = false
    while (!cellFound) {
        var raidomPosI = getRandomIntInclusive(0, gBoard.length - 1)
        var raidomPosJ = getRandomIntInclusive(0, gBoard.length - 1)

        var randomCell = gBoard[raidomPosI][raidomPosJ]
        if (!randomCell.isMine && !randomCell.isShown && !randomCell.isMarked) cellFound = true

    }

    // var elCell = document.querySelector('.'+getClassName({i:raidomPosI,j:raidomPosJ}))
    var elCell = document.querySelector(`.cell-${raidomPosI}-${raidomPosI}`)
    elCell.style.backgroundColor = 'green'
    setTimeout(function () {
        elCell.style.backgroundColor = 'cyan'
    }, 500)

    elBtn.style.visibility = 'hidden'
}