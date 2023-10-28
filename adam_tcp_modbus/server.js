const ModbusRTU = require("modbus-serial")

// Create a Modbus client instance
const client = new ModbusRTU()

// Define the serial port settings (for RS-232/RS-485)
// const serialPort = "COM1"; // Replace with your serial port
client.connectTCP("192.168.0.206", { port: 502 })
// client.connectUDP("192.168.0.206", { port: 502 })

client.setID(1)

// address -> location-1
setInterval(function () {
    // for writing the coils values we may pass the boolean value to the client
    client.writeCoil(17, 0).then(resp => {
        console.log('Write Coil :- ', resp)
    })

    client.readCoils(17, 1).then(resp => {
        console.log('Read Coil :- ', resp.data)
    })

    // readInputRegisters(register_address_location, length_Of_Data_we_may_needed)
    client.readInputRegisters(17, 1).then(resp => {
        console.log('resp :- ', resp)
    })
}, 1000)
