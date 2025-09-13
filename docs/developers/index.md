---
id: index
title: 适配上云API代码
sidebar_label: 开发者中心
sidebar_position: 1
description: SBIM 系统设备适配上云API的完整开发指南
---

# 适配上云API代码

本文档详细介绍如何将新设备适配到SBIM上云API系统中，包括设备型号适配、数据库配置和MQTT消息处理等关键步骤。

![设备适配架构图](/img/developers/cloud-api-adaptation/image-000.png)

## 概述

当新设备需要接入SBIM上云API系统时，需要完成以下主要步骤：

1. **设备型号适配** - 在上云API中添加对应的设备枚举
2. **MQTT消息处理** - 处理设备上线时发送的MQTT消息
3. **数据库适配** - 配置相关数据库表和记录
4. **设备绑定** - 将设备绑定到用户和工作空间

## 设备型号适配

### 枚举类型配置

设备适配需要在上云API中添加对应的枚举类型。每个设备都有以下关键属性：

- **domain** - 设备域
- **type** - 设备类型
- **sub_type** - 设备子类型
- **thing_version** - 版本号（固定为 1.0.0）

![设备枚举配置](/img/developers/cloud-api-adaptation/image-004.png)

### 需要修改的枚举类

根据设备的domain、type、sub_type参数，需要修改以下枚举类：

| 枚举类名 | 说明 | 修改内容 |
|---------|------|----------|
| `DeviceDomainEnum` | 设备域枚举 | 添加新的domain值 |
| `DeviceTypeEnum` | 设备类型枚举 | 添加新的type值 |
| `DeviceSubTypeEnum` | 设备子类型枚举 | 添加新的sub_type值 |
| `DeviceEnum` | 设备枚举 | 组合上述三个枚举 |
| `GatewayTypeEnum` | 网关类型枚举 | 添加DeviceEnum中的枚举 |
| `GatewayThingVersion` | 网关版本类 | 添加GatewayTypeEnum的枚举 |
| `OsdDeviceTypeEnum` | OSD设备类型枚举 | 添加GatewayTypeEnum的枚举 |

## MQTT消息处理

### 设备上线消息

设备上线时会向后端发送一条MQTT消息，消息格式如下：

```json
{
  "tid": "538e9def-813d-4cf7-b75c-90cb2c84f338",
  "bid": "3132738a-799b-40ab-adb6-47c842e7f756",
  "timestamp": 1742369415175,
  "method": "update_topo",
  "data": {
    "domain": 3,
    "type": 1,
    "sub_type": 99,
    "device_secret": "05661bc2c3b6c83601263782dfef5451",
    "nonce": "57437ab038619be8b79bdb1d800ee6e5",
    "thing_version": "1.0.0",
    "sub_devices": []
  },
  "gateway": ""
}
```

![MQTT消息示例](/img/developers/cloud-api-adaptation/image-005.png)

### 消息字段说明

- **tid** - 事务ID，用于消息追踪
- **bid** - 业务ID，标识具体业务
- **timestamp** - 时间戳
- **method** - 方法名，设备上线为 `update_topo`
- **data.domain** - 设备域，示例中为 3
- **data.type** - 设备类型，示例中为 1
- **data.sub_type** - 设备子类型，示例中为 99
- **data.thing_version** - 版本号，固定为 "1.0.0"
- **sub_devices** - 子设备列表，机场设备通常包含无人机子设备

## 适配步骤详解

### 第一步：分析设备消息

观察设备上线MQTT消息，提取关键参数：
- `"domain": 3`
- `"type": 1`
- `"sub_type": 99`
- `"thing_version": "1.0.0"`

![消息分析](/img/developers/cloud-api-adaptation/image-006.png)

### 第二步：修改枚举类

按照以下顺序修改枚举类：

1. **修改 DeviceDomainEnum**
   - 如果domain=3不存在，添加对应枚举

2. **修改 DeviceTypeEnum**
   - 如果type=1不存在，添加对应枚举

3. **修改 DeviceSubTypeEnum**
   - 如果sub_type=99不存在，添加对应枚举

4. **修改 DeviceEnum**
   - 增加上述三个枚举的组合

5. **修改 GatewayTypeEnum**
   - 增加在DeviceEnum中添加的枚举

6. **修改 GatewayThingVersion**
   - 增加在GatewayTypeEnum中添加的枚举

7. **修改 OsdDeviceTypeEnum**
   - 增加GatewayTypeEnum中的枚举
   - 其余参数与OsdDeviceTypeEnum中的DOCK相同

![枚举修改流程](/img/developers/cloud-api-adaptation/image-007.png)

### 第三步：数据库配置

修改数据库表 `manage_device_dictionary`，增加报文中的domain、device_type、sub_type记录。

