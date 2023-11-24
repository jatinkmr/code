const VertXLib = require('./lib')

const hidVertXConnection = async ()  => {
    try {
        let initializationOutPut = VertXLib.Initialization(4011, "", "") // PORT range will be between 1025 to 65535
        console.log('initializationOutPut :- ', initializationOutPut)

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
        let dllVersionOutPut = VertXLib.GetDLLVersion(emptyBufferToStoreVersion, sizeOfEmptyBuffer)
    } catch(error) {
        console.log('Error in fetchDllVersion :- ', error)
    }
}

const fetchValidHidControllerGateway = async (controllerMacAddress, controllerSize) => {
    try {
        return await VertXLib.GetValidControllers(controllerMacAddress, controllerSize)
    } catch (error) {
        console.log('Error in fetchValidHidController :- ', error)
    }
}

const setValidHidControllerGateway = async (controllerMacAddress, controllerMacAddressSize) => {
    try {
        return await VertXLib.SetValidControllers(controllerMacAddress, controllerMacAddressSize)
    } catch (error) {
        console.log('Error in setValidHidControllerGateway :- ', error)
    }
}

module.exports = {
    hidVertXConnection,
    fetchDllVersion,
    fetchValidHidControllerGateway,
    setValidHidControllerGateway
}