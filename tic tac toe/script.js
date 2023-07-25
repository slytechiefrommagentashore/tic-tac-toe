const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `Player ${gameBoard[a]} has won!`;
            cells[a].style.backgroundColor = '#2ecc71';
            cells[b].style.backgroundColor = '#2ecc71';
            cells[c].style.backgroundColor = '#2ecc71';
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        status.textContent = "It's a tie!";
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = [...cells].indexOf(cell);

    if (gameBoard[cellIndex] === '' && gameActive) {
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? '#e74c3c' : '#f1c40f';
        gameBoard[cellIndex] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `It's ${currentPlayer}'s turn!`;
        checkWinner();
    }
}

function handleRestart() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `It's ${currentPlayer}'s turn!`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = '#fff';
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', handleRestart);
