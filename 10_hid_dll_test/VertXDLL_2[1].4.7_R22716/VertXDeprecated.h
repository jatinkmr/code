/******************************* WARNING!! ************************************
*    Copyright (c) 2003-2005 by HID Corporation.  All rights reserved.
*
*    This software is protected by copyright law and international treaties.
*    Any unauthorized reproduction, distribution or use of the software
*    is prohibited.

$Date: 2006/10/27 19:06:23 $ 
$Revision: 1.1.2.1 $ 
$Source: /opt/cvs/gateway/vertxwin/vertxdll/VertXDeprecated.h,v $ 
*/


// VertXDeprecated.h
// Deprecated DLL interface functions

#ifndef _VERTX_DEPRECATED_H_
#define _VERTX_DEPRECATED_H_

#include <winsock2.h>
#include <windows.h>
#include "Defines.h"

#define VEXPORT extern "C" __declspec(dllexport)

// deprecated, use AddModCardRecord2
VEXPORT int CALLBACK AddModCardRecord(char *macAddress,int cardSetID,int noFormat,
									 char *cardNumber,char *pin,int accessType,
									 unsigned int uniqueID,int accessGroup1,
									 int accessGroup2,int accessGroup3,
									 int accessGroup4,int accessGroup5,
									 int accessGroup6,int accessGroup7,
									 int accessGroup8,int extendedAccess,
									 int passbackExempt,int pinCmds,
									 char *startDate,char *startTime,
									 char *endDate,char *endTime,
									 unsigned int escortID,
									 int inScheduleElevatorGroup,
									 int outScheduleElevatorGroup);

// deprecated, use UploadAllMsgs, UploadAllMsgsByClassCode, UploadAllMsgsByPriority,
// UploadCurrentMsgs, UploadCurrentMsgsByClassCode, UploadCurrentMsgsByPriority,
// UploadMsgsByMsgID
VEXPORT int CALLBACK CmdEventLog(char *macAddress,int mode,int num1,int num2);

// deprecated, use CmdOutputFunction3
VEXPORT int CALLBACK CmdOutputFunction(char *macAddress,int target,int functionCode,
									   int state);

// deprecated, use CmdOutputFunction3
VEXPORT int CALLBACK CmdOutputFunction2(char *macAddress,int target,int functionCode,
										int state);

// deprecated, use ContactController
VEXPORT int CALLBACK ContactGateway(char *ipHostName,int port);

// deprecated, use DiscoverInterfaces2
VEXPORT int CALLBACK DiscoverInterfaces(char *macAddress,char *interfaces,int interfacesSize);

// deprecated, use DownloadInterfaceProgram, DownloadInterfaceEEPROM
VEXPORT int CALLBACK DownloadInterfaceCode(char *macAddress,int interfaceNumber,int mode);

// deprecated, use ExecuteDBChangeover
VEXPORT int CALLBACK ExecuteChangeOverDB(char *macAddress,int numberCardHolders);

// deprecated, use GetFileStatus, SetFileStatus
VEXPORT int CALLBACK FileStatus(char *macAddress,int mode,char *controllerPathFile,
								char *perm,int permSize);

// deprecated, use ControllerInfo
VEXPORT int CALLBACK GatewayInfo(char *macAddress,char *info,int infoSize);

// deprecated, use GetCardholderStatus3
VEXPORT int CALLBACK GetCardholderStatus(char *macAddress,int uniqueID,
										 char *lastDate,int lastDateSize,
										 char *lastTime,int lastTimeSize,
										 int *currentArea,
										 int *cardholderStatus,
										 int *violationType,
										 int *violationAction);

// deprecated, use GetCardholderStatus3
VEXPORT int CALLBACK GetCardholderStatus2(char *macAddress,int uniqueID,
										  char *lastDate,int lastDateSize,
										  char *lastTime,int lastTimeSize,
										  int *currentArea,
										  int *cardholderStatus,
										  int *violationType,
										  int *violationArea,
										  int *violationAction);

// deprecated, use GetCardRecord2
VEXPORT int CALLBACK GetCardRecord(char *macAddress,int *cardSetID,int *noFormat,
								  char *cardNumber,int cardNumberSize,
								  char *pin,int pinSize,int *accessType,
								  unsigned int *uniqueID,int *accessGroup1,
								  int *accessGroup2,int *accessGroup3,
								  int *accessGroup4,int *accessGroup5,
								  int *accessGroup6,int *accessGroup7,
								  int *accessGroup8,int *extendedAccess,
								  int *passbackExempt,int *pinCmds,
								  char *startDate,int startDateSize,
								  char *startTime,int startTimeSize,
								  char *endDate,int endDateSize,
								  char *endTime,int endTimeSize,
								  unsigned int *escortID,
								  int *inScheduleElevatorGroup,
								  int *outScheduleElevatorGroup,int *deleted);

