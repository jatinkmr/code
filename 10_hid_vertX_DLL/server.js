const { hidVertXConnection, fetchDllVersion, fetchValidHidControllerGateway, setValidHidControllerGateway, fetchGetConnectedControllers } = require('./libController')

async function hidControllerFunction() {
    // console.log('Connecting HID VertX DLL...')
    hidVertXConnection()

    // console.log('Initialization of Buffer for DLLVersion...')
    const vertXBuffer = Buffer.alloc(256)
    // console.log('Buffer Created')
    // console.log('Fetching HID VertX DLL Version...')
    let resp = await fetchDllVersion(vertXBuffer, vertXBuffer.length)
    console.log('current Version of DLL :- ', vertXBuffer.toString())
    console.log('resp :- ', resp)

    // MAC Address of X1000 controller :- 00:06:8E:02:10:6A
    let currentMacAddressBuffer = Buffer.from(`00:06:8E:02:10:6A`, 'utf-8')
    // console.log('Buffer of currentMacAddressBuffer :- ', currentMacAddressBuffer)
    // let currentMacAddress = "00:06:8E:02:10:6A"
    // const currentMacAddressBuffer = Buffer.from(currentMacAddress.replace(/:/g, ''), 'hex');
    console.log(`currentMacAddressBuffer :- ${currentMacAddressBuffer}, currentMacAddressBuffer.length :- ${currentMacAddressBuffer.length}`)
    let response = await setValidHidControllerGateway(currentMacAddressBuffer, currentMacAddressBuffer.length)
    if (response === 0) {
        // console.log('Given MAC Address updated successfully :- ', currentMacAddressBuffer.toString())
        // console.log('response :- ', response)
        console.log('given MAC Address has been successfully set')
    } else {
        console.log('getting an Error while setting HidControllerGateway')
    }

    let fetchMacAddress = Buffer.alloc(256);
    // let fetchMacAddress = Buffer.from('02:10:6A')
    console.log(`fetchMacAddress :- ${Buffer.byteLength(fetchMacAddress)}`);
    if (fetchMacAddress) {
        let fetchMacAddressResponse = await fetchValidHidControllerGateway(fetchMacAddress, fetchMacAddress.length);
        console.log('fetchMacAddressResponse :- ', fetchMacAddressResponse);
        if (fetchMacAddressResponse === 0) {
            console.log('fetchMacAddress.toString() :- ', fetchMacAddress.toString('utf-8'));
        } else {
            console.log('unable to fetch the mac address');
        }
    }
}

hidControllerFunction()
