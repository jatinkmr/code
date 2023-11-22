// for using ffi-napi npm module we may need python version 3.11.0
const ffi = require('ffi-napi');

const myLibrary = ffi.Library('./VertXDLL_2[1].4.7_R22716/Defines.h', {
    hereiamStruct: ['string', ['string']]
})

myLibrary.hereiamStruct(3)
