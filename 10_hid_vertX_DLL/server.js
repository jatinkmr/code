'use strict';
const Client = require('./tcpConnect')
const { hidVertXConnection, fetchDllVersion, fetchValidHidControllerGateway, setValidHidControllerGateway, fetchGetConnectedControllers } = require('./libController')

async function hidControllerFunction() {
    console.log('== == Initialisation == ==')
    console.log('Connecting HID VertX DLL...')
    hidVertXConnection()

    console.log('Initialization of Buffer for DLLVersion...')
    const vertXBuffer = Buffer.alloc(256)
    console.log('Buffer Created')
    console.log('Fetching HID VertX DLL Version...')
    let resp = await fetchDllVersion(vertXBuffer, vertXBuffer.length)
    console.log('current Version of DLL :- ', vertXBuffer.toString())
    console.log('resp :- ', resp)

    console.log('== == setting mac address == ==')
    // MAC Address of X1000 controller :- 00:06:8E:02:10:6A
    let currentMacAddressBuffer = Buffer.from(`00:06:8E:02:10:6A`, 'utf-8')
    console.log('Buffer of currentMacAddressBuffer :- ', currentMacAddressBuffer)
    console.log(`currentMacAddressBuffer :- ${currentMacAddressBuffer}, currentMacAddressBuffer.length :- ${currentMacAddressBuffer.length}`)
    let response = await setValidHidControllerGateway(currentMacAddressBuffer, currentMacAddressBuffer.length)
    if (response === 0) {
        console.log('given MAC Address has been successfully set')
    } else {
        console.log('getting an Error while setting HidControllerGateway')
    }

    console.log('== == getting mac address == ==')
    let fetchMacAddress = Buffer.alloc(21)
    console.log(`fetchMacAddress :- ${Buffer.byteLength(fetchMacAddress)}`)
    if (fetchMacAddress) {
        let fetchMacAddressResponse = await fetchValidHidControllerGateway(fetchMacAddress, fetchMacAddress.length)
        console.log('fetchMacAddressResponse :- ', fetchMacAddressResponse)
        if (fetchMacAddressResponse === 0) {
            console.log('fetchMacAddress.toString() or GetValidGateways:- ', fetchMacAddress.toString('utf-8'))
        } else {
            console.log('unable to fetch the mac address from GetValidGateways')
        }
    }

    // fetching connecting controllers
    console.log('== == Fetching Connecting Controllers == ==')
    let fetchedConnectedController = Buffer.alloc(256)
    console.log(`fetchedConnectedController :- ${fetchedConnectedController}`)
    let connectedControllerResponse = await fetchGetConnectedControllers(fetchedConnectedController, fetchedConnectedController.length)
    if (connectedControllerResponse === 0) {
        console.log('GetConnectedControllers Buffer :- ', fetchedConnectedController)
        console.log('GetConnectedControllers String :- ', fetchedConnectedController.toString())
    } else {
        console.log('Unable to Fetch the Connected controllers from GetConnectedControllers')
    }
}

(async function main() {
    try {
        console.log('Client :- ', Client)

        if (Client) {
            await hidControllerFunction()
        }
    } catch (error) {
        console.log('error :- ', error)
    }
})()
