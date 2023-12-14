const express = require('express')
const bodyParser = require('body-parser')
const { sendVideoFromDrive } = require('./controller')
const { KafkaConfig } = require('./config')

const app = express()

// Set the maximum size limit to 10MB (adjust as needed)
const maxSize = '10mb';

// Use bodyParser middleware with size limit
app.use(bodyParser.json({ limit: maxSize }));
app.use(bodyParser.urlencoded({ limit: maxSize, extended: true }));

app.post('/api/send-vid', sendVideoFromDrive)

const kafaconfig = new KafkaConfig()
kafaconfig.consume('my-vid', (value) => {
    console.log(`recv value :- ${value}`)
})

app.listen(8080, () => {
    console.log('server is listening at 8080 Port...')
})