---
sidebar_position: 4
---

# 远程调试功能对比

本文档详细对比SuperDock系列产品与DJI机场在远程调试功能方面的实现情况，严格基于DJI官方上云API远程调试接口标准。

## 概述

远程调试功能允许操作员在云端远程控制机场和飞行器的各种操作，实现无人值守的调试和维护。SuperDock基于DJI上云API标准实现远程调试功能，确保与DJI生态系统的兼容性。

## 远程调试命令对比

### 1. 飞行器控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 飞行器开机 | ✅ | ✅ **已实现**  | Method: drone_open |
| 飞行器关机 | ✅ | ✅ **已实现**  | Method: drone_close |

### 2. 机场硬件控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|-------|---------|-----------|------|
| 机场重启 | ✅ | ✅ **已实现**  | Method: device_reboot |
| 舱盖开启 | ✅ | ✅ **已实现**  | Method: cover_open |
| 舱盖关闭 | ✅ | ✅ **已实现**  | Method: cover_close |
| 推杆展开| ✅ | ✅ **已实现**  | Method: putter_open |
| 推杆展开| ✅ | ✅ **已实现**  | Method: putter_close |
| 强制关舱盖 | ✅ | ❌ **未实现**  | Method: cover_force_close |
| 充电开启 | ✅ | ✅ **已实现**  | Method: charge_open |
| 充电关闭 | ✅ | ✅ **已实现**  | Method: charge_close |

### 3. 机场功能控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 补光灯开启 | ✅ |  ❌ **未实现**  | Method: supplement_light_open |
| 补光灯关闭 | ✅ |  ❌ **未实现**  | Method: supplement_light_close |
| 调试模式开启 | ✅ | ✅ **已实现**  | Method: debug_mode_open |
| 调试模式关闭 | ✅ | ✅ **已实现**  | Method: debug_mode_close |

### 4. 电池管理命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 电池保养状态切换 | ✅ | ❌ **未实现**  | Method: battery_maintenance_switch |
| 电池运行模式切换 | ✅ | ❌ **未实现**  | Method: battery_store_mode_switch |

### 5. 机场环境控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 空调工作模式切换 | ✅ |  ❌ **未实现**  | Method: air_conditioner_mode_switch |
| 声光报警开关 | ✅ |  ❌ **未实现**  | Method: alarm_state_switch |

### 6. 通信功能控制命令

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 增强图传开关 | ✅ | ✅ **已实现** | Method: sdr_workmode_switch |
| eSIM激活 | ✅ |  ❌ **未实现**  | Method: esim_activate |
| eSIM和SIM切换 | ✅ |  ❌ **未实现**  | Method: sim_slot_switch |
| eSIM运营商切换 | ✅ |  ❌ **未实现**  | Method: esim_operator_switch |

## 远程调试任务对比

### 1. 格式化任务

| 具体功能 | DJI机场 | SuperDock | 备注                                |
|---------|---------|-----------|-----------------------------------|
| 飞行器数据格式化 | ✅ | ❌ **未实现** | Method: drone_format 起飞前会自动格式化无人机 |
| 机场数据格式化 | ✅ | ❌ **未实现** | Method: device_format 自动定时清理数据    |

## 远程调试进度监控对比

### 1. 进度上报功能

| 具体功能 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 命令执行进度上报 | ✅ | ✅ **已实现** | Topic: thing/product/\{sn\}/events |
| 任务执行进度上报 | ✅ | ✅ **已实现** | Topic: thing/product/\{sn\}/events |
| 进度确认回复 | ✅ | ✅ **已实现** | Topic: thing/product/\{sn\}/events_reply |

### 2. 进度状态类型

| 进度状态 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 已下发 (sent) | ✅ | ✅ **已实现** | Status: sent |
| 执行中 (in_progress) | ✅ | ✅ **已实现** | Status: in_progress |
| 执行成功 (ok) | ✅ | ✅ **已实现** | Status: ok |
| 执行失败 (failed) | ✅ | ✅ **已实现** | Status: failed |
| 取消或终止 (canceled) | ✅ | ✅ **已实现** | Status: canceled |
| 暂停 (paused) | ✅ | ✅ **已实现** | Status: paused |
| 拒绝 (rejected) | ✅ | ✅ **已实现** | Status: rejected |
| 超时 (timeout) | ✅ | ✅ **已实现** | Status: timeout |

## API接口实现对比

### 1. MQTT主题结构

| 接口类型 | DJI机场 | SuperDock | 备注 |
|---------|---------|-----------|------|
| 服务调用 | ✅ | ✅ **已实现** | Topic: thing/product/\{sn\}/services |
| 服务响应 | ✅ | ✅ **已实现** | Topic: thing/product/\{sn\}/services_reply |
| 进度上报 | ✅ | ✅ **已实现** | Topic: thing/product/\{sn\}/events |


## 功能实现说明

### 图例说明

- ✅ **已实现** - 功能已完全实现并测试验证
- ⚠️ **部分实现** - 功能部分实现或有限制条件
- 🔄 **开发中** - 功能正在开发中，预计近期发布
- ❌ **未实现** - 功能暂未实现
- 🚀 **增强实现** - 在DJI标准基础上提供增强功能
- 待填写 - 请根据实际情况填写状态

## 总结

完成填写后，本文档将清晰展示SuperDock与DJI机场在远程调试功能方面的详细对比，帮助：

1. **开发团队** - 了解功能实现进度和差距
2. **测试团队** - 制定针对性的测试计划
3. **客户** - 评估产品的远程调试能力
4. **技术支持** - 提供准确的功能说明

---

## 维护说明

1. 请根据最新的产品功能状态定期更新此文档
2. 如有新增远程调试功能，请及时添加到对应模块
3. 建议每个版本发布前review此文档的准确性
4. 与DJI API更新保持同步，及时调整对比内容
