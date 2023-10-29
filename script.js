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

// Event listeners
playButton.addEventListener("click", () => {
    const nickname = nicknameInput.value;
    if (nickname) {
        nicknameContainer.style.display = "none";
        canvasContainer.style.display = "block";
        // Send the nickname to the server (you need to set up your server for this).
        // For testing purposes, you can use console.log(nickname).
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
