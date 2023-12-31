const VertXLib = require('./lib')

const hidVertXConnection = async ()  => {
    try {
        let initializationOutPut = VertXLib.Initialization(4011, "", "") // PORT range will be between 1025 to 65535
        // console.log('initializationOutPut :- ', initializationOutPut)

        if (initializationOutPut === 0) {
            console.log('HID VertX DLL Connected Successfully')
        } else {
            console.log('Unable to Connect with HID VertX DLL')
        }
    } catch (error) {
        console.log('Error in hidVertXConnection :- ', error)
    }
}

const fetchDllVersion = async (emptyBufferToStoreVersion, sizeOfEmptyBuffer) => {
    try {
        return await VertXLib.GetDLLVersion(emptyBufferToStoreVersion, sizeOfEmptyBuffer)
    } catch(error) {
        console.log('Error in fetchDllVersion :- ', error)
    }
}

const hidControllerConnection = async (ipAddress, port) => {
    try {
        return await VertXLib.ContactController(ipAddress, port)
    } catch (error) {
        console.log(`Error in hidControllerConnection :- ${error}`)
    }
}

const fetchControllerInformation = async (macAddress, bufferStorage, bufferStorageSize) => {
    try {
        return await VertXLib.ControllerInfo(macAddress, bufferStorage, bufferStorageSize)
    } catch (error) {
        console.log(`Error in fetchControllerInformation :- ${error}`)
    }
}

const setValidHidControllerGateway = async (controllerMacAddress) => {
    try {
        return await VertXLib.SetValidControllers(controllerMacAddress)
    } catch (error) {
        console.log('Error in setValidHidControllerGateway :- ', error)
    }
}

const fetchValidHidControllerGateway = async (bufferStorage, bufferStorageSize) => {
    try {
        return await VertXLib.GetValidControllers(bufferStorage, bufferStorageSize)
    } catch (error) {
        console.log('Error in fetchValidHidController :- ', error)
    }
}

const fetchGetConnectedControllers = async (bufferStorage, bufferStorageSize) => {
    try {
        return await VertXLib.GetConnectedControllers(bufferStorage, bufferStorageSize)
    } catch (error) {
        console.log('Error in fetchGetConnectedControllers :- ', error)
    }
}

const fetchRspControllerInformation = async (ident, controllerMacAddress) => {
    try {
        return await VertXLib.RspControllerInfo(ident, controllerMacAddress)
    } catch (error) {
        console.log(`Error in fetchRspControllerInformation :- ${error}`)
    }
}

module.exports = {
    hidVertXConnection,
    fetchDllVersion,
    setValidHidControllerGateway,
    fetchValidHidControllerGateway,
    fetchGetConnectedControllers,
    hidControllerConnection,
    fetchControllerInformation,
    fetchRspControllerInformation
}