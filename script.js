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

// Request fullscreen mode
function requestFullscreen() {
    if (body.requestFullscreen) {
        body.requestFullscreen();
    } else if (body.mozRequestFullScreen) { /* Firefox */
        body.mozRequestFullScreen();
    } else if (body.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        body.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) { /* IE/Edge */
        body.msRequestFullscreen();
    }
}

// Start the color switching loop
requestFullscreen(); // Request fullscreen on page load
switchColor();
