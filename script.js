// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const messageElement = document.getElementById('message');
let isXTurn = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isXTurn = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageElement.textContent = '';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = currentClass.toUpperCase();
    cell.classList.add(currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function endGame(draw) {
    if (draw) {
        messageElement.textContent = 'Egalitate!';
    } else {
        messageElement.textContent = `${isXTurn ? "X" : "O"} a câștigat!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}
