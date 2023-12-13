const ffmpeg = require('fluent-ffmpeg');
const { KafkaConfig } = require('./kafkaConfig')
const fs = require('fs')

const sendVideoFromDrive = async (req, res) => {
    try {
        const { message } = req.body
        const videoStream = fs.readFileSync('./random.mp4');
        const kafkaConfig = new KafkaConfig()

        let data = [{
            value: videoStream
        }]

        await kafkaConfig.produce('video-topic', data)

        res.status(200).json({
            message
        })
    } catch (error) {
        console.log('error :- ', error)
        res.status(400).json({
            error
        })
    }
}

module.exports = {
    sendVideoFromDrive
}