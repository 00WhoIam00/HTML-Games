let nickname;
let chatContainer = document.getElementById('chatContainer');
let chat = document.getElementById('chat');
let messageInput = document.getElementById('messageInput');

function register() {
    nickname = document.getElementById('nickname').value;
    if (nickname.trim() !== "") {
        document.querySelector('.registration-container').style.display = 'none';
        chatContainer.style.display = 'block';
        appendMessage('System', `${nickname} has joined the chat.`);
    } else {
        alert('Please enter a valid nickname.');
    }
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== "") {
        appendMessage(nickname, message);
        messageInput.value = '';
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chat.appendChild(messageElement);
    chat.scrollTop = chat.scrollHeight; // Auto-scroll to the bottom
}
