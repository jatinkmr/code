import { KafkaClient, kafkaTopic } from "./kafka-config.js";

export const sendMessageToQueue = async (message) => {
	const producer = KafkaClient.producer();
	await producer.connect();

	producer.on('producer.connect', () => {
		console.log(`KafkaProvider: connected`)
	})
	producer.on('producer.disconnect', () => {
		console.log(`KafkaProvider: could not connect`)
	})
	producer.on('producer.network.request_timeout', (payload) => {
		console.log(`KafkaProvider: request timeout ${payload.clientId}`)
	})

	console.info('Sending Message: ', message);
	await producer.send({
		topic: kafkaTopic,
		messages: [
			{
				value: message
			}
		]
	});
	// Disconnect producer once message sending is done.
	await producer.disconnect();
};
