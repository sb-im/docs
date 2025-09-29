---
id: compatibility-comparison
title: 支持上云API功能对比
sidebar_label: 支持上云API功能对比
sidebar_position: 3
description: SuperDock系列产品与上云API在各项功能方面的详细对比分析
---

# 支持上云API功能对比

## 概述

本文档详细对比 SuperDock 系列产品与上云API在各项功能方面的实现情况，基于 DJI 上云 API 标准，帮助开发者和用户了解产品的兼容性和功能差异。

### 参考:
DJI的功能集合[机场接口实现](https://developer.dji.com/doc/cloud-api-tutorial/cn/tutorial-map.html#功能集合)


## 图例说明

- ✅ **已实现** - 功能已完全实现并测试验证
- ⚠️ **部分实现** - 功能部分实现或有限制条件
- 🔄 **开发中** - 功能正在开发中，预计近期发布
- ❌ **未实现** - 功能暂未实现
- 🚀 **增强实现** - 在 DJI 标准基础上提供增强功能

## 一、机场核心功能对比

### 1.1 机场与云端连接

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|----------|------|
| 获取设备绑定信息 | ✅ | ✅ | 云端API（MQTT） |
| 查询设备绑定对应的组织信息 | ✅ | ✅ | 云端API（MQTT） |
| 使用设备绑定码绑定对应组织 | ✅ | 🔄 | 云端API（MQTT） |

### 1.2 设备管理

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 设备属性推送 | ✅ | ✅ | 云端API（MQTT） |
| 设备拓扑更新 | ✅ | ✅ | 云端API（MQTT） |
| 设备属性设置 | ✅ | ✅ | 云端API（MQTT） |

### 1.3 直播功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 直播能力更新 | ✅ | ✅ | 云端API（MQTT） |
| 开始直播 | ✅ | ⚠️ | 直播推流模式只支持 rtmp 和 whip |
| 停止直播 | ✅ | ✅ | 云端API（MQTT） |
| 设置直播清晰度 | ✅ | ⚠️ | 机场的直播视频流无法设置直播清晰度 |
| 设置直播镜头 | ✅ | ✅ | 云端API（MQTT） |

### 1.4 媒体管理

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 获取上传临时凭证 | ✅ | ✅ | 云端API（MQTT） |
| 媒体文件上传结果上报 | ✅ | ✅ | 云端API（MQTT） |

### 1.5 航线管理

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 创建航线任务(废弃) | ✅ | ❌ | 云端API（MQTT），已废弃 |
| 上报飞行任务进度和状态 | ✅ | ✅ | 云端API（MQTT） |
| 下发任务 | ✅ | ✅ | 云端API（MQTT） |
| 执行任务 | ✅ | ✅ | 云端API（MQTT） |
| 取消任务 | ✅ | ✅ | 云端API（MQTT） |
| 任务资源获取 | ✅ | ✅ | 云端API（MQTT） |

### 1.6 HMS功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 健康告警 | ✅ | ✅ | 无人机的HMS一致，机场的HMS有差异 |

### 1.7 固件升级

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 固件升级进度 | ✅ | ❌ | 云端API（MQTT） |
| 固件升级 | ✅ | ❌ | 云端API（MQTT） |

### 1.8 远程日志

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 获取设备可上传的文件列表 | ✅ | ❌ | 云端API（MQTT） |
| 发起日志文件上传 | ✅ | ❌ | 云端API（MQTT） |
| 上传状态更新 | ✅ | ✅ | 云端API（MQTT） |
| 文件上传进度通知 | ✅ | ✅ | 云端API（MQTT） |

## 二、远程调试功能对比

### 2.1 飞行器控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 飞行器开机 | ✅ | ✅ | Method: drone_open |
| 飞行器关机 | ✅ | ✅ | Method: drone_close |

### 2.2 机场硬件控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 机场重启 | ✅ | ✅ | Method: device_reboot |
| 舱盖开启 | ✅ | ✅ | Method: cover_open |
| 舱盖关闭 | ✅ | ✅ | Method: cover_close |
| 推杆展开 | ✅ | ✅ | Method: putter_open |
| 推杆收回 | ✅ | ✅ | Method: putter_close |
| 强制关舱盖 | ✅ | ❌ | Method: cover_force_close |
| 充电开启 | ✅ | ✅ | Method: charge_open |
| 充电关闭 | ✅ | ✅ | Method: charge_close |

### 2.3 机场功能控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 补光灯开启 | ✅ | ❌ | Method: supplement_light_open |
| 补光灯关闭 | ✅ | ❌ | Method: supplement_light_close |
| 调试模式开启 | ✅ | ✅ | Method: debug_mode_open |
| 调试模式关闭 | ✅ | ✅ | Method: debug_mode_close |

### 2.4 电池管理命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 电池保养状态切换 | ✅ | ❌ | Method: battery_maintenance_switch |
| 电池运行模式切换 | ✅ | ❌ | Method: battery_store_mode_switch |

### 2.5 机场环境控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 空调工作模式切换 | ✅ | ❌ | Method: air_conditioner_mode_switch |
| 声光报警开关 | ✅ | ❌ | Method: alarm_state_switch |

### 2.6 通信功能控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 增强图传开关 | ✅ | ✅ | Method: sdr_workmode_switch |
| eSIM激活 | ✅ | ❌ | Method: esim_activate |
| eSIM和SIM切换 | ✅ | ❌ | Method: sim_slot_switch |
| eSIM运营商切换 | ✅ | ❌ | Method: esim_operator_switch |

### 2.7 格式化任务

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 飞行器数据格式化 | ✅ | ❌ | 起飞前会自动格式化无人机 |
| 机场数据格式化 | ✅ | ❌ | 自动定时清理数据 |

### 2.8 进度监控

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 命令执行进度上报 | ✅ | ✅ | Topic: thing/product/\{sn\}/events |
| 任务执行进度上报 | ✅ | ✅ | Topic: thing/product/\{sn\}/events |
| 进度确认回复 | ✅ | ✅ | Topic: thing/product/\{sn\}/events_reply |

## 三、指令飞行功能对比

### 3.1 控制权限管理

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 飞行控制权抢夺 | ✅ | ✅ | Method: flight_authority_grab |
| 负载控制权抢夺 | ✅ | ✅ | Method: payload_authority_grab |
| 进入指令飞行控制模式 | ✅ | ✅ | Method: drc_mode_enter |
| 退出指令飞行控制模式 | ✅ | ✅ | Method: drc_mode_exit |

### 3.2 基础飞行控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 一键起飞 | ✅ | ✅ | Method: takeoff_to_point |
| 飞向目标点 | ✅ | ✅ | Method: fly_to_point |
| 结束飞向目标点任务 | ✅ | ✅ | Method: fly_to_point_stop |
| 更新飞向目标点 | ✅ | ❌ | Method: fly_to_point_update |
| 飞行器实时控制 | ✅ | ✅ | Method: drone_control |
| 飞行器急停 | ✅ | ✅ | Method: drone_emergency_stop |
| DRC心跳 | ✅ | ✅ | Method: heart_beat |

### 3.3 POI环绕控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 进入POI环绕模式 | ✅ | ❌ | Method: poi_mode_enter |
| 退出POI环绕模式 | ✅ | ❌ | Method: poi_mode_exit |
| POI环绕速度设置 | ✅ | ❌ | Method: poi_circle_speed_set |

### 3.4 相机模式控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 切换相机模式 | ✅ | ✅ | Method: camera_mode_switch |
| 开始拍照 | ✅ | ✅ | Method: camera_photo_take |
| 停止拍照 | ✅ | ✅ | Method: camera_photo_stop |
| 开始录像 | ✅ | ✅ | Method: camera_recording_start |
| 停止录像 | ✅ | ✅ | Method: camera_recording_stop |

### 3.5 云台控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 画面拖动控制 | ✅ | ✅ | Method: camera_screen_drag |
| 双击成为AIM | ✅ | ✅ | Method: camera_aim |
| 重置云台 | ✅ | ✅ | Method: gimbal_reset |
| Look At功能 | ✅ | ✅ | Method: camera_look_at |

### 3.6 相机参数控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 变焦控制 | ✅ | ✅ | Method: camera_focal_length_set |
| 分屏控制 | ✅ | ❌ | Method: camera_screen_split |
| 照片存储设置 | ✅ | ❌ | Method: photo_storage_set |
| 视频存储设置 | ✅ | ❌ | Method: video_storage_set |

### 3.7 相机曝光和对焦

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 曝光模式设置 | ✅ | ❌ | Method: camera_exposure_mode_set |
| 曝光值调节 | ✅ | ❌ | Method: camera_exposure_set |
| 对焦模式设置 | ✅ | ❌ | Method: camera_focus_mode_set |
| 对焦值设置 | ✅ | ❌ | Method: camera_focus_value_set |
| 点对焦 | ✅ | ✅ | Method: camera_point_focus_action |

### 3.8 红外测温功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 红外测温模式设置 | ✅ | ✅ | Method: ir_metering_mode_set |
| 红外测温点设置 | ✅ | ✅ | Method: ir_metering_point_set |
| 红外测温区域设置 | ✅ | ✅ | Method: ir_metering_area_set |

### 3.9 状态监控和事件上报

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| flyto执行结果事件通知 | ✅ | ✅ | Method: fly_to_point_progress |
| 一键起飞结果事件通知 | ✅ | ✅ | Method: takeoff_to_point_progress |
| DRC链路状态通知 | ✅ | ✅ | Method: drc_status_notify |
| Joystick控制无效原因通知 | ✅ | ❌ | Method: joystick_invalid_notify |
| POI环绕状态信息通知 | ✅ | ❌ | Method: poi_status_notify |
| 拍照进度上报 | ✅ | ❌ | Method: camera_photo_take_progress |

### 3.10 DRC实时数据上报

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 避障信息上报 | ✅ | ❌ | Method: hsi_info_push |
| 图传链路延时信息上报 | ✅ | ❌ | Method: delay_info_push |
| 高频OSD信息上报 | ✅ | ✅ | Method: osd_info_push |

## 四、MQTT 接口实现对比

### 4.1 标准 MQTT 主题

| 接口类型 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 服务调用 | ✅ | ✅ | Topic: thing/product/\{sn\}/services |
| 服务响应 | ✅ | ✅ | Topic: thing/product/\{sn\}/services_reply |
| 事件上报 | ✅ | ✅ | Topic: thing/product/\{sn\}/events |
| 进度上报 | ✅ | ✅ | Topic: thing/product/\{sn\}/events |

### 4.2 DRC 专用主题

| 接口类型 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| DRC指令下发 | ✅ | ✅ | Topic: thing/product/\{sn\}/drc/down |
| DRC指令响应 | ✅ | ✅ | Topic: thing/product/\{sn\}/drc/up |
