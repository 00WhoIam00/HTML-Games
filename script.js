const maze = document.getElementById('maze');
const rows = 10;
const cols = 10;
const cellSize = 40;

const mazeGrid = Array(rows).fill(null).map(() =>
  Array(cols).fill('wall')
);

let playerX = 0;
let playerY = 0;

function generateMaze() {
  // ... (Previous maze generation code)

  mazeGrid[0][1] = 'start';
  mazeGrid[rows - 1][cols - 2] = 'end';

  renderMaze();
}

function renderMaze() {
  maze.innerHTML = '';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell', mazeGrid[y][x]);

      maze.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (
    newX >= 0 &&
    newX < cols &&
    newY >= 0 &&
    newY < rows &&
    mazeGrid[newY][newX] !== 'wall'
  ) {
    mazeGrid[playerY][playerX] = 'path';
    playerX = newX;
    playerY = newY;
    mazeGrid[playerY][playerX] = 'visited';
    renderMaze();
  }

  if (playerX === cols - 2 && playerY === rows - 1) {
    alert('You have reached the end of the maze!');
  }
}

generateMaze();

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      movePlayer(0, -1);
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      movePlayer(0, 1);
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      movePlayer(-1, 0);
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      movePlayer(1, 0);
      break;
  }
});
