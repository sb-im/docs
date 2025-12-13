---
sidebar_position: 1
---
# 设备类型和机型列表

本文档提供 DJI 及SuperDock支持的所有设备类型和机型的完整参考，包括无人机、负载、遥控器和机场设备。

## 设备类型说明

设备类型通过以下字段标识：

- `domain`: 设备域（0=无人机, 1=负载, 2=遥控器, 3=机场）
- `type`: 设备类型代码
- `sub_type`: 设备子类型代码
- `node_type`: 节点类型（uav/camera/rc/dock）

## 无人机 (UAV) - Domain 0

| 机型 | Domain | Type | Sub Type | 全称 | 说明                           |
|------|--------|------|----------|------|------------------------------|
| M400 | 0 | 103 | 0 | Matrice 400 | DJI Matrice 400                         |
| M350 | 0 | 89 | 0 | Matrice 350 RTK | DJI Matrice 350 RTK          |
| M300 | 0 | 60 | 0 | Matrice 300 RTK | DJI Matrice 300 RTK          |
| M30 | 0 | 67 | 0 | Matrice 30 | DJI Matrice 30               |
| M30T | 0 | 67 | 1 | Matrice 30T | DJI Matrice 30T              |
| M3E | 0 | 77 | 0 | Mavic 3 Enterprise | DJI Mavic 3 Enterprise       |
| M3T | 0 | 77 | 1 | Mavic 3 Thermal | DJI Mavic 3 Thermal          |
| M3M | 0 | 77 | 2 | Mavic 3 Multispectral | DJI Mavic 3 Multispectral    |
| M3TA | 0 | 77 | 3 | Mavic 3 Thermal Advanced | DJI Mavic 3 Thermal Advanced |
| M3D | 0 | 91 | 0 | Matrice 3D | DJI Matrice 3D               |
| M3TD | 0 | 91 | 1 | Matrice 3TD | DJI Matrice 3TD              |
| M4D | 0 | 100 | 0 | Matrice 4D | DJI Matrice 4D               |
| M4TD | 0 | 100 | 1 | Matrice 4TD | DJI Matrice 4TD              |
| M4E | 0 | 99 | 0 | Matrice 4E | DJI Matrice 4E               |
| M4T | 0 | 99 | 1 | Matrice 4T | DJI Matrice 4T               |

## 负载设备 (Camera) - Domain 1

### 专业负载

| 负载名称 | Domain | Type | Sub Type | 说明 |
|----------|--------|------|----------|------|
| Z30 | 1 | 20 | 0 | Z30 |
| XT2 | 1 | 26 | 0 | XT2 |
| XTS | 1 | 41 | 0 | XTS |
| H20 | 1 | 42 | 0 | H20 |
| H20T | 1 | 43 | 0 | H20T |
| H20N | 1 | 61 | 0 | H20N |
| H30 | 1 | 82 | 0 | H30  |
| H30T | 1 | 83 | 0 |  H30T |
| L1 | 1 | 50 | 0 |  L1  |
| L2 | 1 | 84 | 0 |  L2  |
| P1 | 1 | 100000 | 0 |  P1  |

### 集成相机

| 相机名称 | Domain | Type | Sub Type | 说明 | 云台位置 |
|----------|--------|------|----------|------|----------|
| M30 Camera | 1 | 52 | 0 | Matrice 30 集成相机 | 主云台(0) |
| M30T Camera | 1 | 53 | 0 | Matrice 30T 集成相机 | 主云台(0) |
| M3E Camera | 1 | 66 | 0 | Mavic 3 Enterprise 相机 | 主云台(0) |
| M3T Camera | 1 | 67 | 0 | Mavic 3 Thermal 相机 | 主云台(0) |
| M3M Camera | 1 | 68 | 0 | Mavic 3 Multispectral 相机 | 主云台(0) |
| M3TA Camera | 1 | 129 | 0 | Mavic 3 Thermal Advanced 相机 | 主云台(0) |
| M3D Camera | 1 | 80 | 0 | Matrice 3D 相机 | 主云台(0) |
| M3TD Camera | 1 | 81 | 0 | Matrice 3TD 相机 | 主云台(0) |
| M4D Camera | 1 | 98 | 0 | Matrice 4D 相机 | 主云台(0) |
| M4TD Camera | 1 | 99 | 0 | Matrice 4TD 相机 | 主云台(0) |
| M4E Camera | 1 | 88 | 0 | Matrice 4E 相机 | 主云台(0) |
| M4T Camera | 1 | 89 | 0 | Matrice 4T 相机 | 主云台(0) |

### FPV 相机

| 相机名称 | Domain | Type | Sub Type | 说明 | 云台位置 |
|----------|--------|------|----------|------|----------|
| FPV | 1 | 39 | 0 | FPV 相机 | FPV位置(7) |

### 辅助相机

| 相机名称 | Domain | Type | Sub Type | 说明      | 云台位置 |
|----------|--------|------|----------|---------|----------|
| 辅助影像 | 1 | 176 | 0 | 无人机辅助影像 | 辅助位置(10000) |

### 其他负载

| 负载名称 | Domain | Type | Sub Type | 说明 |
|----------|--------|------|----------|------|
| PAYLOAD | 1 | 31 | 0 | 通用负载 |
| DJI_MINI_3_PRO | 1 | 60 | 0 | Mini 3 Pro 相机 |
| DJI_MINI_3 | 1 | 76 | 0 | Mini 3 相机 |
| Dock Camera | 1 | 165 | 0 | 机场相机 |
| NOT_SUPPORTED | 1 | 65535 | 0 | 不支持的负载 |

