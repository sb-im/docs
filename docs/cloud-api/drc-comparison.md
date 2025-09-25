---
sidebar_position: 5
---

# 指令飞行功能对比

本文档详细对比SuperDock系列产品与DJI机场在指令飞行功能方面的实现情况，严格基于DJI官方上云API指令飞行接口标准。

## 概述

指令飞行功能允许操作员通过云端远程控制飞行器的飞行动作、负载操作和实时监控，实现精确的无人机操控。SuperDock基于DJI上云API标准实现指令飞行功能，确保与DJI生态系统的兼容性。

## 指令飞行控制权限对比

### 1. 控制权抢夺

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 飞行控制权抢夺 | ✅ | ✅ **已实现**  | Method: flight_authority_grab |
| 负载控制权抢夺 | ✅ | ✅ **已实现**  | Method: payload_authority_grab |

### 2. DRC模式控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 进入指令飞行控制模式 | ✅ | ✅ **已实现**  | Method: drc_mode_enter |
| 退出指令飞行控制模式 | ✅ | ✅ **已实现**  | Method: drc_mode_exit |

## 飞行控制指令对比

### 1. 基础飞行控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 一键起飞 | ✅ | ✅ **已实现**  | Method: takeoff_to_point |
| 飞向目标点 | ✅ | ✅ **已实现**  | Method: fly_to_point |
| 结束飞向目标点任务 | ✅ | ✅ **已实现**  | Method: fly_to_point_stop |
| 更新飞向目标点 | ✅ | ❌ **未实现**  | Method: fly_to_point_update |

### 2. POI环绕控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 进入POI环绕模式 | ✅ | ❌ **未实现**  | Method: poi_mode_enter |
| 退出POI环绕模式 | ✅ | ❌ **未实现**  | Method: poi_mode_exit |
| POI环绕速度设置 | ✅ | ❌ **未实现**  | Method: poi_circle_speed_set |

### 3. DRC实时控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 飞行器实时控制 | ✅ |  ✅ **已实现**  | Method: drone_control |
| 飞行器急停 | ✅ |  ✅ **已实现**  | Method: drone_emergency_stop |
| DRC心跳 | ✅ |  ✅ **已实现**  | Method: heart_beat |

## 负载控制指令对比

### 1. 相机模式控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 切换相机模式 | ✅ |  ✅ **已实现**  | Method: camera_mode_switch |
| 开始拍照 | ✅ |  ✅ **已实现**  | Method: camera_photo_take |
| 停止拍照 | ✅ |  ✅ **已实现**  | Method: camera_photo_stop |
| 开始录像 | ✅ |  ✅ **已实现**  | Method: camera_recording_start |
| 停止录像 | ✅ |  ✅ **已实现**  | Method: camera_recording_stop |

### 2. 云台控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 画面拖动控制 | ✅ |  ✅ **已实现**  | Method: camera_screen_drag |
| 双击成为AIM | ✅ |  ✅ **已实现**  | Method: camera_aim |
| 重置云台 | ✅ |  ✅ **已实现**  | Method: gimbal_reset |
| Look At功能 | ✅ |  ✅ **已实现**  | Method: camera_look_at |

### 3. 相机参数控制

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 变焦控制 | ✅ |  ✅ **已实现**  | Method: camera_focal_length_set |
| 分屏控制 | ✅ | ❌ **未实现** | Method: camera_screen_split |
| 照片存储设置 | ✅ | ❌ **未实现** | Method: photo_storage_set |
| 视频存储设置 | ✅ | ❌ **未实现** | Method: video_storage_set |

### 4. 相机曝光和对焦

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 曝光模式设置 | ✅ | ❌ **未实现** | Method: camera_exposure_mode_set |
| 曝光值调节 | ✅ | ❌ **未实现** | Method: camera_exposure_set |
| 对焦模式设置 | ✅ | ❌ **未实现** | Method: camera_focus_mode_set |
| 对焦值设置 | ✅ | ❌ **未实现** | Method: camera_focus_value_set |
| 点对焦 | ✅ | ✅ **已实现**  | Method: camera_point_focus_action |

### 5. 红外测温功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 红外测温模式设置 | ✅ | ✅ **已实现**  | Method: ir_metering_mode_set |
| 红外测温点设置 | ✅ | ✅ **已实现**  | Method: ir_metering_point_set |
| 红外测温区域设置 | ✅ | ✅ **已实现**  | Method: ir_metering_area_set |

## 状态监控和事件上报对比

### 1. 飞行状态事件

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| flyto执行结果事件通知 | ✅ | ✅ **已实现**  | Method: fly_to_point_progress |
| 一键起飞结果事件通知 | ✅ | ✅ **已实现**  | Method: takeoff_to_point_progress |
| DRC链路状态通知 | ✅ | ✅ **已实现**  | Method: drc_status_notify |
| Joystick控制无效原因通知 | ✅ | ❌ **未实现** | Method: joystick_invalid_notify |
| POI环绕状态信息通知 | ✅ | ❌ **未实现** | Method: poi_status_notify |

### 2. 负载状态事件

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 拍照进度上报 | ✅ | ❌ **未实现** | Method: camera_photo_take_progress |

### 3. DRC实时数据上报

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|----------|------|
| 避障信息上报 | ✅ | ❌ **未实现** | Method: hsi_info_push |
| 图传链路延时信息上报 | ✅ | ❌ **未实现** | Method: delay_info_push |
| 高频OSD信息上报 | ✅ | ✅ **已实现** | Method: osd_info_push |

## MQTT主题结构对比

### 1. 服务调用主题

| 接口类型 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 服务调用 | ✅ | ✅ **已实现**   | Topic: thing/product/\{sn\}/services |
| 服务响应 | ✅ | ✅ **已实现**   | Topic: thing/product/\{sn\}/services_reply |
| 事件上报 | ✅ | ✅ **已实现**   | Topic: thing/product/\{sn\}/events |

### 2. DRC专用主题

| 接口类型 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| DRC指令下发 | ✅ | ✅ **已实现**  | Topic: thing/product/\{sn\}/drc/down |
| DRC指令响应 | ✅ | ✅ **已实现**  | Topic: thing/product/\{sn\}/drc/up |

## 功能实现说明

### 图例说明

- ✅ **已实现** - 功能已完全实现并测试验证
- ⚠️ **部分实现** - 功能部分实现或有限制条件
- 🔄 **开发中** - 功能正在开发中，预计近期发布
- ❌ **未实现** - 功能暂未实现
- 🚀 **增强实现** - 在DJI标准基础上提供增强功能
- 待填写 - 请根据实际情况填写状态

## 总结

完成填写后，本文档将清晰展示SuperDock与DJI机场在指令飞行功能方面的详细对比，帮助：

1. **开发团队** - 了解指令飞行功能实现进度和差距
2. **测试团队** - 制定针对性的飞行测试计划
3. **客户** - 评估产品的远程操控能力
4. **技术支持** - 提供准确的功能说明和使用指导

---

## 维护说明

1. 请根据最新的产品功能状态定期更新此文档
2. 如有新增指令飞行功能，请及时添加到对应模块
3. 建议每个版本发布前review此文档的准确性
4. 与DJI API更新保持同步，及时调整对比内容
5. 定期进行实际飞行测试验证文档内容的准确性
