---
sidebar_position: 2
---
# 设备类型和机型参考

本文档提供 DJI 上云 API 支持的所有设备类型和机型的完整参考，包括无人机、负载、遥控器和机场设备。

## 设备类型说明

设备类型通过以下字段标识：

- `domain`: 设备域（0=无人机, 1=负载, 2=遥控器, 3=机场）
- `type`: 设备类型代码
- `sub_type`: 设备子类型代码
- `node_type`: 节点类型（uav/camera/rc/dock）

## 无人机 (UAV) - Domain 0

| 机型 | Domain | Type | Sub Type | 全称 | 说明 |
|------|--------|------|----------|------|------|
| M400 | 0 | 103 | 0 | Matrice 400 | 最新企业级无人机 |
| M350 | 0 | 89 | 0 | Matrice 350 RTK | DJI Matrice 350 RTK |
| M300 | 0 | 60 | 0 | Matrice 300 RTK | DJI Matrice 300 RTK |
| M30 | 0 | 67 | 0 | Matrice 30 | DJI Matrice 30 |
| M30T | 0 | 67 | 1 | Matrice 30T | DJI Matrice 30T |
| M3E | 0 | 77 | 0 | Mavic 3 Enterprise | DJI Mavic 3 Enterprise |
| M3T | 0 | 77 | 1 | Mavic 3 Thermal | DJI Mavic 3 Thermal |
| M3M | 0 | 77 | 2 | Mavic 3 Multispectral | DJI Mavic 3 Multispectral |
| M3TA | 0 | 77 | 3 | Mavic 3 Thermal Advanced | DJI Mavic 3 Thermal Advanced |
| M3D | 0 | 91 | 0 | Matrice 3D | DJI Matrice 3D |
| M3TD | 0 | 91 | 1 | Matrice 3TD | DJI Matrice 3TD |
| M4D | 0 | 100 | 0 | Matrice 4D | DJI Matrice 4D |
| M4TD | 0 | 100 | 1 | Matrice 4TD | DJI Matrice 4TD |
| M4E | 0 | 99 | 0 | Matrice 4E | DJI Matrice 4E |
| M4T | 0 | 99 | 1 | Matrice 4T | DJI Matrice 4T |

## 负载设备 (Camera) - Domain 1

### 专业负载

| 负载名称 | Domain | Type | Sub Type | 说明 | 支持云台位置 |
|----------|--------|------|----------|------|-------------|
| Z30 | 1 | 20 | 0 | 禅思 Z30 变焦相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| XT2 | 1 | 26 | 0 | 禅思 XT2 热成像相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| XTS | 1 | 41 | 0 | 禅思 XTS 热成像相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| H20 | 1 | 42 | 0 | 禅思 H20 混合变焦相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| H20T | 1 | 43 | 0 | 禅思 H20T 混合变焦热成像相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| H20N | 1 | 61 | 0 | 禅思 H20N 夜视相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| H30 | 1 | 82 | 0 | 禅思 H30 新一代混合变焦相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| H30T | 1 | 83 | 0 | 禅思 H30T 新一代混合变焦热成像相机 | 左舷侧(0)、右舷侧(1)、上侧(2) |
| L1 | 1 | 50 | 0 | 禅思 L1 激光雷达 | 主云台 |
| L2 | 1 | 84 | 0 | 禅思 L2 新一代激光雷达 | 主云台 |
| P1 | 1 | 100000 | 0 | 禅思 P1 全画幅相机 | 主云台 |

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

| 相机名称 | Domain | Type | Sub Type | 说明 | 云台位置 |
|----------|--------|------|----------|------|----------|
| M3D 辅助影像 | 1 | 176 | 0 | Matrice 3D 辅助影像 | 辅助位置(0) |
| M3TD 辅助影像 | 1 | 176 | 0 | Matrice 3TD 辅助影像 | 辅助位置(0) |

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

| 机场名称 | Domain | Type | Sub Type | 说明 |
|----------|--------|------|----------|------|
| S22M300 | 3 | 88097 | 0 | M300 机场 |
| S2201 | 3 | 88098 | 0 | 机场 2 |
| S2301 | 3 | 88099 | 0 | M3 机场 |
| S24M350 | 3 | 88100 | 0 | M350 机场-24 |
| S24M350S | 3 | 88101 | 0 | M350 换电机场-24 |
| S24M3 | 3 | 88102 | 0 | M3 机场-24 |
| S24M4 | 3 | 88103 | 0 | M4 机场-24 |

## 云台位置说明

### Gimbal Index 定义

- `0`: 对于 M300 RTK 为左云台（主云台），其他机型为主云台
- `1`: 对于 M300 RTK 为右云台
- `2`: 对于 M300 RTK 为上云台
- `7`: FPV 相机位置

### 机场相机位置

机场相机使用 `camera_position` 参数：

- `0`: 舱内相机
- `1`: 舱外相机

### 兼容性说明

- **SuperDock 系列机场**：完全兼容 DJI 上云 API 标准
- **设备类型代码**：与 DJI 官方定义保持一致
- **新增机型**：SuperDock 支持最新的 M4 系列和 M400 无人机
- **三方负载**：目前暂不支持第三方负载设备

## 注意事项

- 三方负载设备暂时不支持,如有需要可定制开发
- 机型详细信息可在 DJI 官网搜索对应机型名称查看

## 参考资源

- [DJI 上云 API 官方文档](https://developer.dji.com/doc/cloud-api-tutorial/cn/)
- [产品支持列表](https://developer.dji.com/doc/cloud-api-tutorial/cn/overview/product-support.html)
- [云端集成概述](./index.md)
