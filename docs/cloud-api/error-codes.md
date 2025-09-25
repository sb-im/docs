---
sidebar_position: 6
---

# 任务错误码列表

本文档列出了SuperDock系列产品在执行各种任务时可能遇到的错误码及其说明。错误码按照功能模块进行分类，便于快速定位和解决问题。

## 错误码分类规则

- **60XXXX**：MSDK执行操作的错误码
- **62XXXX**：机场控制的错误码
- **64XXXX**：执行飞行或加载航线的错误码
- **其他**：兼容大疆上云的错误码

## MSDK执行操作错误码 (60XXXX)

| 错误码 | 错误名称 | 描述 | 可能原因 | 排查方案 |
|--------|----------|------|----------|----------|
| 600001 | UNKNOWN_ROUTE_EXECUTION_FAILURE | 无人机起飞前自检失败，请查看HMS信息 |  |  |
| 600002 | RTK_HAS_CONNECTED | RTK 已连接 |  |  |
| 600003 | RTK_POSITION_ILLEGAL | RTK 位置非法 |  |  |
| 600004 | COORDINATE_SYSTEM_NOT_SUPPORT | 坐标系统不支持 |  |  |
| 600005 | RTK_NO_NETWORK | RTK 无网络 |  |  |
| 600006 | RTK_CUSTOM_NETWORK_SETTING_INVALID | RTK 自定义网络设置无效 |  |  |
| 600007 | RTK_INCORRECT_REFERENCE_STATION_SOURCE | RTK 参考站源不正确 |  |  |
| 600008 | FILE_TRANSFER_FAIL | 文件传输失败 |  |  |
| 600009 | SDR_CHANGE_FAIL | SDR 切换失败 |  |  |
| 600010 | UPLOAD_PRECICSE_MISSION_FAIL | 上传精确任务失败 |  |  |
| 600011 | LOCK_MOTOR_RECOVERY_FAIL | 锁定电机恢复失败 |  |  |
| 600012 | LOCK_MOTOR_FAIL | 锁定电机失败 |  |  |
| 600013 | UPLOAD_CANCEL_BY_USER | 用户取消上传 |  |  |
| 600014 | MOTOR_STATE_ERROR | 电机状态错误 |  |  |
| 600015 | PRECISE_FILE_MD5_CHECK_FAIL | 精确文件 MD5 校验失败 |  |  |
| 600016 | FILE_NOT_EXIST | 文件不存在 |  |  |
| 600017 | CANT_EXCUTE_IN_CURRENT_STATUS | 当前状态无法执行 |  |  |
| 600018 | PARSE_RETURN_PACK_FAILED | 解析返回包失败 |  |  |
| 600019 | INVALID_PARAM | 参数无效 |  |  |
| 600020 | SEND_PACK_TIMEOUT | 发送包超时 |  |  |
| 600021 | SEND_PACK_FAILED | 发送包失败 |  |  |
| 600022 | SYSTEM_ERROR | 系统错误 |  |  |
| 600023 | WAYLINE_INFO_ERROR | 航线信息错误 |  |  |
| 600024 | NO_BREAK_INFO | 无断点信息 |  |  |
| 600025 | CMD_INVALID | 命令无效 |  |  |
| 600026 | RADIUS_LIMIT | 半径限制 |  |  |
| 600027 | CANNOT_START_AT_CURRENT_RC_MODE | 当前遥控模式下无法启动 |  |  |
| 600028 | HOME_POINT_NOT_RECORDED | 未记录返航点 |  |  |
| 600029 | RTK_NOT_READY | RTK 未准备好 |  |  |
| 600030 | DRONE_CRITICAL_ERROR | 无人机严重错误 |  |  |
| 600031 | MISSION_INVALID_FILE_NAME | 任务文件名无效 |  |  |
| 600032 | GENERATE_MISSION_FILE_FAILED | 生成任务文件失败 |  |  |
| 600033 | UPLOAD_FILE_FAILED | 上传文件失败 |  |  |
| 600034 | GPS_INVALID | GPS 无效 |  |  |
| 600035 | MISSION_ID_NOT_EXIST | 任务 ID 不存在 |  |  |
| 600036 | OBSTACAL_STOP | 障碍停止 |  |  |
| 600037 | HEIGHT_LIMIT | 高度限制 |  |  |
| 600038 | LOW_LIMIT | 低限制 |  |  |
| 600039 | LOWER_BATTERY | 电池电量低 |  |  |
| 600040 | WPMZ_FILE_LOAD_ERROR | WPMZ 文件加载错误 |  |  |
| 600041 | CANNOT_STOP_WAYLINE_WHEN_WAYLINE_NOT_RUNNING | 航线未运行时无法停止 |  |  |
| 600042 | CANNOT_BREAK_WAYLINE_IN_CUR_STATE | 当前状态下无法中断航线 |  |  |
| 600043 | CANNOT_START_WAYLINE_WHEN_WAYLINE_RUNNING | 航线运行时无法启动航线 |  |  |
| 600044 | WAYPOINT_METHOD_NOT_SUPPORT | 航点方法不支持 |  |  |
| 600045 | TRAJ_INIT_FAIL | 轨迹初始化失败 |  |  |
| 600046 | TRAJ_ON_GROUND_MOTOR_ON_CANNOT_GO | 轨迹在地面上，电机无法启动 |  |  |
| 600047 | TRAJ_INVALID_START_INDEX_OR_PROG | 轨迹起始索引或进度无效 |  |  |
| 600048 | TRAJ_INVALID_CSYS_MODE | 轨迹坐标系统模式无效 |  |  |
| 600049 | TRAJ_INVALID_HEIGHT_MODE | 轨迹高度模式无效 |  |  |
| 600050 | TRAJ_INVALID_FLY_WP_MODE | 轨迹飞行航点模式无效 |  |  |
| 600071 | NETWORK_ERR | 网络错误 |  |  |
| 600072 | LIVE_STREAM_NOT_STARTED | 直播未开始 |  |  |
| 600073 | LIVE_STREAM_ALREADY_STARTED | 直播已开始 |  |  |
| 600074 | LIVE_STREAM_CHANNEL_CREATE_ERR | 创建直播频道错误 |  |  |
| 600075 | LIVE_STREAM_START_ERR | 启动直播错误 |  |  |
| 600076 | LIVE_STREAM_IS_NOT_READY | 直播未准备好 |  |  |
| 600082 | REQUEST_TIMEOUT | 请求超时 |  |  |
| 600083 | SEND_PACK_FAILURE | 发送包失败 |  |  |
| 600084 | DISCONNECTED | 断开连接 |  |  |
| 600164 | MEDIA_TASK_CANCEL | 媒体任务取消 |  |  |
| 600165 | MEDIA_CANCEL_TASK_NOT_EXIST | 媒体取消任务不存在 |  |  |
| 600166 | MEDIA_TASK_SYNC_FAILURE | 媒体任务同步失败 |  |  |
| 600167 | FILE_LIST_NOT_EXIST | 文件列表不存在 |  |  |
| 600168 | FILE_LIST_UPDATE_ERROR | 文件列表更新错误 |  |  |
| 600190 | MISSION_WAYPOINT_NULL_MISSION | 任务航点为空任务 |  |  |
| 600191 | MISSION_WAYPOINT_MAX_FLIGHT_SPEED_INVALID | 任务航点最大飞行速度无效 |  |  |
| 600192 | MISSION_WAYPOINT_REPEAT_TIMES_INVALID | 任务航点重复次数无效 |  |  |
| 600193 | MISSION_WAYPOINT_COUNT_INVALID | 任务航点计数无效 |  |  |
| 600194 | MISSION_WAYPOINT_DISCONNECTED | 任务航点断开连接 |  |  |
| 600195 | MISSION_WAYPOINT_DOWNLOAD_UNNECESSARY | 任务航点下载不必要 |  |  |
| 600196 | MISSION_WAYPOINT_ALREADY_STARTED | 任务航点已开始 |  |  |
| 600197 | MISSION_WAYPOINT_CANCELLED | 任务航点已取消 |  |  |
| 600198 | MISSION_WAYPOINT_FAILED | 任务航点失败 |  |  |
| 600199 | MISSION_WAYPOINT_TIMEOUT | 任务航点超时 |  |  |
| 600364 | RTK_CUSTOM_NETWORK_SERVER_START_FAIL | RTK 自定义网络服务器启动失败 |  |  |
| 600365 | RTK_CUSTOM_NETWORK_LOGIN_FAIL | RTK 自定义网络登录失败 |  |  |
| 600367 | RTK_NOT_SUPPORT_BY_CURRENT_CONTROLLER | RTK 当前控制器不支持 |  |  |
| 600368 | RTK_NOT_SUPPORT_BY_CONTROLLER_B | RTK 控制器 B 不支持 |  |  |
| 600370 | RTK_RC_ENCRPT_FAIL | RTK 遥控器加密失败 |  |  |
| 600371 | RTK_BASE_STATION_NEED_LOGIN | RTK 基站需要登录 |  |  |
| 600372 | RTK_SERVER_NOT_REACHABLE | RTK 服务器不可达 |  |  |
| 600373 | RTK_INVALID_REQUEST | RTK 无效请求 |  |  |
| 600374 | RTK_AUTENTICATION_FAILURE | RTK 认证失败 |  |  |
| 600375 | RTK_ACCOUNT_NOT_LOGGED_IN_OR_EXPIRED | RTK 账户未登录或已过期 |  |  |
| 600483 | SERVICE_UNKNOWN_ERR | 服务未知错误 |  |  |
| 600484 | SERVICE_INVALID_PARAM | 服务无效参数 |  |  |
| 600485 | SERVICE_DB_ERR | 服务数据库错误 |  |  |
| 600486 | SERVICE_DEVICE_USER_TOKEN_NOT_MATCH | 服务设备用户令牌不匹配 |  |  |
| 600487 | SERVICE_DEVICE_NOT_BIND | 服务设备未绑定 |  |  |
| 600488 | SERVICE_DEVICE_ALREADY_BIND | 服务设备已绑定 |  |  |
| 600489 | SERVICE_DEVICE_INVALID_SN | 服务设备无效 SN |  |  |
| 600490 | SERVICE_DEVICE_INVALID_ACTIVATE_TIME | 服务设备无效激活时间 |  |  |
| 600491 | SERVICE_NETWORK_ERROR | 服务网络错误 |  |  |
| 600527 | UNKNOWN | 未知错误 |  |  |
| 600528 | USER_CANCELS_ROUTE_TASK | 用户取消航线任务 |  |  |

