const gameContainer = document.querySelector('.game-container');
const snake = document.getElementById('snake');
const food = document.getElementById('food');
const scoreElement = document.getElementById('score');

let gridSize = 10;
let snakeSegments = [{ x: 2, y: 2 }];
let foodX = 0;
let foodY = 0;
let direction = 'right';
let score = 0;

function update() {
    moveSnake();
    checkCollision();
    render();
    scoreElement.innerHTML = 'Score: ' + score;
    setTimeout(update, 100);
}

function moveSnake() {
    let headX = snakeSegments[0].x + (direction === 'right' ? 1 : direction === 'left' ? -1 : 0);
    let headY = snakeSegments[0].y + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0);
    snakeSegments.unshift({ x: headX, y: headY });

    if (headX === foodX && headY === foodY) {
        score++;
        spawnFood();
    } else {
        snakeSegments.pop();
    }
}

function render() {
    gameContainer.innerHTML = ''; // Clear the game container

    // Render the snake
    snakeSegments.forEach(segment => {
        const snakeSegment = document.createElement('div');
        snakeSegment.className = 'snake';
        snakeSegment.style.gridColumn = segment.x;
        snakeSegment.style.gridRow = segment.y;
        gameContainer.appendChild(snakeSegment);
    });

    // Render the food
    food.style.gridColumn = foodX;
    food.style.gridRow = foodY;
}

function spawnFood() {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

function checkCollision() {
    const headX = snakeSegments[0].x;
    const headY = snakeSegments[0].y;

    if (
        headX <= 0 ||
        headX > 30 ||
        headY <= 0 ||
        headY > 30
    ) {
        gameOver();
    }

    for (let i = 1; i < snakeSegments.length; i++) {
        if (headX === snakeSegments[i].x && headY === snakeSegments[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    alert('Game Over! Score: ' + score);
    snakeSegments = [{ x: 2, y: 2 }];
    foodX = 0;
    foodY = 0;
    direction = 'right';
    score = 0;
    spawnFood();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowDown':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'ArrowLeft':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 'ArrowRight':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
    }
});

spawnFood();
update();
