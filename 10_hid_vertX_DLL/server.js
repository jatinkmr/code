'use strict';
const { hidVertXConnection, fetchDllVersion, fetchValidHidControllerGateway, setValidHidControllerGateway, fetchGetConnectedControllers, hidControllerConnection, fetchControllerInformation } = require('./libController')

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
    let ipAddress = Buffer.from('192.168.0.204')
    let port = 4050
    console.log(`Connecting HID Device over :- ${ipAddress}:${port}`)
    let connectionResponse = await hidControllerConnection(ipAddress, port)
    console.log('connectionResponse :- ', connectionResponse);

    if (connectionResponse === 0) {
        console.log(`HID Device Connected Successfully at ${ipAddress}:${port}`)

        // fetching controller info
        console.log('== == Fetching Controller Info == ==')
        let macAddress = Buffer.from('00:06:8E:02:10:6A')
        let controllerInfoBuffer = Buffer.alloc(256)
        let controllerInfoResp = await fetchControllerInformation(macAddress, controllerInfoBuffer, controllerInfoBuffer.length)
        console.log('controllerInfoResp :- ', controllerInfoResp)
        if (controllerInfoResp === 0) {
            console.log(`Controller Information Fetched Successfully. Info :- ${controllerInfoBuffer}`)
        } else {
            console.log('Unable to Fetch the Controller Info')
        }
    } else {
        console.log('Unable to Connect the HID Device')
    }

    // console.log('== == setting mac address == ==')
    // // MAC Address of X1000 controller :- 00:06:8E:02:10:6A
    // let currentMacAddressBuffer = Buffer.from(`00:06:8E:02:10:6A`, 'utf-8')
    // console.log('Buffer of currentMacAddressBuffer :- ', currentMacAddressBuffer)
    // console.log(`currentMacAddressBuffer :- ${currentMacAddressBuffer}, currentMacAddressBuffer.length :- ${currentMacAddressBuffer.length}`)
    // let response = await setValidHidControllerGateway(currentMacAddressBuffer, currentMacAddressBuffer.length)
    // if (response === 0) {
    //     console.log('given MAC Address has been successfully set')
    // } else {
    //     console.log('getting an Error while setting HidControllerGateway')
    // }

    // console.log('== == getting mac address == ==')
    // let fetchMacAddress = Buffer.alloc(21)
    // console.log(`fetchMacAddress :- ${Buffer.byteLength(fetchMacAddress)}`)
    // if (fetchMacAddress) {
    //     let fetchMacAddressResponse = await fetchValidHidControllerGateway(fetchMacAddress, fetchMacAddress.length)
    //     console.log('fetchMacAddressResponse :- ', fetchMacAddressResponse)
    //     if (fetchMacAddressResponse === 0) {
    //         console.log('fetchMacAddress.toString() or GetValidGateways:- ', fetchMacAddress.toString('utf-8'))
    //     } else {
    //         console.log('unable to fetch the mac address from GetValidGateways')
    //     }
    // }

    // // fetching connecting controllers
    // console.log('== == Fetching Connecting Controllers == ==')
    // let fetchedConnectedController = Buffer.alloc(256)
    // console.log(`fetchedConnectedController :- ${fetchedConnectedController}`)
    // let connectedControllerResponse = await fetchGetConnectedControllers(fetchedConnectedController, fetchedConnectedController.length)
    // if (connectedControllerResponse === 0) {
    //     console.log('GetConnectedControllers Buffer :- ', fetchedConnectedController)
    //     console.log('GetConnectedControllers String :- ', fetchedConnectedController.toString())
    // } else {
    //     console.log('Unable to Fetch the Connected controllers from GetConnectedControllers')
    // }
}

hidControllerFunction()
