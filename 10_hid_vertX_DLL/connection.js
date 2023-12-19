const { hidVertXConnection, fetchDllVersion, fetchValidHidControllerGateway, setValidHidControllerGateway, fetchGetConnectedControllers, hidControllerConnection, fetchControllerInformation, fetchRspControllerInformation } = require('./libController')


async function hidControllerFunction() {
    console.log('== == Initialisation == ==')
    console.log('Connecting HID VertX DLL...')
    hidVertXConnection()

    console.log('Initialization of Buffer for DLLVersion...')
    const vertXBuffer = Buffer.alloc(256)
    console.log('Buffer Created')
    console.log('Fetching HID VertX DLL Version...')
    let resp = await fetchDllVersion(vertXBuffer, vertXBuffer.length)
    if (resp === 0) {
        console.log('current Version of DLL :- ', vertXBuffer.toString())
    } else {
        console.log('Unable to find the DLL Version')
    }

    // making connection with HidController
    console.log('== == Making Connection with HidController == ==')
    // let ipAddress = '192.168.0.202'
    let ipAddress = Buffer.from('192.168.0.202', 'utf8')
    let port = 4050
    console.log(`Try to Connect HID Device over :- ${ipAddress}:${port}`)
    let connectionResponse = await hidControllerConnection(ipAddress, port)
    console.log(`connectionResponse :- ${connectionResponse} at ${new Date()}`);
}

hidControllerFunction()