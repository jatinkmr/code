const WebSocket = require('ws');

const wsProducer = new WebSocket('ws://localhost:3000');

wsProducer.on('open', () => {
    console.log('Consumer WebSocket connected at 3000');
    console.log('The connection is open, now you can send a message...');
    let message = 'This is a message from the producerClient';
    console.log('message sending...')
    wsProducer.send(message);
    console.log('Sent message to producer in producerClient:', message);
});
