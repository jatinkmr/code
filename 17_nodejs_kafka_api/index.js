import express from "express";
import bodyParser from "body-parser";
import constrollers from "./controller.js";
import KafkaConfig from "./config.js";
import responseTime from './response_time.js'

const app = express();
const jsonParser = bodyParser.json();

app.use(responseTime)

app.post("/api/send", jsonParser, constrollers.sendMessageToKafka);

// consume from topic "test-topic"
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
	console.log("Receive message: ", value);
});

app.listen(8080, () => {
	console.log(`Server is running on port 8080.`);
});
