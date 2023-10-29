const canvas = document.getElementById("drawing-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let erasing = false;
let currentColor = "#000000";

// Add event listeners for drawing
canvas.addEventListener("mousedown", () => {
    drawing = true;
});

canvas.addEventListener("mouseup", () => {
    drawing = false;
    context.beginPath();
});

canvas.addEventListener("mousemove", draw);

// Function to handle drawing
function draw(e) {
    if (!drawing) return;

    context.lineWidth = erasing ? 20 : 2;
    context.lineCap = "round";
    context.strokeStyle = currentColor;

    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
}

// Clear the canvas
const clearButton = document.getElementById("clear-button");
clearButton.addEventListener("click", () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

// Toggle eraser
const eraserButton = document.getElementById("eraser-button");
eraserButton.addEventListener("click", () => {
    erasing = !erasing;
});

// Change tool to pencil
const pencilButton = document.getElementById("pencil-button");
pencilButton.addEventListener("click", () => {
    erasing = false;
});

// Change color
const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
});

// Handle chat (you'll need to implement this part)
const chatLog = document.getElementById("chat-log");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", () => {
    // Handle sending chat messages
});

// Hide nickname input and show canvas when "Play" is clicked (you'll need to implement this part)
const playButton = document.getElementById("play-button");
playButton.addEventListener("click", () => {
    // Handle switching between nickname input and canvas
});
