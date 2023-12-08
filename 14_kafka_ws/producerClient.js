const WebSocket = require('ws');

const wsProducer = new WebSocket('ws://localhost:3000');

wsProducer.on('open', () => {
    // The connection is open, now you can send a message
    const message = 'This is a message for the producer';
    wsProducer.send(message);
    console.log('Sent message to producer:', message);
});

// Handle messages received from the WebSocket server
wsProducer.on('message', (message) => {
    console.log('Received message from producer:', message);
});

// Handle WebSocket connection errors
wsProducer.on('error', (error) => {
    console.error('WebSocket error:', error);
});
