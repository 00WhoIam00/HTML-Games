const gameContainer = document.querySelector('.game-container');
const snake = document.getElementById('snake');
const food = document.getElementById('food');

let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let gridSize = 10;
let snakeBody = [{ x: 0, y: 0 }];
let direction = 'right';
let score = 0;

function update() {
    snakeX += gridSize * (direction === 'right' ? 1 : direction === 'left' ? -1 : 0);
    snakeY += gridSize * (direction === 'down' ? 1 : direction === 'up' ? -1 : 0);

    if (snakeX === foodX && snakeY === foodY) {
        score++;
        spawnFood();
    } else {
        snakeBody.pop();
    }

    snakeBody.unshift({ x: snakeX, y: snakeY });

    if (checkCollision()) {
        alert('Game Over! Score: ' + score);
        snakeX = 0;
        snakeY = 0;
        foodX = 0;
        foodY = 0;
        direction = 'right';
        score = 0;
        snakeBody = [{ x: 0, y: 0 }];
    }

    render();
    setTimeout(update, 100);
}

function render() {
    snake.style.left = snakeX + 'px';
    snake.style.top = snakeY + 'px';
    food.style.left = foodX + 'px';
    food.style.top = foodY + 'px';
}

function spawnFood() {
    foodX = Math.floor(Math.random() * (gameContainer.clientWidth / gridSize)) * gridSize;
    foodY = Math.floor(Math.random() * (gameContainer.clientHeight / gridSize)) * gridSize;
}

function checkCollision() {
    if (
        snakeX < 0 ||
        snakeX >= gameContainer.clientWidth ||
        snakeY < 0 ||
        snakeY >= gameContainer.clientHeight
    ) {
        return true;
    }

    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            return true;
        }
    }

    return false;
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
