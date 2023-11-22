// for using ffi-napi npm module we may need python version 3.11.0
const ffi = require('ffi-napi')
const path = require('path')

async function serverTest() {
    console.log('Testing == === == ===')
    try {
        const vertXDefineLibPath = path.join(__dirname, 'VertXDLL_2[1].4.7_R22716', 'Vertx.dll')
        console.log('vertXDefineLibPath :- ', vertXDefineLibPath)

        const vertXLib = ffi.Library(vertXDefineLibPath, {
            GetDLLVersion: ['int', ['charPointer', 'int']]
        })
        let outPut = vertXLib.GetDLLVersion()
        console.log('outPut :- ', outPut)
    } catch (error) {
        console.log('Error :- ', error)
    }
}

serverTest()
