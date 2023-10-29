// Get DOM elements
const nicknameContainer = document.getElementById("nickname-container");
const canvasContainer = document.getElementById("canvas-container");
const drawingCanvas = document.getElementById("drawing-canvas");
const playButton = document.getElementById("play");
const clearButton = document.getElementById("clear");
const eraserButton = document.getElementById("eraser");
const pencilButton = document.getElementById("pencil");
const colorPicker = document.getElementById("color");
const nicknameInput = document.getElementById("nickname");

// Initialize drawing context
const ctx = drawingCanvas.getContext("2d");
let isDrawing = false;
let isEraser = false;

// Set up WebSocket for real-time communication with the server
const socket = new WebSocket("ws://your-server-address");

// Event listeners
playButton.addEventListener("click", () => {
    const nickname = nicknameInput.value;
    nicknameContainer.style.display = "none";
    canvasContainer.style.display = "block";
    // Send the nickname to the server
    socket.send(`Nickname: ${nickname}`);
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
});

drawingCanvas.addEventListener("mousedown", (event) => {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(event.clientX, event.clientY);
});

drawingCanvas.addEventListener("mousemove", (event) => {
    if (isDrawing) {
        if (isEraser) {
            ctx.globalCompositeOperation = "destination-out"; // for erasing
            ctx.lineWidth = 10; // set eraser size
        } else {
            ctx.globalCompositeOperation = "source-over";
            ctx.lineWidth = 2; // set pencil size
        }
        ctx.lineTo(event.clientX, event.clientY);
        ctx.stroke();
    }
});

drawingCanvas.addEventListener("mouseup", () => {
    isDrawing = false;
});

// WebSocket message handler
socket.addEventListener("message", (event) => {
    const message = event.data;
    if (message.startsWith("Draw:")) {
        // Handle drawing data received from other users
        const drawingData = message.split(":")[1];
        // Parse and draw the received data on your canvas
    }
});
