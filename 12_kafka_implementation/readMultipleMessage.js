const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [`localhost:9092`],
    connectionTimeout: 3000
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const topic = 'test-topic'

const produceMessage = async () => {
    console.log('connecting Producer...')
    await producer.connect()

    console.log('producer connected successfully')

    const messages = [
        { key: 'key1', value: 'hello world', partition: 0 },
        { key: 'key2', value: 'hey!', partition: 0 },
        { key: 'key2', value: 'hey hey!', partition: 0 },
    ]

    console.log('sending Message...')
    await producer.send({
        topic,
        messages
    })

    console.log('Message Sent!')

    await producer.disconnect()
    console.log('Producer Disconnected. Waiting to connect consumer...')
}

const consumeMessage = async () => {
    await consumer.connect()
    console.log('Consumer Connected Successfully')

    // using this we get multiple number of messages. the consumer is set to fromBeginning: true when subscribing to the topic. This means that the consumer will start consuming messages from the beginning of the topic every time it is started.
    // await consumer.subscribe({ topic })

    // Using the below code we get single number of message. To avoid above behavior, you have a few options: Set fromBeginning: false: If you set fromBeginning to false when subscribing, the consumer will only receive messages that are produced after the consumer subscribes. This is useful when you don't want to reprocess old messages each time the consumer starts.
    await consumer.subscribe({
        topic,
        fromBeginning: false,
        eachPartition: async ({ partition, offset }) => {
            // Retrieve the stored offset for the partition from an external store
            // and set it using consumer.seek()
            consumer.seek({ topic: 'my-topic', partition, offset });
        }
    })
    console.log(`consumer subscribe for the given topic :- ${topic}`)

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                topic,
                partition,
                // message
                value: message.value ? message.value.toString() : 'N/A',
                key: message.key ? message.key.toString() : 'N/A',
                offset: message.offset
            })
        }
    })
}

const run = async () => {
    try {
        // Message Production
        await produceMessage()

        // Message Consumption
        await consumeMessage()
    } catch (error) {
        console.log('Error :- ', error)
    }
}

run()