```sql
INSERT INTO manage_device_dictionary
(domain, device_type, sub_type, device_name, description)
VALUES
(3, 1, 99, '新设备名称', '设备描述');
```

![数据库配置](/img/developers/cloud-api-adaptation/image-008.png)

### 第四步：验证设备上线

重新发送上线请求后，可在 `sys/product/&{dock_sn}/status_reply` topic收到后端发来的响应。

![设备上线响应](/img/developers/cloud-api-adaptation/image-009.png)

### 第五步：设备绑定配置

此时前端还没有显示设备，需要在 `manage_device` 表中进行以下配置：

```sql
UPDATE manage_device
SET
  user_id = 1,  -- 默认用户ID
  workspace_id = 'e3dea0f5-37f2-4d79-ae58-490af3228069',  -- 默认workspace_id
  bound_status = 1  -- 绑定状态
WHERE device_sn = 'your_device_sn';
```

配置完成后重新上线，即可看到机场设备在线状态。

![设备在线状态](/img/developers/cloud-api-adaptation/image-010.png)

## 无人机设备适配

### 子设备处理

如需添加无人机类型，可进入**远程调试**，打开无人机后，上线请求中的 `sub_devices` 会出现无人机设备数据：

```json
{
  "tid": "b75e58a4-1441-4491-9413-e8717785fe09",
  "bid": "d9810ce8-17e2-49ae-a112-110d0d1de5f8",
  "timestamp": 1742377953899,
  "method": "update_topo",
  "data": {
    "domain": 3,
    "type": 103,
    "sub_type": 0,
    "device_secret": "05661bc2c3b6c83601263782dfef5451",
    "nonce": "57437ab038619be8b79bdb1d800ee6e5",
    "thing_version": "1.0.0",
    "sub_devices": [
      {
        "sn": "xxxxxxx",
        "domain": 0,
        "type": 150,
        "sub_type": 0,
        "index": "A",
        "device_secret": "71ee4bce6a12be2b1bffed0884c2244d",
        "nonce": "96e67ba8b677b49d2a4257789c8dbb30",
        "thing_version": "2.1.2"
      }
    ]
  },
  "gateway": ""
}
```

![无人机子设备消息](/img/developers/cloud-api-adaptation/image-011.png)

### 子设备适配步骤

根据 `sub_devices` 中设备的属性，重复上述适配步骤：

1. 提取子设备的 domain、type、sub_type 参数
2. 按照相同流程修改对应的枚举类
3. 更新数据库配置
4. 验证子设备上线状态

## 数据库适配

### 组织绑定配置

目前设备不会发送组织绑定的MQTT消息，需要在数据库的 `manage_device` 表中手动配置：

```sql
-- 为设备添加工作空间绑定
UPDATE manage_device
SET
  workspace_id = 'your_workspace_id',
  bound_status = true
WHERE device_sn = 'your_device_sn';
```

### 数据库表结构

主要涉及的数据库表：

| 表名 | 用途 | 关键字段 |
|------|------|----------|
| `manage_device_dictionary` | 设备类型字典 | domain, device_type, sub_type |
| `manage_device` | 设备管理 | user_id, workspace_id, bound_status |

## 故障排查

### 常见问题

**设备无法上线**
- 检查枚举类是否正确配置
- 验证数据库字典表是否有对应记录
- 确认MQTT消息格式是否正确

**前端不显示设备**
- 检查 manage_device 表的绑定配置
- 验证 user_id 和 workspace_id 是否正确
- 确认 bound_status 是否设置为 1

**子设备无法识别**
- 检查子设备的枚举配置
- 验证 sub_devices 消息格式
- 确认子设备的适配步骤是否完整

### 调试工具

**MQTT消息监控**
- 使用MQTT客户端工具监控消息
- 检查设备上线消息的格式和内容
- 验证响应消息是否正确返回

**数据库查询**
```sql
-- 查看设备字典配置
SELECT * FROM manage_device_dictionary
WHERE domain = 3 AND device_type = 1 AND sub_type = 99;

-- 查看设备绑定状态
SELECT * FROM manage_device
WHERE device_sn = 'your_device_sn';
```

## 技术支持

如果在设备适配过程中遇到问题，请联系技术支持团队：

- **技术支持邮箱**: [developer@sb.im](mailto:developer@sb.im)
- **文档反馈**: 通过GitHub Issues提交
- **紧急支持**: 联系对接人员获取具体枚举类型信息

---

:::tip 重要提示
在进行设备适配时，domain、type、sub_type 的具体数值需要向对接人员确认，确保与设备实际发送的MQTT消息参数一致。
:::

:::warning 注意事项
- 修改枚举类后需要重新编译和部署上云API服务
- 数据库配置修改后建议进行备份
- 测试环境验证通过后再部署到生产环境
:::
