const ModbusRTU = require('modbus-serial')

const client1 = new ModbusRTU()
const client2 = new ModbusRTU()

async function connectAndSetID(client, ip, port, id) {
    return new Promise((resolve, reject) => {
        client.connectTCP(ip, { port }, () => {
            console.log(`connecting ADAM device at ${ip}`)
            console.log(`ADAM device connected at port ${ip}`)
            client.setID(id)
            resolve()
        })
    })
}

async function connectingBothAdams() {
    try {
        // provide IPs, port and deviceId for connection
        await Promise.all([
            connectAndSetID(client1, '192.168.0.206', 502, 1),
            connectAndSetID(client2, '192.168.0.220', 502, 1),
        ])

        return 'SuccesS'
    } catch (error) {
        console.log('facing an error while making connection with Both Adam(s) :- ', error)
        process.exit(1)
    }
}

async function main() {
    try {
        const result = await connectingBothAdams()
        console.log(result, "Both ADAMs have been connected...let's have some fun...")
    } catch (error) {
        console.error('MAIN function failed:', error)
    }
}

main()

module.exports = {
    client1, client2
}
