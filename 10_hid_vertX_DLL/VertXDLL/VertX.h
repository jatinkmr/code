/******************************* WARNING!! ************************************
*    Copyright (c) 2003-2005 by HID Corporation.  All rights reserved.
*
*    This software is protected by copyright law and international treaties.
*    Any unauthorized reproduction, distribution or use of the software
*    is prohibited.

$Date: 2006/10/27 19:05:01 $ 
$Revision: 1.28.4.1 $ 
$Source: /opt/cvs/gateway/vertxwin/vertxdll/VertX.h,v $ 
*/


// VertX.h
// DLL interface functions

#ifndef _VERTX_H_
#define _VERTX_H_

#include <winsock2.h>
#include <windows.h>
#include "Defines.h"
#include "VertXDeprecated.h"

#define VEXPORT extern "C" __declspec(dllexport)

VEXPORT int CALLBACK AddModCardRecord2(char *macAddress,int cardSetID,int noFormat,
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
									int outScheduleElevatorGroup,int pinExempt);

VEXPORT int CALLBACK AlarmLogSize(int mode,int *logSize);

VEXPORT int CALLBACK CmdOutputFunction3(char *macAddress,int target,int functionCode,
										int state);

VEXPORT int CALLBACK ContactController(char *ipHostName,int port);

VEXPORT int CALLBACK ControllerInfo(char *macAddress,char *info,int infoSize);

VEXPORT int CALLBACK DebugLevel(int mode,int *level);

VEXPORT int CALLBACK DeleteCardRecord(char *macAddress,int cardSetID,int noFormat,
									  char *cardNumber,char *pin);

VEXPORT int CALLBACK DiscoverInterfaces2(char *macAddress,char *interfaces,int interfacesSize);

