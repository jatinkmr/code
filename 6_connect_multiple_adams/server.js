const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const { client1, client2 } = require('./connect_multiple_adams_for_inputoutput')

app.use(bodyParser.json())

app.post('/api/write-coils', async function (req, res) {
    try {
        console.log('Handling Input/Output Controller...')
        // let inPutAddress = 0, outPutAddress = 64 // inPutAddress(0) => (1-1), outPutAddress(64) => (65-1) always subtract 1 from these address(s) doesn't matter whether it'll be an input or an output
        // let inPutAddress = 0, outPutAddress = 16 // for singleAdam input address
        // const { inPutAddress, outPutAddress } = req.body

        let inPutAddress = 0, outPutAddress = 64 // taking inPutAddress from single Adam and sending output to multiple adam at outPutAddress
        console.log(`inPutAddress :- ${inPutAddress} and outPutAddress :- ${outPutAddress}`)
        let readInputResponse = await client1.readDiscreteInputs(inPutAddress, 1)
        console.log('readInputResponse :- ', readInputResponse.data[0])

        if (readInputResponse.data[0]) {
            let currentValue = await client2.readCoils(outPutAddress, 1)
            console.log('currentValue :- ', currentValue)

            if (readInputResponse.data[0] && !currentValue.data[0]) {
                await client2.writeCoil(outPutAddress, true)
            } else if (!readInputResponse.data[0] && currentValue.data[0]) {
                await client2.writeCoil(outPutAddress, false)
            }
        } else {
            await client2.writeCoil(outPutAddress, false)
        }
    } catch (error) {
        console.log(`Error: ${error}`)
        res.status(500).send(error)
    }
})

app.listen(8080, () => console.log('server is listening on 8080 PORT'))
