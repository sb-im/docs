---
sidebar_position: 3
---

# Wayline Interrupt Reason List

This document lists the interrupt reasons and their descriptions that SuperDock series products may encounter when executing wayline missions. The interrupt reasons are categorized by drone model for quick identification and troubleshooting.

## Interrupt Reason Categories

According to the official DJI API documentation, the wayline mission progress report includes interrupt reason information. The supported interrupt reasons vary across different drone models:

- **M3/M4 Series**: Applicable to drone models such as M3E, M3T, M3E, M4E, M4T
- **M300/M350 Series**: Applicable to DJI Matrice 300 RTK, DJI Matrice 350 RTK, etc.

## M3/M4 Series Drone Interrupt Reasons

| Error Code | Error Name | Description |
|--------|----------|------|
| -19 | FILE_TRANSFER_FAIL | File transfer failed |
| -18 | SDR_CHANGE_FAIL | SDR change failed |
| -17 | LOCK_MOTOR_RECOVERY_FAIL | Motor lock recovery failed |
| -16 | LOCK_MOTOR_FAIL | Motor lock failed |
| -15 | UPLOAD_CANCEL_BY_USER | Upload canceled by user |
| -14 | MOTOR_STATE_ERROR | Motor state error |
| -13 | PRECISE_FILE_MD5_CHECK_FAIL | Precise file MD5 check failed |
| -12 | FILE_NOT_EXIST | File does not exist |
| -11 | CANT_EXCUTE_IN_CURRENT_STATUS | Cannot execute in current status |
| -10 | QUERY_EXCUTION_STATUS_INVALID | Query execution status invalid |
| -9 | QUERY_NO_THIS_BREAK_POINT | Queried breakpoint does not exist |
| -8 | QUERY_NO_THIS_MISSION | Queried mission does not exist |
| -7 | PARSE_RETURN_PACK_FAILED | Failed to parse return packet |
| -6 | INVALID_PARAM | Invalid parameter |
| -5 | SEND_PACK_TIMEOUT | Send packet timeout |
| -4 | SEND_PACK_FAILED | Send packet failed |
| -3 | SYSTEM_ERROR | System error |
| -2 | UPLOAD_FILE_FAILED | Upload file failed |
| -1 | REQUEST_HANDLER_NOT_FOUND | Request handler not found |
| 773 | NO_ERROR | No error |
| 1 | MISSION_ID_NOT_EXIST | Mission ID does not exist |
| 2 | WAYLINE_INFO_ERROR | Wayline information error |
| 3 | WPMZ_FILE_VERSION_NOT_MATCH | WPMZ file version mismatch |
| 4 | WPMZ_FILE_LOAD_ERROR | WPMZ file load error |
| 5 | NO_BREAK_INFO | No breakpoint information |
| 6 | CMD_INVALID | Command invalid |
| 257 | CANNOT_START_WAYLINE_WHEN_WAYLINE_RUNNING | Cannot start wayline while wayline is running |
| 258 | CANNOT_BREAK_WAYLINE_IN_CUR_STATE | Cannot interrupt wayline in current state |
| 259 | CANNOT_STOP_WAYLINE_WHEN_WAYLINE_NOT_RUNNING | Cannot stop wayline when wayline is not running |
| 260 | CANNOT_BREAK_WAYLINE_WHEN_WAYLINE_NOT_RUNNING | Cannot interrupt wayline when wayline is not running |
| 261 | CANNOT_REQUEST_DRONE_CONTROL | Cannot request drone control |
| 262 | CANNOT_RESUME_WAYLINE_IN_CUR_STATE | Cannot resume wayline in current state |
| 513 | HEIGHT_LIMIT | Height limit |
| 514 | RADIUS_LIMIT | Radius limit |
| 515 | CROSS_FLYLIMIT_AERA | Crossing flight-restricted zone |
| 516 | LOW_LIMIT | Low limit |
| 517 | OBSTACAL_STOP | Obstacle stop |
| 518 | RTK_DISCONNECT | RTK disconnected |
| 519 | BOUNDARY_LIMIT | Boundary limit |
| 520 | RC_PITCH_ROLL_BREAK | Remote controller pitch/roll interruption |
| 521 | AIRPORT_HEIGHT_LIMIT | Dock height limit |
| 522 | REQUEST_TAKEOFF_FAIL | Takeoff request failed |
| 523 | AUTOTAKEOFF_RUN_FAIL | Auto takeoff run failed |
| 524 | REQUEST_WAYLINE_FAIL | Wayline request failed |
| 525 | AGRO_PLAN_FAIL | Farmland planning failed |
| 526 | REQUEST_QUICK_TAKEOFF_ASSIST_FAIL | Quick takeoff assist request failed |
| 527 | QUICK_TAKEOFF_ASSIST_RUN_FAIL | Quick takeoff assist run failed |
| 528 | VFENCE_LIMIT | Virtual fence limit |
| 769 | GPS_INVALID | GPS invalid |
| 770 | CANNOT_START_AT_CURRENT_RC_MODE | Cannot start in current remote controller mode |
| 771 | HOME_POINT_NOT_RECORDED | Home point not recorded |
| 772 | LOWER_BATTERY | Low battery level |
| 773 | RETURN_HOME | Return to home |
| 774 | ADSB_ERROR | ADS-B error |
| 775 | RC_LOST | Remote controller signal lost |
| 776 | RTK_NOT_READY | RTK not ready |
| 777 | DRONE_IS_MOVING | Drone is moving |
| 778 | DRONE_ON_GROUND_MOTOR_ON | Drone is on the ground with motors on |
| 779 | SURFACE_FOLLOW_CAMERA_INVALID | Terrain-follow camera invalid |
| 780 | SURFACE_FOLLOW_HEIGHT_INVALID | Terrain-follow altitude invalid |
| 781 | SURFACE_FOLLOW_MAP_WRONG | Terrain-follow map error |
| 782 | HOMEPOINT_NOT_MATCH_RTK | Home point does not match RTK |
| 784 | STRONG_WIND_GOHOME | Strong wind return to home |
| 1025 | CANNOT_FIND_PAYLOAD | Cannot find payload |
| 1026 | ACTION_EXECUTION_FAILED | Action execution failed |
| 1281 | USER_EXIT | User exit |
| 1282 | USER_BREAK | User interruption |
| 1283 | USER_SET_GOHOME | User triggered return to home |
| 1536 | TRAJ_INIT_FAIL | Trajectory initialization failed |
| 1537 | TRAJ_JOB_EXIT_BUT_MIS_RUNNING | Trajectory job exited but mission still running |
| 1538 | TRAJ_ON_GROUND_MOTOR_ON_CANNOT_GO | Cannot proceed with motors on while on the ground |
| 1539 | TRAJ_INVALID_START_INDEX_OR_PROG | Invalid start index or progress |
| 1540 | TRAJ_INVALID_CSYS_MODE | Invalid coordinate system mode |
| 1541 | TRAJ_INVALID_HEIGHT_MODE | Invalid altitude mode |
| 1542 | TRAJ_INVALID_FLY_WP_MODE | Invalid flight waypoint mode |
| 1543 | TRAJ_INVALID_YAW_MODE | Invalid yaw mode |
| 1544 | TRAJ_INVALID_TURN_DIR_MODE | Invalid turn direction mode |
| 1545 | TRAJ_INVALID_WP_TYPE | Invalid waypoint type |
| 1546 | TRAJ_FIR_LAS_WP_TYPE_ERROR | First/last waypoint type error |
| 1547 | TRAJ_GLOB_VEL_OUT_OF_RANGE | Global speed out of range |
| 1548 | TRAJ_WP_NUM_OUT_OF_RANGE | Waypoint number out of range |
| 1549 | TRAJ_LAT_LONG_OUT_OF_RANGE | Latitude/longitude out of range |
| 1550 | TRAJ_DAMP_DIS_OUT_OF_RANGE | Damping distance out of range |
| 1551 | TRAJ_MAX_VEL_OUT_OF_RANGE | Maximum speed out of range |
| 1552 | TRAJ_VEL_OUT_OF_RANGE | Speed out of range |
| 1553 | TRAJ_WP_YAW_OUT_OF_RANGE | Waypoint yaw out of range |
| 1554 | TRAJ_INVALID_YAW_MODE_IN_VERT_SEGM | Invalid yaw mode in vertical segment |
| 1555 | TRAJ_WP_BREAK_INFO_MISSION_ID_CHANGED | Waypoint breakpoint information mission ID changed |
| 1556 | TRAJ_WP_BREAK_INFO_PROGRESS_OUT_OF_RANGE | Waypoint breakpoint information progress out of range |
| 1557 | TRAJ_WP_BREAK_INFO_INVALID_MISSION_STATE | Waypoint breakpoint information mission state invalid |
| 1558 | TRAJ_WP_BREAK_INFO_WP_INDEX_OUT_OF_RANGE | Waypoint breakpoint information waypoint index out of range |
| 1559 | TRAJ_BREAK_LAT_LONG_OUT_OF_RANGE | Breakpoint latitude/longitude out of range |
| 1560 | TRAJ_BREAK_INFO_WP_YAW_OUT_OF_RANGE | Breakpoint information waypoint yaw out of range |
| 1561 | TRAJ_INVALID_BREAK_INFO_FLAG | Invalid breakpoint information flag |
| 1562 | TRAJ_GET_TRAJ_INFO_FAILED | Failed to get trajectory information |
| 1563 | TRAJ_GENERATE_FAIL | Trajectory generation failed |
| 1564 | TRAJ_LIB_RUN_FAIL | Trajectory library run failed |
| 1565 | TRAJ_LIB_EMERGENCY_BRAKE | Trajectory library emergency brake |
| 1588 | ACTION_COMMON_ACTION_NOT_FOUND | Common action not found |
| 1591 | ACTION_COMMON_ACTION_INDEX_REPEATED | Common action index repeated |
| 1592 | ACTION_COMMON_ACTION_INFO_SIZE_TOO_LONG_OR_TOO_SHORT | Common action information size too long or too short |
| 1593 | ACTION_COMMON_ACTION_TREE_EMPTY | Common action tree empty |
| 1594 | ACTION_COMMON_ACTION_TREE_LAYER_EMPTY | Common action tree layer empty |
| 1595 | ACTION_COMMON_ACTION_ID_REPEATED | Common action ID repeated |
| 1596 | ACTION_COMMON_ACTION_NODE_CHILDREN_NUM_LT_2 | Common action node children count less than 2 |
| 1597 | ACTION_COMMON_ACTION_INDEX_OUT_OF_RANGE | Common action index out of range |
| 1598 | ACTION_COMMON_ACTION_ID_IS_65535 | Common action ID is 65535 |
| 1599 | ACTION_COMMON_ACTION_NODE_CHILDNUM_SUM_NOT_EQ_NEXT_LAYER_SIZE | Common action node children sum not equal to next layer size |
| 1600 | ACTION_COMMON_ACTION_TREE_LAYER_NUM_TOO_MORE | Common action tree has too many layers |
| 1601 | ACTION_COMMON_ACTION_TREE_LAYER_NUM_TOO_LESS | Common action tree has too few layers |
| 1602 | ACTION_COMMON_ACTION_GROUP_NUM_OUT_OF_RANGE | Common action group count out of range |
| 1603 | ACTION_COMMON_ACTION_GROUP_VALID_RANGE_ERROR | Common action group valid range error |
| 1604 | ACTION_COMMON_ACTION_TREE_ROOT_STATUS_INVALID | Common action tree root status invalid |
| 1605 | ACTION_COMMON_ACTION_TREE_NODE_STATUS_INVALID | Common action tree node status invalid |
| 1606 | ACTION_COMMON_BREAK_INFO_ACTION_GROUP_ID_OUT_OF_RANGE | Breakpoint information action group ID out of range |
| 1607 | ACTION_COMMON_ACTION_STATUS_TREE_SIZE_ERROR | Common action status tree size error |
| 1608 | ACTION_COMMON_BREAK_INFO_TRIGGER_RUN_RESULT_INVALID | Breakpoint information trigger run result invalid |
| 1609 | ACTION_COMMON_BREAK_INFO_ACTION_GROUP_ID_REPEATED | Breakpoint information action group ID repeated |
| 1610 | ACTION_COMMON_BREAK_INFO_ACTION_LOCATION_REPEATED | Breakpoint information action location repeated |
| 1611 | ACTION_COMMON_BREAK_INFO_ACTION_LOCATION_OUT_OF_RANGE | Breakpoint information action location out of range |
| 1612 | ACTION_COMMON_RESUME_ID_NOT_IN_BREAK_INFO | Resume ID not in breakpoint information |
| 1613 | ACTION_COMMON_RESUME_INFO_MODIFY_ACTION_STATUS_FROM_NO_INTERRUPT_TO_INTERRUPT | Resume information modifies action status from no interruption to interruption |
| 1614 | ACTION_COMMON_ACTION_RESUME_FAIL_FOR_INVALID_RESUME_INFO | Action resume failed due to invalid resume information |
| 1634 | ACTUATOR_COMMON_ACTUATOR_NOT_FOUND | Actuator not found |
| 1650 | TRIGGER_SINGLE_TIME_CHECK_FAIL | Single-time trigger check failed |
| 26225 | TRIGGER_NOT_FOUND | Trigger not found |
| 65535 | UNKNOWN | Unknown error |

