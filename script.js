const maze = document.getElementById('maze');
const rows = 10;
const cols = 10;
const cellSize = 40;

const mazeGrid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const player = {
    x: 1,
    y: 1
};

function generateMaze() {
    maze.innerHTML = '';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            if (mazeGrid[y][x] === 1) {
                cell.classList.add('wall');
            }

            if (x === player.x && y === player.y) {
                cell.classList.add('player');
            }

            maze.appendChild(cell);
        }
    }
}

function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (mazeGrid[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        generateMaze();
    }

    if (player.x === cols - 2 && player.y === rows - 2) {
        alert('Congratulations! You reached the end of the maze.');
    }
}

generateMaze();

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});
