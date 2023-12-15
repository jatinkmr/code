const { KafkaConfig } = require('./config')

const sendVideoFromDrive = async (req, res) => {
    try {
        // this below code is sending and receiving the req.body.message from the server(s) consume function of KafkaJS
        // const { message } = req.body
        // const kafkaConfig = new KafkaConfig()

        // let messages = [{
        //     key: "key1",
        //     value: message
        // }]
        // console.log(`messages :- ${JSON.stringify(messages)}, message :- ${message}`);

        // kafkaConfig.produce('my-vid', messages)

        // this below code is sending and receiving the video(s) buffer from the producer to consumer which have data length more than 1MB (viz Default size)
        const { message } = req.body
        const kafaconfig = new KafkaConfig()

        if (Array.isArray(message)) { // if message is an array
            for (let msg of message) {
                let messageData = [{
                    key: 'frame_1',
                    value: msg
                }]

                await kafaconfig.produce('my-vid', messageData)
            }
        } else { // if message is just a string
            let messageData = [{
                key: 'frame_1',
                value: message
            }]
            await kafaconfig.produce('my-vid', messageData)
        }

        res.status(200).json({
            messageDataLength: message.length,
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