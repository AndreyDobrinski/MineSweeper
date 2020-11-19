'use strict'



function renderHints() {
    var strHtml = ''
    for (var i = 0; i < gLevel.HINTS; i++) {
        var cellClass = `hint-${i + 1}`
        strHtml += `<li><button class = "${cellClass}" onclick="getHint(this)"><span>${HINT}</span></button></li>`
    }
    var elHint = document.querySelector('.game-hints')
    elHint.innerHTML = strHtml
}



function getHint(elBtn) {
    // elBtn.style.display='none'
    elBtn.style.visibility = 'hidden'
    gGame.isHint = true
}


// made showhint and hidehint properly to fix the bug num 5
function showHint(row, col) {
    gGame.isHint = false
    gGame.shownCount--
    // when cell is shown dont count it as showncount
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            // if (i === row && j === col) continue
            if (gBoard[i][j].isShown) continue
            if (gBoard[i][j].isMarked) continue

            var elCell = document.querySelector('.' + getClassName({ i: i, j: j }))
            if (gBoard[i][j].isMine) {
                elCell.innerHTML = MINE
                elCell.style.backgroundColor = 'red'
            } else if (gBoard[i][j].minesAroundCount > 0) {
                elCell.innerHTML = gBoard[i][j].minesAroundCount
                elCell.style.backgroundColor = 'red'
            } else {
                elCell.style.backgroundColor = 'red'
            }

        }
    }
    // console.log(gBoard[i][j].minesAroundCount);
    gGame.isOn = false
    setTimeout(function () {
        gGame.isOn = true
        hideShownHint(row, col)
    }, 1000)
}



function hideShownHint(row, col) {
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            // if (i === row && j === col) continue
            if (gBoard[i][j].isShown) continue
            if (gBoard[i][j].isMarked) continue
            var elCell = document.querySelector('.' + getClassName({ i: i, j: j }))
            elCell.innerHTML = EMPTY
            elCell.style.backgroundColor = 'cyan'
        }
    }
}



function renderLives() {
    var strHtml = ''
    for (var i = 0; i < gLevel.LIVES; i++) {
        var cellClass = `life-${i + 1}`
        strHtml += `<li><button class = "${cellClass}"><span>${LIFE}</span></button></li>`
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
        console.log(gBoard[raidomPosI][raidomPosJ]);
    }

    // var elCell = document.querySelector(`.cell-${raidomPosI}-${raidomPosI}`)
    var elCell = document.querySelector('.' + getClassName({ i: raidomPosI, j: raidomPosJ }))
    // fixed the bug num 7 by properly making elcell
    console.log(elCell);
    elCell.style.backgroundColor = 'green'
    setTimeout(function () {
        elCell.style.backgroundColor = 'cyan'
    }, 500)

    elBtn.style.visibility = 'hidden'
}