## 机场控制错误码 (62XXXX)

| 错误码 | 错误名称 | 描述 | 可能原因 | 排查方案 |
|--------|----------|------|----------|----------|
| 620002 | COMMON_ERROR | 通用错误 |  |  |
| 620003 | CMD_NOT_SEND | 固件未执行 |  |  |
| 620004 | STOP_BUTTON_PRESSED | 急停按钮被按下 |  |  |
| 621001 | CHECK_ERROR | 电机检查错误 |  |  |
| 621002 | PARAM_ERROR | 参数错误 |  |  |
| 621014 | MOTOR_CALIB_TIMEOUT | 电机回零超时 |  |  |
| 621015 | MOTOR_CALIB_FAILED | 电机回零失败 |  |  |
| 621017 | MOTOR_MOVE_TIMEOUT | 电机运行超时 |  |  |
| 621018 | MOTOR_MOVE_STALL | 电机运行堵转 |  |  |
| 621019 | SERVO_MOVE_TIMEOUT | 舵机运行超时 |  |  |
| 621020 | SERVO_MOVE_FAILED | 舵机运行失败 |  |  |
| 621021 | MOTOR_IS_RUNNING | 电机正在运行 |  |  |
| 621022 | MOTOR_NOT_CALIB | 电机未校准 |  |  |
| 621023 | MOTOR_POS_NOT_ALLOWED | 当前电机位置不允许操作 |  |  |
| 622024 | RC_ON_FAILED | 遥控器开启失败 |  |  |
| 622025 | RC_ON_TIMEOUT | 遥控器开启超时 |  |  |
| 622026 | RC_OFF_FAILED_DRONE_NOT_LAND | 遥控器关闭失败，飞行器未着陆 |  |  |
| 622027 | RC_OFF_TIMEOUT | 遥控器关闭超时 |  |  |
| 622028 | RC_OFF_FAILED | 遥控器关闭失败 |  |  |
| 622029 | RC_ON_FAILED_LED_NOT_ON | 遥控器开启失败，LED未亮 |  |  |
| 622030 | RC_ON_FAILED_SWITCHING | 遥控器开启失败，正在切换 |  |  |
| 622031 | RC_OFF_FAILED_LED_NOT_OFF | 遥控器关闭失败，LED未灭 |  |  |
| 622032 | RC_OFF_FAILED_SWITCHING | 遥控器关闭失败，正在切换 |  |  |
| 623033 | CHARGER_OUTPUT_TIMEOUT | 充电器输出超时 |  |  |
| 623034 | CHARGER_STOP_TIMEOUT | 充电器停止输出超时 |  |  |
| 623035 | CHARGER_XY_NOT_FIX | 充电器XY未固定 |  |  |
| 623036 | CHARGER_ON_DRONE_NO_VOLTAGE | 开启飞行器无电压 |  |  |
| 623037 | CHARGER_OFF_FAIL_STILL_VOLTAGE | 充电器关闭失败，仍有电压 |  |  |
| 623038 | CHARGER_GET_DRONE_VOLTAGE_FAIL | 充电器获取飞行器电压失败 |  |  |
| 623039 | CHARGER_PAIR_RC_START_FAIL | 对频失败，遥控器无法进入对频模式 |  |  |
| 623040 | CHARGER_PAIR_RC_STOP_FAIL | 对频失败，遥控器无法停止对频模式 |  |  |
| 623041 | CHARGER_PAIR_DRONE_ENTER_PAIR_FAIL | 对频失败，飞行器进入对频模式失败 |  |  |
| 623042 | CHARGER_AUTO_WORKFLOW_FAIL | 充电器自动充电流程失败 |  |  |
| 623043 | CHARGER_ON_DRONE_AND_REMOTE_FAIL | 开启飞行器和遥控器失败 |  |  |
| 623044 | CHARGER_ON_COMMON_ERROR | 充电开始错误 |  |  |
| 623045 | CHARGER_OFF_COMMON_ERROR | 充电关闭错误 |  |  |
| 623046 | CHARGER_PAIR_RC_NOT_ON | 对频失败，遥控器未开启 |  |  |
| 623047 | CHARGER_PAIR_DEPOT_NOT_FIX | 对频失败，飞机推杆未固定 |  |  |
| 623048 | CHARGER_PAIR_DRONE_NOT_ON | 对频失败，飞行器未开启 |  |  |
| 623049 | CHARGER_PAIR_DRONE_NOT_PAIR_MODE | 对频失败，飞行器无法进入对频模式 |  |  |
| 623050 | CHARGER_INPUT_VOLTAGE_NOT_MATCH | 充电器输入电压不匹配 |  |  |
| 623051 | CHARGER_ON_PRESET_FAIL | 充电器预设参数失败 |  |  |
| 623052 | CHARGER_OFF_FAIL_STILL_CURRENT | 充电器关闭失败，仍有电流 |  |  |

