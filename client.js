const playerId = Math.random().toString(36).substring(2);
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    ws.send(JSON.stringify({ action: 'join', playerId }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.action === 'joined' && data.playerId === playerId) {
        // Display a message that the player has joined.
    } else if (data.action === 'choice') {
        // Handle opponent's choice and update the game result.
    }
};

document.querySelectorAll('.choice').forEach((button) => {
    button.addEventListener('click', () => {
        const player = button.getAttribute('data-player');
        const choice = button.textContent.toLowerCase();
        ws.send(JSON.stringify({ action: 'choice', playerId, choice }));
        // Disable the buttons until the opponent makes a choice.
    });
});
