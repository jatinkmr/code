const Client = require('../modbus')
// hit the api whenever the button pressed for long duration using ADAM

const homeController = async (req, res) => {
    try {
        res.status(200).send('Welcome to HomePage Controller')
    } catch (error) {
        res.status(400).error(error.message)
    }
}

// post :- localhost:8080/api/write-coils
const writeCoilIdController = async (req, res) => {
    try {
        // let inPutAddress = 0, outPutAddress = 64 // inPutAddress(0) => (1-1), outPutAddress(64) => (65-1) always subtract 1 from these address(s) doesn't matter whether it'll be an input or an output
        // let inPutAddress = 0, outPutAddress = 16 // for singleAdam input address
        let { inPutAddress, outPutAddress } = req.body;
        console.log('req.body :- ', req.body)
        console.log(`inPutAddress :- ${inPutAddress} and outPutAddress :- ${outPutAddress}`)
        let readInputResponse = await Client.readDiscreteInputs(inPutAddress, 1)
        console.log('readInputResponse :- ', readInputResponse.data[0])

        if (readInputResponse.data[0]) {
            let currentCoilValue = await Client.readCoils(outPutAddress, 1)

            if (readInputResponse.data[0] && !currentCoilValue.data[0]) {
                await Client.writeCoil(outPutAddress, true)
            } else if (!readInputResponse.data[0] && currentCoilValue.data[0]) {
                await Client.writeCoil(outPutAddress, false)
            }
        } else {
            await Client.writeCoil(outPutAddress, false)
        }

        res.status(200).json({
            inPutAddress,
            outPutAddress,
            response: readInputResponse.data
        })
    } catch (error) {
        console.log('error :- ', error)
        res.status(400).json({
            error: true,
            message: 'Error' + error
        })
    }
}

module.exports = {
    homeController,
    writeCoilIdController
}