## 飞行和航线错误码 (64XXXX)

| 错误码 | 错误名称 | 描述 | 可能原因 | 排查方案 |
|--------|----------|------|----------|----------|
| 640009 | QUERY_EXCUTION_STATUS_INVALID | 查询执行状态无效 |  |  |
| 640010 | QUERY_NO_THIS_BREAK_POINT | 查询不存在该断点 |  |  |
| 640011 | QUERY_NO_THIS_MISSION | 查询不存在该任务 |  |  |
| 640022 | WPMZ_FILE_VERSION_NOT_MATCH | WPMZ文件版本不匹配 |  |  |
| 640029 | CANNOT_BREAK_WAYLINE_WHEN_WAYLINE_NOT_RUNNING | 航线未运行时无法中断 |  |  |
| 640030 | CANNOT_REQUEST_DRONE_CONTROL | 无法请求无人机控制 |  |  |
| 640031 | CANNOT_RESUME_WAYLINE_IN_CUR_STATE | 当前状态无法恢复航线 |  |  |
| 640034 | CROSS_FLYLIMIT_AERA | 穿越飞行限制区域 |  |  |
| 640037 | RTK_DISCONNECT | RTK断开 |  |  |
| 640038 | BOUNDARY_LIMIT | 边界限制 |  |  |
| 640039 | RC_PITCH_ROLL_BREAK | 遥控器俯仰/横滚中断 |  |  |
| 640040 | AIRPORT_HEIGHT_LIMIT | 机场高度限制 |  |  |
| 640041 | REQUEST_TAKEOFF_FAIL | 请求起飞失败 |  |  |
| 640042 | AUTOTAKEOFF_RUN_FAIL | 自动起飞运行失败 |  |  |
| 640043 | REQUEST_WAYLINE_FAIL | 请求航线失败 |  |  |
| 640044 | AGRO_PLAN_FAIL | 农田规划失败 |  |  |
| 640045 | REQUEST_QUICK_TAKEOFF_ASSIST_FAIL | 请求快速起飞辅助失败 |  |  |
| 640046 | QUICK_TAKEOFF_ASSIST_RUN_FAIL | 快速起飞辅助运行失败 |  |  |
| 640047 | VFENCE_LIMIT | 虚拟围栏限制 |  |  |
| 640052 | RETURN_HOME | 返航 |  |  |
| 640053 | ADSB_ERROR | ADSB错误 |  |  |
| 640054 | RC_LOST | 遥控器信号丢失 |  |  |
| 640056 | DRONE_IS_MOVING | 无人机正在移动 |  |  |
| 640057 | DRONE_ON_GROUND_MOTOR_ON | 无人机在地面且电机开启 |  |  |
| 640062 | STRONG_WIND_GOHOME | 强风返航 |  |  |
| 640063 | CANNOT_FIND_PAYLOAD | 无法找到有效载荷 |  |  |
| 640064 | ACTION_EXECUTION_FAILED | 动作执行失败 |  |  |
| 640065 | USER_EXIT | 用户退出 |  |  |
| 640066 | USER_BREAK | 用户中断 |  |  |
| 640067 | USER_SET_GOHOME | 用户设置返航 |  |  |
| 640069 | TRAJ_JOB_EXIT_BUT_MIS_RUNNING | 轨迹任务退出但任务仍在运行 |  |  |
| 640083 | TRAJ_MAX_VEL_OUT_OF_RANGE | 最大速度超出范围 |  |  |
| 640084 | TRAJ_VEL_OUT_OF_RANGE | 速度超出范围 |  |  |
| 640086 | TRAJ_INVALID_YAW_MODE_IN_VERT_SEGM | 垂直段中的无效偏航模式 |  |  |
| 640087 | TRAJ_WP_BREAK_INFO_MISSION_ID_CHANGED | 航点中断信息任务ID已更改 |  |  |
| 640088 | TRAJ_WP_BREAK_INFO_PROGRESS_OUT_OF_RANGE | 航点中断信息进度超出范围 |  |  |
| 640089 | TRAJ_WP_BREAK_INFO_INVALID_MISSION_STATE | 航点中断信息任务状态无效 |  |  |
| 640090 | TRAJ_WP_BREAK_INFO_WP_INDEX_OUT_OF_RANGE | 航点中断信息航点索引超出范围 |  |  |
| 640139 | INTERRUPT_REASON_AVOID | 中断原因：避障 |  |  |
| 640140 | INTERRUPT_REASON_AVOID_RADIUS_LIMIT | 中断原因：避障半径限制 |  |  |
| 640153 | INVALID_INPUT_DATA_FC_LENGTH | 输入数据FC长度无效 |  |  |
| 640154 | INVALID_INPUT_DATA_FLOAT_NUMBER | 输入数据浮点数无效 |  |  |
| 640155 | INIT_MISSION_COUNT_OVER_RANGE | 初始化任务次数超出范围 |  |  |
| 640156 | INIT_MISSION_COUNT_TOO_LESS | 初始化任务次数太少 |  |  |
| 640157 | INIT_MISSION_END_INDEX_INVALID | 初始化任务结束索引无效 |  |  |
| 640158 | INIT_MISSION_GLOBAL_MAX_SPEED_INVALID | 初始化任务全局最大速度无效 |  |  |
| 640159 | INIT_MISSION_CRUISE_SPEED_INVALID | 初始化任务巡航速度无效 |  |  |
| 640160 | INIT_MISSION_GOTO_FIRST_WAYPOINT_INVALID | 初始化任务前往第一个航点无效 |  |  |
| 640241 | OVER_STOP_BY_USER | 任务因用户停止 |  |  |
| 640242 | OVER_ON_GROUND_MOTOR_ON | 任务因地面电机开启停止 |  |  |
| 640243 | OVER_AUTO_TAKEOFF_TIMEOUT | 任务因自动起飞超时停止 |  |  |
| 640244 | OVER_AUTO_TAKEOFF_FAIL_TO_ARRIVE_TARGET_HEIGHT | 任务因自动起飞未到达目标高度停止 |  |  |
| 640245 | OVER_AUTO_TAKEOFF_NOT_EXEC_OR_INTERRUPT | 任务因自动起飞未执行或中断停止 |  |  |
| 640246 | OVER_BY_HIGH_PRIORITY_MISSION | 任务因高优先级任务停止 |  |  |
| 640247 | OVER_UNKNOWN_REASON | 任务因未知原因停止 |  |  |
| 640248 | OVER_GS_FAIL_TO_GENERATE_TRAJ | 任务因GS生成轨迹失败停止 |  |  |

