const express = require('express')
const bodyParser = require('body-parser')
const { Kafka } = require('kafkajs')

const app = express()

// kafka setup
const kafka = new Kafka({
    clientId: 'my-app-api',
    brokers: ['localhost:9092'],
    connectionTimeout: 3000
})

// producer setUp
const producer = kafka.producer()
producer.connect()

app.use(bodyParser.json())

app.get('/', async (req, res) => {
    res.status(200).send('Welcome to kafka Api home Section')
})

app.use('/track-event', async (req, res) => {
    try {
        let { eventName, eventData } = req.body

        await producer.send({
            topic: 'event-tracking-topic',
            messages: [{
                value: JSON.stringify({
                    eventName, eventData
                })
            }]
        })

        res.status(200).json({
            error: false,
            message: 'Event Tracked Successfully'
        })

        console.log('Data Sent waiting for consumption...')

        await consumeMessage()
    } catch (error) {
        console.log(`error :- ${error}`)
        return res.status(400).json({
            error: true,
            message: `Unable to do the given process due to the following error :- ${error}`
        })
    }
})

const consumeMessage = async () => {
    console.log('consumer connecting...')
    // Consumer setup
    const consumer = kafka.consumer({ groupId: 'event-tracking-consumer' });
    await consumer.connect();
    console.log('consumer connected successfully')

    // Subscribe to the event-tracking-topic
    consumer.subscribe({ topic: 'event-tracking-topic', fromBeginning: true });
    console.log('consumer subscribe for the given topic :- event-tracking-topic')

    // Consume events
    consumer.run({
        eachMessage: async ({ message }) => {
            const { eventName, eventData } = JSON.parse(message.value.toString());
            console.log(`Received event - Name: ${eventName}, Data: ${JSON.stringify(eventData)}`);
        },
    });
}

app.listen(8012, () => {
    console.log(`server is listening at 8012`)
})