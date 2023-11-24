// for using ffi-napi npm module we may need python version 3.11.0
const ffi = require('ffi-napi')
const path = require('path')

const vertXDefineLibPath = path.join(__dirname, 'VertXDLL', 'Vertx.dll')
console.log('vertXDefineLibPath :- ', vertXDefineLibPath)

const vertXLib = ffi.Library(vertXDefineLibPath, {
	// <function_Name>: [<return data-type>, [<function_argument_1>, <function_argument_2>, ...]]
    Initialization: ['int', ['int', 'char', 'char']], // VEXPORT int CALLBACK Initialization(int port, HWND hWnd, HINSTANCE hInst)
    // for pointer we may provide int*, char*, or pointer
    GetDLLVersion: ['int', ['pointer', 'int']] // VEXPORT int CALLBACK GetDLLVersion(char *version, int versionSize)
})

module.exports = vertXLib
