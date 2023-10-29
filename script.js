let nickname;
let countdownInterval;
let gameInterval;
let canvas, ctx;
let snake, food;
let direction;
let score;

function startGame() {
    nickname = document.getElementById("nickname").value;
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("lobbyContainer").style.display = "block";
    startCountdown();
}

function startCountdown() {
    let countdown = 10;
    countdownInterval = setInterval(() => {
        document.getElementById("countdown").innerText = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            document.getElementById("lobbyContainer").style.display = "none";
            document.getElementById("gameContainer").style.display = "block";
            startGameplay();
        }
        countdown--;
    }, 1000);
}

function startGameplay() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    snake = [{ x: 10, y: 10 }];
    food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    direction = "right";
    score = 0;

    gameInterval = setInterval(updateGame, 100);

    document.addEventListener("keydown", changeDirection);
}

function changeDirection(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (direction !== "right") direction = "left";
            break;
        case "ArrowRight":
            if (direction !== "left") direction = "right";
            break;
        case "ArrowUp":
            if (direction !== "down") direction = "up";
            break;
        case "ArrowDown":
            if (direction !== "up") direction = "down";
            break;
    }
}

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    eatFood();
    drawGame();
}

function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case "right":
            head.x++;
            break;
        case "left":
            head.x--;
            break;
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
    }
    snake.unshift(head);
}

function checkCollision() {
    const head = snake[0];
    return (
        head.x < 0 ||
        head.x >= 20 ||
        head.y < 0 ||
        head.y >= 20 ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

function eatFood() {
    const head = snake[0];
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = `Score: ${score}`;
        food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
    } else {
        snake.pop();
    }
}

function drawGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20));
}

function gameOver() {
    clearInterval(gameInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 50, 150);
    ctx.font = "20px Arial";
    ctx.fillText("Your Score: " + score, 120, 180);
}

// Initialize the game
