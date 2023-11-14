'use strict';
const ModBusSerial = require("modbus-serial")
// Create a Modbus client instance
const client = new ModBusSerial()

// connection_port (4070) TCP outbound. This port must be open on the Host computer.
// listen_port (4050) TCP incoming. This port must be open when using selected applications. 
client.connectTCP("192.168.0.204", { port: 4050 }, (err) => { // --> ip for Vertx controller
    if (err) {
        console.log('Error while connecting the HID Device', err)
    } else {
        console.log('HID device connected at 192.168.0.204')
    }
})
client.setID(1)

module.exports = client