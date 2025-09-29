---
id: superdock
title: 快速对接 SuperDock 设备
sidebar_label: 快速对接SuperDock设备
sidebar_position: 2
description: 在 DJI Cloud API Demo 中扩展并识别 SuperDock 系列机场与相关机载/载荷设备。
---


# 快速对接 SuperDock 设备

## 概述

**SuperDock** 系列自动机场完全兼容 DJI 上云 API 标准。为了让 上云API Demo 正确识别与管理不同型号的 SuperDock，需要在**设备枚举、网关类型、设备类型、版本映射、状态/OSD 路由、数据库字典**等处做扩展。本篇给出**最少修改点**与**可复制代码片段**。

## 设备识别（domain/type/sub_type）

SuperDock 采用 DJI 标准的三元组识别：

```java
public class DeviceIdentification {
    private int domain;   // 设备域：0=无人机，1=载荷，2=遥控器，3=机场
    private int type;     // 设备类型：88097-88103 为 SuperDock 系列
    private int sub_type; // 子类型：用于同系列的变体
    // 示例：S2301 => domain=3, type=88099, sub_type=0
}
```

完整的设备列表，请参考XXX

## 你需要改的 4 处代码

### 1）设备枚举扩展（`DeviceEnum.java`）

**新增 M4 系列无人机**：

```java
// M4 系列无人机 - 适配 SuperDock Mini 2 和 S24M4
M4D(99, 0, 0, "M4D"),
M4TD(99, 1, 0, "M4TD"),
M4E(100, 0, 0, "M4E"),
M4T(100, 1, 0, "M4T"),
```

**新增 H30 系列相机/载荷**：

```java
// H30 系列相机与 L2 激光雷达
H30(82, 0, 1, "H30"),
H30T(83, 0, 1, "H30T"),
L2(84, 0, 1, "L2"),
```

**修正类型映射**（若历史上混用）：

```java
M30(89, 0, 0, "M30"),
M30T(89, 1, 0, "M30T"),
M3T_CAMERA(77, 1, 1, "M3T_CAMERA"),
```

### 2）SuperDock 网关类型（`GatewayTypeEnum.java`）

```java
// SuperDock 系列机场设备 S22M300(DeviceEnum.S22M300, "SuperDock S22M300"),
S2201(DeviceEnum.S2201,   "SuperDock S2201"),
S2301(DeviceEnum.S2301,   "SuperDock S2301"),
S24M350(DeviceEnum.S24M350,   "SuperDock S24M350"),
S24M350S(DeviceEnum.S24M350S, "SuperDock S24M350S"),
S24M3(DeviceEnum.S24M3,   "SuperDock S24M3"),
S24M4(DeviceEnum.S24M4,   "SuperDock S24M4"),
```

### 3）设备类型字典（`DeviceTypeEnum.java`）

```java
// M4 系列无人机
M4D_DRONE(99,  "M4D无人机"),
M4TD_DRONE(100, "M4TD无人机"),

// 新一代载荷
H30_CAMERA(82, "H30混合变焦相机"),
H30T_CAMERA(83, "H30T热成像相机"),
L2_LIDAR(84,  "L2激光雷达"),

// SuperDock 机场
SUPERDOCK_S22M300(88097, "SuperDock S22M300"),
SUPERDOCK_S2201(  88098, "SuperDock S2201"),
SUPERDOCK_S2301(  88099, "SuperDock S2301"),
SUPERDOCK_S24M350(88100, "SuperDock S24M350"),
SUPERDOCK_S24M350S(88101, "SuperDock S24M350S"),
SUPERDOCK_S24M3(  88102, "SuperDock S24M3"),
SUPERDOCK_S24M4(  88103, "SuperDock S24M4"),
```

### 4）Thing/SDK 版本映射

**`DroneThingVersionEnum.java`**：

```java
V2_1_2("2.1.2", CloudSDKVersionEnum.V1_0_3),
V2_2_0("2.2.0", CloudSDKVersionEnum.V1_0_3),
```

**`GatewayThingVersion.java`**（或等效处）：

```java
SUPERDOCK_V1_0_0("1.0.0", CloudSDKVersionEnum.V1_0_3),
SUPERDOCK_V1_1_0("1.1.0", CloudSDKVersionEnum.V1_0_3),
```

## 数据/状态路由（OSD & State）

### OSD 数据路由配置

```java
DOCK(true, OsdDock.class, ChannelName.INBOUND_OSD_DOCK,
     GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2,
     GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201,
     GatewayTypeEnum.S2301, GatewayTypeEnum.S24M350,
     GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3,
     GatewayTypeEnum.S24M4),
```

### 状态路由（`StateRouter.java`）

```java
private Class getTypeReference(String gatewaySn, Object data) {
    Set<String> keys = ((Map<String, Object>) data).keySet();
    switch (SDKManager.getDeviceSDK(gatewaySn).getType()) {
        case RC:
            return RcStateDataKeyEnum.find(keys).getClassType();
        case DOCK:
        case DOCK2:
        case S22M300:
        case S2201:
        case S2301:
        case S24M350:
        case S24M350S:
        case S24M3:
        case S24M4:
            return DockStateDataKeyEnum.find(keys).getClassType();
        default:
            throw new RuntimeException("Unsupported device type: " +
                SDKManager.getDeviceSDK(gatewaySn).getType());
    }
}
```

