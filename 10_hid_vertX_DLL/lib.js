// for using ffi-napi npm module we may need python version 3.11.0
const ffi = require('ffi-napi')
const path = require('path')

const vertXDefineLibPath = path.join(__dirname, 'VertXDLL', 'Vertx.dll')
console.log('vertXDefineLibPath :- ', vertXDefineLibPath)

const vertXLib = ffi.Library(vertXDefineLibPath, {
	// <function_Name>: [<return data-type>, [<function_argument_1>, <function_argument_2>, ...]]
    Initialization: ['int', ['int', 'char', 'char']], // VEXPORT int CALLBACK Initialization(int port, HWND hWnd, HINSTANCE hInst)

    // for pointer we may provide int*, char*, or pointer
    GetDLLVersion: ['int', ['pointer', 'int']], // VEXPORT int CALLBACK GetDLLVersion(char *version, int versionSize)

    // SetValidGateway is a deprecated function, use SetValidControllers viz updated function
    // VEXPORT int CALLBACK SetValidGateways(char *gateways,int gatewaysSize);
    // VEXPORT int CALLBACK SetValidControllers(char *controllers);
    SetValidControllers: ['int', ['pointer', 'int']], // Only valid V1000/V2000 Controllers are permitted to connect to the VertX DLL.

    // GetValidGateways is a deprecated function, use GetValidControllers viz updated function
    // VEXPORT int CALLBACK GetValidGateways(char *gateways,int gatewaysSize);
    // VEXPORT int CALLBACK GetValidControllers(char *controllersMacAddress,int controllersSize);
    GetValidControllers: ['int', ['pointer', 'int']], // Use this command to determine which V1000/V2000 Controllers have been authorized to connect to the VertX DLL

    // int GetConnectedGateways(char *data, int dataSize) 
    // VEXPORT int CALLBACK GetConnectedControllers(char *controllers,int controllersSize);
    GetConnectedControllers: ['int', ['pointer', 'int']]
})

module.exports = vertXLib
