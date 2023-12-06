const { Kafka } = require('kafkajs')
const IP = require('ip')

const host = IP.address()
console.log('host :- ', host)

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: [`${host}:9092`],
    connectionTimeout: 3000
})

const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    try {
        // Producing
        await producer.connect()
        // console.log('isProducerConnected :- ', isProducerConnected)
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello KafkaJS user!' },
            ],
        })
        await producer.disconnect()

        // Consuming
        await consumer.connect()
        await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // console.log('topic :- ', topic)
                // console.log('partition :- ', partition)
                // console.log('message :- ', message)

                console.log({ topic, partition, message });
            },
        })
    } catch (error) {
        console.log('Error :- ', error)
    }
}

run()