## 兼容大疆上云错误码

| 错误码 | 错误名称 | 描述 | 可能原因 | 排查方案 |
|--------|----------|------|----------|----------|
| 314010 | UNKNOWN_ROUTE_EXECUTION_FAILURE | 航线执行失败，请重启机场后重试航线未知原因 |  |  |
| 314013 | FLIGHT_MISSION_DOWNLOAD_FAILED | 飞行任务下发失败，机场无法获取到本次飞行任务的航线 |  |  |
| 314015 | FAILED_TO_TRANSMIT_PRECISION_PHOTO_ROUTE | 机场传输精准复拍航线至飞行器失败 |  |  |
| 314018 | RTK_POSITIONING_ERROR | RTK 定位异常 |  |  |
| 314019 | RTK_CANNOT_CONVERGE | RTK无法收敛 |  |  |
| 316009 | LOW_BATTERY_BELOW_30_PERCENT | 飞行器电量低于30% |  |  |
| 316020 | RTK_SIGNAL_SOURCE_ERROR | 飞行器使用的 RTK 信号源错误，请稍后重试 |  |  |
| 316026 | EMERGENCY_STOP_BUTTON_PRESSED | 机场急停按钮被按下 |  |  |
| 316026 | EMERGENCY_STOP_BUTTON_PRESSED_CANNOT_EXECUTE | 机场急停按钮被按下，无法执行飞行任务，请释放急停按钮后重试 |  |  |
| 321530 | FLIGHT_ROUTE_PLANNING_FAILED | 飞行航线过程中轨迹规划失败 |  |  |
| 321770 | WRONG_GEAR_POSITION | 飞行器挡位错误 |  |  |
| 321773 | LOW_BATTERY_RETURN_DURING_MISSION | 飞行器执行飞行任务过程中低电量返航 |  |  |
| 321775 | LOST_COMMUNICATION_DURING_FLIGHT | 飞行器航线飞行过程中失联 |  |  |
| 321784 | EMERGENCY_RETURN_DUE_TO_STRONG_WIND | 任务过程中遇到大风紧急返航 |  |  |
| 322282 | INTERRUPTED_BY_USER_TAKEOVER | 机场执行飞行任务过程中被中断，飞行器被云端用户或遥控器接管 |  |  |
| 322283 | USER_TRIGGERED_RETURN_DURING_MISSION | 机场执行飞行任务过程中被用户触发返航 |  |  |
| 322539 | ROUTE_BREAKPOINT_INFO_ERROR | 航线的断点信息错误 |  |  |
| 325003 | DEVICE_COMMAND_RESPONSE_ERROR | 设备端命令响应错误，请重试 |  |  |
| 325004 | DEVICE_COMMAND_REQUEST_TIMEOUT | 设备端命令请求已超时，请重试 |  |  |
| 326005 | ENHANCED_IMAGE_TRANSMISSION_FAILURE | 操作失败，增强图传无法建立连接，请检查 4G 信号强度，或咨询运营商查询套餐流量和 APN 设置 |  |  |
| 327013 | PARAMETER_SETTING_FAILURE | 参数设置失败，请稍后重试 |  |  |
| 336017 | INSUFFICIENT_BATTERY_FOR_MISSION | 飞行器电量不足以完成当前任务 |  |  |
| 514101 | PUSH_ROD_CLOSE_FAILURE | 推杆闭合失败 |  |  |
| 514102 | PUSH_ROD_OPEN_FAILURE | 推杆展开失败 |  |  |
| 514103 | BATTERY_BELOW_30_PERCENT_CANNOT_EXECUTE | 飞行器电量低于30%，无法执行飞行任务，请充电后重试（建议电量≥50%） |  |  |
| 514104 | BATTERY_START_CHARGING_FAILURE | 飞行器电池停止充电失败，请重启机场后重试 |  |  |
| 514105 | BATTERY_STOP_CHARGING_FAILURE | 飞行器电池停止充电失败，请重启机场后重试 |  |  |
| 514107 | HATCH_OPEN_FAILURE | 舱盖开启失败 |  |  |
| 514108 | HATCH_CLOSE_FAILURE | 舱盖关闭失败 |  |  |
| 514124 | FAILED_TO_GET_BATTERY_INFO | 获取飞行器电池信息失败 |  |  |
| 514134 | HEAVY_RAIN | 雨量过大 |  |  |
| 514135 | WIND_SPEED_OVER_12_MPS | 风速大于12m/s |  |  |
| 514136 | AIRPORT_POWER_DISCONNECTED | 机场供电断开，机场无法执行飞行任务，请恢复机场供电后重试 |  |  |
| 514142 | DRONE_NOT_IN_HANGAR | 无人机是否在舱 |  |  |
| 514142 | CANNOT_ESTABLISH_WIRED_CONNECTION | 飞行器起飞前，机场与飞行器无法建立有线连接，请检查飞行器是否在舱内，推杆闭合时是否被卡住，充电连接器是否脏污或损坏 |  |  |
| 514145 | ON_SITE_DEBUGGING_CANNOT_EXECUTE | 机场处于现场调试中，无法执行当前操作或执行飞行任务 |  |  |
| 514146 | REMOTE_DEBUGGING_CANNOT_EXECUTE | 机场处于远程调试中，无法执行飞行任务 |  |  |
| 514173 | WEATHER_CONDITIONS_PREVENT_FLIGHT | 由于天气原因（环境温度低于5度并且降雨大于等于中雨） |  |  |
| 610001 | REMOTE_CONTROLLER_BATTERY_BELOW_50_PERCENT | 遥控器电量低于50% |  |  |
| 610002 | PUSH_ROD_STATUS_NOT_OPEN | 推杆状态未开启 |  |  |
| 610003 | HATCH_STATUS_NOT_OPEN | 舱门状态未开启 |  |  |
| 610004 | REMOTE_CONTROLLER_START_FAILURE | 遥控器开启失败 |  |  |
| 610005 | RTK_CONFIGURATION_ERROR | RTK配置错误 |  |  |
| 610006 | GIMBAL_SELF_ROTATION_ERROR | 云台自转错误 |  |  |
| 610007 | PRE_FLIGHT_HMS_ERROR | 起飞前HMS出错 |  |  |
| 610008 | SIMULATED_FLIGHT_SETTING_FAILURE | 模拟飞行设置失败 |  |  |
| 610009 | GET_STORAGE_CONFIG_TIMES_FAILURE | 获取storage_config_times失败 |  |  |
| 610010 | GET_PHOTO_DOWNLOAD_LIST_FAILURE | 获取照片下载列表失败 |  |  |
| 610011 | DRONE_BATTERY_SELF_HEATING_FAILURE | 无人机电池自加热失败 |  |  |
| 610012 | NO_FREQUENCY_PAIRING | 没有对频 |  |  |
| 610013 | NOT_IN_HANGAR | 没有在机舱 |  |  |
| 610014 | JUMP_AIRPORT_PREPARATION_FAILURE | 跳飞机场准备失败 |  |  |
| 610015 | FLIGHTTASK_RESOURCE_GET_FAILURE | 任务资源获取失败 |  |  |

