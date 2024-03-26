let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cellClicked(index) {
    if (board[index] === '' && !checkWinner()) {
        board[index] = currentPlayer;
        let cell = document.getElementsByClassName('cell')[index];
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWinner()) {
            document.getElementById('result-message').innerText = `Player ${currentPlayer} wins!`;
            document.getElementById('result-screen').style.display = 'flex';
        } else if (board.every(cell => cell !== '')) {
            document.getElementById('result-message').innerText = "Ada Ommala!";
            document.getElementById('result-screen').style.display = 'flex';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    document.getElementById('result-screen').style.display = 'none';
    document.getElementById('board').querySelectorAll('.cell').forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O');
    });
}
