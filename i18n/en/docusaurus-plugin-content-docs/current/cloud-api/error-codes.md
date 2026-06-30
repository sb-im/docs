---
sidebar_position: 2
---

# Task Error Code List

This document lists the error codes that SuperDock series products may encounter when executing various tasks, along with their descriptions. Error codes are categorized by functional module to help you quickly locate and resolve issues.

## Error Code Classification Rules

- **60XXXX**: Error codes for operations executed by MSDK
- **61XXXX**: Error codes for the Dock task execution flow
- **62XXXX**: Error codes for Dock control, pre-task checks, device execution, and runtime
- **64XXXX**: Error codes for executing flights or loading waylines
- **Other**: Error codes compatible with DJI Cloud API

| Error Code | Error Name | Description |
|--------|----------|------|
| 314018 | RTK_POSITIONING_ERROR | RTK positioning exception |
| 316009 | LOW_BATTERY_BELOW_30_PERCENT | Aircraft battery level below 30% |
| 316026 | EMERGENCY_STOP_BUTTON_PRESSED | Dock emergency stop button pressed |
| 321770 | WRONG_GEAR_POSITION | Aircraft gear position error |
| 321530 | FLIGHT_ROUTE_PLANNING_FAILED | Trajectory planning failed during wayline flight |
| 321773 | LOW_BATTERY_RETURN_DURING_MISSION | Aircraft returned to home due to low battery during the flight mission |
| 321775 | LOST_COMMUNICATION_DURING_FLIGHT | Aircraft lost communication during wayline flight |
| 322539 | ROUTE_BREAKPOINT_INFO_ERROR | Wayline breakpoint information error |
| 322283 | USER_TRIGGERED_RETURN_DURING_MISSION | Return-to-home triggered by the user during the Dock flight mission |
| 321784 | EMERGENCY_RETURN_DUE_TO_STRONG_WIND | Emergency return-to-home due to strong wind during the mission |
| 322282 | INTERRUPTED_BY_USER_TAKEOVER | The Dock flight mission was interrupted; the aircraft was taken over by a cloud user or remote controller |
| 336017 | INSUFFICIENT_BATTERY_FOR_MISSION | Aircraft battery insufficient to complete the current mission |
| 514134 | HEAVY_RAIN | Rainfall too heavy |
| 514135 | WIND_SPEED_OVER_12_MPS | Wind speed greater than 12 m/s |
| 514124 | FAILED_TO_GET_BATTERY_INFO | Failed to obtain aircraft battery information |
| 514145 | ON_SITE_DEBUGGING_CANNOT_EXECUTE | The Dock is in on-site debugging and cannot perform the current operation or execute a flight mission |
| 514146 | REMOTE_DEBUGGING_CANNOT_EXECUTE | The Dock is in remote debugging and cannot execute a flight mission |
| 514153 | DOCK_NOT_IDLE_REJECT_OPERATION | The Dock is not idle; the operation is rejected |
| 514173 | WEATHER_CONDITIONS_PREVENT_FLIGHT | Due to weather conditions (ambient temperature below 5°C and rainfall at or above moderate rain) |
| 514101 | PUSH_ROD_CLOSE_FAILURE | Push rod closing failed |
| 514102 | PUSH_ROD_OPEN_FAILURE | Push rod opening failed |
| 514107 | HATCH_OPEN_FAILURE | Dock cover opening failed |
| 514108 | HATCH_CLOSE_FAILURE | Dock cover closing failed |
| 314015 | FAILED_TO_TRANSMIT_PRECISION_PHOTO_ROUTE | The Dock failed to transmit the AI Spot-Check wayline to the aircraft |
| 314013 | FLIGHT_MISSION_DOWNLOAD_FAILED | Flight mission download failed; the Dock could not obtain the wayline for this flight mission |
| 314010 | UNKNOWN_ROUTE_EXECUTION_FAILURE | Wayline execution failed for an unknown reason; restart the Dock and try again |
| 316020 | RTK_SIGNAL_SOURCE_ERROR | The RTK signal source used by the aircraft is incorrect; try again later |
| 316026 | EMERGENCY_STOP_BUTTON_PRESSED_CANNOT_EXECUTE | The Dock emergency stop button is pressed; the flight mission cannot be executed. Release the emergency stop button and try again |
| 514105 | BATTERY_STOP_CHARGING_FAILURE | Failed to stop charging the aircraft battery; restart the Dock and try again |
| 514104 | BATTERY_START_CHARGING_FAILURE | Failed to stop charging the aircraft battery; restart the Dock and try again |
| 514103 | BATTERY_BELOW_30_PERCENT_CANNOT_EXECUTE | Aircraft battery level is below 30% and the flight mission cannot be executed. Charge and try again (battery level ≥50% recommended) |
| 514136 | AIRPORT_POWER_DISCONNECTED | Dock power is disconnected; the Dock cannot execute the flight mission. Restore Dock power and try again |
| 514142 | CANNOT_ESTABLISH_WIRED_CONNECTION | Before takeoff, the Dock could not establish a wired connection with the aircraft. Check whether the aircraft is inside the dock, whether the push rods were stuck when closing, and whether the charging connector is dirty or damaged |
| 314019 | RTK_CANNOT_CONVERGE | RTK cannot converge |
| 326005 | ENHANCED_IMAGE_TRANSMISSION_FAILURE | Operation failed; enhanced image transmission could not establish a connection. Check the 4G signal strength, or contact your carrier to check your data plan and APN settings |
| 325003 | DEVICE_COMMAND_RESPONSE_ERROR | Device-side command response error; try again |
| 325004 | DEVICE_COMMAND_REQUEST_TIMEOUT | Device-side command request timed out; try again |
| 327013 | PARAMETER_SETTING_FAILURE | Parameter setting failed; try again later |
| 321257 | DRONE_MISSION_ALREADY_STARTING | Mission is in progress |
| 319003 | DRONE_TASK_PARAM_ERROR_OR_NOT_READY | The task parameters are incorrect, or the task has not yet entered the ready queue |
| 319016 | DRONE_AUTO_LAND_IN_PROGRESS | Aircraft is landing |
| 316010 | DRONE_AIRCRAFT_CONNECT_TIMEOUT | Timed out waiting for the aircraft to connect |
| 326005 | DRONE_LTE_CONFIGURATION_FAILED | LTE link configuration failed |
| 326006 | DRONE_NOT_SUPPORTED_FOR_LTE | The current aircraft model does not support LTE link configuration |
| 514158 | DRONE_RTK_CONFIG_FAILED | RTK configuration failed |
| 314007 | DRONE_WAYPOINT_UPLOAD_FAILED | Failed to upload the waypoint file |
| 316009 | DRONE_BATTERY_LOW_FOR_MISSION | Aircraft battery low |
| 316012 | DRONE_TAKEOFF_BLOCKED_BY_HMS | HMS takeoff conditions not met |
| 314008 | DRONE_TAKEOFF_TIMEOUT_FOR_MISSION | Takeoff execution timed out |
| 321523 | DRONE_TAKEOFF_FAILED | Takeoff failed |
| 321000 | DRONE_START_WAYPOINT_MISSION_FAILED | Failed to start the wayline |
| 386535 | DRONE_START_WAYPOINT_MISSION_TIMEOUT | Starting the wayline timed out |
| 316015 | DRONE_GPS_LOCATION_TOO_FAR_FROM_DOCK | GPS location too far from the Dock |
| 319999 | DRONE_MISSION_START_EXCEPTION | Takeoff mission exception |
| 600001 | UNKNOWN_ROUTE_EXECUTION_FAILURE | Drone pre-takeoff self-check failed; check the HMS information |
| 600002 | RTK_HAS_CONNECTED | RTK connected |
| 600003 | RTK_POSITION_ILLEGAL | RTK position illegal |
| 600004 | COORDINATE_SYSTEM_NOT_SUPPORT | Coordinate system not supported |
| 600005 | RTK_NO_NETWORK | RTK no network |
| 600006 | RTK_CUSTOM_NETWORK_SETTING_INVALID | RTK custom network settings invalid |
| 600007 | RTK_INCORRECT_REFERENCE_STATION_SOURCE | RTK reference station source incorrect |
| 600008 | FILE_TRANSFER_FAIL | File transfer failed |
| 600009 | SDR_CHANGE_FAIL | SDR switch failed |
| 600010 | UPLOAD_PRECICSE_MISSION_FAIL | Failed to upload the precise mission |
| 600011 | LOCK_MOTOR_RECOVERY_FAIL | Lock motor recovery failed |
| 600012 | LOCK_MOTOR_FAIL | Lock motor failed |
| 600013 | UPLOAD_CANCEL_BY_USER | Upload cancelled by the user |
| 600014 | MOTOR_STATE_ERROR | Motor state error |
| 600015 | PRECISE_FILE_MD5_CHECK_FAIL | Precise file MD5 check failed |
| 600016 | FILE_NOT_EXIST | File does not exist |
| 600017 | CANT_EXCUTE_IN_CURRENT_STATUS | Cannot execute in the current state |
| 600018 | PARSE_RETURN_PACK_FAILED | Failed to parse the return packet |
| 600019 | INVALID_PARAM | Invalid parameter |
| 600020 | SEND_PACK_TIMEOUT | Send packet timed out |
| 600021 | SEND_PACK_FAILED | Send packet failed |
| 600022 | SYSTEM_ERROR | System error |
| 600023 | WAYLINE_INFO_ERROR | Wayline information error |
| 600024 | NO_BREAK_INFO | No breakpoint information |
| 600025 | CMD_INVALID | Command invalid |
| 600026 | RADIUS_LIMIT | Radius limit |
| 600027 | CANNOT_START_AT_CURRENT_RC_MODE | Cannot start in the current RC mode |
| 600028 | HOME_POINT_NOT_RECORDED | Home point not recorded |
| 600029 | RTK_NOT_READY | RTK not ready |
| 600030 | DRONE_CRITICAL_ERROR | Drone critical error |
| 600031 | MISSION_INVALID_FILE_NAME | Mission file name invalid |
| 600032 | GENERATE_MISSION_FILE_FAILED | Failed to generate the mission file |
| 600033 | UPLOAD_FILE_FAILED | Failed to upload the file |
| 600034 | GPS_INVALID | GPS invalid |
| 600035 | MISSION_ID_NOT_EXIST | Mission ID does not exist |
| 600036 | OBSTACAL_STOP | Obstacle stop |
| 600037 | HEIGHT_LIMIT | Altitude limit |
| 600038 | LOW_LIMIT | Low limit |
| 600039 | LOWER_BATTERY | Low battery level |
| 600040 | WPMZ_FILE_LOAD_ERROR | WPMZ file load error |
| 600041 | CANNOT_STOP_WAYLINE_WHEN_WAYLINE_NOT_RUNNING | Cannot stop the wayline when it is not running |
| 600042 | CANNOT_BREAK_WAYLINE_IN_CUR_STATE | Cannot interrupt the wayline in the current state |
| 600043 | CANNOT_START_WAYLINE_WHEN_WAYLINE_RUNNING | Cannot start the wayline while it is running |
| 600044 | WAYPOINT_METHOD_NOT_SUPPORT | Waypoint method not supported |
| 600045 | TRAJ_INIT_FAIL | Trajectory initialization failed |
| 600046 | TRAJ_ON_GROUND_MOTOR_ON_CANNOT_GO | Trajectory is on the ground; motors cannot start |
| 600047 | TRAJ_INVALID_START_INDEX_OR_PROG | Trajectory start index or progress invalid |
| 600048 | TRAJ_INVALID_CSYS_MODE | Trajectory coordinate system mode invalid |
| 600049 | TRAJ_INVALID_HEIGHT_MODE | Trajectory altitude mode invalid |
| 600050 | TRAJ_INVALID_FLY_WP_MODE | Trajectory fly-waypoint mode invalid |
| 600051 | TRAJ_INVALID_YAW_MODE | Trajectory yaw mode invalid |
| 600052 | TRAJ_INVALID_TURN_DIR_MODE | Trajectory turn direction mode invalid |
| 600053 | TRAJ_INVALID_WP_TYPE | Trajectory waypoint type invalid |
| 600054 | TRAJ_FIR_LAS_WP_TYPE_ERROR | Trajectory first/last waypoint type error |
| 600055 | TRAJ_GLOB_VEL_OUT_OF_RANGE | Trajectory global velocity out of range |
| 600056 | TRAJ_WP_NUM_OUT_OF_RANGE | Trajectory waypoint count out of range |
| 600057 | TRAJ_LAT_LONG_OUT_OF_RANGE | Trajectory latitude/longitude out of range |
| 600058 | TRAJ_DAMP_DIS_OUT_OF_RANGE | Trajectory damping distance out of range |
| 600059 | TRAJ_WP_YAW_OUT_OF_RANGE | Trajectory waypoint yaw out of range |
| 600061 | DO_NOT_SUPPORT_LTE_IN_CURRENT_AREA | LTE not supported in the current area |
| 600062 | DO_NOT_SUPPORT_PUBLIC_LTE_IN_CURRENT_AREA | Public LTE not supported in the current area |
| 600063 | DO_NOT_SUPPORT_PRIVATE_LTE_IN_CURRENT_AREA | Private LTE not supported in the current area |
| 600064 | CAN_NOT_GET_SN | Cannot obtain SN |
| 600065 | DO_NOT_NEED_AUTHENTICATION_IN_CURRENT_AREA | Authentication not required in the current area |
| 600066 | CAN_NOT_ENABLE_LTE | Cannot enable LTE |
| 600067 | AUTHENTICATE_LTE_FAILED | LTE authentication failed |
| 600068 | DO_NOT_NEED_AUTHENTICATION_IN_PRIVATIZATION_SCENARIO | Authentication not required in private deployment scenarios |
| 600071 | NETWORK_ERR | Network error |
| 600072 | LIVE_STREAM_NOT_STARTED | Live stream not started |
| 600073 | LIVE_STREAM_ALREADY_STARTED | Live stream already started |
| 600074 | LIVE_STREAM_CHANNEL_CREATE_ERR | Live stream channel creation error |
| 600075 | LIVE_STREAM_START_ERR | Live stream start error |
| 600076 | LIVE_STREAM_IS_NOT_READY | Live stream not ready |
| 600077 | UNSUPPORT | Not supported |
| 600078 | ALREADY_POWERED_ON | The drone is already powered on; repeated power-on is not supported |
| 600079 | NO_ERROR | No error |
| 600080 | REQUEST_HANDLER_NOT_FOUND | Request handler not found |
| 600081 | REQUEST_NOT_SUPPORTED_BY_HANDLER | Request not supported by the handler |
| 600082 | REQUEST_TIMEOUT | Request timed out |
| 600083 | SEND_PACK_FAILURE | Send packet failed |
| 600084 | DISCONNECTED | Disconnected |
| 600087 | COMMAND_INTERRUPTED | Command interrupted |
| 600088 | PARAMETERS_GET_ERROR | Parameter get error |
| 600089 | PARAMETERS_SET_ERROR | Parameter set error |
| 600090 | INVALID_RESPOND | Invalid response |
| 600091 | PARAM_OUT_OF_RANGE | Parameter out of range |
| 600092 | INVALID_REQUEST_IN_CURRENT_STATE | Invalid request in the current state |
| 600093 | EXECUTION_FAILED | Execution failed |
| 600094 | NEED_REQUEST_AGAIN | Need to request again |
| 600095 | SYSTEM_BUSY | System busy |
| 600096 | OPERATION_CANCELLED | Operation cancelled |
| 600097 | WAIT_KEY_BIND_TIMEOUT | Timed out waiting for key binding |
| 600098 | KEY_MISS_EXECUTION_FUNCTION | Key execution function missing |
| 600099 | COMMAND_ACK | Command acknowledged |
| 600100 | EXEC_FAIL | Execution failed |
| 600101 | MODULE_BUSY | Module busy |
| 600102 | NO_RESOURCE | No resource |
| 600103 | FEATURE_NOT_SUPPORTED | Feature not supported |
| 600104 | FILE_TRANSFER_BUSY | File transfer busy |
| 600105 | NAVIGATION_IS_FORBIDDEN | Navigation is forbidden |
| 600106 | NAVIGATION_IS_OFF | Navigation is off |
| 600107 | INVALID_TASK_INFORMATION | Invalid task information |
| 600108 | TASK_UPLOAD_ERROR | Task upload error |
| 600109 | INVALID_REQUEST_PARAMETER | Invalid request parameter |
| 600110 | MAY_CROSS_RESTRICTED_AREA | May cross a restricted area |
| 600111 | EXCEEDED_INPUT_TIME_LIMIT | Exceeded input time limit |
| 600112 | EXECUTING_HIGHER_PRIORITY_TASK | A higher-priority task is being executed |
| 600113 | CANNOT_START_TASK_ON_WEAK_GPS | Cannot start the task with a weak GPS signal |
| 600114 | CANNOT_START_TASK_VLOTAGE_ALARM | Cannot start the task due to a voltage alarm |
| 600115 | OPERATION_NOT_MATCH | Operation does not match |
| 600116 | RETURN_DATA | Return data |
| 600117 | RESOURCE_OCCUPIED | Resource occupied |
| 600118 | FUNC_NOT_IMPLEMENT | Function not implemented |
| 600119 | USER_CANCELED | User cancelled |
| 600120 | RESOURCE_NOT_FOUND | Resource not found |
| 600121 | UNSUPPORTED_COMMAND | Unsupported command |
| 600122 | TIMEOUT | Timeout |
| 600123 | MEMORY_ALLOC | Memory allocation error |
| 600124 | INVALID_PARAMERTERS | Invalid parameters |
| 600125 | COMMAND_NOT_SUPPORT_NOW | Command not supported at the moment |
| 600126 | TIME_NOT_SYNC | Time not synchronized |
| 600127 | PARAMETER_SET_FAILED | Failed to set parameter |
| 600128 | PARAMETER_GET_FAILED | Failed to get parameter |
| 600129 | SD_CARD_NOT_INSERT | SD card not inserted |
| 600130 | SD_CARD_FULL | SD card full |
| 600131 | SD_CARD_ERROR | SD card error |
| 600132 | SENSOR_ERROR | Sensor error |
| 600133 | SYSTEM_HAS_ERROR | System has an error |
| 600134 | PARAMETER_TOTAL_TOO_LONG | Total parameter length too long |
| 600135 | MODULE_INACTIVATED | Module not activated |
| 600136 | USER_NOT_BIND | User not bound |
| 600137 | FIRMWARE_DATA_NUM_DISCONTINUOUS | Firmware data sequence number not continuous |
| 600138 | FIRMWARE_DATA_OVERLOAD_FLASH | Firmware data overloads flash |
| 600139 | FIRMWARE_VERIFICATION_ERROR | Firmware verification error |
| 600140 | FLASH_ERASE_ERROR | Flash erase error |
| 600141 | FLASH_WRITE_ERROR | Flash write error |
| 600142 | UPGRADE_STATUS_ERROR | Upgrade status error |
| 600143 | FIRMWARE_TYPE_NOT_MATCH | Firmware type mismatch |
| 600144 | WAITING_CLIENT_UPGRADE_STATUS | Waiting for client upgrade status |
| 600145 | REMOTE_CONTROLLER_DISCONNECTED | Remote controller disconnected |
| 600146 | MOTOR_ON | Motors on |
| 600147 | HARDWARE_ERROR | Hardware error |
| 600148 | INSUFFICIENT_ELECTRICITY | Insufficient battery |
| 600149 | AIRCRAFT_DISCONNECTED | Aircraft disconnected |
| 600150 | FLASH_IS_ERASING | Flash is erasing |
| 600151 | CANNOT_UPGRADE_IN_CUR_STATE | Cannot upgrade in the current state |
| 600152 | UNDEFINE_ERROR | Undefined error |
| 600153 | SET_HOME_LOCATION_FAIL_UNKNOWN | Failed to set home location for an unknown reason |
| 600154 | SET_HOME_LOCATION_INVALID_GPS_COORDINATE | Failed to set home location; GPS coordinates invalid |
| 600155 | SET_HOME_LOCATION_NOT_BE_RECORDED | Failed to set home location; not recorded |
| 600156 | SET_HOME_LOCAITON_GPS_NOT_READY | Failed to set home location; GPS not ready |
| 600157 | SET_HOME_LOCATION_DIS_TOO_FAR | Failed to set home location; distance too far |
| 600158 | DOWNLOAD_ABORT_BY_FIRMWARE | Download aborted by firmware |
| 600159 | DOWNLOAD_DATA_PARSING_FAILURE | Download data parsing failed |
| 600160 | PLAYBACK_START_STOP_FETCH_COMPLETED | Playback start/stop fetch completed |
| 600161 | PLAYBACK_FILE_LIST_RESET | Playback file list reset |
| 600162 | PLAYBACK_START_STOP_FETCH_BUSY | Playback start/stop fetch busy |
| 600163 | DOWNLOADED_EMPTY_DATA | Downloaded empty data |
| 600164 | MEDIA_TASK_CANCEL | Media task cancelled |
| 600165 | MEDIA_CANCEL_TASK_NOT_EXIST | Media cancel task does not exist |
| 600166 | MEDIA_TASK_SYNC_FAILURE | Media task sync failed |
| 600167 | FILE_LIST_NOT_EXIST | File list does not exist |
| 600168 | FILE_LIST_UPDATE_ERROR | File list update error |
| 600169 | FILE_LIST_INVOKE_RELOAD | File list invoked reload |
| 600170 | TRANSFER_NOT_EXIST | Transfer does not exist |
| 600171 | TRANSCODE_ERROR | Transcode error |
| 600172 | MEDIA_TASK_ABORT | Media task aborted |
| 600173 | DOWNLOAD_ABORT_BY_FIRMWARE_FORCE | Download forcibly aborted by firmware |
| 600174 | DOWNLOAD_ABORT_BY_FIRMWARE_FLASH_ERROR | Download aborted by firmware due to flash error |
| 600175 | DOWNLOAD_ABORT_BY_FIRMWARE_SESSION_REALLOC | Download aborted by firmware session reallocation |
| 600176 | DOWNLOAD_ABORT_BY_FIRMWARE_SESSION_ALLOC_ERROR | Download aborted by firmware session allocation error |
| 600177 | DOWNLOAD_ABORT_BY_FIRMWARE_UNKNOWN | Download aborted by firmware for an unknown reason |
| 600178 | TRANSCODE_UNSUPPORTED | Transcoding not supported |
| 600179 | PLAYBACK_MP4_DOWNLOAD_HEADER_FAILED | Playback MP4 header download failed |
| 600180 | PLAYBACK_MP4_HEADER_DATA_INVALID | Playback MP4 header data invalid |
| 600181 | PLAYBACK_MP4_DOWNLOAD_MOOV_FAILED | Playback MP4 MOOV download failed |
| 600182 | PLAYBACK_MP4_MOOV_DATA_INVALID | Playback MP4 MOOV data invalid |
| 600183 | CHANNEL_FRAME_PACK_OVER_SIZE | Channel frame packet over size |
| 600184 | CHANNEL_FRAME_SEQ_NUM_SET_NOT_MATCH | Channel frame sequence number set mismatch |
| 600185 | CHANNEL_FRAME_DUPLICATE_SEQ_NUM | Channel frame duplicate sequence number |
| 600186 | CHANNEL_CLEAR_CACHE | Channel cache cleared |
| 600187 | MCS_DATA_MODEL_ID_IS_EMPTY | MCS data model ID is empty |
| 600188 | MCS_DATA_MODEL_DOES_NOT_MEET_MERGER_REQUIREMENTS | MCS data model does not meet merge requirements |
| 600189 | MCS_DATA_MODEL_MERGE_FAILURE | MCS data model merge failed |
| 600190 | MISSION_WAYPOINT_NULL_MISSION | Waypoint mission is null |
| 600191 | MISSION_WAYPOINT_MAX_FLIGHT_SPEED_INVALID | Waypoint mission max flight speed invalid |
| 600192 | MISSION_WAYPOINT_REPEAT_TIMES_INVALID | Waypoint mission repeat times invalid |
| 600193 | MISSION_WAYPOINT_COUNT_INVALID | Waypoint mission count invalid |
| 600194 | MISSION_WAYPOINT_DISCONNECTED | Waypoint mission disconnected |
| 600195 | MISSION_WAYPOINT_DOWNLOAD_UNNECESSARY | Waypoint mission download unnecessary |
| 600196 | MISSION_WAYPOINT_ALREADY_STARTED | Waypoint mission already started |
| 600197 | MISSION_WAYPOINT_CANCELLED | Waypoint mission cancelled |
| 600198 | MISSION_WAYPOINT_FAILED | Waypoint mission failed |
| 600199 | MISSION_WAYPOINT_TIMEOUT | Waypoint mission timed out |
| 600200 | MISSION_WAYPOINT_MODE_ERROR | Waypoint mission mode error |
| 600201 | MISSION_WAYPOINT_GPS_NOT_READY | Waypoint mission GPS not ready |
| 600202 | MISSION_WAYPOINT_MOTORS_DID_NOT_START | Waypoint mission motors did not start |
| 600203 | MISSION_WAYPOINT_TAKE_OFF | Waypoint mission takeoff |
| 600204 | MISSION_WAYPOINT_IS_FLYING | Waypoint mission is flying |
| 600205 | MISSION_WAYPOINT_NOT_AUTO_MODE | Waypoint mission not in auto mode |
| 600206 | MISSION_WAYPOINT_MAX_NUMBER_OF_WAYPOINTS_UPLOAD_LIMIT_REACHED | Waypoint mission max waypoint upload limit reached |
| 600207 | MISSION_WAYPOINT_UPLOADING_WAYPOINT | Waypoint mission uploading waypoints |
| 600208 | MISSION_WAYPOINT_KEY_LEVEL_LOW | Waypoint mission key level low |
| 600209 | MISSION_WAYPOINT_NAVIGATION_MODE_DISABLED | Waypoint mission navigation mode disabled |
| 600210 | MISSION_IOC_TOO_CLOSE_TO_HOME_POINT | Mission IOC too close to the home point |
| 600211 | MISSION_IOC_TYPE_UNKNOWN | Mission IOC type unknown |
| 600212 | MISSION_HOTPOINT_VALUE_INVALID | Mission hotpoint value invalid |
| 600213 | MISSION_HOTPOINT_LOCATION_INVALID | Mission hotpoint location invalid |
| 600214 | MISSION_HOTPOINT_DIRECTION_UNKNOWN | Mission hotpoint direction unknown |
| 600215 | MISSION_HOTPOINT_MISSION_PAUSED | Mission hotpoint mission paused |
| 600216 | MISSION_HOTPOINT_MISSION_NOT_PAUSED | Mission hotpoint mission not paused |
| 600217 | MISSION_FOLLOW_ME_DISTANCE_TOO_LARGE | Mission Follow Me distance too large |
| 600218 | MISSION_FOLLOW_ME_DISCONNECT_TIME_TOO_LONG | Mission Follow Me disconnect time too long |
| 600219 | MISSION_FOLLOW_ME_GIMBAL_PITCH_ERROR | Mission Follow Me gimbal pitch error |
| 600220 | MISSION_WAYPOINT_ALTITUDE_TOO_HIGH | Waypoint mission altitude too high |
| 600221 | MISSION_WAYPOINT_ALTITUDE_TOO_LOW | Waypoint mission altitude too low |
| 600222 | MISSION_WAYPOINT_MISSION_RADIUS_INVALID | Waypoint mission radius invalid |
| 600223 | MISSION_WAYPOINT_MISSION_SPEED_TOO_HIGH | Waypoint mission speed too high |
| 600224 | MISSION_WAYPOINT_MISSION_ENTRY_POINT_INVALID | Waypoint mission entry point invalid |
| 600225 | MISSION_WAYPOINT_MISSION_HEADING_MODE_INVALID | Waypoint mission heading mode invalid |
| 600226 | MISSION_WAYPOINT_MISSION_RESUME_FAILED | Waypoint mission resume failed |
| 600227 | MISSION_WAYPOINT_MISSION_RADIUS_OVER_LIMIT | Waypoint mission radius over limit |
| 600228 | MISSION_WAYPOINT_NAVIGATION_MODE_NOT_SUPPORTED | Waypoint mission navigation mode not supported |
| 600229 | MISSION_WAYPOINT_DISTANCE_FROM_MISSION_TARGET_TOO_LONG | Waypoint mission distance from mission target too long |
| 600230 | MISSION_WAYPOINT_IN_NOVICE_MODE | Waypoint mission in novice mode |
| 600231 | MISSION_WAYPOINT_MULTI_MODE_IS_OFF | Waypoint mission multi-mode is off |
| 600232 | MISSION_WAYPOINT_RTK_IS_NOT_READY | Waypoint mission RTK not ready |
| 600233 | MISSION_WAYPOINT_RC_MODE_ERROR | Waypoint mission RC mode error |
| 600234 | MISSION_WAYPOINT_AIRCRAFT_IN_NO_FLY_ZONE | Waypoint mission aircraft in no-fly zone |
| 600235 | MISSION_WAYPOINT_IOC_WORKING | Waypoint mission IOC working |
| 600236 | MISSION_WAYPOINT_MISSION_NOT_INITIALIZED | Waypoint mission not initialized |
| 600237 | MISSION_WAYPOINT_MISSION_NOT_EXIST | Waypoint mission does not exist |
| 600238 | MISSION_WAYPOINT_MISSION_CONFLICT | Waypoint mission conflict |
| 600239 | MISSION_WAYPOINT_MISSION_ESTIMATE_TIME_TOO_LONG | Waypoint mission estimated time too long |
| 600240 | MISSION_WAYPOINT_HIGH_PRIORITY_MISSION_EXECUTING | Waypoint mission: high-priority mission executing |
| 600241 | MISSION_WAYPOINT_GPS_SIGNAL_WEAK | Waypoint mission GPS signal weak |
| 600242 | MISSION_WAYPOINT_LOW_BATTERY | Waypoint mission low battery |
| 600243 | MISSION_WAYPOINT_AIRCRAFT_NOT_IN_THE_AIR | Waypoint mission aircraft not in the air |
| 600244 | MISSION_WAYPOINT_MISSION_PARAMETERS_INVALID | Waypoint mission parameters invalid |
| 600245 | MISSION_WAYPOINT_MISSION_CONDITION_NOT_SATISFIED | Waypoint mission condition not satisfied |
| 600246 | MISSION_WAYPOINT_MISSION_ACROSS_NO_FLY_ZONE | Waypoint mission crosses no-fly zone |
| 600247 | MISSION_WAYPOINT_HOME_POINT_NOT_RECORDED | Waypoint mission home point not recorded |
| 600248 | MISSION_WAYPOINT_WAYPOINT_NOT_RUNNING | Waypoint mission not running |
| 600249 | MISSION_WAYPOINT_MISSION_INFO_INVALID | Waypoint mission info invalid |
| 600250 | MISSION_WAYPOINT_WAYPOINT_INFO_INVALID | Waypoint mission waypoint info invalid |
| 600251 | MISSION_WAYPOINT_WAYPOINT_TRACE_TOO_LONG | Waypoint mission waypoint trace too long |
| 600252 | MISSION_WAYPOINT_WAYPOINT_TOTAL_TRACE_TOO_LONG | Waypoint mission waypoint total trace too long |
| 600253 | MISSION_WAYPOINT_WAYPOINT_INDEX_OVER_RANGE | Waypoint mission waypoint index out of range |
| 600254 | MISSION_WAYPOINT_WAYPOINT_DISTANCE_TOO_CLOSE | Waypoint mission waypoint distance too close |
| 600255 | MISSION_WAYPOINT_WAYPOINT_DISTANCE_TOO_LONG | Waypoint mission waypoint distance too long |
| 600256 | MISSION_WAYPOINT_WAYPOINT_INVALID_CORNER_RADIUS | Waypoint mission waypoint invalid corner radius |
| 600257 | MISSION_WAYPOINT_WAYPOINT_ACTION_PARAMETER_INVALID | Waypoint mission waypoint action parameter invalid |
| 600258 | MISSION_WAYPOINT_WAYPOINT_MISSION_INFO_NOT_UPLOADED | Waypoint mission waypoint mission info not uploaded |
| 600259 | MISSION_WAYPOINT_WAYPOINT_UPLOAD_NOT_COMPLETE | Waypoint mission waypoint upload not complete |
| 600260 | MISSION_WAYPOINT_WAYPOINT_REQUEST_IS_RUNNING | Waypoint mission waypoint request is running |
| 600261 | MISSION_WAYPOINT_WAYPOINT_IDLE_VELOCITY_INVALID | Waypoint mission waypoint idle velocity invalid |
| 600262 | MISSION_WAYPOINT_AIRCRAFT_TAKING_OFF | Waypoint mission aircraft taking off |
| 600263 | MISSION_WAYPOINT_AIRCRAFT_LANDING | Waypoint mission aircraft landing |
| 600264 | MISSION_WAYPOINT_AIRCRAFT_GOING_HOME | Waypoint mission aircraft going home |
| 600265 | MISSION_WAYPOINT_AIRCRAFT_STARTING_MOTOR | Waypoint mission aircraft starting motor |
| 600266 | MISSION_WAYPOINT_WRONG_CMD | Waypoint mission wrong command |
| 600267 | MISSION_WAYPOINT_MISSION_ID_INVALID | Waypoint mission ID invalid |
| 600268 | MISSION_WAYPOINT_MISSION_GET_NODE_INFO_BY_INDEX_FAIL | Waypoint mission failed to get node info by index |
| 600269 | MISSION_WAYPOINT_MISSION_OTHER_SUB_OPENED | Waypoint mission other sub-mode already opened |
| 600270 | MISSION_WAYPOINT_MISSION_NO_SUCH_SUB_MODE | Waypoint mission no such sub-mode |
| 600271 | MISSION_WAYPOINT_MISSION_GROUND_STATION_MODE_OPEN_FAIL | Waypoint mission ground station mode open failed |
| 600272 | MISSION_WAYPOINT_MISSION_AIRCRAFT_INCLINATION_TOO_LARGE | Waypoint mission aircraft inclination too large |
| 600273 | PIPELINE_UNKNOWN | Pipeline unknown error |
| 600274 | PIPELINE_CRC_CHECK_FAILED | Pipeline CRC check failed |
| 600275 | PIPELINE_INVALID_PARAMETERS | Pipeline invalid parameters |
| 600276 | PIPELINE_NOT_ENOUGH_MEMORY | Pipeline not enough memory |
| 600277 | PIPELINE_NOT_READY | Pipeline not ready |
| 600278 | PIPELINE_SEND_FAILED | Pipeline send failed |
| 600279 | PIPELINE_RECEIVE_FAILED | Pipeline receive failed |
| 600280 | PIPELINE_TIMEOUT | Pipeline timeout |
| 600281 | PIPELINE_BUSY_OPERATION | Pipeline busy operation |
| 600282 | PIPELINE_UNACCEPTABLE_OPERATIONS | Pipeline unacceptable operations |
| 600283 | PIPELINE_CONNECTION_CLOSED | Pipeline connection closed |
| 600284 | PIPELINE_CONNECTION_CONNECTING | Pipeline connecting |
| 600285 | PIPELINE_RESOURCES_NOT_AVAILABLE | Pipeline resources not available |
| 600286 | PIPELINE_CONNECTION_CLOSING | Pipeline connection closing |
| 600287 | PIPELINE_NOT_CONNECTED | Pipeline not connected |
| 600288 | PIPELINE_LINK_BREAK | Pipeline link break |
| 600289 | PIPELINE_CONNECTION_REFUSED | Pipeline connection refused |
| 600290 | PIPELINE_ID_IS_OCCUPIED | Pipeline ID is occupied |
| 600291 | PIPELINE_INTERNAL_STATUS_ERROR | Pipeline internal status error |
| 600292 | FLY_SAFE_LOCAL_USER_TOKEN_INVALID | Flight safety: local user token invalid |
| 600293 | FLY_SAFE_NETWORK_INVALID | Flight safety: network invalid |
| 600294 | FLY_SAFE_SERVER_DATA_ERROR | Flight safety: server data error |
| 600295 | FLY_SAFE_SIGNATURE_ERROR | Flight safety: signature error |
| 600296 | FLY_SAFE_CHECK_SIGNATURE_ERROR | Flight safety: check signature error |
| 600297 | FLY_SAFE_INVALID_REQUEST | Flight safety: invalid request |
| 600298 | FLY_SAFE_PAGE_NOT_FOUND | Flight safety: page not found |
| 600299 | FLY_SAFE_USER_IS_NOT_LOGIN | Flight safety: user is not logged in |
| 600300 | FLY_SAFE_PACK_MANAGER_TIMEOUT | Flight safety: pack manager timeout |
| 600301 | FLY_SAFE_PACK_MANAGER_WRONG_UNLOCK_VERSION | Flight safety: pack manager wrong unlock version |
| 600302 | FLY_SAFE_PACK_MANAGER_WRONG_DEVICE_ID | Flight safety: pack manager wrong device ID |
| 600303 | FLY_SAFE_WRONG_SERIAL_NUMBER | Flight safety: wrong serial number |
| 600304 | FLY_SAFE_FILE_ERROR | Flight safety: file error |
| 600305 | FLY_SAFE_DB_INVALID_PARAMS | Flight safety: DB invalid params |
| 600306 | FLY_SAFE_DB_NOT_VALID | Flight safety: DB not valid |
| 600307 | FLY_SAFE_INVALID_AREA_IDS | Flight safety: invalid area IDs |
| 600308 | FLY_SAFE_FC_QUERY_FAILED | Flight safety: FC query failed |
| 600309 | FLY_SAFE_FC_OP_SET_ENABLE_FAILED | Flight safety: FC op set-enable failed |
| 600310 | FLY_SAFE_LICENSE_ENABLE_USER_ID_ERROR | Flight safety: license enable user ID error |
| 600311 | FLY_SAFE_LICENSE_NOT_EXIST | Flight safety: license does not exist |
| 600312 | FLY_SAFE_NO_LICENSE_DATA | Flight safety: no license data |
| 600313 | FLY_SAFE_LOW_FIRMWARE_VERSION_ERROR | Flight safety: firmware version too low |
| 600314 | FLY_SAFE_UNLOCK_VERSION_ERROR | Flight safety: unlock version error |
| 600315 | FLY_SAFE_OLD_LICENSE_DATA_ERROR | Flight safety: old license data error |
| 600316 | FLY_SAFE_INVALID_KEY_VERSION | Flight safety: invalid key version |
| 600317 | FLY_SAFE_NO_LICENSE_ID | Flight safety: no license ID |
| 600318 | FLY_SAFE_SERVER_INVALID_TOKEN | Flight safety: server invalid token |
| 600319 | FLY_SAFE_SERVER_UNIDENTIFIED_PHONE | Flight safety: server unidentified phone |
| 600320 | FLY_SAFE_SERVER_NOT_UNLOCKABLE_AREA | Flight safety: server not-unlockable area |
| 600321 | FLY_SAFE_SERVER_UNLOCK_TO_MANY_AREAS | Flight safety: server unlock too many areas |
| 600322 | FLY_SAFE_SERVER_TOO_MANY_LICENSES | Flight safety: server too many licenses |
| 600323 | FLY_SAFE_SERVER_JSON_DATA_PARSE_ERROR | Flight safety: server JSON data parse error |
| 600324 | FLY_SAFE_UNLOCK_AREA_ID_INVALID | Flight safety: unlock area ID invalid |
| 600325 | FLY_SAFE_UNLOCK_NOT_AUTHORIZATION_AREA | Flight safety: unlocking unauthorized area |
| 600326 | SDK_REGISTRATION_COULD_NOT_CONNECT_TO_INTERNET | SDK registration: could not connect to the internet |
| 600327 | SDK_REGISTRATION_INVALID_SDK_KEY | SDK registration: invalid SDK key |
| 600328 | SDK_REGISTRATION_HTTP_TIMEOUT | SDK registration: HTTP timeout |
| 600329 | SDK_REGISTRATION_DEVICE_DOES_NOT_MATCH | SDK registration: device does not match |
| 600330 | SDK_REGISTRATION_PACKAGE_ID_DOES_NOT_MATCH | SDK registration: package ID does not match |
| 600331 | SDK_REGISTRATION_SDK_KEY_PROHIBITED | SDK registration: SDK key prohibited |
| 600332 | SDK_REGISTRATION_MAX_REGISTRATION_COUNT_REACHED | SDK registration: max registration count reached |
| 600333 | SDK_REGISTRATION_SDK_KEY_INVALID_PLATFORM | SDK registration: SDK key invalid platform |
| 600334 | SDK_REGISTRATION_SDK_KEY_DOES_NOT_EXIST | SDK registration: SDK key does not exist |
| 600335 | SDK_REGISTRATION_SDK_KEY_LEVEL_NOT_PERMITTED | SDK registration: SDK key level not permitted |
| 600336 | SDK_REGISTRATION_SERVER_PARSE_FAILURE | SDK registration: server parse failure |
| 600337 | SDK_REGISTRATION_SERVER_WRITE_ERROR | SDK registration: server write error |
| 600338 | SDK_REGISTRATION_SERVER_DATA_ABNORMAL | SDK registration: server data abnormal |
| 600339 | SDK_REGISTRATION_INVALID_META_DATA | SDK registration: invalid metadata |
| 600340 | SDK_REGISTRATION_EMPTY_SDK_KEY | SDK registration: empty SDK key |
| 600341 | SDK_REGISTRATION_VERSION_NOT_ACCESSIBLE | SDK registration: version not accessible |
| 600342 | SDK_REGISTRATION_OVER_MAX_REGISTRATION_COUNT | SDK registration: over max registration count |
| 600343 | SDK_SERVICE_GIMBAL_ROTATE_PITCH_NOT_ALLOW | SDK service: gimbal rotate pitch not allowed |
| 600344 | SDK_SERVICE_GIMBAL_ROTATE_PITCH_OUT_OF_RANGE | SDK service: gimbal rotate pitch out of range |
| 600345 | SDK_SERVICE_GIMBAL_ROTATE_YAW_NOT_ALLOW | SDK service: gimbal rotate yaw not allowed |
| 600346 | SDK_SERVICE_GIMBAL_ROTATE_YAW_OUT_OF_RANGE | SDK service: gimbal rotate yaw out of range |
| 600347 | SDK_SERVICE_GIMBAL_ROTATE_ROLL_NOT_ALLOW | SDK service: gimbal rotate roll not allowed |
| 600348 | SDK_SERVICE_GIMBAL_ROTATE_ROLL_OUT_OF_RANGE | SDK service: gimbal rotate roll out of range |
| 600349 | SDK_SERVICE_GIMBAL_COMMAND_NOT_SUPPORTED_BY_CURRENT_ATTITUDE | SDK service: gimbal command not supported by the current attitude |
| 600350 | SDK_SERVICE_PAYLOAD_COMMAND_CAN_NOT_BE_EXECUTED_IN_CURRENT_MODE | SDK service: payload command cannot be executed in the current mode |
| 600351 | ACCOUNT_MANAGER_NETWORK_REQUEST_ERROR | Account manager: network request error |
| 600352 | ACCOUNT_MANAGER_AUTHROIZED_FAILED | Account manager: authorization failed |
| 600353 | ACCESS_LOCKER_FIRMWARE_WRITE | Access locker: firmware write error |
| 600354 | ACCESS_LOCKER_FIRMWARE_READ | Access locker: firmware read error |
| 600355 | ACCESS_LOCKER_SECURITYCODE_INCORRECT | Access locker: security code incorrect |
| 600356 | ACCESS_LOCKER_NOT_SETUP | Access locker: not set up |
| 600357 | ACCESS_LOCKER_ALREADY_UNLOCKED | Access locker: already unlocked |
| 600358 | ACCESS_LOCKER_SECURITYCODE_INCORRECT_FIVETIMES | Access locker: security code incorrect five times |
| 600359 | ACCESS_LOCKER_SECURITYCODE_INCORRECT_TWENTYTIMES | Access locker: security code incorrect twenty times |
| 600360 | ACCESS_LOCKER_USERNAME_NOT_EXIST | Access locker: username does not exist |
| 600361 | ACCESS_LOCKER_SECURITYCODE_FORMAT_INVALID | Access locker: security code format invalid |
| 600362 | ACCESS_LOCKER_INVALID_STATE | Access locker: invalid state |
| 600364 | RTK_CUSTOM_NETWORK_SERVER_START_FAIL | RTK custom network server start failed |
| 600365 | RTK_CUSTOM_NETWORK_LOGIN_FAIL | RTK custom network login failed |
| 600367 | RTK_NOT_SUPPORT_BY_CURRENT_CONTROLLER | RTK not supported by the current controller |
| 600368 | RTK_NOT_SUPPORT_BY_CONTROLLER_B | RTK not supported by Controller B |
| 600370 | RTK_RC_ENCRPT_FAIL | RTK remote controller encryption failed |
| 600371 | RTK_BASE_STATION_NEED_LOGIN | RTK base station requires login |
| 600372 | RTK_SERVER_NOT_REACHABLE | RTK server not reachable |
| 600373 | RTK_INVALID_REQUEST | RTK invalid request |
| 600374 | RTK_AUTENTICATION_FAILURE | RTK authentication failure |
| 600375 | RTK_ACCOUNT_NOT_LOGGED_IN_OR_EXPIRED | RTK account not logged in or expired |
| 600376 | RTK_ACCOUNT_UNACTIVATED | RTK account unactivated |
| 600377 | RTK_ACCOUNT_ERROR | RTK account error |
| 600378 | RTK_ALREADY_STARED | RTK already started |
| 600379 | RTK_INVALID_GPS_DATA | RTK invalid GPS data |
| 600380 | RTK_AUTH_ENC_NOT_LOGIN | RTK auth encryption not logged in |
| 600381 | RTK_DPS_NETWORK_SETTING_INVALID | RTK DPS network setting invalid |
| 600382 | RTK_BASE_STATION_PARAMETER_NUMBER_NOT_MATCH | RTK base station parameter number mismatch |
| 600383 | RTK_BASE_STATION_PARAMETER_LENGTH_NOT_MATCH | RTK base station parameter length mismatch |
| 600384 | RTK_BASE_STATION_PARAMETER_READ_ONLY | RTK base station parameter read-only |
| 600385 | RTK_BASE_STATION_PASSWORD_INVALID | RTK base station password invalid |
| 600386 | RTK_NETWORK_SET_COORDINATE_SYS_FAIL | RTK network failed to set coordinate system |
| 600387 | RTK_DPS_NETWORK_CONFIG_INVALID | RTK DPS network config invalid |
| 600388 | RTK_DPS_NETWORK_GET_TOKEN_FAILED | RTK DPS network failed to get token |
| 600389 | RTK_GET_ACCOUNT_INFO_FAILED | RTK failed to get account info |
| 600390 | RTK_GET_AUTH_ENC_FAILED | RTK failed to get auth encryption |
| 600391 | RTK_GET_AUTH_ENC_IS_NULL | RTK auth encryption is null |
| 600392 | RTK_SOURCE_AUTH_NOT_MATHED | RTK source authorization mismatch |
| 600393 | RTK_REQUEST_ACCESS_ERROR | RTK request access error |
| 600394 | RTK_RESPONSE_PARSE_ERROR | RTK response parse error |
| 600395 | ACCESS_LOCKER_USER_NAME_FORMAT_INVALID | Access locker: username format invalid |
| 600396 | ACCESS_LOCKER_V1_BUSY | Access locker V1: busy |
| 600397 | ACCESS_LOCKER_V1_VERSION_ERR | Access locker V1: version error |
| 600398 | ACCESS_LOCKER_V1_PW_SET_FAILED | Access locker V1: password set failed |
| 600399 | ACCESS_LOCKER_V1_PW_VERIFY_FAILED | Access locker V1: password verify failed |
| 600400 | ACCESS_LOCKER_V1_NEW_PW_REPEAT | Access locker V1: new password repeated |
| 600401 | ACCESS_LOCKER_V1_CONTROL_NOT_SUPPORT | Access locker V1: control not supported |
| 600402 | ACCESS_LOCKER_V1_CONTROL_FAILED | Access locker V1: control failed |
| 600403 | ACCESS_LOCKER_V1_RESET_FAILED | Access locker V1: reset failed |
| 600404 | ACCESS_LOCKER_V1_RET_KEY_EXC_FAILED | Access locker V1: key exchange failed |
| 600405 | ACCESS_LOCKER_V1_RET_KEY_EXC_NEEDED | Access locker V1: key exchange needed |
| 600406 | FIRMWARE_LIVE_STREAMING_WIFI_CONNECT_PWD_ERROR | Firmware live streaming: Wi-Fi connection password error |
| 600407 | FIRMWARE_LIVE_STREAMING_WIFI_CONNECT_FAILED | Firmware live streaming: Wi-Fi connection failed |
| 600408 | FIRMWARE_LIVE_STREAMING_RTMP_IPC_FAILED | Firmware live streaming: RTMP IPC failed |
| 600409 | FIRMWARE_LIVE_STREAMING_RTMP_CONNECT_FAILED | Firmware live streaming: RTMP connection failed |
| 600410 | FIRMWARE_LIVE_STREAMING_RTMP_VERIFY_FAILED | Firmware live streaming: RTMP verification failed |
| 600411 | REMOTECONTROLLER_AUTHORITY_OWNER_OFFLINE | Remote controller authority: owner offline |
| 600412 | REMOTECONTROLLER_AUTHORITY_DEVICE_OFFLINE | Remote controller authority: device offline |
| 600413 | REMOTECONTROLLER_AUTHORITY_IS_OWNER | Remote controller authority: is owner |
| 600414 | REMOTECONTROLLER_AUTHORITY_DEVICE_LOCKED | Remote controller authority: device locked |
| 600415 | REMOTECONTROLLER_AUTHORITY_AUTH_OTHER | Remote controller authority: authorized to other |
| 600416 | REMOTECONTROLLER_AUTHORITY_ALREADY_LOCK | Remote controller authority: already locked |
| 600417 | REMOTECONTROLLER_AUTHORITY_NO_AUTHORITY | Remote controller authority: no authority |
| 600418 | REMOTECONTROLLER_NOT_NEED_CHANGE | Remote controller: no change needed |
| 600419 | REMOTECONTROLLER_USER_OVER_LIMITS | Remote controller: user over limits |
| 600420 | REMOTECONTROLLER_USER_NAME_EXIST | Remote controller: username exists |
| 600421 | REMOTECONTROLLER_USER_LESS_LIMITS | Remote controller: user less than limits |
| 600422 | REMOTECONTROLLER_USER_NAME_NOT_EXIST | Remote controller: username does not exist |
| 600423 | REMOTECONTROLLER_NOT_NEED_CHANGE_INDEX | Remote controller: no change index needed |
| 600424 | REMOTECONTROLLER_DATA_ERROR | Remote controller: data error |
| 600425 | REMOTECONTROLLER_NOT_DATA | Remote controller: no data |
| 600426 | REMOTECONTROLLER_CONFIG_COUNT_OVERFLOW | Remote controller: config count overflow |
| 600427 | AIRLINK_MULTI_SOURCE_SOURCE_ID_INVALID | AirLink multi-source: source ID invalid |
| 600428 | AIRLINK_MULTI_SOURCE_REACH_MA_MAX_LIMIT | AirLink multi-source: reached MA max limit |
| 600429 | AIRLINK_MULTI_SOURCE_V1_SOURCE_NOT_FOUND | AirLink multi-source V1: source not found |
| 600430 | AIRLINK_MULTI_SOURCE_CHANNEL_NOT_ALIVE | AirLink multi-source: channel not alive |
| 600431 | AIRLINK_LTE_LINK_SWITCH_TIME_OUT | AirLink LTE link switch: timeout |
| 600432 | AIRLINK_LTE_LINK_SWITCH_HARDWARE_UNPREPARED | AirLink LTE link switch: hardware unprepared |
| 600433 | AIRLINK_LTE_LINK_SWITCH_LINK_AGENT_UNPREPARED | AirLink LTE link switch: link agent unprepared |
| 600434 | AIRLINK_LTE_LINK_SWITCH_ROUTE_FAILED | AirLink LTE link switch: route failed |
| 600435 | AIRLINK_LTE_LINK_SWITCH_AGAIN | AirLink LTE link switch: switch again |
| 600436 | AIRLINK_LTE_LINK_SWITCH_REPEAT_REQUEST | AirLink LTE link switch: repeat request |
| 600437 | AIRLINK_LTE_LINK_SWITCH_NO_DEVICE | AirLink LTE link switch: no device |
| 600438 | AIRLINK_LTE_LINK_SWITCH_INTERNAL_ERROR | AirLink LTE link switch: internal error |
| 600439 | AIRLINK_LTE_LINK_SWITCH_PARAMETER | AirLink LTE link switch: parameter error |
| 600440 | AIRLINK_LTE_LINK_SWITCH_NEGOTIATION | AirLink LTE link switch: negotiation failed |
| 600441 | AIRLINK_LTE_LINK_SWITCH_NO_TARGET_DEVICE | AirLink LTE link switch: no target device |
| 600442 | GRAVITY_CENTER_CALIBRATION_NOT_FLYING | Center-of-gravity calibration: not in flight |
| 600443 | GRAVITY_CENTER_CALIBRATION_NOT_FLYING_NOT_WORK_IN_SIMULATOR | Center-of-gravity calibration: not in flight, does not work in the simulator |
| 600444 | GRAVITY_CENTER_CALIBRATION_IS_RUNNING | Center-of-gravity calibration: is running |
| 600445 | GRAVITY_CENTER_CALIBRATION_NOT_HOVERING | Center-of-gravity calibration: not hovering |
| 600446 | CONTROL_AUTH_DEVICE_NOT_ALLOW | Control authority: device not allowed |
| 600447 | CONTROL_AUTH_ENGINE_STARTING | Control authority: engine starting |
| 600448 | CONTROL_AUTH_TAKING_OFF | Control authority: taking off |
| 600449 | CONTROL_AUTH_LANDING | Control authority: landing |
| 600450 | CONTROL_AUTH_RC_NOT_P_MODE | Control authority: RC not in P mode |
| 600451 | CONTROL_AUTH_HAS_NO_CONTROL_AUTH | Control authority: has no control authority |
| 600452 | CONTROL_AUTH_IN_RC_LOST_ACTION | Control authority: in RC lost action |
| 600453 | CARE_SIGNATURE_ERROR | Care: signature error |
| 600454 | CARE_INVALID_DATA | Care: invalid data |
| 600455 | CARE_INVALID_TOKEN | Care: invalid token |
| 600456 | CARE_DEVICE_NOT_IN_SYSTEM | Care: device not in system |
| 600457 | CARE_DUPLICATE_BIND | Care: duplicate bind |
| 600458 | CARE_ALREADY_VERIFY_LOST | Care: already verified loss |
| 600459 | CARE_RC_WITH_UPPER_LIMIT_DRONE | Care: RC with upper-limit drone |
| 600460 | CARE_ALREADY_BIND_OTHER_ACCOUNT | Care: already bound to another account |
| 600461 | CARE_NO_CARE_SERVICE | Care: no Care service |
| 600462 | CARE_ALREADY_COMMIT_LOSS | Care: loss already committed |
| 600463 | CARE_NOT_BIND_RC | Care: RC not bound |
| 600464 | CARE_WRONG_STATE | Care: wrong state |
| 600465 | CARE_NETWORK_ERROR | Care: network error |
| 600466 | CARE_SERVICE_ERROR | Care: service error |
| 600467 | CARE_NOT_COMMIT_LOSS | Care: loss not committed |
| 600468 | CARE_FIRMWARE_TIMEOUT | Care firmware: timeout |
| 600469 | CARE_FIRMWARE_INVALID_PARAM | Care firmware: invalid param |
| 600470 | CARE_FIRMWARE_WRONG_STATE | Care firmware: wrong state |
| 600471 | CARE_FIRMWARE_IN_BLACKLIST | Care firmware: in blacklist |
| 600472 | CARE_FIRMWARE_NO_CARE | Care firmware: no Care |
| 600473 | CARE_FIRMWARE_ACCOUNT_VERIFY_FAIL | Care firmware: account verify failed |
| 600474 | CARE_FIRMWARE_SERVCE_MAC_VERIFY_FAIL | Care firmware: service MAC verify failed |
| 600475 | CARE_FIRMWARE_NONCE_VERIFY_FAIL | Care firmware: nonce verify failed |
| 600476 | CARE_FIRMWARE_DRONE_MAC_VERIFY_FAIL | Care firmware: drone MAC verify failed |
| 600477 | CARE_FIRMWARE_DRONE_SN_VERIFY_FAIL | Care firmware: drone SN verify failed |
| 600478 | CARE_FIRMWARE_RC_SN_VERIFY_FAIL | Care firmware: RC SN verify failed |
| 600479 | CARE_FIRMWARE_RC_CHIP_ID_VERIFY_FAIL | Care firmware: RC chip ID verify failed |
| 600480 | CARE_FIRMWARE_DRONE_UPDATE_STATE_FAIL | Care firmware: drone update state failed |
| 600481 | CARE_INVALID_DRONE_SN | Care: invalid drone SN |
| 600482 | CARE_DUPLICATE_LOSS_VERIFY | Care: duplicate loss verify |
| 600483 | SERVICE_UNKNOWN_ERR | Service: unknown error |
| 600484 | SERVICE_INVALID_PARAM | Service: invalid param |
| 600485 | SERVICE_DB_ERR | Service: DB error |
| 600486 | SERVICE_DEVICE_USER_TOKEN_NOT_MATCH | Service: device user token mismatch |
| 600487 | SERVICE_DEVICE_NOT_BIND | Service: device not bound |
| 600488 | SERVICE_DEVICE_ALREADY_BIND | Service: device already bound |
| 600489 | SERVICE_DEVICE_INVALID_SN | Service: device invalid SN |
| 600490 | SERVICE_DEVICE_INVALID_ACTIVATE_TIME | Service: device invalid activation time |
| 600491 | SERVICE_NETWORK_ERROR | Service: network error |
| 600492 | SERVICE_CSDK_EMPTY_GIMBAL_SN | Service CSDK: empty gimbal SN |
| 600493 | SERVICE_CSDK_EMPTY_USER_TOKEN | Service CSDK: empty user token |
| 600494 | CARE_FIRMWARE_DEVICE_ALREADY_BIND | Care firmware: device already bound |
| 600495 | CLOUD_MEDIA_UPLOAD_CONFIG_INVALID | Cloud media upload config invalid |
| 600496 | CLOUD_UPLOAD_REQUEST_INVALID | Cloud upload request invalid |
| 600497 | CLOUD_GET_TOKEN_FAILED | Cloud failed to get token |
| 600498 | CLOUD_UPLOAD_FAILED | Cloud upload failed |
| 600499 | CLOUD_CALLBACK_FAILED | Cloud callback failed |
| 600500 | CLOUD_DOWNLOAD_FAILED | Cloud download failed |
| 600501 | CLOUD_UPLOAD_STATE_SYNC_FAILED | Cloud upload state sync failed |
| 600502 | CLOUD_SET_FOLDER_NAME_FAILED | Cloud failed to set folder name |
| 600503 | CLOUD_UPLOAD_FAILED_ACCESS | Cloud upload access failed |
| 600504 | WP3_NO_THIS_MISSION | WP3: no such mission |
| 600505 | WP3_NO_THIS_BREAK_POINT | WP3: no such breakpoint |
| 600506 | WP3_QUERY_EXCUTION_STATUS_INVALID | WP3: query execution status invalid |
| 600507 | DEACTIVATE_Server_NETWORK_ERR | Deactivation server: network error |
| 600508 | DEACTIVATE_Server_USERNAME_PASSWORD_ERR | Deactivation server: username/password error |
| 600509 | DEACTIVATE_Server_AUTH_DATA_FAILED | Deactivation server: auth data failed |
| 600510 | DEACTIVATE_Server_AUTHED_DATA_DOWNLOAD_ERR | Deactivation server: authed data download error |
| 600511 | DEACTIVATE_Server_AUTHED_DATA_MD5_ERR | Deactivation server: authed data MD5 error |
| 600512 | DEACTIVATE_DEVICE_GET_DATA_ERR | Deactivation device: get data error |
| 600513 | DEACTIVATE_DEVICE_SET_DATA_ERR | Deactivation device: set data error |
| 600514 | DEACTIVATE_Server_PERLOGIN_ERR | Deactivation server: pre-login error |
| 600515 | UOM_REALNAME_NETWORK_ERROR | UOM real-name: network error |
| 600516 | UOM_REALNAME_UOM_ERROR | UOM real-name: UOM error |
| 600517 | UOM_REALNAME_VALIDATION_FAILURE | UOM real-name: validation failure |
| 600518 | UOM_REALNAME_NOT_ACTIVE_YET | UOM real-name: not active yet |
| 600519 | UOM_REALNAME_NO_REALNAME_CHECK_NEEDED | UOM real-name: no real-name check needed |
| 600520 | UOM_REALNAME_UNLOCKED | UOM real-name: unlocked |
| 600521 | UOM_REALNAME_DONT_IN_CHINA_MAINLAND | UOM real-name: not in mainland China |
| 600522 | UOM_REALNAME_UNKNOWN | UOM real-name: unknown |
| 600523 | UOM_REALNAME_SUBCMD_MISMATCH | UOM real-name: subcommand mismatch |
| 600524 | UOM_REALNAME_NEED_DRONE_PARAM | UOM real-name: needs drone parameter |
| 600525 | UOM_REALNAME_UNSUPPORTED | UOM real-name: unsupported |
| 600526 | PLACEHOLDER | Placeholder |
| 600527 | UNKNOWN | Unknown error |
| 600528 | USER_CANCELS_ROUTE_TASK | User cancelled the wayline task |
| 610001 | REMOTE_CONTROLLER_BATTERY_BELOW_50_PERCENT | Remote controller battery below 50% |
| 610002 | PUSH_ROD_STATUS_NOT_OPEN | Push rod is not open |
| 610003 | HATCH_STATUS_NOT_OPEN | Dock cover is not open |
| 610004 | REMOTE_CONTROLLER_START_FAILURE | Remote controller power-on failed |
| 610005 | RTK_CONFIGURATION_ERROR | RTK configuration error |
| 610006 | GIMBAL_SELF_ROTATION_ERROR | Gimbal self-rotation error |
| 610007 | PRE_FLIGHT_HMS_ERROR | Pre-takeoff HMS error |
| 610008 | SIMULATED_FLIGHT_SETTING_FAILURE | Simulated flight setting failed |
| 610009 | GET_STORAGE_CONFIG_TIMES_FAILURE | Failed to get storage_config_times |
| 610010 | GET_PHOTO_DOWNLOAD_LIST_FAILURE | Failed to get the photo download list |
| 610011 | DRONE_BATTERY_SELF_HEATING_FAILURE | Drone battery self-heating failed |
| 610012 | NO_FREQUENCY_PAIRING | No frequency pairing |
| 610013 | NOT_IN_HANGAR | Not inside the dock |
| 610014 | JUMP_AIRPORT_PREPARATION_FAILURE | Leapfrog dock preparation failed |
| 610015 | FLIGHTTASK_RESOURCE_GET_FAILURE | Failed to obtain mission resources |
| 615001 | DOCK_NOT_IDLE | The Dock is not idle |
| 615002 | DOCK_STATUS_CHECK_FAILED | Dock status check failed |
| 615003 | MISSION_START_FAILED | Mission start failed |
| 615004 | MISSION_START_TIMEOUT | Mission start timed out |
| 615005 | MISSION_EXECUTION_FAILED | Mission execution failed |
| 615006 | MISSION_TIMEOUT | Mission execution timed out |
| 615007 | DRONE_NOT_TAKEOFF | The drone has not taken off |
| 615008 | LANDING_TIMEOUT | Landing timed out |
| 615009 | LANDING_FAILED | Landing failed |
| 615010 | DATA_RETRIEVAL_FAILED | Data retrieval failed |
| 615011 | REDIS_CONNECTION_FAILED | Redis connection failed |
| 615012 | HTTP_REQUEST_FAILED | HTTP request failed |
| 615013 | HTTP_TIMEOUT | HTTP request timed out |
| 615014 | MISSION_CANCELED | Mission cancelled |
| 620002 | COMMON_ERROR | Common error |
| 620003 | CMD_NOT_SEND | Firmware did not execute |
| 620004 | STOP_BUTTON_PRESSED | Emergency stop button pressed |
| 620005 | NOT_SUPPORT | This function is not supported |
| 620006 | DOCK_IS_BUSY | The Dock is executing a task |
| 621001 | CHECK_ERROR | Motor check error |
| 621002 | PARAM_ERROR | Parameter error |
| 621014 | MOTOR_CALIB_TIMEOUT | Motor homing timed out |
| 621015 | MOTOR_CALIB_FAILED | Motor homing failed |
| 621017 | MOTOR_MOVE_TIMEOUT | Motor operation timed out |
| 621018 | MOTOR_MOVE_STALL | Motor stalled during operation |
| 621021 | MOTOR_IS_RUNNING | Motor is running |
| 621022 | MOTOR_NOT_CALIB | Motor not calibrated |
| 621023 | MOTOR_POS_NOT_ALLOWED | Operation not allowed at the current motor position |
| 621019 | SERVO_MOVE_TIMEOUT | Servo operation timed out |
| 621020 | SERVO_MOVE_FAILED | Servo operation failed |
| 621024 | MOTOR_XY_FREE_FAILED | Push rod release failed |
| 621025 | MOTOR_XY_FIX_FAILED | Push rod clamping failed |
| 621026 | MOTOR_DOOR_OPEN_FAILED | Dock door opening failed |
| 621027 | MOTOR_DOOR_CLOSE_FAILED | Dock door closing failed |
| 621028 | MOTOR_RUNNING_CHECK_FAILED | Sensor anomaly detected while the motor was running |
| 622024 | RC_ON_FAILED | Remote controller power-on failed |
| 622025 | RC_ON_TIMEOUT | Remote controller power-on timed out |
| 622029 | RC_ON_FAILED_LED_NOT_ON | Remote controller power-on failed; LED did not light up |
| 622030 | RC_ON_FAILED_SWITCHING | Remote controller power-on failed; switching in progress |
| 622026 | RC_OFF_FAILED_DRONE_NOT_LAND | Remote controller power-off failed; the aircraft has not landed |
| 622027 | RC_OFF_TIMEOUT | Remote controller power-off timed out |
| 622028 | RC_OFF_FAILED | Remote controller power-off failed |
| 622031 | RC_OFF_FAILED_LED_NOT_OFF | Remote controller power-off failed; LED did not turn off |
| 622032 | RC_OFF_FAILED_SWITCHING | Remote controller power-off failed; switching in progress |
| 622033 | RC_COLOR_SENSOR_COMM_ERROR | Remote controller color sensor communication error |
| 622034 | RC_ON_FAILED_NOT_ADB | Remote controller power-on failed; unable to establish a USB connection with the remote controller |
| 622035 | RC_ON_FAILED_NOT_START_APP | Remote controller power-on failed; unable to launch the app |
| 622036 | RC_ON_FAILED_NOT_CONNECT_TO_DOCK_NETWORK | Remote controller power-on failed; unable to connect to the Dock network |
| 626012 | RC_REBOOT_FAILED | Aircraft and remote controller restart failed |
| 623033 | CHARGER_OUTPUT_TIMEOUT | Charger output timed out |
| 623034 | CHARGER_STOP_TIMEOUT | Charger output-stop timed out |
| 623035 | CHARGER_XY_NOT_FIX | Charger XY not fixed |
| 623036 | CHARGER_ON_DRONE_NO_VOLTAGE | No voltage when powering on the aircraft |
| 623037 | CHARGER_OFF_FAIL_STILL_VOLTAGE | Charger shutdown failed; voltage still present |
| 623038 | CHARGER_GET_DRONE_VOLTAGE_FAIL | Charger failed to obtain the aircraft voltage |
| 623039 | CHARGER_PAIR_RC_START_FAIL | Frequency pairing failed; the remote controller could not enter pairing mode |
| 623040 | CHARGER_PAIR_RC_STOP_FAIL | Frequency pairing failed; the remote controller could not exit pairing mode |
| 623041 | CHARGER_PAIR_DRONE_ENTER_PAIR_FAIL | Frequency pairing failed; the aircraft failed to enter pairing mode |
| 623042 | CHARGER_AUTO_WORKFLOW_FAIL | Charger automatic charging workflow failed |
| 623043 | CHARGER_ON_DRONE_AND_REMOTE_FAIL | Failed to power on the aircraft and remote controller |
| 623044 | CHARGER_ON_COMMON_ERROR | Charging start error |
| 623045 | CHARGER_OFF_COMMON_ERROR | Charging stop error |
| 623046 | CHARGER_PAIR_RC_NOT_ON | Frequency pairing failed; the remote controller is not powered on |
| 623047 | CHARGER_PAIR_DEPOT_NOT_FIX | Frequency pairing failed; the aircraft push rod is not secured |
| 623048 | CHARGER_PAIR_DRONE_NOT_ON | Frequency pairing failed; the aircraft is not powered on |
| 623049 | CHARGER_PAIR_DRONE_NOT_PAIR_MODE | Frequency pairing failed; the aircraft could not enter pairing mode |
| 623050 | CHARGER_ON_DRONE_NO_CURRENT | No current when powering on the aircraft; the battery may not be connected |
| 623051 | CHARGER_INPUT_VOLTAGE_NOT_MATCH | Charger input voltage mismatch |
| 623052 | CHARGER_ON_PRESET_FAIL | Charger preset parameter failed |
| 623053 | CHARGER_OFF_FAIL_STILL_CURRENT | Charger shutdown failed; current still present |
| 623054 | CHARGER_TETHERED_BATTERY_COMM_ERROR | Tethered battery communication failed |
| 623055 | CHARGER_CONTROL_FAIL_NEED_CLOSE_DOOR | Charging control failed; the dock door must be closed |
| 624001 | SWAP_DOOR_NOT_CLOSE | The dock door must be closed before a battery swap |
| 624002 | SWAP_CHARGER_NOT_READY | Charging compartment not ready |
| 624003 | SWAP_DRONE_ONLINE_TIMEOUT | Battery-swap aircraft online timed out |
| 624004 | SWAP_OFF_DRONE_NOT_ONLINE | Battery-swap aircraft is not online |
| 624005 | SWAP_NO_EMPTY_HOUSE | No empty slot in the battery-swap compartment |
| 624006 | SWAP_PAIR_RC_NOT_ON | Battery-swap frequency pairing failed; the remote controller is not powered on |
| 624007 | SWAP_PAIR_RC_START_FAIL | Battery-swap frequency pairing failed; the remote controller could not enter pairing mode |
| 624008 | SWAP_PAIR_RC_STOP_FAIL | Battery-swap frequency pairing failed; the remote controller could not exit pairing mode |
| 624009 | SWAP_PAIR_DRONE_ENTER_PAIR_FAIL | Battery-swap frequency pairing failed; the aircraft failed to enter pairing mode |
| 624010 | SWAP_DEPOT_BUSY | Battery-swap compartment busy |
| 624011 | SWAP_CHARGER_NOT_CONNECT | Charging compartment not connected |
| 625001 | MISSION_GPS_UPDATE_TIMEOUT | GPS data update timed out |
| 625002 | MISSION_GPS_SOLUTION_STATUS_ERROR | GPS solution status error |
| 625003 | MISSION_GPS_POSITION_TYPE_ERROR | GPS position type error |
| 625004 | MISSION_GPS_SVS_NOT_ENOUGH | Insufficient GPS satellites |
| 625005 | MISSION_GPS_DISTANCE_TOO_FAR | GPS position deviation too large |
| 625006 | MISSION_WEATHER_WIND_TOO_STRONG | Wind speed too high |
| 625007 | MISSION_WEATHER_RAIN_TOO_HEAVY | Rainfall too heavy |
| 625008 | MISSION_UPS_OUTPUT_STATUS_ERROR | UPS output status error |
| 625009 | MISSION_UPS_STATUS_ERROR | UPS status error |
| 625010 | MISSION_BAKLAND_DISTANCE_TOO_FAR | Alternate landing point too far |
| 625011 | MISSION_BAKLAND_HEIGHT_TOO_HIGH | Alternate landing point altitude too high |
| 625012 | MISSION_FILE_DOWNLOAD_FAILED | Wayline file download failed |
| 625013 | MISSION_FILE_MD5_MISMATCH | Wayline file MD5 check failed |
| 625014 | MISSION_WAYPOINT_CHECK_FAILED | Wayline check failed |
| 625015 | MISSION_NTRIP_CONNECT_FAILED | NTRIP connection failed |
| 625016 | MISSION_NTRIP_AUTH_FAILED | NTRIP authentication failed |
| 625017 | MISSION_NTRIP_NO_RTCM_DATA | NTRIP did not receive RTCM data |
| 625018 | MISSION_DRONE_START_FAILED | Aircraft mission start failed |
| 626007 | CHARGER_VOLTAGE_ABNORMAL | Charger voltage abnormal |
| 626008 | CHARGER_CURRENT_ABNORMAL | Charger current abnormal |
| 627001 | DRONE_READY_TIMEOUT | Timed out waiting for the aircraft to be ready |
| 627002 | DRONE_TAKEOFF_TIMEOUT | Timed out waiting for takeoff |
| 627003 | DRONE_LANDING_TIMEOUT | Timed out waiting for landing |
| 627004 | DRONE_LANDING_PRECISION_FAILED | Landing precision not met |
| 627005 | DRONE_LOW_BATTERY | Aircraft battery too low |
| 627006 | DRONE_HTTP_TIMEOUT | Aircraft response timed out |
| 627007 | DRONE_HTTP_ERROR | Aircraft response error |
| 627008 | DRONE_DOWNLOAD_TIMEOUT | Aircraft data download timed out |
| 627009 | DRONE_DOWNLOAD_STOPPED | Aircraft data download stopped |
| 627010 | DRONE_DOWNLOAD_FAILED | Aircraft data download failed |
| 627011 | DRONE_GO_HOME_HEIGHT_CONFIG_FAILED | Failed to set the return-to-home altitude |
| 627012 | DRONE_BATTERY_RESERVE_HOME_CONFIG_FAILED | Failed to set the return-to-home battery level |
| 627013 | DRONE_REMOTE_CONTROLLER_BATTERY_LOW | Remote controller battery low |
| 627014 | MISSION_TAKEOFF_READY_TIMEOUT | Timed out waiting for takeoff confirmation |
| 627015 | MISSION_CLOSE_READY_TIMEOUT | Timed out waiting for retraction confirmation |
| 627016 | MISSION_POWEROFF_READY_TIMEOUT | Timed out waiting for power-off confirmation |
| 627017 | PSDK_DOWNLOAD_FAILED | PSDK download failed |
| 627018 | PSDK_COMMUNICATION_TIMEOUT | Timed out waiting for PSDK communication |
| 627099 | DRONE_INVALID_REQUEST_BODY | Request parameter JSON format error |
| 627099 | DRONE_PARAM_MISSING_FILE_OR_TARGET | Request parameters do not contain the file or target field |
| 627099 | DRONE_SIMULATOR_ENTER_FAILED | Failed to enter the simulator |
| 627099 | DRONE_SIMULATOR_MODE_ACTIVE | Simulator mode is active |
| 627099 | DRONE_PARAM_INVALID_LET_LINK_TYPE | LTE link type parameter error |
| 627099 | DRONE_ALTERNATE_LAND_POINT_CONFIG_FAILED | Failed to set the alternate landing point |
| 627099 | DRONE_WAYPOINT_DOWNLOAD_FAILED | Failed to download the waypoint file |
| 627099 | DRONE_INNER_ERROR | Aircraft internal error; contact DJI Support |
| 627099 | DRONE_UNKNOWN_ERROR | Aircraft internal error; contact DJI Support |
| 628001 | RECOVERY_DOOR_WAIT_TIMEOUT | Timed out waiting for the door-opening task to complete |
| 629001 | AI_CAPTURE_FRAME_FAILED | The AI module failed to read the RTSP video frame |
| 629002 | AI_SAFE_TO_TAKEOFF_CHECK_FAILED | Pre-takeoff safety check failed |
| 629003 | AI_DRONE_PLACE_ERROR | Aircraft placement position error |
| 629004 | AI_DRONE_NOT_DETECTED | Aircraft not detected |
| 629005 | AI_CABIN_STATUS_CONFLICT | Dock interior status inconsistent with the AI detection result |
| 640009 | QUERY_EXCUTION_STATUS_INVALID | Query execution status invalid |
| 640010 | QUERY_NO_THIS_BREAK_POINT | The queried breakpoint does not exist |
| 640011 | QUERY_NO_THIS_MISSION | The queried mission does not exist |
| 640022 | WPMZ_FILE_VERSION_NOT_MATCH | WPMZ file version mismatch |
| 640029 | CANNOT_BREAK_WAYLINE_WHEN_WAYLINE_NOT_RUNNING | Cannot interrupt the wayline when it is not running |
| 640030 | CANNOT_REQUEST_DRONE_CONTROL | Cannot request drone control |
| 640031 | CANNOT_RESUME_WAYLINE_IN_CUR_STATE | Cannot resume the wayline in the current state |
| 640034 | CROSS_FLYLIMIT_AERA | Crossing a flight-restricted area |
| 640037 | RTK_DISCONNECT | RTK disconnected |
| 640038 | BOUNDARY_LIMIT | Boundary limit |
| 640039 | RC_PITCH_ROLL_BREAK | Remote controller pitch/roll interruption |
| 640040 | AIRPORT_HEIGHT_LIMIT | Dock altitude limit |
| 640041 | REQUEST_TAKEOFF_FAIL | Takeoff request failed |
| 640042 | AUTOTAKEOFF_RUN_FAIL | Auto-takeoff execution failed |
| 640043 | REQUEST_WAYLINE_FAIL | Wayline request failed |
| 640044 | AGRO_PLAN_FAIL | Farmland planning failed |
| 640045 | REQUEST_QUICK_TAKEOFF_ASSIST_FAIL | Quick takeoff assist request failed |
| 640046 | QUICK_TAKEOFF_ASSIST_RUN_FAIL | Quick takeoff assist execution failed |
| 640047 | VFENCE_LIMIT | Virtual fence limit |
| 640052 | RETURN_HOME | Return to home |
| 640053 | ADSB_ERROR | ADS-B error |
| 640054 | RC_LOST | Remote controller signal lost |
| 640056 | DRONE_IS_MOVING | The drone is moving |
| 640057 | DRONE_ON_GROUND_MOTOR_ON | The drone is on the ground with motors on |
| 640058 | SURFACE_FOLLOW_CAMERA_INVALID | Surface-follow camera invalid |
| 640059 | SURFACE_FOLLOW_HEIGHT_INVALID | Surface-follow altitude invalid |
| 640060 | SURFACE_FOLLOW_MAP_WRONG | Surface-follow map error |
| 640061 | HOMEPOINT_NOT_MATCH_RTK | Home point does not match RTK |
| 640062 | STRONG_WIND_GOHOME | Return to home due to strong wind |
| 640063 | CANNOT_FIND_PAYLOAD | Cannot find the payload |
| 640064 | ACTION_EXECUTION_FAILED | Action execution failed |
| 640065 | USER_EXIT | User exit |
| 640066 | USER_BREAK | User interruption |
| 640067 | USER_SET_GOHOME | User set return to home |
| 640069 | TRAJ_JOB_EXIT_BUT_MIS_RUNNING | Trajectory job exited but the mission is still running |
| 640083 | TRAJ_MAX_VEL_OUT_OF_RANGE | Maximum velocity out of range |
| 640084 | TRAJ_VEL_OUT_OF_RANGE | Velocity out of range |
| 640086 | TRAJ_INVALID_YAW_MODE_IN_VERT_SEGM | Invalid yaw mode in the vertical segment |
| 640087 | TRAJ_WP_BREAK_INFO_MISSION_ID_CHANGED | Waypoint break info: mission ID changed |
| 640088 | TRAJ_WP_BREAK_INFO_PROGRESS_OUT_OF_RANGE | Waypoint break info: progress out of range |
| 640089 | TRAJ_WP_BREAK_INFO_INVALID_MISSION_STATE | Waypoint break info: mission state invalid |
| 640090 | TRAJ_WP_BREAK_INFO_WP_INDEX_OUT_OF_RANGE | Waypoint break info: waypoint index out of range |
| 640091 | TRAJ_BREAK_LAT_LONG_OUT_OF_RANGE | Break latitude/longitude out of range |
| 640092 | TRAJ_BREAK_INFO_WP_YAW_OUT_OF_RANGE | Break info: waypoint yaw out of range |
| 640093 | TRAJ_INVALID_BREAK_INFO_FLAG | Invalid break info flag |
| 640094 | TRAJ_GET_TRAJ_INFO_FAILED | Failed to get trajectory info |
| 640095 | TRAJ_GENERATE_FAIL | Trajectory generation failed |
| 640096 | TRAJ_LIB_RUN_FAIL | Trajectory library execution failed |
| 640097 | TRAJ_LIB_EMERGENCY_BRAKE | Trajectory library emergency brake |
| 640098 | ACTION_COMMON_ACTION_NOT_FOUND | Common action not found |
| 640099 | ACTION_COMMON_ACTION_INDEX_REPEATED | Common action index duplicated |
| 640100 | ACTION_COMMON_ACTION_INFO_SIZE_TOO_LONG_OR_TOO_SHORT | Common action info size too long or too short |
| 640101 | ACTION_COMMON_ACTION_TREE_EMPTY | Common action tree is empty |
| 640102 | ACTION_COMMON_ACTION_TREE_LAYER_EMPTY | Common action tree layer is empty |
| 640103 | ACTION_COMMON_ACTION_ID_REPEATED | Common action ID duplicated |
| 640104 | ACTION_COMMON_ACTION_NODE_CHILDREN_NUM_LT_2 | Common action node has fewer than 2 child nodes |
| 640105 | ACTION_COMMON_ACTION_INDEX_OUT_OF_RANGE | Common action index out of range |
| 640106 | ACTION_COMMON_ACTION_ID_IS_65535 | Common action ID is 65535 |
| 640107 | ACTION_COMMON_ACTION_NODE_CHILDNUM_SUM_NOT_EQ_NEXT_LAYER_SIZE | Common action node child count sum does not equal the next layer size |
| 640108 | ACTION_COMMON_ACTION_TREE_LAYER_NUM_TOO_MORE | Common action tree has too many layers |
| 640109 | ACTION_COMMON_ACTION_TREE_LAYER_NUM_TOO_LESS | Common action tree has too few layers |
| 640110 | ACTION_COMMON_ACTION_GROUP_NUM_OUT_OF_RANGE | Common action group count out of range |
| 640111 | ACTION_COMMON_ACTION_GROUP_VALID_RANGE_ERROR | Common action group valid range error |
| 640112 | ACTION_COMMON_ACTION_TREE_ROOT_STATUS_INVALID | Common action tree root status invalid |
| 640113 | ACTION_COMMON_ACTION_TREE_NODE_STATUS_INVALID | Common action tree node status invalid |
| 640114 | ACTION_COMMON_BREAK_INFO_ACTION_GROUP_ID_OUT_OF_RANGE | Break info: action group ID out of range |
| 640115 | ACTION_COMMON_ACTION_STATUS_TREE_SIZE_ERROR | Common action status tree size error |
| 640116 | ACTION_COMMON_BREAK_INFO_TRIGGER_RUN_RESULT_INVALID | Break info: trigger run result invalid |
| 640117 | ACTION_COMMON_BREAK_INFO_ACTION_GROUP_ID_REPEATED | Break info: action group ID duplicated |
| 640118 | ACTION_COMMON_BREAK_INFO_ACTION_LOCATION_REPEATED | Break info: action location duplicated |
| 640119 | ACTION_COMMON_BREAK_INFO_ACTION_LOCATION_OUT_OF_RANGE | Break info: action location out of range |
| 640120 | ACTION_COMMON_RESUME_ID_NOT_IN_BREAK_INFO | Resume ID not in break info |
| 640121 | ACTION_COMMON_RESUME_INFO_MODIFY_ACTION_STATUS_FROM_NO_INTERRUPT_TO_INTERRUPT | Resume info changes action status from no-interrupt to interrupt |
| 640122 | ACTION_COMMON_ACTION_RESUME_FAIL_FOR_INVALID_RESUME_INFO | Action resume failed due to invalid resume info |
| 640123 | ACTUATOR_COMMON_ACTUATOR_NOT_FOUND | Actuator not found |
| 640124 | TRIGGER_SINGLE_TIME_CHECK_FAIL | Single-time trigger check failed |
| 640125 | TRIGGER_NOT_FOUND | Trigger not found |
| 640127 | COMMAND_CAN_NOT_EXECUTE | Command cannot be executed |
| 640128 | COMMAND_EXECUTION_FAILED | Command execution failed |
| 640129 | INVALID_PARAMETERS | Invalid parameters |
| 640131 | PRODUCT_CONNECT_FAILED | Product connection failed |
| 640133 | OPERATION_CANCEL_BY_USER | Operation cancelled by the user |
| 640134 | UPLOAD_MEDIA_FILE_FAILED | Failed to upload the media file |
| 640135 | SDR_LINK_RESERVE_FAILED | SDR link reservation failed |
| 640136 | CHECK_PHOTOS_STORAGE_PACK_ERROR | Photo storage pack check error |
| 640137 | SDR_LINK_RESERVE_FAILED_CAUSE_MOTOR_ON | SDR link reservation failed because the motors started |
| 640138 | ACTION_TRIGGER_NOT_MATCH_ACTUATOR | The action trigger does not match the actuator |
| 640139 | INTERRUPT_REASON_AVOID | Interruption reason: obstacle avoidance |
| 640140 | INTERRUPT_REASON_AVOID_RADIUS_LIMIT | Interruption reason: obstacle-avoidance radius limit |
| 640141 | INTERRUPT_REASON_AVOID_HEIGHT_LIMIT | Interruption reason: obstacle-avoidance altitude limit |
| 640142 | INTERRUPT_REASON_AVOID_RTK_UNHEALTHY | Interruption reason: RTK unhealthy |
| 640143 | INTERRUPT_REASON_AVOID_USER_REQ_BREAK | Interruption reason: user requested interruption |
| 640144 | INTERRUPT_REASON_AVOID_AIRPORT_LIMIT | Interruption reason: Dock limit |
| 640145 | INTERRUPT_REASON_AVOID_EMERGENCY_BREAK | Interruption reason: emergency brake |
| 640146 | INTERRUPT_REASON_GPS_BAD | Interruption reason: poor GPS signal |
| 640147 | INTERRUPT_REASON_HOME_STATUS_ERROR | Interruption reason: home point status error |
| 640148 | INTERRUPT_REASON_RC_STICK | Interruption reason: RC stick |
| 640149 | TRANJECTORY_REPLAY_INVALID_LOCATION | Trajectory replay location invalid |
| 640150 | TRANJECTORY_REPLAY_NO_WAYPOINT_TO_REMOVE | Trajectory replay: no waypoint to remove |
| 640151 | TRANJECTORY_REPLAY_GIMBAL_ATTI_ERROR | Trajectory replay gimbal attitude error |
| 640152 | INVALID_INPUT_DATA_FC_LENGTH | Input data FC length invalid |
| 640153 | INVALID_INPUT_DATA_FLOAT_NUMBER | Input data float number invalid |
| 640154 | INIT_MISSION_COUNT_OVER_RANGE | Init mission count out of range |
| 640155 | INIT_MISSION_COUNT_TOO_LESS | Init mission count too few |
| 640156 | INIT_MISSION_END_INDEX_INVALID | Init mission end index invalid |
| 640157 | INIT_MISSION_GLOBAL_MAX_SPEED_INVALID | Init mission global max speed invalid |
| 640158 | INIT_MISSION_CRUISE_SPEED_INVALID | Init mission cruise speed invalid |
| 640159 | INIT_MISSION_GOTO_FIRST_WAYPOINT_INVALID | Init mission go-to-first-waypoint invalid |
| 640160 | INIT_MISSION_FINISHED_ACTION_INVALID | Init mission finished action invalid |
| 640161 | INIT_MISSION_RC_LOST_CONTROL_ACTION_INVALID | Init mission RC lost-control action invalid |
| 640162 | INIT_MISSION_REFERENCE_LOCATION_INVALID | Init mission reference location invalid |
| 640163 | INIT_MISSION_EXIST_RUNNING | An init mission is already running |
| 640164 | UPLOAD_MISSION_INDEX_INVALID | Upload mission index invalid |
| 640165 | UPLOAD_MISSION_COUNT_OVER_INIT_TOTAL_COUNT | Upload mission count exceeds the init total count |
| 640166 | UPLOAD_MISSION_START_INDEX_NOT_IN_END_OF_LAST_UPLOAD | Upload mission start index is not at the end of the last upload |
| 640167 | UPLOAD_MISSION_DISTANCE_TOO_CLOSE | Upload mission distance too close |
| 640168 | UPLOAD_MISSION_DISTANCE_TO_FAR | Upload mission distance too far |
| 640169 | UPLOAD_MISSION_MAX_CRUISE_SPEED_OVER_GLOBAL_MAX_SPEED | Upload mission max cruise speed exceeds the global max speed |
| 640170 | UPLOAD_MISSION_CRUISE_SPEED_OVER_LOCAL_MAX_SPEED | Upload mission cruise speed exceeds the local max speed |
| 640171 | UPLOAD_MISSION_CRUISE_SPEED_OVER_GLOBAL_MAX_SPEED | Upload mission cruise speed exceeds the global max speed |
| 640172 | UPLOAD_MISSION_YAW_MODE_INVALID | Upload mission yaw mode invalid |
| 640173 | UPLOAD_MISSION_YAW_CONTROL_DEGREE_INVALID | Upload mission yaw control degree invalid |
| 640174 | UPLOAD_MISSION_YAW_CONTROL_DIRECTION_INVALID | Upload mission yaw control direction invalid |
| 640175 | UPLOAD_MISSION_WAYPOINT_TYPE_INVALID | Upload mission waypoint type invalid |
| 640176 | UPLOAD_MISSION_DAMPING_DISTANCE_INVALID | Upload mission damping distance invalid |
| 640177 | UPLOAD_MISSION_CANNOT_SET_EXIT_LINE_TYPE | Upload mission cannot set exit line type |
| 640178 | UPLOAD_MISSION_INDEX_NOT_CONTINUE | Upload mission index not continuous |
| 640179 | UPLOAD_MISSION_ENTER_LINE_TYPE_SET_TO_START_POINT_INVALID | Upload mission enter-line type set to start point invalid |
| 640180 | UPLOAD_MISSION_DAMPING_INVALID | Upload mission damping invalid |
| 640181 | UPLOAD_MISSION_COORDINATE_INVALID | Upload mission coordinate invalid |
| 640182 | FIRST_WAYPOINT_TYPE_INVALID | First waypoint type invalid |
| 640183 | MISSION_FLYING_RADIUS_LIMIT | Mission flight radius limit |
| 640184 | MISSION_FLYING_HEIGHT_LIMIT | Mission flight altitude limit |
| 640185 | MISSION_VERSION_NOT_MATCHED | Mission version mismatch |
| 640186 | DOWNLOAD_MISSION_RANGE_OVER_STORAGE_COUNT | Download mission range exceeds storage count |
| 640187 | DOWNLOAD_MISSION_NOT_INITIALIZED | Download mission not initialized |
| 640188 | DOWNLOAD_MISSION_NOT_UPLOADED | Download mission not uploaded |
| 640189 | MISSION_CONTROL_START_CURRENT_POINT_TO_FIRST_POINT_TOO_FAR | Mission control: start point to first point too far |
| 640190 | MISSION_CONTROL_START_STOP_INVALID | Mission control: start/stop invalid |
| 640191 | MISSION_CONTROL_PAUSE_RESUME_INVALID | Mission control: pause/resume invalid |
| 640192 | MISSION_CONTROL_INTERRUPT_RECOVER_INVALID | Mission control: interrupt/recover invalid |
| 640193 | MISSION_CONTROL_UPLOADED_POINT_TOO_LESS | Mission control: too few uploaded points |
| 640194 | MISSION_CONTROL_STARTED_NO_IN_RUNNING | Mission control: started but not running |
| 640195 | MISSION_CONTROL_ALREADY_STARTED | Mission control: already started |
| 640196 | MISSION_CONTROL_ALREADY_STOPPED | Mission control: already stopped |
| 640197 | MISSION_CONTROL_MISSION_ALREADY_PAUSED | Mission control: mission already paused |
| 640198 | MISSION_CONTROL_NO_RUNNING_MISSION_FOR_RESUME | Mission control: no running mission to resume |
| 640199 | MISSION_CONTROL_NO_RUNNING_MISSION_FOR_RECOVER | Mission control: no running mission to recover |
| 640200 | MISSION_CONTROL_ALREADY_INTERRUPT | Mission control: already interrupted |
| 640201 | MISSION_CONTROL_NOT_SUPPORT_PAUSE_RESUME | Mission control: pause/resume not supported |
| 640202 | MISSION_CONTROL_NOT_SUPPORT_INTERRUPT_RESUME | Mission control: interrupt/resume not supported |
| 640203 | MISSION_CONTROL_BREAK_POINT_NOT_RECORD | Mission control: breakpoint not recorded |
| 640204 | MISSION_CONTROL_PROJECTION_POINT_NOT_IN_CURRENT_WAYPOINT_LINE | Mission control: projection point not on the current wayline |
| 640205 | MISSION_CONTROL_PROJECTION_POINT_NOT_NEXT_WAYPOINT_LINE | Mission control: projection point not on the next wayline |
| 640206 | MISSION_CONTROL_PROJECTION_POINT_NOT_NEXT_NEXT_WAYPOINT_LINE | Mission control: projection point not on the next-next wayline |
| 640207 | MISSION_STATE_AIRCRAFT_FLYING_STATUS_BAD | Mission state: aircraft flying status poor |
| 640208 | MISSION_STATE_HOME_POINT_NOT_RECORD | Mission state: home point not recorded |
| 640209 | MISSION_STATE_GPS_SIGNAL_WEAK | Mission state: weak GPS signal |
| 640210 | MISSION_STATE_RTK_NOT_READY | Mission state: RTK not ready |
| 640211 | MISSION_SECURE_STATE_NFZ_ZONE_CROSS | Mission safety state: crossing NFZ zone |
| 640212 | MISSION_SECURE_STATE_AIRCRAFT_LOW_BATTERY | Mission safety state: aircraft low battery |
| 640213 | UPLOAD_ACTION_ID_DUPLICATED | Upload action ID duplicated |
| 640214 | UPLOAD_ACTION_ITEMS_SPACE_NOT_ENOUGH | Upload action items: insufficient space |
| 640215 | UPLOAD_ACTION_BUFFER_NOT_ENOUGH | Upload action buffer insufficient |
| 640216 | DOWNLOAD_ACTION_ID_NOT_FOUND | Download action ID not found |
| 640217 | DOWNLOAD_ACTION_ID_OVER_RANGE | Download action ID out of range |
| 640218 | DOWNLOAD_ACTION_NO_ACTION_STORED | Download action: no action stored |
| 640219 | UPLOAD_ACTION_TRIGGER_TYPE_INVALID | Upload action trigger type invalid |
| 640220 | UPLOAD_ACTION_TRIGGER_REACH_END_INDEX_LESS_START_INDEX | Upload action trigger: end index less than start index |
| 640221 | UPLOAD_ACTION_TRIGGER_REACH_INTERVAL_COUNT_INVALID | Upload action trigger interval count invalid |
| 640222 | UPLOAD_ACTION_TRIGGER_REACH_AUTO_TERMINATE_INVALID | Upload action trigger auto-terminate invalid |
| 640223 | UPLOAD_ACTION_TRIGGER_ASSOCIATE_TYPE_INVALID | Upload action trigger associate type invalid |
| 640224 | UPLOAD_ACTION_TRIGGER_SIMPLE_INTERVAL_TYPE_INVALID | Upload action simple interval type invalid |
| 640225 | UPLOAD_ACTION_ACTUATOR_EXECUTE_NOT_SUPPORT | Upload action actuator does not support execution |
| 640226 | UPLOAD_ACTION_ACTUATOR_TYPE_INVALID | Upload action actuator type invalid |
| 640227 | UPLOAD_ACTION_ACTUATOR_FUNCTION_INVALID | Upload action actuator function invalid |
| 640228 | UPLOAD_ACTION_ACTUATOR_SPRAY_EXTERNAL_SPRAY_MODE_INVALID | Upload action actuator spray external spray mode invalid |
| 640229 | UPLOAD_ACTION_ACTUATOR_SPRAY_FLOW_SPEED_INVALID | Upload action actuator spray flow speed invalid |
| 640230 | UPLOAD_ACTION_ACTUATOR_SPRAY_FLOW_SPEED_PRE_MU_INVALID | Upload action actuator spray flow speed unit invalid |
| 640231 | ACTION_ACTUATOR_GIMBAL_ANGLE_INVALID | Action actuator gimbal angle invalid |
| 640232 | ACTION_ACTUATOR_GIMBAL_DURATION_INVALID | Action actuator gimbal duration invalid |
| 640233 | ACTION_ACTUATOR_GIMBAL_ARRIVE_TAG_ANGLE_FAILED | Action actuator gimbal failed to reach the target angle |
| 640234 | ACTION_ACTUATOR_GIMBAL_SEND_COMMAND_TO_GIMBAL_FAILED | Action actuator failed to send command to the gimbal |
| 640235 | ACTION_ACTUATOR_FLIGHT_YAW_ANGLE_INVALID | Action actuator flight yaw angle invalid |
| 640236 | ACTION_ACTUATOR_FLIGHT_YAW_TO_TARGET_TIMEOUT | Action actuator flight yaw to target timed out |
| 640237 | ACTION_ACTUATOR_FLIGHT_YAW_OCCUPIED | Action actuator flight yaw occupied |
| 640238 | ACTION_ACTUATOR_FLIGHT_CUR_AND_TARGET_STATE_EQUAL | Action actuator current and target state are equal |
| 640239 | ACTION_ACTUATOR_PAYLOAD_FAIL_TO_SNED_CMD_TO_PAYLOAD | Action actuator failed to send command to the payload |
| 640240 | ACTION_ACTUATOR_PAYLOAD_EXEC_FAILED | Action actuator payload execution failed |
| 640241 | OVER_STOP_BY_USER | Mission stopped by the user |
| 640242 | OVER_ON_GROUND_MOTOR_ON | Mission stopped because the motors were on while on the ground |
| 640243 | OVER_AUTO_TAKEOFF_TIMEOUT | Mission stopped due to auto-takeoff timeout |
| 640244 | OVER_AUTO_TAKEOFF_FAIL_TO_ARRIVE_TARGET_HEIGHT | Mission stopped because auto-takeoff did not reach the target altitude |
| 640245 | OVER_AUTO_TAKEOFF_NOT_EXEC_OR_INTERRUPT | Mission stopped because auto-takeoff was not executed or was interrupted |
| 640246 | OVER_BY_HIGH_PRIORITY_MISSION | Mission stopped by a higher-priority mission |
| 640247 | OVER_UNKNOWN_REASON | Mission stopped for an unknown reason |
| 640248 | OVER_GS_FAIL_TO_GENERATE_TRAJ | Mission stopped because GS failed to generate the trajectory |

## Error Code Usage Notes

### Error Handling Recommendations

1. **60XXXX series errors**: Primarily related to MSDK operations. We recommend checking the aircraft status, network connection, and parameter settings.
2. **62XXXX series errors**: Dock control, charging/battery swap, pre-task checks, device execution, and runtime issues. We recommend checking the Dock hardware status, power supply, network, RTK, and weather conditions. If you cannot resolve the issue yourself, contact the support team.
3. **64XXXX series errors**: These error codes generally indicate problems that occur when the remote controller MSDK loads a wayline and executes a takeoff task.
4. **Other error codes**: Compatible with the DJI standard; handle them according to the official DJI documentation.
