const { hidVertXConnection, fetchDllVersion } = require('./libController')

console.log('Connecting HID VertX DLL...')
hidVertXConnection()

console.log('Initialization of Buffer for DLLVersion...')
const vertXBuffer = Buffer.alloc(256);
console.log('Buffer Created');
console.log('Fetching HID VertX DLL Version...')
fetchDllVersion(vertXBuffer, vertXBuffer.length)
console.log('current Version of DLL :- ', vertXBuffer.toString())
