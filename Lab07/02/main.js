document.addEventListener('DOMContentLoaded', function () {
    const statusEl = document.getElementById('status');
    const messagesEl = document.getElementById('messages');
    const inputEl = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendButton');

    const socket = new WebSocket('wss://ws.ifelse.io');

    socket.onopen = function () {
        statusEl.textContent = 'Connected';
        statusEl.className = 'status connected';
    };

    socket.onmessage = function (event) {
        const message = document.createElement('div');
        message.textContent = 'Server: ' + event.data;
        messagesEl.appendChild(message);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    };

    socket.onerror = function () {
        statusEl.textContent = 'Error connecting';
        statusEl.className = 'status disconnected';
    };

    socket.onclose = function () {
        statusEl.textContent = 'Connection closed';
        statusEl.className = 'status disconnected';
    };

    function sendMessage() {
        const text = inputEl.value.trim();
        if (!text) return;
        if (socket.readyState !== WebSocket.OPEN) return;

        socket.send(text);

        const message = document.createElement('div');
        message.textContent = 'You: ' + text;
        message.style.color = '#2196F3';
        messagesEl.appendChild(message);
        messagesEl.scrollTop = messagesEl.scrollHeight;

        inputEl.value = '';
    }

    sendBtn.addEventListener('click', sendMessage);

    inputEl.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
