// to check whether the button has been pressed for long time say more than 5 seconds

const ModbusRTU = require('modbus-serial')
const client = new ModbusRTU()

client.connectTCP("192.168.0.206", { port: 502 }, () => console.log('ADAM Device Connected at 192.168.0.206...!!'))
client.setID(1)

let inPutAddress = 0, buttonPressedTime = null, buttonReleasedTime = null

async function readButtonState() {
    try {
        // let inPutAddress = 0, buttonPressedTime = null, buttonReleasedTime = null
        let readInputResponse = await client.readDiscreteInputs(inPutAddress, 1)
        console.log('readInputResponse :- ', readInputResponse)
        let buttonState = readInputResponse.data[0] // getting false as an input response
        console.log('current State :- ', buttonState) // will print "false" as an input response

        if (!buttonState) {
            console.log('Button Pressed')
            if ((buttonPressedTime == null) && !buttonState) {
                buttonPressedTime = new Date()
            }
        } else if (buttonPressedTime != null) {
            console.log('Button Released')
            if ((buttonReleasedTime == null) && buttonState) {
                buttonReleasedTime = new Date()
            }
        }

        console.log(`buttonPressedTime :- ${buttonPressedTime} and buttonReleasedTime :- ${buttonReleasedTime}`)

        if ((buttonPressedTime != null) && (buttonReleasedTime != null)) {
            const buttonPressDuration = Math.floor((buttonReleasedTime - buttonPressedTime)/1000)
            console.log('buttonPressDuration :- ', buttonPressDuration)

            const buttonLongPressThreshold = 5 // in seconds

            // wait for 5 seconds if button released or not
            if (buttonPressDuration >= buttonLongPressThreshold) {
                console.log('Long Press Detected....Button has been pressed for 5 seconds or more than 5 seconds')
            } else {
                console.log('Button has been released before 5 seconds')
            }
        } else {
            console.log('Button has not been pressed/released yet...')
        }
    } catch (error) {
        console.log('Facing an Error :- ', error)
        process.exit(1)
    }
}

setInterval(readButtonState, 900)
