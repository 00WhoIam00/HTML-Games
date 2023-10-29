const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const players = {};

server.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.action === 'join') {
            players[data.playerId] = ws;
            broadcast({ action: 'joined', playerId: data.playerId });
        } else if (data.action === 'choice') {
            broadcast({ action: 'choice', playerId: data.playerId, choice: data.choice });
        }
    });
    
    ws.on('close', () => {
        for (const playerId in players) {
            if (players[playerId] === ws) {
                delete players[playerId];
                broadcast({ action: 'left', playerId });
            }
        }
    });
});

function broadcast(data) {
    server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}
