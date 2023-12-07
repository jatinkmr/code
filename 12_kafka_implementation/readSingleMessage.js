const { Kafka } = require('kafkajs')
const IP = require('ip')

const host = IP.address()

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [`${host}:9092`],
    connectionTimeout: 3000
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const topic = 'test-topic'


const produceMessage = async () => {
    console.log('connecting Producer...')
    await producer.connect()

    console.log('producer connected successfully')

    const message = {
        value: 'Hello, KafkaJS User !!'
    }

    console.log('sending Message...')
    await producer.send({
        topic,
        messages: [message]
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

    // A sample of message
    // message: {
    //     magicByte: 2,
    //     attributes: 0,
    //     timestamp: '1701943018587',
    //     offset: '206',
    //     key: <Buffer 6b 65 79 31>,
    //     value: <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>,
    //     headers: {},
    //     isControlRecord: false,
    //     batchContext: {
    //         firstOffset: '206',
    //         firstTimestamp: '1701943018587',
    //         partitionLeaderEpoch: 0,
    //         inTransaction: false,
    //         isControlBatch: false,
    //         lastOffsetDelta: 0,
    //         producerId: '-1',
    //         producerEpoch: 0,
    //         firstSequence: 0,
    //         maxTimestamp: '1701943018587',
    //         timestampType: 0,
    //         magicByte: 2
    //     }
    // }

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