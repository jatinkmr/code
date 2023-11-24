const { hidVertXConnection, fetchDllVersion, fetchValidHidControllerGateway, setValidHidControllerGateway } = require('./libController')

async function hidControllerFunction() {
    console.log('Connecting HID VertX DLL...')
    hidVertXConnection()

    console.log('Initialization of Buffer for DLLVersion...')
    const vertXBuffer = Buffer.alloc(256)
    console.log('Buffer Created')
    console.log('Fetching HID VertX DLL Version...')
    fetchDllVersion(vertXBuffer, vertXBuffer.length)
    console.log('current Version of DLL :- ', vertXBuffer.toString())

    // MAC Address of X1000 controller :- 00:06:8E:02:10:6A
    let currentMacAddressBuffer = Buffer.from("00:06,8E:02,10:6A")
    console.log('Buffer of currentMacAddressBuffer :- ', currentMacAddressBuffer)
    console.log(`currentMacAddressBuffer :- ${currentMacAddressBuffer}, currentMacAddressBuffer.length :- ${currentMacAddressBuffer.length}`)
    let response = await setValidHidControllerGateway(currentMacAddressBuffer, currentMacAddressBuffer.length)
    if (response === 0) {
        console.log('Given MAC Address updated successfully :- ', currentMacAddressBuffer.toString())
        console.log('response :- ', response)
    } else {
        console.log('getting an Error while setting HidControllerGateway')
    }

    let fetchMacAddress = Buffer.alloc(256)
    let fetchMacAddressResponse = await fetchValidHidControllerGateway(fetchMacAddress, fetchMacAddress.length)
    console.log('fetchMacAddressResponse :- ', fetchMacAddressResponse)
}

hidControllerFunction()
