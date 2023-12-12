const express = require('express')
const bodyParser = require('body-parser')
const { sendVideoFromDrive } = require('./controller')
const { KafkaConfig } = require('./kafkaConfig')

const app = express()

app.use(bodyParser.json())
app.post('/api/send-vid', sendVideoFromDrive)

app.listen(8080, () => {
    console.log(`server is listening at 8080 port`)
})

const kafkaConfig = new KafkaConfig()
kafkaConfig.consume('video-topic', (value) => {
    console.log(`Recv Message :- ${value}`)
})
