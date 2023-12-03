const body = document.body;

function getRandomColor() {
    // Generate a random color in hex format
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function switchColor() {
    // Set background color to a random color
    body.style.backgroundColor = getRandomColor();

    // Schedule the next color switch
    requestAnimationFrame(switchColor);
}

// Start the color switching loop
switchColor();
