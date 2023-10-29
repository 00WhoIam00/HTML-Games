// Get DOM elements
const nicknameContainer = document.getElementById("nickname-container");
const canvasContainer = document.getElementById("canvas-container");
const drawingCanvas = document.getElementById("drawing-canvas");
const playButton = document.getElementById("play");
const clearButton = document.getElementById("clear");
const eraserButton = document.getElementById("eraser");
const pencilButton = document.getElementById("pencil");
const colorPicker = document.getElementById("color");
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendMessageButton = document.getElementById("send-message");
const playerListContainer = document.getElementById("player-list-container");
const playerList = document.getElementById("player-list");
const nicknameInput = document.getElementById("nickname");

// Initialize drawing context
const ctx = drawingCanvas.getContext("2d");
let isDrawing = false;
let isEraser = false;
let playerEntered = false; // Flag to track if the player has entered a nickname

// Event listeners
playButton.addEventListener("click", () => {
    if (!playerEntered) {
        const nickname = nicknameInput.value;
        if (nickname) {
            playerEntered = true;
            nicknameContainer.style.display = "none";
            canvasContainer.style.display = "block";
            nicknameInput.disabled = true; // Disable nickname input after entering
            // Enable drawing and chat controls
            enableControls();
            // Send the nickname to the server and update the player list (you need to set up your server for this).
            // For testing purposes, you can add the nickname to the player list.
            const playerItem = document.createElement("li");
            playerItem.textContent = nickname;
            playerList.appendChild(playerItem);
        }
    }
});

clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
});

eraserButton.addEventListener("click", () => {
    isEraser = true;
    drawingCanvas.style.cursor = "crosshair";
});

pencilButton.addEventListener("click", () => {
    isEraser = false;
    drawingCanvas.style.cursor = "auto";
});

colorPicker.addEventListener("input", (event) => {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value; // Set fill style for shapes
});

drawingCanvas.addEventListener("mousedown", (event) => {
    if (playerEntered) {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX - drawingCanvas.getBoundingClientRect().left, event.clientY - drawingCanvas.getBoundingClientRect().top);
    }
});

drawingCanvas.addEventListener("mousemove", (event) => {
    if (playerEntered && isDrawing) {
        ctx.globalCompositeOperation = isEraser ? "destination-out" : "source-over";
        ctx.lineWidth = 2;
        ctx.lineTo(event.clientX - drawingCanvas.getBoundingClientRect().left, event.clientY - drawingCanvas.getBoundingClientRect().top);
        ctx.stroke();
    }
});

drawingCanvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

sendMessageButton.addEventListener("click", () => {
    if (playerEntered) {
        const message = messageInput.value;
        if (message) {
            // For demonstration, add the message to the chat container.
            const messageElement = document.createElement("p");
            messageElement.textContent = `Nickname: ${message}`;
            chatMessages.appendChild(messageElement);
            messageInput.value = ''; // Clear the input field
        }
    }
});

// Function to enable drawing and chat controls
function enableControls() {
    clearButton.disabled = false;
    eraserButton.disabled = false;
    pencilButton.disabled = false;
    colorPicker.disabled = false;
    messageInput.disabled = false;
    sendMessageButton.disabled = false;
}
