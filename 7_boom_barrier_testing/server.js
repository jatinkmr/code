const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Client = require('./modbus')

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.status(200).send('Welcome to Home')
})

app.post('/api/handleboom', async function (req, res) {
    try {
        // taking Boolean value for handling the boomBarrier open/close request
        const { boomBarrierValue } = req.body
        console.log(`boomBarrierValue: ${boomBarrierValue}`)

        if ((boomBarrierValue === true) || (boomBarrierValue === false)) {
            console.log(`correct :- boomBarrierValue: ${boomBarrierValue}`)

            let operationFunctionality = boomBarrierValue ? "Open" : "Close"

            const response = await Client.writeCoil(16, boomBarrierValue)

            if (response) {
                return res.status(200).json({
                    error: false,
                    message: `${operationFunctionality} Operation successfully completed`
                })
            }
        } else {
            return res.status(200).json({
                error: true,
                message: 'Incorrect request. Please provide a valid boolean value (true or false) for handling the boom barrier open/close request.'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Server Error. Please try again later. Error :- ${error}`
        })
    }
})

app.listen('8800', () => console.log('server listening on 8800 PORT...'))