// deprecated, use GetConnectedControllers
VEXPORT int CALLBACK GetConnectedGateways(char *gateways,int gatewaysSize);

// deprecated, use GetInputStatus3
VEXPORT int CALLBACK GetInputStatus(char *macAddress,int target,char *status,
									int statusSize);

// deprecated, use GetInputStatus3
VEXPORT int CALLBACK GetInputStatus2(char *macAddress,int target,int *online,
									 char *status,int statusSize);

// deprecated, use GetValidControllers
VEXPORT int CALLBACK GetValidGateways(char *gateways,int gatewaysSize);

// deprecated, use GetLocalA2DLimits, SetLocalA2DLimits
VEXPORT int CALLBACK LocalA2DLimits(char *macAddress,int mode,int a2dNumber,
									char *upperHighLimit,int upperHighLimitSize,
									char *lowerHighLimit,int lowerHighLimitSize,
									char *upperLowLimit,int upperLowLimitSize,
									char *lowerLowLimit,int lowerLowLimitSize);

// deprecated, use GetLocalDebounce, SetLocalDebounce
VEXPORT int CALLBACK LocalDebounce(char *macAddress,int mode,int a2dNumber,
								   int *iterations);
// deprecated
VEXPORT int CALLBACK LocalFcnCode(char *macAddress,int functionCode,int *state);

// deprecated
VEXPORT int CALLBACK LocalPollDelay(char *macAddress,int mode,int *delay);

// deprecated, use GetLocalRelayTimer, SetLocalRelayTimer
VEXPORT int CALLBACK LocalRelayTimer(char *macAddress,int mode,int relay,
									 int *timerDuration);

// deprecated, use GetLogicalInput, SetLogicalInput
VEXPORT int CALLBACK LogicalInput(char *macAddress,int mode,int logicalNumber,
								  int *value);

// deprecated, use ReadA2D_2
VEXPORT int CALLBACK ReadA2D(char *macAddress,int target,int a2dNumber,
							 char *a2dValue,int a2dValueSize);

// deprecated, use RebootBoard2
VEXPORT int CALLBACK RebootBoard(char *macAddress,int target);

// deprecated, use ResetAllCardholderStatus, ResetOneCardholderStatus
VEXPORT int CALLBACK ResetCardholderStatus(char *macAddress,int mode,
										   unsigned int uniqueID);

// deprecated, use RestartTask, StopTask
VEXPORT int CALLBACK RestartStopTask(char *macAddress,int mode,int task);

// deprecated, use RspAddModCardRecord2
VEXPORT int CALLBACK RspAddModCardRecord(int ident,char *macAddress,int cardSetID,
										int noFormat,char *cardNumber,
										char *pin,int accessType,unsigned int uniqueID,
										int accessGroup1,int accessGroup2,
										int accessGroup3,int accessGroup4,
										int accessGroup5,int accessGroup6,
										int accessGroup7,int accessGroup8,
										int extendedAccess,int passbackExempt,
										int pinCmds,char *startDate,
										char *startTime,char *endDate,
										char *endTime,unsigned int escortID,
										int inScheduleElevatorGroup,
										int outScheduleElevatorGroup);

// deprecated, use RspUploadAllMsgs, RspUploadAllMsgsByClassCode,
// RspUploadAllMsgsByPriority, RspUploadCurrentMsgs, RspUploadCurrentMsgsByClassCode,
// RspUploadCurrentMsgsByPriority, RspUploadMsgsByMsgID
VEXPORT int CALLBACK RspCmdEventLog(int ident,char *macAddress,int mode,int num1,
									int num2);

// deprecated, use RmpCmdOutputFunction2
VEXPORT int CALLBACK RspCmdOutputFunction(int ident,char *macAddress,int target,
										  int functionCode,int state);

// deprecated, use RspContactController
VEXPORT int CALLBACK RspContactGateway(int ident,char *iphostname,int port);

// deprecated, use RspDownloadInterfaceProgram, RspDownloadInterfaceEEPROM
VEXPORT int CALLBACK RspDownloadInterfaceCode(int ident,char *macAddress,
											  int interfaceNumber,int mode);

// deprecated, use RspExecuteDBChangeover
VEXPORT int CALLBACK RspExecuteChangeOverDB(int ident,char *macAddress,
											int numberCardHolders);

