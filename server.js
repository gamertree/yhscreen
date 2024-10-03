const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Continuously send the latest mobile screen image
    setInterval(() => {
        const imgPath = path.join(__dirname, 'screen.png');
        if (fs.existsSync(imgPath)) {
            const image = fs.readFileSync(imgPath, 'base64');
            ws.send(image);
        }
    }, 1000); // Update every 1 second

    ws.on('close', function close() {
        console.log('Client disconnected');
    });
});
