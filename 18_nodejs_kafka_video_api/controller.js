const ffmpeg = require('fluent-ffmpeg');
const { KafkaConfig } = require('./kafkaConfig')
const fs = require('fs')

const sendVideoFromDrive = async (req, res) => {
    try {
        const { message } = req.body
        // const videoStream = fs.createReadStream('./random.mp4');
        console.log(`videoStream :- ${JSON.stringify(videoStream)}`)
        const kafkaConfig = new KafkaConfig()
        ffmpeg()
            .input(videoStream)
            .inputFormat('mp4')
            .inputFPS(30)
            .on('data', (chunk) => {
                console.log('chunk')
                // Send video frames to Kafka topic
                let data = [{
                    topic: 'video-topic',
                    messages: [{ value: chunk }],
                }]

                kafkaConfig.produce('my-video', data)
            })
            .on('end', () => {
                console.log('Video processing finished.');
                producer.disconnect();
            })

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