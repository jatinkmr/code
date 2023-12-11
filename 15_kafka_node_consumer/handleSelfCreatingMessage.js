const { Kafka } = require('kafkajs');

// Define Kafka broker(s) and topic
const kafkaBrokers = ['localhost:9092'];
const kafkaTopic = 'topic_1';

// Create Kafka producer
const kafkaProducer = new Kafka({
    clientId: 'kafka-node-producer',
    brokers: kafkaBrokers,
}).producer();

// Create Kafka consumers
const consumer1 = new Kafka({
    clientId: 'kafka-node-consumer-1',
    brokers: kafkaBrokers,
}).consumer({ groupId: 'consumer-group-1' });

const consumer2 = new Kafka({
    clientId: 'kafka-node-consumer-2',
    brokers: kafkaBrokers,
}).consumer({ groupId: 'consumer-group-2' });

const run = async () => {
    // Connect the producer and consumers
    await kafkaProducer.connect();
    await consumer1.connect();
    await consumer2.connect();

    // Subscribe consumers to the topic
    await consumer1.subscribe({ topic: kafkaTopic, fromBeginning: true });
    await consumer2.subscribe({ topic: kafkaTopic, fromBeginning: true });

    // Run producer and consumers
    await Promise.all([
        produceMessages(),
        consumeMessages(consumer1),
        consumeMessages(consumer2),
    ]);
};

const produceMessages = async () => {
    // Produce messages to Kafka topic
    for (let i = 0; i < 10; i++) {
        await kafkaProducer.send({
            topic: kafkaTopic,
            messages: [{ value: `Message ${i}` }],
        });
    }

    // Close producer after producing messages
    await kafkaProducer.disconnect();
};

const consumeMessages = async (consumer) => {
    console.log(`consumer :- ${JSON.stringify(consumer)}`);
    // Run consumer to consume messages
    await consumer.run({
        eachMessage: async ({ message }) => {
            console.log(`Consumer ${consumer.groupId} received message: ${message.value}`);
        },
    });
};

// Run the producer and consumers
run().catch(error => {
    console.error(error)
    process.exit(1)
}) 