## 错误码使用说明

### 错误处理建议

1. **60XXXX系列错误**：主要涉及MSDK操作，建议检查飞行器状态、网络连接和参数设置
2. **62XXXX系列错误**：机场硬件控制问题，建议检查机场硬件状态和电源供应
3. **64XXXX系列错误**：飞行和航线执行问题，建议检查航线文件、飞行环境和安全设置
4. **其他错误码**：兼容大疆标准，按照大疆官方文档进行处理

### 常见错误处理流程

1. **记录错误码**：完整记录错误码和发生时的系统状态
2. **查找对应描述**：根据错误码查找具体的错误描述和原因
3. **分析可能原因**：结合系统状态分析最可能的原因
4. **执行排查方案**：按照排查方案逐步检查和处理
5. **验证修复结果**：确认问题是否已解决
6. **记录处理过程**：为后续类似问题提供参考

### 填写指南

本文档中的"可能原因"和"排查方案"列为空，供技术团队根据实际情况填写：

- **可能原因**：列出导致该错误的主要原因（建议1-3个）
- **排查方案**：提供具体的排查和解决步骤（建议1-3个步骤）

### 错误码分类处理策略

#### MSDK执行操作错误 (60XXXX)
- 重点检查硬件连接、系统状态、网络通信、文件格式、安全条件等

#### 机场控制错误 (62XXXX)
- 重点检查机械结构、电源供应、通信连接、硬件状态等

#### 飞行航线错误 (64XXXX)
- 重点检查飞行环境、安全条件、任务文件、系统准备等

#### 兼容大疆错误
- 按照大疆官方文档标准进行处理，重点检查环境条件、硬件状态、通信链路等

## 注意事项

1. 错误码列表基于当前版本，可能随软件更新而变化
2. 遇到未列出的错误码，请联系技术支持
3. 建议定期更新此文档以保持准确性
4. 部分错误码可能在不同场景下有不同的处理方式
5. 在处理错误时，建议先分析可能原因，再按照排查方案逐步处理
6. 对于重复出现的错误，建议记录处理过程，建立标准化处理流程

---

**技术支持联系方式**

- 官方网站：https://sb.im/
- GitHub组织：@sb-im

如需更多技术支持，请提供完整的错误码、系统状态和操作日志。