## M300/M350 Series Drone Interrupt Reasons

| Error Code | Error Name | Description |
|--------|----------|------|
| -1 | COMMAND_CAN_NOT_EXECUTE | Command cannot execute |
| -2 | COMMAND_EXECUTION_FAILED | Command execution failed |
| -3 | INVALID_PARAMETERS | Invalid parameters |
| -4 | TIMEOUT | Timeout |
| -5 | PRODUCT_CONNECT_FAILED | Product connection failed |
| -6 | SYSTEM_BUSY | System busy |
| -7 | OPERATION_CANCEL_BY_USER | Operation canceled by user |
| -8 | UPLOAD_MEDIA_FILE_FAILED | Failed to upload media file |
| -9 | SDR_LINK_RESERVE_FAILED | SDR link reservation failed |
| -10 | CHECK_PHOTOS_STORAGE_PACK_ERROR | Check photos storage pack error |
| -11 | SDR_LINK_RESERVE_FAILED_CAUSE_MOTOR_ON | SDR link reservation failed because motors are on |
| -12 | ACTION_TRIGGER_NOT_MATCH_ACTUATOR | Action trigger does not match actuator |
| -13 | INTERRUPT_REASON_AVOID | Interrupt reason: obstacle avoidance |
| -14 | INTERRUPT_REASON_AVOID_RADIUS_LIMIT | Interrupt reason: obstacle avoidance radius limit |
| -15 | INTERRUPT_REASON_AVOID_HEIGHT_LIMIT | Interrupt reason: obstacle avoidance height limit |
| -16 | INTERRUPT_REASON_AVOID_RTK_UNHEALTHY | Interrupt reason: RTK unhealthy |
| -17 | INTERRUPT_REASON_AVOID_USER_REQ_BREAK | Interrupt reason: user requested interruption |
| -18 | INTERRUPT_REASON_AVOID_AIRPORT_LIMIT | Interrupt reason: Dock limit |
| -19 | INTERRUPT_REASON_AVOID_EMERGENCY_BREAK | Interrupt reason: emergency brake |
| -20 | INTERRUPT_REASON_GPS_BAD | Interrupt reason: poor GPS signal |
| -21 | INTERRUPT_REASON_HOME_STATUS_ERROR | Interrupt reason: home point status error |
| -22 | INTERRUPT_REASON_RC_STICK | Interrupt reason: remote controller stick |
| -100 | TRANJECTORY_REPLAY_INVALID_LOCATION | Trajectory replay location invalid |
| -101 | TRANJECTORY_REPLAY_NO_WAYPOINT_TO_REMOVE | Trajectory replay has no waypoint to remove |
| -102 | TRANJECTORY_REPLAY_GIMBAL_ATTI_ERROR | Trajectory replay gimbal attitude error |
| -1001 | INVALID_INPUT_DATA_FC_LENGTH | Invalid input data FC length |
| -1002 | INVALID_INPUT_DATA_FLOAT_NUMBER | Invalid input data floating-point number |
| -2001 | INIT_MISSION_COUNT_OVER_RANGE | Init mission count out of range |
| -2002 | INIT_MISSION_COUNT_TOO_LESS | Init mission count too low |
| -2003 | INIT_MISSION_END_INDEX_INVALID | Init mission end index invalid |
| -2004 | INIT_MISSION_GLOBAL_MAX_SPEED_INVALID | Init mission global max speed invalid |
| -2005 | INIT_MISSION_CRUISE_SPEED_INVALID | Init mission cruise speed invalid |
| -2006 | INIT_MISSION_GOTO_FIRST_WAYPOINT_INVALID | Init mission go to first waypoint invalid |
| -2007 | INIT_MISSION_FINISHED_ACTION_INVALID | Init mission finished action invalid |
| -2008 | INIT_MISSION_RC_LOST_CONTROL_ACTION_INVALID | Init mission remote controller lost control action invalid |
| -2009 | INIT_MISSION_REFERENCE_LOCATION_INVALID | Init mission reference location invalid |
| -2010 | INIT_MISSION_EXIST_RUNNING | A running init mission already exists |
| -2011 | UPLOAD_MISSION_INDEX_INVALID | Upload mission index invalid |
| -2012 | UPLOAD_MISSION_COUNT_OVER_INIT_TOTAL_COUNT | Upload mission count exceeds init total count |
| -2013 | UPLOAD_MISSION_START_INDEX_NOT_IN_END_OF_LAST_UPLOAD | Upload mission start index not at the end of last upload |
| -2014 | UPLOAD_MISSION_DISTANCE_TOO_CLOSE | Upload mission distance too close |
| -2015 | UPLOAD_MISSION_DISTANCE_TO_FAR | Upload mission distance too far |
| -2016 | UPLOAD_MISSION_MAX_CRUISE_SPEED_OVER_GLOBAL_MAX_SPEED | Upload mission max cruise speed exceeds global max speed |
| -2017 | UPLOAD_MISSION_CRUISE_SPEED_OVER_LOCAL_MAX_SPEED | Upload mission cruise speed exceeds local max speed |
| -2018 | UPLOAD_MISSION_CRUISE_SPEED_OVER_GLOBAL_MAX_SPEED | Upload mission cruise speed exceeds global max speed |
| -2019 | UPLOAD_MISSION_YAW_MODE_INVALID | Upload mission yaw mode invalid |
| -2020 | UPLOAD_MISSION_YAW_CONTROL_DEGREE_INVALID | Upload mission yaw control angle invalid |
| -2021 | UPLOAD_MISSION_YAW_CONTROL_DIRECTION_INVALID | Upload mission yaw control direction invalid |
| -2022 | UPLOAD_MISSION_WAYPOINT_TYPE_INVALID | Upload mission waypoint type invalid |
| -2023 | UPLOAD_MISSION_DAMPING_DISTANCE_INVALID | Upload mission damping distance invalid |
| -2024 | UPLOAD_MISSION_CANNOT_SET_EXIT_LINE_TYPE | Upload mission cannot set exit line type |
| -2025 | UPLOAD_MISSION_INDEX_NOT_CONTINUE | Upload mission index not continuous |
| -2026 | UPLOAD_MISSION_ENTER_LINE_TYPE_SET_TO_START_POINT_INVALID | Upload mission enter line type set to start point invalid |
| -2027 | UPLOAD_MISSION_DAMPING_INVALID | Upload mission damping invalid |
| -2028 | UPLOAD_MISSION_COORDINATE_INVALID | Upload mission coordinate invalid |
| -2029 | FIRST_WAYPOINT_TYPE_INVALID | First waypoint type invalid |
| -2030 | MISSION_FLYING_RADIUS_LIMIT | Mission flight radius limit |
| -2031 | MISSION_FLYING_HEIGHT_LIMIT | Mission flight height limit |
| -2032 | MISSION_VERSION_NOT_MATCHED | Mission version mismatch |
| -3001 | DOWNLOAD_MISSION_RANGE_OVER_STORAGE_COUNT | Download mission range exceeds storage count |
| -3002 | DOWNLOAD_MISSION_NOT_INITIALIZED | Download mission not initialized |
| -3003 | DOWNLOAD_MISSION_NOT_UPLOADED | Download mission not uploaded |
| -4001 | MISSION_CONTROL_START_CURRENT_POINT_TO_FIRST_POINT_TOO_FAR | Mission control start point too far from first point |
| -4002 | MISSION_CONTROL_START_STOP_INVALID | Mission control start/stop invalid |
| -4003 | MISSION_CONTROL_PAUSE_RESUME_INVALID | Mission control pause/resume invalid |
| -4004 | MISSION_CONTROL_INTERRUPT_RECOVER_INVALID | Mission control interrupt/recover invalid |
| -4005 | MISSION_CONTROL_UPLOADED_POINT_TOO_LESS | Mission control has too few uploaded points |
| -4006 | MISSION_CONTROL_STARTED_NO_IN_RUNNING | Mission control started but not running |
| -4007 | MISSION_CONTROL_ALREADY_STARTED | Mission control already started |
| -4008 | MISSION_CONTROL_ALREADY_STOPPED | Mission control already stopped |
| -4009 | MISSION_CONTROL_MISSION_ALREADY_PAUSED | Mission control mission already paused |
| -4010 | MISSION_CONTROL_NO_RUNNING_MISSION_FOR_RESUME | Mission control has no running mission to resume |
| -4011 | MISSION_CONTROL_NO_RUNNING_MISSION_FOR_RECOVER | Mission control has no running mission to recover |
| -4012 | MISSION_CONTROL_ALREADY_INTERRUPT | Mission control already interrupted |
| -4013 | MISSION_CONTROL_NOT_SUPPORT_PAUSE_RESUME | Mission control does not support pause/resume |
| -4014 | MISSION_CONTROL_NOT_SUPPORT_INTERRUPT_RESUME | Mission control does not support interrupt/resume |
| -4015 | MISSION_CONTROL_BREAK_POINT_NOT_RECORD | Mission control breakpoint not recorded |
| -4016 | MISSION_CONTROL_PROJECTION_POINT_NOT_IN_CURRENT_WAYPOINT_LINE | Mission control projection point not on current wayline |
| -4017 | MISSION_CONTROL_PROJECTION_POINT_NOT_NEXT_WAYPOINT_LINE | Mission control projection point not on next wayline |
| -4018 | MISSION_CONTROL_PROJECTION_POINT_NOT_NEXT_NEXT_WAYPOINT_LINE | Mission control projection point not on the wayline after next |
| -5001 | MISSION_STATE_AIRCRAFT_FLYING_STATUS_BAD | Mission state: aircraft flight status poor |
| -5002 | MISSION_STATE_HOME_POINT_NOT_RECORD | Mission state: home point not recorded |
| -5003 | MISSION_STATE_GPS_SIGNAL_WEAK | Mission state: weak GPS signal |
| -5004 | MISSION_STATE_RTK_NOT_READY | Mission state: RTK not ready |
| -6001 | MISSION_SECURE_STATE_NFZ_ZONE_CROSS | Mission secure state: NFZ zone crossing |
| -6002 | MISSION_SECURE_STATE_AIRCRAFT_LOW_BATTERY | Mission secure state: aircraft low battery |
| -7001 | UPLOAD_ACTION_ID_DUPLICATED | Upload action ID duplicated |
| -7002 | UPLOAD_ACTION_ITEMS_SPACE_NOT_ENOUGH | Upload action items space not enough |
| -7003 | UPLOAD_ACTION_BUFFER_NOT_ENOUGH | Upload action buffer not enough |
| -7004 | DOWNLOAD_ACTION_ID_NOT_FOUND | Download action ID not found |
| -7005 | DOWNLOAD_ACTION_ID_OVER_RANGE | Download action ID out of range |
| -7006 | DOWNLOAD_ACTION_NO_ACTION_STORED | Download action: no action stored |
| -8001 | UPLOAD_ACTION_TRIGGER_TYPE_INVALID | Upload action trigger type invalid |
| -8002 | UPLOAD_ACTION_TRIGGER_REACH_END_INDEX_LESS_START_INDEX | Upload action trigger end index less than start index |
| -8003 | UPLOAD_ACTION_TRIGGER_REACH_INTERVAL_COUNT_INVALID | Upload action trigger interval count invalid |
| -8004 | UPLOAD_ACTION_TRIGGER_REACH_AUTO_TERMINATE_INVALID | Upload action trigger auto-terminate invalid |
| -8005 | UPLOAD_ACTION_TRIGGER_ASSOCIATE_TYPE_INVALID | Upload action trigger associate type invalid |
| -8006 | UPLOAD_ACTION_TRIGGER_SIMPLE_INTERVAL_TYPE_INVALID | Upload action simple interval type invalid |
| -9001 | UPLOAD_ACTION_ACTUATOR_EXECUTE_NOT_SUPPORT | Upload action actuator execution not supported |
| -9002 | UPLOAD_ACTION_ACTUATOR_TYPE_INVALID | Upload action actuator type invalid |
| -9003 | UPLOAD_ACTION_ACTUATOR_FUNCTION_INVALID | Upload action actuator function invalid |
| -10001 | UPLOAD_ACTION_ACTUATOR_SPRAY_EXTERNAL_SPRAY_MODE_INVALID | Upload action actuator spray external spray mode invalid |
| -10002 | UPLOAD_ACTION_ACTUATOR_SPRAY_FLOW_SPEED_INVALID | Upload action actuator spray flow speed invalid |
| -10003 | UPLOAD_ACTION_ACTUATOR_SPRAY_FLOW_SPEED_PRE_MU_INVALID | Upload action actuator spray flow speed unit invalid |
| -11001 | ACTION_ACTUATOR_GIMBAL_ANGLE_INVALID | Action actuator gimbal angle invalid |
| -11002 | ACTION_ACTUATOR_GIMBAL_DURATION_INVALID | Action actuator gimbal duration invalid |
| -11003 | ACTION_ACTUATOR_GIMBAL_ARRIVE_TAG_ANGLE_FAILED | Action actuator gimbal failed to reach target angle |
| -11004 | ACTION_ACTUATOR_GIMBAL_SEND_COMMAND_TO_GIMBAL_FAILED | Action actuator failed to send command to gimbal |
| -12001 | ACTION_ACTUATOR_FLIGHT_YAW_ANGLE_INVALID | Action actuator flight yaw angle invalid |
| -12002 | ACTION_ACTUATOR_FLIGHT_YAW_TO_TARGET_TIMEOUT | Action actuator flight yaw to target timeout |
| -12003 | ACTION_ACTUATOR_FLIGHT_YAW_OCCUPIED | Action actuator flight yaw occupied |
| -12004 | ACTION_ACTUATOR_FLIGHT_CUR_AND_TARGET_STATE_EQUAL | Action actuator current and target state are equal |
| -13001 | ACTION_ACTUATOR_PAYLOAD_FAIL_TO_SNED_CMD_TO_PAYLOAD | Action actuator failed to send command to payload |
| -13002 | ACTION_ACTUATOR_PAYLOAD_EXEC_FAILED | Action actuator payload execution failed |
| -14001 | OVER_STOP_BY_USER | Mission stopped by user |
| -14002 | OVER_ON_GROUND_MOTOR_ON | Mission stopped because motors are on while on the ground |
| -14003 | OVER_AUTO_TAKEOFF_TIMEOUT | Mission stopped due to auto takeoff timeout |
| -14004 | OVER_AUTO_TAKEOFF_FAIL_TO_ARRIVE_TARGET_HEIGHT | Mission stopped because auto takeoff failed to reach target altitude |
| -14005 | OVER_AUTO_TAKEOFF_NOT_EXEC_OR_INTERRUPT | Mission stopped because auto takeoff was not executed or was interrupted |
| -14006 | OVER_BY_HIGH_PRIORITY_MISSION | Mission stopped by a higher-priority mission |
| -14007 | OVER_UNKNOWN_REASON | Mission stopped for unknown reason |
| -14008 | OVER_GS_FAIL_TO_GENERATE_TRAJ | Mission stopped because GS failed to generate trajectory |


---

**Reference Documents**

- [Wayline Mission Progress Report](/en/api-integration/api-reference/superdock-hangar/wayline)
- Official website: https://sb.im/
