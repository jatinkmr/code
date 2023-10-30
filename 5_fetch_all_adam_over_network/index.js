const fs = require('fs')
const ModbusRTU = require('modbus-serial')

// Create a Modbus client
const client = new ModbusRTU()

// Define the IP address range to scan
// const startIP = '192.168.0.0'
// const endIP = '192.168.0.254'

// for testing purposes only
const startIP = '192.168.0.205'
const endIP = '192.168.0.221'

// Modbus device parameters (adjust these as needed)
const timeout = 1000 // Timeout in 1000 milliseconds or 1 second

// Function to scan for ADAM devices
async function scanForADAMDevices() {
    const allDeviceData = [], adam_devices_data = []

    for (let i = parseInt(startIP.split('.')[2]); i <= parseInt(endIP.split('.')[2]); i++) {
        for (let j = parseInt(startIP.split('.')[3]); j <= parseInt(endIP.split('.')[3]); j++) {
            const ipAddress = `192.168.${i}.${j}`
            console.log(`formed ipAddress is ${ipAddress}`)

            try {
                client.setID(1)
                client.setTimeout(timeout) // set timeout, if we did not get any reply

                await client.connectTCP(ipAddress, { port: 502 })  // default Modbus TCP port is 502

                const data = await client.readHoldingRegisters(0, 1)
                console.log('readHoldingRegisters data :- ', data)

                // Try to read a Modbus register to check if the device responds
                const response = await client.readInputRegisters(0, 1) // Adjust the register address as needed

                console.log(`Found...ADAM device found with ${ipAddress}...Register 0 is hitting by Default and getting Value:...${JSON.stringify(response)}`)

                allDeviceData.push({
                    ipAddress,
                    registerValue: JSON.stringify(response),
                    holdingRegisterValue: data.data,
                    error: "N/A"
                })

                if (response) {
                    adam_devices_data.push({
                        ipAddress,
                        registerValue: JSON.stringify(response),
                        holdingRegisterValue: data.data,
                        error: "N/A"
                    })
                }
            } catch (error) {
                // Handle errors (device not found or other issues)
                console.log(`Facing an error at ${ipAddress} and error is ${error.message}`)
                allDeviceData.push({
                    ipAddress,
                    registerValue: "N/A",
                    holdingRegisterValue: "N/A",
                    error: 'Unable to connect with Device due to not found or other issue...Error: ' + error.message
                })
            } finally {
                console.log('calling finally block and closing the client...')
                client.close()
            }
        }
    }

    // for (let i = parseInt(startIP.split('.')[3]); i <= parseInt(endIP.split('.')[3]); i++) {
    //     const ipAddress = startIP.replace(/(\d+)(?!.*\d)/, i.toString());
    //     console.log(`IPAddress :- ${ipAddress} at index :- ${i}`)
    //     try {
    //         client.setID(1) // Set the Modbus device address (adjust as needed)
    //         client.setTimeout(timeout)
    //         await client.connectTCP(ipAddress, { port: 502 })
    //         // Try to read a Modbus register to check if the device responds
    //         const response = await client.readInputRegisters(0, 1) // Adjust the register address as needed
    //         console.log(`Found ADAM device at ${ipAddress}, Register 0 Value: ${response.data[0]}`)
    //     } catch (error) {
    //         console.log(`Facing an error at ${ipAddress} and error is ${error.message}`)
    //     } finally {
    //         client.close()
    //     }
    // }

    // Export data to a JSON file
    fs.writeFileSync('all_devices_data.json', JSON.stringify(allDeviceData, null, 2), 'utf-8')
    fs.writeFileSync('adam_device_data.json', JSON.stringify(adam_devices_data, null, 2), 'utf-8')

    console.log('Data exported to adam_devices_data.json')
    process.exit()
}

// Run the scan using the below given function
scanForADAMDevices()
