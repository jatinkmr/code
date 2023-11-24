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
        console.log(`charArg1 :- ${charArg1}, intArg2 :- ${intArg2}`)
        let dllVersionOutPut = VertXLib.GetDLLVersion(charArg1, intArg2)
        console.log('dllVersionOutPut :- ', dllVersionOutPut)
    } catch(error) {
        console.log('Error :- ', error)
    }
}

console.log('Connecting HID VertX DLL...')
hidVertXConnection()
console.log('Initialization of Buffer for DLLVersion...')
let locationBuffer = Buffer.from('./VertXDLL/Vertx.dll');
console.log('Initialized Buffer :- ', locationBuffer);
console.log('Fetching HID VertX DLL Version...')
fetchDllVersion(locationBuffer, locationBuffer.length)
