'use strict';
const ModBusSerial = require("modbus-serial")
// Create a Modbus client instance
const client = new ModBusSerial()

const config = {
    host: "192.168.0.204",
    port: 4050
}

// vertx evo v1000 and vertx v100 gateway
// connection_port (4070) TCP outbound. This port must be open on the Host computer.
// listen_port (4050) TCP incoming. This port must be open when using selected applications. 
client.connectTCP(config.host, { port: config.port }, (err) => { // --> ip for Vertx controller
    if (err) {
        console.log('Error while connecting the HID Device', err)
    } else {
        console.log(`HID Device Connected at ${config.host}:${config.port}`)
    }
})
client.setID(1)

module.exports = client