## 数据库配置（字典表 + 初始化）

### 设备字典表结构

```sql
CREATE TABLE `manage_device_dictionary` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `device_name` varchar(255) NOT NULL COMMENT '设备名称',
  `device_type` int NOT NULL COMMENT '设备类型',
  `sub_type` int NOT NULL DEFAULT '0' COMMENT '设备子类型',
  `domain` int NOT NULL COMMENT '设备域',
  `device_desc` varchar(500) DEFAULT NULL COMMENT '设备描述',
  `create_time` bigint DEFAULT NULL COMMENT '创建时间',
  `update_time` bigint DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_device_type` (`device_type`,`sub_type`,`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设备类型字典表';
```

### SuperDock 及配套设备插入脚本

```sql
-- SuperDock 系列机场\ nINSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('SuperDock S22M300', 88097, 0, 3, 'M300专用自动机场，支持100秒极速换电'),
('SuperDock S2201', 88098, 0, 3, '通用自动机场2代，支持多种无人机型号'),
('SuperDock S2301', 88099, 0, 3, 'M3系列专用机场，一体化设计'),
('SuperDock S24M350', 88100, 0, 3, 'M350机场24版，增强环境适应性'),
('SuperDock S24M350S', 88101, 0, 3, 'M350换电机场24版，支持快速换电'),
('SuperDock S24M3', 88102, 0, 3, 'M3机场24版，集成气象站'),
('SuperDock S24M4', 88103, 0, 3, 'M4机场24版，支持最新M4系列无人机')
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  device_desc = VALUES(device_desc),
  update_time = CURRENT_TIMESTAMP;

-- M4 系列无人机
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('M4D', 99, 0, 0, 'M4D无人机，支持多种专业载荷'),
('M4TD', 99, 1, 0, 'M4TD无人机，集成热成像功能'),
('M4E', 100, 0, 0, 'M4E无人机，企业级应用'),
('M4T', 100, 1, 0, 'M4T无人机，热成像专业版')
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  device_desc = VALUES(device_desc),
  update_time = CURRENT_TIMESTAMP;

-- H30 系列载荷
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('H30', 82, 0, 1, 'H30混合变焦相机，新一代成像载荷'),
('H30T', 83, 0, 1, 'H30T热成像相机，集成可见光和热成像'),
('L2', 84, 0, 1, 'L2激光雷达，高精度三维测量')
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  device_desc = VALUES(device_desc),
  update_time = CURRENT_TIMESTAMP;
```
---

## 常见问题（Troubleshooting）

### 1）设备上线失败

**现象**：无法上线；日志提示设备类型不支持；前端无状态显示。

**典型日志**：

```text
ERROR: Unsupported device type: S2301
```

**排查步骤**：

1. **确认网关枚举**：`GatewayTypeEnum` 中包含所有 SuperDock 型号。
2. **检查设备字典**：

   ```sql
   SELECT * FROM manage_device_dictionary
   WHERE device_type = 88099 AND sub_type = 0 AND domain = 3;
   ```
3. **校验 MQTT 注册消息**：

   ```json
   {
     "bid": "...",
     "data": {
       "domain": 3,
       "type": 88099,
       "sub_type": 0,
       "device_secret": "device_secret",
       "nonce": "nonce",
       "version": "1.0.0"
     },
     "tid": "...",
     "timestamp": 1234567890123,
     "method": "thing.register"
   }
   ```

### 2）绑定状态查询失败

**错误**：

```text
Error Code: 210002, Error Msg: Invalid parameter.. bindStatus[1].organizationName must not be null
```

**原因**：设备记录缺失导致组织/呼号等必填字段为空。

**解决**：补全设备与工作空间数据。

```sql
-- 设备记录
INSERT INTO manage_device (
    device_sn, device_name, nickname, workspace_id,
    device_type, sub_type, domain, bound_status,
    create_time, update_time, bound_time
) VALUES (
    'dock-uuid', 'SuperDock S2301', 'SuperDock S2301', 'xx-uuid',
    88099, 0, 3, 1,
    UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000
);

-- 工作空间
INSERT INTO manage_workspace (
    workspace_id, workspace_name, organization_name,
    create_time, update_time
) VALUES (
    'xx-uuid', 'SuperDock测试工作空间', '草莓创新',
    UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000
);
```

### 3）状态路由失败

**错误**：

```text
Error Code: 220001, Error Msg: Data exceeds limit.. Unexpected value: S2301
```

**原因**：`StateRouter.getTypeReference()` 未覆盖新机场类型。

**解法**：按上文示例补齐 `switch` 分支。

### 4）版本兼容报错

**错误**：

```text
CloudSDKVersionException: The current CloudSDK version(1.0.3) does not support this thing version(2.1.2)
```

**原因**：`DroneThingVersionEnum` 未包含设备上报的 `thing version`。

**解法**：按“Thing/SDK 版本映射”一节补全枚举（如 `2.1.2`、`2.2.0`）。

---

> 恭喜！至此你已经具备从 上云AP IDemo 起步、扩展到 SuperDock 设备支持的完整路径。建议将本文当做“跑通手册 + 排障笔记”，持续结合你们的实际部署更新。
