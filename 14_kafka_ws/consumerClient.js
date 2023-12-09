const WebSocket = require('ws');

const wsConsumer = new WebSocket('ws://localhost:4000');

wsConsumer.on('open', () => {
    console.log('Consumer WebSocket connected at 4000');
});

wsConsumer.on('message', (message) => {
    console.log('Received message from Kafka via WebSocket:', message.toString());
});

// Handle WebSocket connection errors
wsConsumer.on('error', (error) => {
    console.error('WebSocket error:', error);
});
