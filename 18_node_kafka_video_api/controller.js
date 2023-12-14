const { KafkaConfig } = require('./config')

const sendVideoFromDrive = async (req, res) => {
    try {
        // this below code is sending and receiving the req.body.message from the server(s) consume function of KafkaJS
        const { message } = req.body
        const kafkaConfig = new KafkaConfig()

        let messages = [{
            key: "key1",
            value: message
        }]
        console.log(`messages :- ${JSON.stringify(messages)}, message :- ${message}`);

        kafkaConfig.produce('my-vid', messages)

        res.status(200).json({
            data: message
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    sendVideoFromDrive
}