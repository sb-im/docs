---
sidebar_position: 1
---

# 机场上云

## 概述

SuperDock机场上云使用SuperDock Local Client 程序进行上云，将机场和云服务通过MQTT进行连接。

## 交互时序

```mermaid
sequenceDiagram
    participant pilot as Local Client
    participant client as SuperDock
    participant server as Cloud Server

    note over pilot: 填写 MQTT 网关地址、MQTT账号密码
    client ->> server: MQTT 连接建立

    note over pilot, server: License 校验

    client ->> server: 请求License 校验所需参数 Topic: thing/product/{gateway_sn}/requests<br/>Method: config
    server -->> client: 返回参数 Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: config

    note over client: License 校验成功
    opt 若校验失败，后续组织绑定流程不会进行
        note over client: License 校验失败
        client -x server: MQTT 连接断开
    end

    note over pilot, server: 组织绑定
    pilot ->> client: 请求设备绑定信息
    client ->> server: 获取设备绑定信息 Topic: thing/product/{gateway_sn}/requests<br/>Method: airport_bind_status
    note over server: 查询设备绑定信息
    server -->> client: 返回查询结果 Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: airport_bind_status

    opt 若设备未绑定
        pilot ->> client: 请求设备绑定码对应的组织信息
        client ->> server: 请求对应的组织信息 Topic: thing/product/{gateway_sn}/requests<br/>Method: airport_organization_get
        note over server: 查询对应的组织信息
        server -->> client: 返回查询结果 Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: airport_organization_get
        pilot ->> client: 通过设备绑定码将设备绑定到对应组织
        client ->> server: 设备绑定到组织 Topic: thing/product/{gateway_sn}/requests<br/>Method: airport_organization_bind
        note over server: 设备绑定到组织
        server -->> client: 返回绑定结果 Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: airport_organization_bind
    end
```

## 接口详细实现

*   [配置更新](/api-integration/api-reference/superdock-hangar/config)
    *   获取配置
*   [组织管理](/api-integration/api-reference/superdock-hangar/organization)
    *   获取设备绑定信息
    *   查询设备绑定对应的组织信息
        若设备绑定成功，机场与飞行器将被绑定到设备绑定码对应的组织。开发者可以自行设计如何通过在 Pilot 端填写的设备绑定码与组织 ID 以校验得到组织名称用于绑定。在我们提供的机场上云的 Demo 中，默认填写了设备绑定码，仅作为参考。
    *   使用设备绑定码绑定对应组织