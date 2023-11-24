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
        console.log('Error :- ', error)
    }
}

const fetchDllVersion = async (charArg1, intArg2) => {
    try {
        let dllVersionOutPut = VertXLib.GetDLLVersion(charArg1, intArg2)
    } catch(error) {
        console.log('Error :- ', error)
    }
}

module.exports = {
    hidVertXConnection,
    fetchDllVersion
}