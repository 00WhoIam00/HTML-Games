let nickname;
let countdownInterval;

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
            startGameplay();
        }
        countdown--;
    }, 1000);
}

function startGameplay() {
    document.getElementById("lobbyContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";

    // Initialize game logic here (snake movement, collision, point generation, etc.)
    // Use canvas for rendering the game.
}

function updateScore(score) {
    document.getElementById("score").innerText = `Score: ${score}`;
}

// Add game logic here...

