document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const result = document.getElementById('result');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    }

    function checkTie() {
        return !gameBoard.includes('');
    }

    function handleCellClick(index) {
        if (!gameBoard[index] && gameActive) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            const tie = checkTie();

            if (winner) {
                result.textContent = `${winner} wins!`;
                gameActive = false;
            } else if (tie) {
                result.textContent = 'It\'s a tie!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function handleCellHover(index) {
        if (!gameBoard[index] && gameActive) {
            cells[index].classList.add('hover-' + currentPlayer);
        }
    }

    function handleCellLeave(index) {
        cells[index].classList.remove('hover-' + currentPlayer);
    }

    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        result.textContent = '';

        cells.forEach((cell) => {
            cell.textContent = '';
            cell.classList.remove('hover-X', 'hover-O');
        });
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
        cell.addEventListener('mouseover', () => handleCellHover(index));
        cell.addEventListener('mouseleave', () => handleCellLeave(index));
    });

    document.getElementById('restart').addEventListener('click', restartGame);
});
