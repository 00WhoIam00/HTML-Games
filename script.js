const maze = document.getElementById("maze");
const smallMazeButton = document.getElementById("smallMaze");
const mediumMazeButton = document.getElementById("mediumMaze");
const largeMazeButton = document.getElementById("largeMaze");
const timerElement = document.getElementById("timer");
const stepsElement = document.getElementById("steps");

let mazeSize = 8; // Default maze size (8x8)
let mazeData;

// Maze generation function
function generateMaze() {
  mazeData = [];
  for (let row = 0; row < mazeSize; row++) {
    let rowData = "";
    for (let col = 0; col < mazeSize; col++) {
      rowData += "#";
    }
    mazeData.push(rowData);
  }
  // Add a player at the start position
  mazeData[1] = mazeData[1].substring(0, 1) + "P" + mazeData[1].substring(2);
  // Add an exit at the end position
  mazeData[mazeSize - 2] = mazeData[mazeSize - 2].substring(0, mazeSize - 2) + "E" + mazeData[mazeSize - 2].substring(mazeSize - 1);
  renderMaze();
}

// Maze rendering function
function renderMaze() {
  maze.innerHTML = "";
  for (let row = 0; row < mazeData.length; row++) {
    for (let col = 0; col < mazeData[row].length; col++) {
      const cell = document.createElement("div");
      cell.className = mazeData[row][col] === "#" ? "wall" : mazeData[row][col] === "P" ? "player" : "";
      cell.style.left = col * 30 + "px";
      cell.style.top = row * 30 + "px";
      maze.appendChild(cell);
    }
  }
}

// Maze size buttons event listeners
smallMazeButton.addEventListener("click", () => {
  mazeSize = 8;
  generateMaze();
});

mediumMazeButton.addEventListener("click", () => {
  mazeSize = 12;
  generateMaze();
});

largeMazeButton.addEventListener("click", () => {
  mazeSize = 16;
  generateMaze();
});

generateMaze();

// Timer and steps counters
let timer = 0;
let steps = 0;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timer++;
    timerElement.textContent = timer;
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timer = 0;
  timerElement.textContent = timer;
}

function incrementSteps() {
  steps++;
  stepsElement.textContent = steps;
}

// Event listener for player movement (up, down, left, right)
document.addEventListener("keydown", (e) => {
  const player = document.querySelector(".player");
  const playerPosition = mazeData.findIndex((row) => row.includes("P"));

  if (e.key === "ArrowUp") {
    if (playerPosition > mazeSize && mazeData[playerPosition - mazeSize] !== "#") {
      mazeData[playerPosition] = " ";
      mazeData[playerPosition - mazeSize] = "P";
      incrementSteps();
      renderMaze();
    }
  } else if (e.key === "ArrowDown") {
    if (playerPosition < mazeSize * (mazeSize - 1) && mazeData[playerPosition + mazeSize] !== "#") {
      mazeData[playerPosition] = " ";
      mazeData[playerPosition + mazeSize] = "P";
      incrementSteps();
      renderMaze();
    }
  } else if (e.key === "ArrowLeft") {
    if (playerPosition % mazeSize !== 0 && mazeData[playerPosition - 1] !== "#") {
      mazeData[playerPosition] = " ";
      mazeData[playerPosition - 1] = "P";
      incrementSteps();
      renderMaze();
    }
  } else if (e.key === "ArrowRight") {
    if (playerPosition % mazeSize !== mazeSize - 1 && mazeData[playerPosition + 1] !== "#") {
      mazeData[playerPosition] = " ";
      mazeData[playerPosition + 1] = "P";
      incrementSteps();
      renderMaze();
    }
  }
});

// Start timer when the player moves
document.addEventListener("keydown", () => {
  if (timer === 0) {
    startTimer();
  }
});