VEXPORT int CALLBACK DownloadInterfaceEEPROM(char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK DownloadInterfaceProgram(char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK DriveSavedOutputs(char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK EventLogSize(int mode,int *logSize);

VEXPORT int CALLBACK ExecuteDBChangeover(char *macAddress,int numberCardHolders);

VEXPORT int CALLBACK GetCardholderStatus3(char *macAddress,unsigned int uniqueID,
										  char *lastDate,int lastDateSize,
										  char *lastTime,int lastTimeSize,
										  int *currentArea,
										  int *cardholderStatus,
										  int *violationType,
										  int *violationArea,
										  int *violationAction,
										  int *lastReaderController,
										  int *lastReaderInterfaceAddress,
										  int *lastReaderAddress);

VEXPORT int CALLBACK GetCardRecord2(char *macAddress,int *cardSetID,int *noFormat,
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
								  int *outScheduleElevatorGroup,
								  int *deleted,int *pinExempt);

VEXPORT int CALLBACK GetConnectedControllers(char *controllers,int controllersSize);

VEXPORT int CALLBACK GetCurrentTimeZone(char *macAddress,char *timeZone,int timeZoneSize);

VEXPORT int CALLBACK GetData(char *macAddress,char *controllerPathFile,
							 unsigned char *fileData,int fileDataSize,
							 int *fileDataRead,int *endOfData);

VEXPORT int CALLBACK GetDLLVersion(char *version,int versionSize);

VEXPORT int CALLBACK GetEncryptionDLLVersion(char *version,int versionSize);

VEXPORT int CALLBACK GetErrorLog(char *macAddress,char *pcPathFile);

VEXPORT int CALLBACK GetFile(char *macAddress,char *controllerPathFile,
							 char *pcPathFile);

VEXPORT int CALLBACK GetFileStatus(char *macAddress,char *controllerPathFile,
								   char *perm,int permSize);

VEXPORT int CALLBACK GetInputStatus3(char *macAddress,int target,int *online,
									 char *status,int statusSize);

VEXPORT int CALLBACK GetLocalA2DLimits(char *macAddress,int a2dNumber,
									char *upperHighLimit,int upperHighLimitSize,
									char *lowerHighLimit,int lowerHighLimitSize,
									char *upperLowLimit,int upperLowLimitSize,
									char *lowerLowLimit,int lowerLowLimitSize);

VEXPORT int CALLBACK GetLocalDebounce(char *macAddress,int a2dNumber,
									  int *iterations);

VEXPORT int CALLBACK GetLocalRelayTimer(char *macAddress,int relay,
										int *timerDuration);

VEXPORT int CALLBACK GetLogicalInput(char *macAddress,int logicalNumber,int *value);

VEXPORT int CALLBACK GetNextAlarm(char *alarm,int alarmSize);

VEXPORT int CALLBACK GetNextCommandKeyData(char *commandKeyData,int commandKeyDataSize);

VEXPORT int CALLBACK GetNextEvent(char *event,int eventSize);

VEXPORT int CALLBACK GetNextHereIAm(char *hereIAm,int hereIAmSize);

VEXPORT int CALLBACK GetNextKeyPadData(char *keyPadData,int keyPadDataSize);

VEXPORT int CALLBACK GetNextLookup(char *lookup,int lookupSize);

VEXPORT int CALLBACK GetNextPostAccess(char *postAccess,int postAccessSize);

VEXPORT int CALLBACK GetNextResponse(int *ident,char *response,int responseSize);

VEXPORT int CALLBACK GetNextSmartCardData(char *smartCardData,int smartCardDataSize);

VEXPORT int CALLBACK GetNumberCommandKeyData(int *numberCommandKeyData);

VEXPORT int CALLBACK GetNumberHereIAm(int *numberHereIAm);

VEXPORT int CALLBACK GetNumberKeyPadData(int *numberKeyPadData);

VEXPORT int CALLBACK GetNumberLookups(int *numberLookups);

VEXPORT int CALLBACK GetNumberOfCards(char *macAddress,int *cardsUsed,int *totalCards);

VEXPORT int CALLBACK GetNumberPostAccess(int *numberPostAccess);

VEXPORT int CALLBACK GetNumberResponse(int *numberResponse);

VEXPORT int CALLBACK GetNumberSmartCardData(int *numberSmartCardData);

VEXPORT int CALLBACK GetSavedOutputs(char *macAddress,int interfaceNumber,char *savedOutputs,
									int savedOutputsSize);

VEXPORT int CALLBACK GetTimeDate(char *macAddress,char *systemDate,int systemDateSize,
								 char *systemTime,int systemTimeSize);

VEXPORT int CALLBACK GetTZ(char *macAddress,char *systemTimeZone,int systemTimeZoneSize);

VEXPORT int CALLBACK GetValidControllers(char *controllers,int controllersSize);

VEXPORT int CALLBACK Initialization(int port,HWND hWnd,HINSTANCE hInst);

VEXPORT int CALLBACK NumberUnreadAlarms(int *numberAlarms);

VEXPORT int CALLBACK NumberUnreadEvents(int *numberEvents);

VEXPORT int CALLBACK ReadA2D_2(char *macAddress,int target,int a2dNumber,
							 char *a2dValue,int a2dValueSize);

VEXPORT int CALLBACK ReadInterfaceMemory(char *macAddress,int interfaceNumber,int memoryType,
										 char *address,int bytes,char *memoryData,
										 int memoryDataSize);

VEXPORT int CALLBACK RebootBoard2(char *macAddress,int target);

VEXPORT int CALLBACK RecheckLookupCard(char *macAddress,char *lookupData);

VEXPORT int CALLBACK RecvWaitTime(int mode,int *waitTime);

VEXPORT int CALLBACK ResetAllCardholderStatus(char *macAddress);

VEXPORT int CALLBACK ResetDLL();

VEXPORT int CALLBACK ResetDLLTime(int mode,int *resetTime);

VEXPORT int CALLBACK ResetOneCardholderStatus(char *macAddress,unsigned int uniqueID);

VEXPORT int CALLBACK ResetThread(char *macAddress);

VEXPORT int CALLBACK RestartTask(char *macAddress,int task);

VEXPORT int CALLBACK RspAddModCardRecord2(int ident,char *macAddress,int cardSetID,
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
										int outScheduleElevatorGroup,int pinExempt);

VEXPORT int CALLBACK RspCmdOutputFunction2(int ident,char *macAddress,int target,
										  int functionCode,int state);

VEXPORT int CALLBACK RspContactController(int ident,char *ipHostName,int port);

VEXPORT int CALLBACK RspControllerInfo(int ident,char *macAddress);

VEXPORT int CALLBACK RspDeleteCardRecord(int ident,char *macAddress,int cardSetID,
										 int noFormat,char *cardNumber,char *pin);

VEXPORT int CALLBACK RspDiscoverInterfaces(int ident,char *macAddress,int chain);

VEXPORT int CALLBACK RspDownloadInterfaceEEPROM(int ident,char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK RspDownloadInterfaceProgram(int ident,char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK RspDriveSavedOutputs(int ident,char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK RspExecuteDBChangeover(int ident,char *macAddress,
											int numberCardHolders);

VEXPORT int CALLBACK RspGetCardholderStatus(int ident,char *macAddress,
											unsigned int uniqueID);

VEXPORT int CALLBACK RspGetCardRecord2(int ident,char *macAddress,int cardSetID,
									   int noFormat,char *cardNumber,char *pin);

VEXPORT int CALLBACK RspGetCurrentTimeZone(int ident,char *macAddress);

VEXPORT int CALLBACK RspGetData(int ident,char *macAddress,char *controllerPathFile);

VEXPORT int CALLBACK RspGetDataFilename(int ident,char *macAddress,
										char *controllerPathFile);

VEXPORT int CALLBACK RspGetErrorLog(int ident,char *macAddress);

VEXPORT int CALLBACK RspGetFile(int ident,char *macAddress,char *controllerPathFile,
								char *pcPathFile);

VEXPORT int CALLBACK RspGetFileStatus(int ident,char *macAddress,
									  char *controllerPathFile);

VEXPORT int CALLBACK RspGetInputStatus2(int ident,char *macAddress,int target);

VEXPORT int CALLBACK RspGetLocalA2DLimits(int ident,char *macAddress,int a2dNumber);

VEXPORT int CALLBACK RspGetLocalDebounce(int ident,char *macAddress,int a2dNumber);

VEXPORT int CALLBACK RspGetLocalRelayTimer(int ident,char *macAddress,int relay);

VEXPORT int CALLBACK RspGetLogicalInput(int ident,char *macAddress,int logicalNumber);

VEXPORT int CALLBACK RspGetNumberOfCards(int ident,char *macAddress);

VEXPORT int CALLBACK RspGetSavedOutputs(int ident,char *macAddress,int interfaceNumber);

VEXPORT int CALLBACK RspGetTimeDate(int ident,char *macAddress);

VEXPORT int CALLBACK RspGetTZ(int ident,char *macAddress);

VEXPORT int CALLBACK RspReadA2D_2(int ident,char *macAddress,int target,
								int a2dNumber);

VEXPORT int CALLBACK RspReadInterfaceMemory(int ident,char *macAddress,int interfaceNumber,
											int memoryType,char *address,
											int bytes);

VEXPORT int CALLBACK RspRebootBoard2(int ident,char *macAddress,int target);

VEXPORT int CALLBACK RspRecheckLookupCard(int ident,char *macAddress,char *lookupData);

VEXPORT int CALLBACK RspResetAllCardholderStatus(int ident,char *macAddress);

VEXPORT int CALLBACK RspResetOneCardholderStatus(int ident,char *macAddress,
											  unsigned int uniqueID);

VEXPORT int CALLBACK RspResetThread(int ident,char *macAddress);

VEXPORT int CALLBACK RspRestartTask(int ident,char *macAddress,int task);

VEXPORT int CALLBACK RspSendData(int ident,char *macAddress,char *controllerPathFile,
								 unsigned char *fileData,int fileDataSize,
								 int endOfData);

VEXPORT int CALLBACK RspSendDataFilename(int ident,char *macAddress,
										 char *controllerPathFile);

VEXPORT int CALLBACK RspSendFile(int ident,char *macAddress,char *controllerPathFile,
								 char *pcPathFile);

VEXPORT int CALLBACK RspSetFileStatus(int ident,char *macAddress,
									  char *controllerPathFile,char *perm);

VEXPORT int CALLBACK RspSetHardwareID(int ident,char *macAddress,int interfaceNumber,char *id);

VEXPORT int CALLBACK RspSetLocalA2DLimits(int ident,char *macAddress,int a2dNumber,
										  char *upperHighLimit,char *lowerHighLimit,
										  char *upperLowLimit,char *lowerLowLimit);

VEXPORT int CALLBACK RspSetLocalDebounce(int ident,char *macAddress,int a2dNumber,
										 int iterations);

VEXPORT int CALLBACK RspSetLocalRelayTimer(int ident,char *macAddress,int relay,
										   int timerDuration);

VEXPORT int CALLBACK RspSetLogicalInput(int ident,char *macAddress,int logicalNumber,int value);

VEXPORT int CALLBACK RspSetTimeDate(int ident,char *macAddress,char *systemDate,
									char *systemTime);

VEXPORT int CALLBACK RspSetTZ(int ident,char *macAddress,char *systemTimeZone);

VEXPORT int CALLBACK RspSmartCardRawMode(int ident,char *macAddress,int deviceAddress,
										  char *cmdString);

VEXPORT int CALLBACK RspSmartCardCommandMode(int ident,char *macAddress,int deviceAddress,
										char *cmdString);

VEXPORT int CALLBACK RspStopTask(int ident,char *macAddress,int task);

VEXPORT int CALLBACK RspUndeleteCardRecord(int ident,char *macAddress,int cardSetID,
										   int noFormat,char *cardNumber,char *pin);

VEXPORT int CALLBACK RspUploadAllMsgs(int ident,char *macAddress);

VEXPORT int CALLBACK RspUploadAllMsgsByClassCode(int ident,char *macAddress,int classCode);

VEXPORT int CALLBACK RspUploadAllMsgsByPriority(int ident,char *macAddress,int priority);

VEXPORT int CALLBACK RspUploadCurrentMsgs(int ident,char *macAddress);

VEXPORT int CALLBACK RspUploadCurrentMsgsByClassCode(int ident,char *macAddress,int classCode);

VEXPORT int CALLBACK RspUploadCurrentMsgsByPriority(int ident,char *macAddress,int priority);

VEXPORT int CALLBACK RspUploadMsgsByMsgID(int ident,char *macAddress,int startMsgID,
										  int endMsgID);

VEXPORT int CALLBACK RspWriteEEPROM(int ident,char *macAddress,int interfaceNumber,
									char *address,int bytes,char *memoryData);

VEXPORT int CALLBACK SendData(char *macAddress,char *controllerPathFile,
							  unsigned char *fileData,int fileDataSize,
							  int endOfData);

VEXPORT int CALLBACK SendFile(char *macAddress,char *controllerPathFile,
							  char *pcPathFile);

VEXPORT int CALLBACK SendPostAccessMsg(char *macAddress,char *postAccessData);

VEXPORT int CALLBACK SetCommandKeyDataCallback(SmallStringFP commandKeyDataFunc);

VEXPORT int CALLBACK SetFileStatus(char *macAddress,char *controllerPathFile,
								   char *perm);

VEXPORT int CALLBACK SetHardwareID(char *macAddress,int interfaceNumber,char *id);

VEXPORT int CALLBACK SetHereIAmCallback(HereIAmFP hereIAmFunc);

VEXPORT int CALLBACK SetKeyPadDataCallback(SmallStringFP keyPadDataFunc);

VEXPORT int CALLBACK SetLocalA2DLimits(char *macAddress,int a2dNumber,
									   char *upperHighLimit,char *lowerHighLimit,
									   char *upperLowLimit,char *lowerLowLimit);

VEXPORT int CALLBACK SetLocalDebounce(char *macAddress,int a2dNumber,int iterations);

VEXPORT int CALLBACK SetLocalRelayTimer(char *macAddress,int relay,int timerDuration);

VEXPORT int CALLBACK SetLogicalInput(char *macAddress,int logicalNumber,int value);

VEXPORT int CALLBACK SetLookupCallback(SmallStringFP lookupFunc);

VEXPORT int CALLBACK SetPostAccessCallback(BigStringFP postAccessFunc);

VEXPORT int CALLBACK SetResponseCallback(ResponseFP responseFunc);

VEXPORT int CALLBACK SetSmartCardDataCallback(BigStringFP smartCardDataFunc);

VEXPORT int CALLBACK SetTimeDate(char *macAddress,char *systemDate,char *systemTime);

VEXPORT int CALLBACK SetTZ(char *macAddress,char *systemTimeZone);

VEXPORT int CALLBACK SetValidControllers(char *controllers);

VEXPORT int CALLBACK Shutdown();

VEXPORT int CALLBACK StopTask(char *macAddress,int task);

VEXPORT int CALLBACK Terminate(char *macAddress);

VEXPORT int CALLBACK UndeleteCardRecord(char *macAddress,int cardSetID,int noFormat,
										char *cardNumber,char *pin);

VEXPORT int CALLBACK UploadAllMsgs(char *macAddress);

VEXPORT int CALLBACK UploadAllMsgsByClassCode(char *macAddress,int classCode);

VEXPORT int CALLBACK UploadAllMsgsByPriority(char *macAddress,int priority);

VEXPORT int CALLBACK UploadCurrentMsgs(char *macAddress);

VEXPORT int CALLBACK UploadCurrentMsgsByClassCode(char *macAddress,int classCode);

VEXPORT int CALLBACK UploadCurrentMsgsByPriority(char *macAddress,int priority);

VEXPORT int CALLBACK UploadMsgsByMsgID(char *macAddress,int startMsgID,int endMsgID);

VEXPORT int CALLBACK WriteEEPROM(char *macAddress,int interfaceNumber,char *address,
								 int bytes,char *memoryData);

#endif