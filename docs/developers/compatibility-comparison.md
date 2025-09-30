---
id: compatibility-comparison
title: 支持上云API功能对比
sidebar_label: 支持上云API功能对比
sidebar_position: 3
description: SuperDock系列产品与DJI机场在上云API功能方面的差异对比
---

# 支持上云API功能对比

## 概述

本文档对比 SuperDock 系列产品与 DJI 机场在上云API功能方面的差异，基于 DJI 上云 API 标准，帮助开发者了解产品的功能差异点。
本文档以DJI Dock2机场为基础进行差异比较。

### 参考

DJI的功能集合: 
[机场接口实现](https://developer.dji.com/doc/cloud-api-tutorial/cn/tutorial-map.html#功能集合) 

DJI Dock2机场功能点参考:
[直播功能](https://developer.dji.com/doc/cloud-api-tutorial/cn/api-reference/dock-to-cloud/mqtt/dock/dock2/live.html) 
[航线功能](https://developer.dji.com/doc/cloud-api-tutorial/cn/api-reference/dock-to-cloud/mqtt/dock/dock2/wayline.html) 
[远程调试](https://developer.dji.com/doc/cloud-api-tutorial/cn/api-reference/dock-to-cloud/mqtt/dock/dock2/cmd.html) 
[指令飞行](https://developer.dji.com/doc/cloud-api-tutorial/cn/api-reference/dock-to-cloud/mqtt/dock/dock2/drc.html) 
[PSDK功能](https://developer.dji.com/doc/cloud-api-tutorial/cn/api-reference/dock-to-cloud/mqtt/dock/dock2/psdk.html) 

## 图例说明

- ✅ **已实现** - 功能已完全实现并测试验证
- ⚠️ **部分实现** - 功能部分实现或有限制条件
- 🔄 **开发中** - 功能正在开发中，预计近期发布
- ❌ **未实现** - 功能暂未实现
- 🚀 **增强实现** - 在 DJI 标准基础上提供增强功能

## 功能差异对比

### SuperDock 独有功能

| 具体功能        | DJI机场 | SuperDock | 备注 |
|-------------|---------|----------|------|
| 增强图传模块在线认证  | ❌ | ✅ | 新加接口 |
| 切换无人机RTK信息  | ❌ | ✅ | 新加接口 |
| 机场第三方载荷定制流程 | ❌ | 🚀 | 云端API（MQTT） |
| 第三方喊话器      | ❌ | 🚀 | 云端API（MQTT） |
| 第三方探照灯      | ❌ | 🚀 | 云端API（MQTT） |


### SuperDock 部分实现的功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|----------|------|
| 使用设备绑定码绑定对应组织 | ✅ | 🔄 | 云端API（MQTT） |
| 开始直播 | ✅ | ⚠️ | 直播推流模式只支持 rtmp 和 whip |
| 设置直播清晰度 | ✅ | ⚠️ | 机场的直播视频流无法设置直播清晰度 |

### SuperDock 未实现的功能

#### 机场核心功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|----------|------|
| 固件升级进度 | ✅ | ❌ | 云端API（MQTT） |
| 固件升级 | ✅ | ❌ | 云端API（MQTT） |
| 获取设备可上传的文件列表 | ✅ | ❌ | 云端API（MQTT） |
| 发起日志文件上传 | ✅ | ❌ | 云端API（MQTT） |

#### 远程调试功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|----------|------|
| 强制关舱盖 | ✅ | ❌ | Method: cover_force_close |
| 补光灯开启 | ✅ | ❌ | Method: supplement_light_open |
| 补光灯关闭 | ✅ | ❌ | Method: supplement_light_close |
| 电池保养状态切换 | ✅ | ❌ | Method: battery_maintenance_switch |
| 电池运行模式切换 | ✅ | ❌ | Method: battery_store_mode_switch |
| 空调工作模式切换 | ✅ | ❌ | Method: air_conditioner_mode_switch |
| 声光报警开关 | ✅ | ❌ | Method: alarm_state_switch |
| eSIM激活 | ✅ | ❌ | Method: esim_activate |
| eSIM和SIM切换 | ✅ | ❌ | Method: sim_slot_switch |
| eSIM运营商切换 | ✅ | ❌ | Method: esim_operator_switch |
| 飞行器数据格式化 | ✅ | ❌ | 起飞前会自动格式化无人机 |
| 机场数据格式化 | ✅ | ❌ | 自动定时清理数据 |

#### 指令飞行功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|----------|------|
| 更新飞向目标点 | ✅ | ❌ | Method: fly_to_point_update |
| 进入POI环绕模式 | ✅ | ❌ | Method: poi_mode_enter |
| 退出POI环绕模式 | ✅ | ❌ | Method: poi_mode_exit |
| POI环绕速度设置 | ✅ | ❌ | Method: poi_circle_speed_set |
| 分屏控制 | ✅ | ❌ | Method: camera_screen_split |
| 照片存储设置 | ✅ | ❌ | Method: photo_storage_set |
| 视频存储设置 | ✅ | ❌ | Method: video_storage_set |
| 曝光模式设置 | ✅ | ❌ | Method: camera_exposure_mode_set |
| 曝光值调节 | ✅ | ❌ | Method: camera_exposure_set |
| 对焦模式设置 | ✅ | ❌ | Method: camera_focus_mode_set |
| 对焦值设置 | ✅ | ❌ | Method: camera_focus_value_set |
| Joystick控制无效原因通知 | ✅ | ❌ | Method: joystick_invalid_notify |
| POI环绕状态信息通知 | ✅ | ❌ | Method: poi_status_notify |
| 拍照进度上报 | ✅ | ❌ | Method: camera_photo_take_progress |
| 避障信息上报 | ✅ | ❌ | Method: hsi_info_push |
| 图传链路延时信息上报 | ✅ | ❌ | Method: delay_info_push |
