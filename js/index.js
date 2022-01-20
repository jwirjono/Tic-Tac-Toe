let amount;
let totalCell;
var cellElements;
var WINNING_COMBINATIONS = [];
let circleTurn

const repeat_count = document.querySelector(':root');
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

restartButton.addEventListener('click', startGame)

function handleAmount() {
    clearBoard();
    value = document.getElementById('amount');
    amount = value.value;
    totalCell = amount * amount;
    repeat_count.style.setProperty('--repeat-count', amount);
    addCell();
    addWinningCombinations();
    startGame();
}

function clearBoard() {
    document.getElementById('board').innerHTML = "";
    WINNING_COMBINATIONS = [];
}

function addCell() {
    for (i = 0; i < totalCell; i++) {
        var table = document.getElementById('board');
        table.innerHTML += "<div class='cell' data-cell></div>";
    }
    cellElements = document.querySelectorAll('[data-cell]');
}

function addWinningCombinations() {
    for (i = 0; i < amount; i++) {
        var horizontal = [];
        var vertical = [];
        var count = i * amount;
        for (j = 0; j < amount; j++) {
            horizontalPush = j + count;
            verticalPush = i + j * amount;
            horizontal.push(horizontalPush);
            vertical.push(verticalPush);
        }
        WINNING_COMBINATIONS.push(vertical, horizontal);
    }
    var diagonal1 = [];
    var diagonal2 = [];
    for (i = 0; i < amount; i++) {
        var diagonal1Push = i * amount + i;
        var diagonal2Push = (i + 1) * (amount - 1);
        diagonal1.push(diagonal1Push);
        diagonal2.push(diagonal2Push);
    }
    WINNING_COMBINATIONS.push(diagonal1, diagonal2);
}

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}