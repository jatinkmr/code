/******************************* WARNING!! ************************************
*    Copyright (c) 2003-2005 by HID Corporation.  All rights reserved.
*
*    This software is protected by copyright law and international treaties.
*    Any unauthorized reproduction, distribution or use of the software
*    is prohibited.

$Date: 2006/11/22 16:27:07 $ 
$Revision: 1.1.2.3 $ 
$Source: /opt/cvs/gateway/vertxwin/vertxdll/Defines.h,v $ 
*/


// Defines.h
// definitions used by the DLL

#ifndef _DEFINES_H_
#define _DEFINES_H_

//! global definitions
#define DATAMAX 4097        // size of data buffer to send data via sockets
#define BUFFMAX DATAMAX+20  // size of data buffer arrays
#define MACSIZE 20			// mac address size
#define HEREIAMSIZE 140		// max size of HereIAm message
#define SMALLSTRINGSIZE HEREIAMSIZE		// redefine HEREIAMSIZE
#define FILENAMEMAX 255		// max size of file name with path

const char dllVersion[] = "2.4.7";

//! hereiamStruct struct - for HereIAm callback
//! smallString - redefines hereiam
typedef struct hereiamStruct
{
	BYTE b[HEREIAMSIZE];	//!< HereIAm string
} hereiamType, smallStringType;

typedef int (__stdcall *HereIAmFP)(hereiamType *);
typedef int (__stdcall *SmallStringFP)(smallStringType *);

//! bigStringStruct struct - for big char string callback
typedef struct bigStringStruct
{
	BYTE str[DATAMAX];		//!< big char string message
} bigStringType;

typedef int (__stdcall *BigStringFP)(bigStringType *);

//! responseStruct struct - for response thread callback
typedef struct responseStruct
{
	int ident;				//!< identification
	BYTE rsp[BUFFMAX];		//!< response string
} responseType;

typedef int (__stdcall *ResponseFP)(responseType *);

//! thread message structure 
typedef struct threadMsgStruct
{
	int rspfunc;			// if rsp function then use rsp thread
	int msgid;				// message id
	char msg[BUFFMAX+1];	// message
	char vertxFile[FILENAMEMAX+1];	//!< vertx filename for Get/Send Data/File
	char hostFile[FILENAMEMAX+1];	//!< host filename for Get/Send Data/File
} threadMsgType;

//! Windows message codes
#define WSA_ASYNC WM_USER+77	// async message
#define HOST_MSG WM_USER+78		// host message
#define TERM_MSG WM_USER+79		// terminate message
#define STOP_MSG WM_USER+80		// stop message
#define RESET_MSG WM_USER+81	// reset message
#define KILL_MSG WM_USER+82		// kill worker thread message
#define RKILL_MSG WM_USER+83	// kill worker thread message using response thread
#define RSP_MSG WM_USER+84		// response message

#endif