// deprecated, use RspGetFileStatus, RspSetFileStatus
VEXPORT int CALLBACK RspFileStatus(int ident,char *macAddress,int mode,
								   char *controllerPathFile,char *perm);

// deprecated, use RspControllerInfo
VEXPORT int CALLBACK RspGatewayInfo(int ident,char *macAddress);

// deprecated, use RspGetCardRecord2
VEXPORT int CALLBACK RspGetCardRecord(int ident,char *macAddress,int cardSetID,
									  int noFormat,char *cardNumber,char *pin);

// deprecated, use RspGetInputStatus2
VEXPORT int CALLBACK RspGetInputStatus(int ident,char *macAddress,int target);

// deprecated, use RspGetLocalA2DLimits, RspSetLocalA2DLimits
VEXPORT int CALLBACK RspLocalA2DLimits(int ident,char *macAddress,int mode,
									   int a2dNumber,char *upperHighLimit,
									   char *lowerHighLimit,char *upperLowLimit,
									   char *lowerLowLimit);

// deprecated, use RspGetLocalDebounce, RspSetLocalDebounce
VEXPORT int CALLBACK RspLocalDebounce(int ident,char *macAddress,int mode,
									  int a2dNumber,int iterations);

// deprecated
VEXPORT int CALLBACK RspLocalFcnCode(int ident,char *macAddress,int functionCode);

// deprecated
VEXPORT int CALLBACK RspLocalPollDelay(int ident,char *macAddress,int mode,int delay);

// deprecated, use RspGetLocalRelayTimer, RspSetLocalRelayTimer
VEXPORT int CALLBACK RspLocalRelayTimer(int ident,char *macAddress,int mode,
										int relay,int timerDuration);

// deprecated, use RspGetLogicalInput, RspSetLogicalInput
VEXPORT int CALLBACK RspLogicalInput(int ident,char *macAddress,int mode,
									 int logicalNumber,int value);

// deprecated, use RspReadA2D_2
VEXPORT int CALLBACK RspReadA2D(int ident,char *macAddress,int target,
								int a2dNumber);

// deprecated, use RspRebootBoard2
VEXPORT int CALLBACK RspRebootBoard(int ident,char *macAddress,int target);

// deprecated, use RspResetAllCardholderStatus, RspResetOneCardholderStatus
VEXPORT int CALLBACK RspResetCardholderStatus(int ident,char *macAddress,int mode,
											  unsigned int uniqueID);

// deprecated, use RspRestartTask, RspStopTask
VEXPORT int CALLBACK RspRestartStopTask(int ident,char *macAddress,int mode,
										int task);

// deprecated, use RspSetHardwareID
VEXPORT int CALLBACK RspSetInterfaceInternalID(int ident,char *macAddress,
											   int interfaceNumber,char *id);

// deprecated, use RspGetCurrentTimeZone, RspGetTimeDate, RspSetTimeDate
VEXPORT int CALLBACK RspSystemTime(int ident,char *macAddress,int mode,
								   char *systemDate,char *systemTime);

// deprecated, use RspGetTZ, RspSetTZ
VEXPORT int CALLBACK RspSystemTZ(int ident,char *macAddress,int mode,char *systemTimeZone);

// deprecated, use RspDeleteCardRecord, RspUndeleteCardRecord   
VEXPORT int CALLBACK RspUpdateCardRecord(int ident,char *macAddress,int mode,
										int cardSetID,int noFormat,
										char *cardNumber,char *pin);

// deprecated, use SetHardwareID
VEXPORT int CALLBACK SetInterfaceInternalID(char *macAddress,int interfaceNumber,char *id);

// deprecated, use SetValidControllers
VEXPORT int CALLBACK SetValidGateways(char *gateways,int gatewaysSize);

// deprecated, use GetCurrentTimeZone, GetTimeDate, SetTimeDate
VEXPORT int CALLBACK SystemTime(char *macAddress,int mode,char *systemDate,
								int systemDateSize,char *systemTime,int systemTimeSize,
								char *timeZone,int timeZoneSize);

// deprecated, use GetTZ, SetTZ
VEXPORT int CALLBACK SystemTZ(char *macAddress,int mode,char *systemTimeZone,
							  int systemTimeZoneSize);

// deprecated, use DeleteCardRecord and UndeleteCardRecord
VEXPORT int CALLBACK UpdateCardRecord(char *macAddress,int mode,int cardSetID,
									 int noFormat,char *cardNumber,char *pin);

#endif