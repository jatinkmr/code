'use strict';
const { hidVertXConnection, fetchDllVersion, fetchValidHidControllerGateway, setValidHidControllerGateway, fetchGetConnectedControllers, hidControllerConnection, fetchControllerInformation, fetchRspControllerInformation } = require('./libController')

function onError(errorCode) {
    if (Math.abs(errorCode) === 10060) {
        console.log('Connection Timed-Out!')
    } else if (Math.abs(errorCode) === 10002) {
        console.log('Invalid Parameter. Please check the IPAddress and Port before making the Connection!')
    } else if (Math.abs(errorCode) === 10003) {
        console.log('Gateway Not Connected!')
    } else if (Math.abs(errorCode) === 10004) {
        console.log('Gateway not Valid!')
    } else if (Math.abs(errorCode) === 10006) {
        console.log('Invalid Array Size!')
    }
}

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
    let ipAddress = '192.168.0.231'
    let ipAddressBuffer = Buffer.from('192.168.0.231', 'utf8')
    // let ipAddress = Buffer.from('169.254.242.121') // default IP Address of HID VertX V1000 Controller
    let port = 4050
    console.log(`Try to Connect HID Device over :- ${ipAddress}:${port}`)
    let connectionResponse = await hidControllerConnection(ipAddressBuffer, port)
    console.log('connectionResponse :- ', connectionResponse);

    if (connectionResponse === 0) {
        console.log(`HID Device Connected Successfully at ${ipAddress}:${port}`)

        console.log('== == setting mac address == ==')
        // MAC Address of X1000 controller :- 00:06:8E:02:51:3F
        let arrayOfMacAddress = ['00:06:8E:02:51:3F']
        const currentMacAddressBuffer = Buffer.concat(arrayOfMacAddress.map(str => Buffer.from(str)));
        // let currentMacAddressBuffer = Buffer.from(`00:06:8E:02:51:3F`, 'utf8')
        // let currentMacAddressBuffer = Buffer.from('192.168.0.231', 'utf8')
        // console.log('Buffer of currentMacAddressBuffer :- ', currentMacAddressBuffer)
        // console.log(`currentMacAddressBuffer :- ${currentMacAddressBuffer}`)
        let isValidHidControllerResp = await setValidHidControllerGateway(currentMacAddressBuffer)
        if (isValidHidControllerResp === 0) {
            console.log('given MAC Address/Gateway has been successfully set')
        } else {
            onError(isValidHidControllerResp)
            console.log('getting an Error while setting HidControllerGateway')
        }

        console.log('== == getting mac address == ==')
        // let fetchMacAddress = Buffer.alloc(21)
        const buffer = new ArrayBuffer(8);
        const fetchMacAddress = new Int32Array(buffer);
        // console.log(`fetchMacAddress :- ${Buffer.byteLength(fetchMacAddress)}`)
        if (fetchMacAddress) {
            let fetchMacAddressResponse = await fetchValidHidControllerGateway(fetchMacAddress, fetchMacAddress.length)
            // console.log('fetchMacAddressResponse :- ', fetchMacAddressResponse)
            if (fetchMacAddressResponse === 0) {
                console.log('fetchMacAddress.toString() or GetValidGateways:- ', fetchMacAddress.toString('utf8'))
            } else {
                onError(fetchMacAddressResponse)
                console.log('unable to fetch the mac address from GetValidGateways')
            }
        }

        // fetching controller info
        console.log('== == Fetching Controller Info == ==')
        let macAddressBuffer = Buffer.from('00:06:8E:02:51:3F', 'utf8')
        let controllerInfoBuffer = Buffer.alloc(256)
        let controllerInfoResp = await fetchControllerInformation(macAddressBuffer, controllerInfoBuffer, controllerInfoBuffer.length)
        console.log('controllerInfoResp :- ', controllerInfoResp)
        if (controllerInfoResp === 0) {
            console.log(`Controller Information Fetched Successfully. Info :- ${controllerInfoBuffer}`)
        } else {
            onError(controllerInfoResp)
            console.log('Unable to Fetch the Controller Info')
        }

        // fetching connecting controllers
        console.log('== == Fetching Connecting Controllers == ==')
        let fetchedConnectedController = Buffer.alloc(21)
        let connectedControllerResponse = await fetchGetConnectedControllers(fetchedConnectedController, fetchedConnectedController.length)
        console.log('connectedControllerResponse :- ', connectedControllerResponse)
        if (connectedControllerResponse === 0) {
            console.log('GetConnectedControllers Buffer :- ', fetchedConnectedController)
            console.log('GetConnectedControllers String :- ', fetchedConnectedController.toString('utf8'))
        } else {
            onError(connectedControllerResponse)
            console.log('Unable to Fetch the Connected controllers from GetConnectedControllers')
        }

        // fetching connected controllers using fetchRspControllerInformation
        // console.log('== == fetching connected controllers using fetchRspControllerInformation == ==')
        // let rspControllerResp = await fetchRspControllerInformation(1, currentMacAddressBuffer)
        // console.log(`rspControllerResp :- ${rspControllerResp}`)
        // if (rspControllerResp === 0) {
        //     console.log('info fetched')
        // } else {
        //     onError(rspControllerResp)
        //     console.log('Unable to fetch the connected controllers using RspControllerInfo')
        // }
    } else {
        onError(connectionResponse)
        console.log('Unable to Connect the HID Device')
    }
}

hidControllerFunction()
