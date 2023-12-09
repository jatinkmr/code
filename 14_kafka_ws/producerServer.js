const WebSocket = require('ws')
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'websocket-kafka-producer',
    brokers: ['localhost:9092'],
    connectionTimeout: 3000
})

try {
    const producer = kafka.producer()
    const wssProducer = new WebSocket.Server({ port: 3000 }) // WS server for producer

    wssProducer.on('connection', (ws) => {
        console.log('connecting...');
        ws.on('open', () => {
            ws.send('Hello, WebSocket Server for producer')

            // const message = 'This is a message from the producer'
            // wssProducer.send(message)
            // console.log('Sent message to producer in producerServer:', message)
        })

        // ws.emit('open')

        ws.on('message', async (message) => {
            try {
                console.log('hello from message ', message)
                // Produce the message to Kafka
                let messageResponse = await producer.send({
                    topic: 'websocket-topic',
                    messages: [{ value: message }],
                })

                if (messageResponse) {
                    console.log('Message sent!')
                } else {
                    console.log('message not sent!')
                }
            } catch (error) {
                console.log(`Error while sending message in server :- ${error}`)
            }
        })

        // Handle WebSocket connection errors
        ws.on('error', (error) => {
            console.error('WebSocket error in producerServer:', error)
        })
    })

    // Connect the Kafka producer
    producer.connect().then(() => {
        console.log('Kafka producer connected at 3000 PORT')
    })
} catch (error) {
    console.log(`Error :- ${error}`)
}
