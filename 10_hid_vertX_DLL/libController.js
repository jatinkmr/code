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

const setValidHidControllerGateway = async (controllerMacAddress, controllerMacAddressSize) => {
    try {
        return await VertXLib.SetValidControllers(controllerMacAddress, controllerMacAddressSize)
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

module.exports = {
    hidVertXConnection,
    fetchDllVersion,
    setValidHidControllerGateway,
    fetchValidHidControllerGateway,
    fetchGetConnectedControllers
}