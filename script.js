const body = document.body;

function getRandomColor() {
    // Generate a random number (0 or 1) to represent black or white
    const randomNum = Math.round(Math.random());

    // Return either the brightest white or the blackest black
    return randomNum === 0 ? '#000000' : '#FFFFFF';
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
