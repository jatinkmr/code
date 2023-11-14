const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Client = require('./hidModbus')

app.use(bodyParser.json())

app.get('/', function (req, res) {
    return res.status(200).send('Welcome to Home')
})

app.get('/get-hid', async function (req, res) {
    return res.status(200).json({
        error: false,
        Client
    })
})

app.listen(8800, () => console.log('Server is listening at 8800'))
