const maze = document.getElementById('maze');
const rows = 10;
const cols = 10;
const cellSize = 40;

const mazeGrid = Array(rows).fill(null).map(() =>
  Array(cols).fill('wall')
);

function generateMaze() {
  const stack = [];
  const directions = [[0, 2], [2, 0], [0, -2], [-2, 0]];

  function isValid(x, y) {
    return x >= 0 && x < cols && y >= 0 && y < rows && mazeGrid[y][x] === 'wall';
  }

  function carve(x, y) {
    mazeGrid[y][x] = 'path';
  }

  function generate(x, y) {
    carve(x, y);
    stack.push([x, y]);

    while (stack.length > 0) {
      const [cx, cy] = stack[stack.length - 1];
      const neighbors = [];

      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (isValid(nx, ny)) {
          neighbors.push([nx, ny]);
        }
      }

      if (neighbors.length === 0) {
        stack.pop();
      } else {
        const [nx, ny] = neighbors[Math.floor(Math.random() * neighbors.length)];
        carve(nx, ny);
        carve(cx + (nx - cx) / 2, cy + (ny - cy) / 2);
        stack.push([nx, ny]);
      }
    }
  }

  generate(0, 0);
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

generateMaze();
