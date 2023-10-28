const Client = require('../modbus')

const homeController = async (req, res) => {
    try {
        res.status(200).send('Welcome to HomePage Controller')
    } catch (error) {
        res.status(400).error(error.message)
    }
};

// Input location will be always 1 less then the original location e.g., if we've to hit the location 17 then we need to enter the coil-address 1 less than that viz 16

// localhost:8080/api/read-coils/16(coil-address) -> api
const readCoilIdController = async (req, res) => {
    try {
        const { coilId } = req.params;
        let coilValue = await Client.readCoils(coilId, 1)

        if (coilValue) {
            res.status(200).json({
                error: false,
                data: coilValue.data
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'No Data Found'
            })
        }
    } catch (error) {
        res.status(400).error(error.message)
    }
};

// localhost:8080/api/write-coils --> body -> { "coilId": 16(coil-address), "value": true/false }
const writeCoilIdController = async (req, res) => {
    try {
        const { coilId, value } = req.body;
        let coilValue = await Client.writeCoil(coilId, value)

        if (coilValue) {
            res.status(200).json({
                error: false,
                message: "Data Sent Successfully"
            })
        } else {
            res.status(200).json({
                error: true,
                message: 'Unable to sent data'
            })
        }
    } catch (error) {
        res.status(400).error(error.message)
    }
}

module.exports = {
    homeController,
    readCoilIdController,
    writeCoilIdController
}