## 遥控器 (RC) - Domain 2

| 遥控器名称 | Domain | Type | Sub Type | 说明 | 支持机型 |
|------------|--------|------|----------|------|----------|
| RC | 2 | 56 | 0 | DJI 带屏遥控器行业版 | Matrice 300 RTK |
| RC Plus | 2 | 119 | 0 | DJI RC Plus | M350 RTK、M300 RTK、M30/M30T |
| RC Plus 2 | 2 | 174 | 0 | DJI RC Plus 2 | Matrice 4 系列 |
| RC Pro 行业版 | 2 | 144 | 0 | DJI RC Pro 行业版 | Mavic 3 行业系列 |

## 机场设备 (Dock) - Domain 3

### DJI 官方机场

| 机场名称 | Domain | Type | Sub Type | 说明 |
|----------|--------|------|----------|------|
| Dock | 3 | 1 | 0 | 大疆机场 |
| Dock 2 | 3 | 2 | 0 | 大疆机场 2 |
| Dock 3 | 3 | 3 | 0 | 大疆机场 3 |

### SuperDock 系列机场

| 机场名称     | Domain | Type  | Sub Type | 说明           |
|----------|--------|-------|----------|--------------|
| S22M300  | 3 | 88097 | 0 | M300 机场      |
| S2201    | 3 | 88098 | 0 | 机场 2         |
| S2301    | 3 | 88099 | 0 | M3 机场        |
| S24M350  | 3 | 88100 | 0 | M350 机场-24   |
| S24M350S | 3 | 88101 | 0 | M350 换电机场-24 |
| S24M3    | 3 | 88102 | 0 | M3 机场-24     |
| S24M4    | 3 | 88103 | 0 | M4 机场-24     |
| S25M4    | 3 | 88104 | 0 | M4 机场-25     |
| S25M400  | 3 | 88105 | 0 | M400 充电机场-25 |
| S25M400Pro  | 3 | 88106 | 0 | M400 换电机场-25 |

## 云台位置说明

### Gimbal Index 定义

云台索引（Component Index）用于标识无人机上不同位置的云台和相机设备。

| Index 值 | 标识符 | 说明 | 适用场景                  |
|---------|--------|------|-----------------------|
| 0 | LEFT_OR_MAIN | 左云台或主云台 | M300 RTK 为左云台，其他机型为主云台 |
| 1 | RIGHT | 右云台 | M300 RTK、M350 RTK 等多云台机型 |
| 2 | UP | 上云台 | M300 RTK、M350 RTK 等支持上置云台的机型 |
| 3 | INDEX_3 | 预留索引 3 | 其他机型扩展使用                  |
| 4 | UP_TYPE_C | Type-C 上置云台 | 支持 Type-C 接口的上置云台     |
| 5 | UP_TYPE_C_EXT_ONE | Type-C 扩展云台 1 | Type-C 扩展云台位置         |
| 6 | INDEX_6 | 预留索引 6 | 其他机型扩展使用              |
| 7 | FPV | FPV 相机 | 飞行视角相机                |
| 8 | INDEX_8 | 预留索引 8 | 其他机型扩展使用              |
| 9 | INDEX_9 | 预留索引 9 | 其他机型扩展使用              |
| 10 | INDEX_10 | 预留索引 10 | 其他机型扩展使用              |
| 11 | INDEX_11 | 预留索引 11 | 其他机型扩展使用              |
| 12 | INDEX_12 | 预留索引 12 | 其他机型扩展使用              |
| 65534 | AGGREGATION | AGGREGATION | AGGREGATION                    |
| 10000 | VISION_ASSIST | 视觉辅助系统 | 视觉辅助系统             |
| 20001 | PORT_1 | 端口 1 | M400扩展端口设备            |
| 20002 | PORT_2 | 端口 2 | M400扩展端口设备            |
| 20003 | PORT_3 | 端口 3 | M400扩展端口设备            |
| 20004 | PORT_4 | 端口 4 | M400扩展端口设备            |
| 20005 | PORT_5 | 端口 5 | M400扩展端口设备            |
| 20006 | PORT_6 | 端口 6 | M400扩展端口设备            |
| 20007 | PORT_7 | 端口 7 | M400扩展端口设备            |
| 20008 | PORT_8 | 端口 8 | M400扩展端口设备            |
| 65535 | UNKNOWN | 未知设备 | 无法识别的设备类型             |

**常用索引说明：**

- **单云台机型**（M3系列/M30系列/M4系列 等）：通常只使用索引 `0`（主云台）、`7`（FPV）或 `10000`（VISION_ASSIST）
- **多云台机型**（M300 RTK/M350 RTK）：可使用索引 `0`（左）、`1`（右）、`2`（上）和 `7`（FPV）。
- **多负载机型**（M400）： 可使用索引`20001`至索引`20008`，不同的负载可根据直播能力和PSDK的状态进行区分和调用负载功能。

### 机场相机位置

机场相机使用 `camera_position` 参数：

- `0`: 舱内相机
- `1`: 舱外相机

### 兼容性说明

- **SuperDock 系列机场**：完全兼容 DJI 上云 API 标准
- **设备类型代码**：与 DJI 官方定义保持一致
- **新增机型**：SuperDock 支持最新的 M4 系列和 M400 无人机
- **三方负载**：有需要可定制开发第三方负载接口

