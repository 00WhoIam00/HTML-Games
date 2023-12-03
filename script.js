// Array to store chat messages
let messages = [];

// Function to display messages in the chat box
function displayMessages() {
    const chatBox = document.getElementById('chatBox');
    chatBox.innerHTML = messages.map(msg => `<p>${msg}</p>`).join('');
}

// Function to send a new message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();

    if (message !== '') {
        // Add the new message to the array
        messages.push(message);

        // Display the updated messages
        displayMessages();

        // Clear the input field
        messageInput.value = '';
    }
}

// Initial display of messages
displayMessages();
