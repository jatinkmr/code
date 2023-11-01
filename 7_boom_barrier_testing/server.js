const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.listen('8800', () => console.log('server listening on 8080 PORT...'))
