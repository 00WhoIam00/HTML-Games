const gameContainer = document.querySelector('.game-container');
const food = document.getElementById('food');
const scoreElement = document.getElementById('score');

let gridSize = 10;
let snake = [{ x: 0, y: 0 }];
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
    let headX = snake[0].x + gridSize * (direction === 'right' ? 1 : direction === 'left' ? -1 : 0);
    let headY = snake[0].y + gridSize * (direction === 'down' ? 1 : direction === 'up' ? -1 : 0);
    snake.unshift({ x: headX, y: headY });

    if (headX === foodX && headY === foodY) {
        score++;
        spawnFood();
    } else {
        snake.pop();
    }
}

function render() {
    // Clear the game container
    gameContainer.innerHTML = '';

    // Render the snake
    snake.forEach((segment, index) => {
        const snakeSegment = document.createElement('div');
        snakeSegment.className = 'snake';
        snakeSegment.style.left = segment.x + 'px';
        snakeSegment.style.top = segment.y + 'px';
        gameContainer.appendChild(snakeSegment);
    });

    // Render the food
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}

function spawnFood() {
    foodX = Math.floor(Math.random() * (gameContainer.clientWidth / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (gameContainer.clientHeight / gridSize)) * gridSize;
}

function checkCollision() {
    const headX = snake[0].x;
    const headY = snake[0].y;

    if (
        headX < 0 ||
        headX >= gameContainer.clientWidth ||
        headY < 0 ||
        headY >= gameContainer.clientHeight
    ) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    alert('Game Over! Score: ' + score);
    snake = [{ x: 0, y: 0 }];
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
