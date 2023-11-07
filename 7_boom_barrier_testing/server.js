const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Client = require('./modbus')

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.status(200).send('Welcome to Home')
})

// handle boom-barrier using single button opening and closing the barrier
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

// handle boom-barrier using multiple button(s) handling opening and closing the barrier by using separate button for each
app.post('/api/handlemul-boom', async function (req, res) {
    try {
        // for opening the barrier let's assume we're getting data from index 1 and for closing index 2
        let openingButtonBarrier = await Client.readDiscreteInputs(1, 1)
        let closingButtonBarrier = await Client.readDiscreteInputs(2, 1)
        let openingOutPutAddress = 16 // for singleAdam (17-1)
        // let openingOutPutAddress = 64 // for multipleAdam (65-1)
        let closingOutPutAddress = 17 // for singleAdam (18-1)
        // let closingOutPutAddress = 65 // for multipleAdam (66-1)

        let operationFunctionality = null

        if (openingButtonBarrier.data[0]) { // if the data is true then we've pressed the opening button
            await Client.writeCoil(openingOutPutAddress, true) // sending opening pulse
            operationFunctionality = 'Open'
        } else if (closingButtonBarrier.data[0]) { // if the data is true then we've pressed the closing button
            await Client.writeCoil(closingOutPutAddress, true) // sending closing pulse
            operationFunctionality = 'Close'
        }

        return res.status(200).json({
            error: false,
            message: `${operationFunctionality} Operation successfully completed`
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: 'Incorrect request. Please provide correct data to handle boom-barrier.'
        })
    }
})

app.listen('8800', () => console.log('server listening on 8800 PORT...'))
