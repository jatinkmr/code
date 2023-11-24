/******************************* WARNING!! ************************************
*    Copyright (c) 2003-2005 by HID Corporation.  All rights reserved.
*
*    This software is protected by copyright law and international treaties.
*    Any unauthorized reproduction, distribution or use of the software
*    is prohibited.

$Date: 2006/10/27 19:06:23 $ 
$Revision: 1.1.2.1 $ 
$Source: /opt/cvs/gateway/vertxwin/vertxdll/HostReturnCodes.h,v $ 
*/


// HostReturnCodes.h
// return codes used by the DLL

#ifndef _HOST_RETURN_CODES_H_
#define _HOST_RETURN_CODES_H_

//! return codes
#define SUCCESS 0				// success
#define GENERAL_FAIL -10001		// general failure
#define INVALID_PARAM -10002	// invalid parameter
#define NOT_CONNECTED -10003	// gateway not connected
#define NOT_VALID -10004		// gateway not valid
#define COMM_ERROR -10005		// bad communication with gateway - communication error
#define INVALID_ARRAY_SIZE -10006	// invalid array size
#define FILE_ERROR -10007		// file read/write/open error on PC
#define ALL_MSGS_READ -10008	// all messages in the log file have been read
#define QUEUE_EMPTY -10009		// there are no more items in the queue
#define INVALID_CODE -10010		// invalid message code from gateway
#define INVALID_MESSAGE -10011	// invalid message from gateway
#define ERROR_LOG_EMPTY -10014	// error log contains no errors
#define CREATE_WORKER_FAIL -10015	// failure creating worker thread
#define VERTX_FILE_ERROR -10017	// file read/write/open error on VertX controller
#define THREAD_MSG_ERROR -10018	// error sending message to a thread
#define ENTRY_NOT_FOUND -10021	// entry not found in queue, hashtable, array, etc
#define CRYPTO_LIB_ERROR -10022	// encryption DLL error (dll not found, func not found, etc)
#define INVALID_HEADER_SIZE -10023	// invalid header size
#define INVALID_HEADER -10024	// invalid header 

#endif
