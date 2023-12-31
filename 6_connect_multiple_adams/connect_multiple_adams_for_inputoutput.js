const ModbusRTU = require('modbus-serial')

const client1 = new ModbusRTU()
const client2 = new ModbusRTU()

async function connectAndSetID(client, ip, port, id) {
    return new Promise((resolve, reject) => {
        client.connectTCP(ip, { port }, (err) => {
            if (err) {
                reject(err)
            } else {
                console.log(`connecting ADAM device at ${ip}`)
                console.log(`ADAM device connected at port ${ip}`)
                client.setID(id)
                resolve()
            }
        })
    })
}

async function connectingBothAdams() {
    try {
        // provide IPs, port and deviceId for connection as per the client
        await Promise.all([
            connectAndSetID(client1, '192.168.0.206', 502, 1),
            connectAndSetID(client2, '192.168.0.220', 502, 1),
        ])

        return 'SuccesS'
    } catch (error) {
        console.log('facing an error while making connection with Adam(s) :- ', error)
        throw new Error(`facing an error while making connection with Adam(s) :- ${error}`)
    }
}

async function main() {
    try {
        const result = await connectingBothAdams()
        console.log(result, "Both ADAMs have been connected...let's have some fun...")
    } catch (error) {
        console.error('MAIN function failed:', error)
        process.exit(0)
    }
}

main()

module.exports = {
    client1, client2
}
