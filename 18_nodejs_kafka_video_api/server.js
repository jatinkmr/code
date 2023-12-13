const express = require('express')
const bodyParser = require('body-parser')
const { sendVideoFromDrive } = require('./controller')
const { KafkaConfig } = require('./kafkaConfig')

const app = express()

// Set the maximum size limit to 10MB (adjust as needed)
const maxSize = '10mb';

// Use bodyParser middleware with size limit
app.use(bodyParser.json({ limit: maxSize }));
app.use(bodyParser.urlencoded({ limit: maxSize, extended: true }));

app.post('/api/send-vid', sendVideoFromDrive)

app.listen(8080, () => {
    console.log(`server is listening at 8080 port`)
})

const kafkaConfig = new KafkaConfig()
kafkaConfig.consume('video-topic', (value) => {
    console.log(`Recv Message :- ${value}`)
})
