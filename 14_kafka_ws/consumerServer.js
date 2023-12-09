const WebSocket = require('ws')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'websocket-kafka-consumer',
    brokers: ['localhost:9092'],
    connectionTimeout: 3000
})

try {
    const consumer = kafka.consumer({ groupId: 'websocket-group' })
    const wssConsumer = new WebSocket.Server({ port: 4000 }) // WS server for consumer

    wssConsumer.on('connection', (ws) => {
        ws.on('open', () => {
            wssConsumer.send('Hello, WebSocket Server for Consumer')
        })

        // Subscribe to Kafka topic
        consumer.subscribe({ topic: 'websocket-topic' })

        // Listen for Kafka messages
        consumer.run({
            eachMessage: async ({ message }) => {
                console.log(`message :- ${message.value.toString()}`);
                // Send Kafka message to connected WebSocket clients
                ws.send(message.value.toString())
            },
        })

        // Handle WebSocket connection errors
        ws.on('error', (error) => {
            console.error('WebSocket error:', error)
        })
    })

    // Connect the Kafka consumer
    consumer.connect().then(() => {
        console.log('Kafka consumer connected at 4000 port')
    })
} catch (error) {
    console.log(`Error :- ${error}`)
}
