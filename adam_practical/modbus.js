const ModbusRTU = require("modbus-serial")
// Create a Modbus client instance
const client = new ModbusRTU()

// Define the serial port settings (for RS-232/RS-485)
// const serialPort = "COM1"; // Replace with your serial port
// client.connectTCP("192.168.0.206", { port: 502 }, () => { // --> ip for single custom ADAM
client.connectTCP("192.168.0.220", { port: 502 }, () => { // --> ip for multiple ADAM Board
    console.log('ADAM device connected')
})
client.setID(1)

module.exports = client