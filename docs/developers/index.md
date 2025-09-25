---
id: index
title: 适配上云API代码
sidebar_label: 适配上云api代码
sidebar_position: 1
description: SBIM 系统设备适配上云API的完整开发指南
---
# 机场适配上云API代码

## 免责声明与使用须知

:::warning 重要声明
本文档基于DJI Cloud API Demo项目提供SuperDock设备集成指导，仅供技术参考和学习使用。请在使用前仔细阅读以下声明。
:::

### 技术参考性质

- 本文档提供的代码示例、配置方案和集成方法仅为**技术参考实现**
- 所有示例代码均基于开源的DJI Cloud API Demo项目进行扩展和修改
- **不构成生产级解决方案**，可能存在未充分测试的功能模块和潜在安全风险

### 安全风险提示

- Demo代码可能存在**安全隐患**（包括但不限于数据泄露、未授权访问、权限控制不当等）
- **强烈建议**在生产环境部署前进行全面的安全评估和代码审计
- **避免将基于Demo的服务直接暴露于公网环境**，建议在内网或受控环境中使用
- 如需在生产环境使用，请务必进行安全加固和漏洞修复

### 兼容性说明

- SuperDock设备与DJI上云API的兼容性基于当前版本测试结果
- 设备固件更新、API版本变更可能影响兼容性
- 建议在正式部署前进行充分的兼容性测试

### 免责条款

因使用本文档提供的代码、配置或方案导致的以下情况，**草莓创新及相关人员不承担任何责任**：

- 业务中断、数据丢失或损坏
- 系统安全漏洞或数据泄露
- 第三方索赔或法律纠纷
- 设备损坏或功能异常
- 其他直接或间接经济损失

### 使用建议

- **开发测试**：建议在隔离的开发环境中进行测试和验证
- **安全审计**：生产部署前请进行专业的安全审计和渗透测试
- **备份策略**：建立完善的数据备份和恢复机制
- **监控告警**：部署完整的系统监控和安全告警机制
- **持续更新**：关注相关组件的安全更新和补丁发布

### 技术支持

如需专业的技术支持和生产级解决方案，请联系：

- **官方网站**：[https://sb.im](https://sb.im)

---

## Docker 安装

- 安装教程：[https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)

## Docker Compose 安装

- 安装教程：[https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## 源码包下载

- 点击下载 [源码包](https://terra-sz-hc1pro-cloudapi.oss-cn-shenzhen.aliyuncs.com/c0af9fe0d7eb4f35a8fe5b695e4d0b96/docker/cloud_api_sample_docker.zip)

## 解压文件

将 cloud_api_sample_docker_1.0.0.zip 文件解压后目录结构如下：

![image-20220321112952651](https://stag-terra-1-g.djicdn.com/7774da665e07453698314cc27c523096/admin/doc/195959b3-f8e1-4f3d-9d9b-d90ece297e15.png)

- data
  存放demo服务运行的用户数据

- docker-compose.yml
  docker-compose的运行配置文件

- docs
  存放各类文档，包括API文档

- source
  存放源代码，各类镜像的源文件

- cloud_api_sample_docker_v1.0.0.tar
  所有环境的 docker 镜像

- README.md

- update_backend.sh

  构建后端镜像文件

- update_front.sh

  构建前端镜像文件


## 启动相关的基础模块
- 修改`docker-compose.yml`文件,改为以下文件:
```yaml
    version: "3"
    services:
      emqx:
        image: emqx:4.4
        ports:
          - "18083:18083"
          - "1883:1883"
          - "8083:8083"
          - "8883:8883"
          - "8084:8084"
        environment:
          - EMQX_ALLOW_ANONYMOUS=true
        hostname: emqx-broker
        networks:
          - cloud_service_bridge
      mysql:
        image: mysql:latest
        networks:
          - cloud_service_bridge
        ports:
          - "3306:3306"
        volumes:
                # - /etc/group:/etc/group:ro
                # - /etc/passwd:/etc/passwd:ro
          - /etc/localtime:/etc/localtime
          - ./data/mysql:/var/lib/mysql
        environment:
          - MYSQL_ROOT_PASSWORD=root
        hostname: cloud_api_sample_mysql
      redis:
        image: redis:6.2
        restart: "always"
        hostname: cloud_api_sample_redis
        ports:
          - "6379:6379"
        networks:
          - cloud_service_bridge
        command:
          redis-server
      minio:
        image: minio/minio:latest
        container_name: minio
        environment:
          - MINIO_ROOT_USER=minioadmin
          - MINIO_ROOT_PASSWORD=minioadmin
          - TZ=Asia/Shanghai
        ports:
          - "9000:9000"
          - "9001:9001"
        volumes:
          - ./data/minio:/data
          - ./data/minio/logs:/var/log/minio
          - /etc/localtime:/etc/localtime
        command: server /data --console-address ":9001"
        restart: always

      srs:
        image: ossrs/srs
        container_name: sd.srsdemo
        hostname: srsdemo
        ports:
          - "1935:1935"
          - "1985:1985"
          - "8080:8080"
          - "8000:8000"
          - "8000:8000/udp"
        environment:
          - CANDIDATE=192.168.99.159
        command: objs/srs -c conf/rtmp2rtc.conf
        restart: always
    networks:
      cloud_service_bridge:
        driver: bridge
        ipam:
          config:
            - subnet: 192.168.6.0/24
  ```

- 执行`sudo docker compose up -d`命令行
  ```shell
  sudo docker compose up -d
  ```
- 可以获取到`sudo docker ps`当前运行的镜像
  ```shell
  sudo docker ps
  ```
  可以获取到以下的数据
  ```text
    CONTAINER ID   IMAGE          COMMAND                  CREATED         STATUS         PORTS                                                                                                                                                                                                                                                                     NAMES
    58004f4e9373   redis:6.2      "docker-entrypoint.s…"   6 minutes ago   Up 5 minutes   0.0.0.0:6379->6379/tcp, [::]:6379->6379/tcp                                                                                                                                                                                                                               cloud_api_sample-redis-1
    75bfac84fd44   emqx:4.4       "/usr/bin/docker-ent…"   6 minutes ago   Up 5 minutes   4369-4370/tcp, 5369/tcp, 6369-6370/tcp, 0.0.0.0:1883->1883/tcp, [::]:1883->1883/tcp, 0.0.0.0:8083-8084->8083-8084/tcp, [::]:8083-8084->8083-8084/tcp, 8081/tcp, 0.0.0.0:8883->8883/tcp, [::]:8883->8883/tcp, 0.0.0.0:18083->18083/tcp, [::]:18083->18083/tcp, 11883/tcp   cloud_api_sample-emqx-1
    0f7d52ed7e75   mysql:latest   "docker-entrypoint.s…"   6 minutes ago   Up 5 minutes   0.0.0.0:3306->3306/tcp, [::]:3306->3306/tcp, 33060/tcp                                                                                                                                                                                                                    cloud_api_sample-mysql-1
    ```

## 导入sql数据库

- 找到`cloud_sample.sql`数据库文件
  ```text
  root@NanoPC-T6:~/dji_cloud_docker/cloud_api_sample/source/backend_service/sql# ls
  cloud_sample.sql
  ```
- 执行导入数据进入容器的mysql客户端
    ```shell
    sudo docker exec -i cloud_api_sample-mysql-1 mysql -uroot -proot < cloud_sample.sql
    ```
- 验证是否创建`cloud_sample`这个数据库
  ```shell
  sudo docker exec -it cloud_api_sample-mysql-1   mysql -uroot -proot -e "SHOW DATABASES LIKE 'cloud_sample';"
  ```
  可以获取到下面信息
  ```text
  mysql: [Warning] Using a password on the command line interface can be insecure.
  +-------------------------+
  | Database (cloud_sample) |
  +-------------------------+
  | cloud_sample            |
  +-------------------------+
  ```

# 源码修改

整个上云 API Demo 例程采用前后端分离的设计，前端采用的是 TS+Vue3 框架，后端采用的是 JAVA 语言（必须**11**及以上的版本，否则后端代码无法编译），Spring Boot 框架。使用该例程，用户需要预先学习熟悉以下知识：
## 上云API Demo介绍
**前端**

1. TypeScript、HTML、CSS 编程语言。
2. Vue3.x 框架、Node.js npm 包管理。
3. Ant Design Vue V2 组件库。
4. HTTP/Websocket 通信。
5. Linux 环境通过 Nginx 部署前端应用服务。
6. 高德地图开放 API 使用。

**后端**

1. Java
2. Spring Boot
3. MQTT
4. MySQL
5. WebSocket
6. Redis

**环境与版本**

1. Linux 云服务器，Ubuntu16.04 系统
2. Java 版本：openJDK 必须11及以上
3. MySQL 版本：8.0.26
4. EMQX 版本：4.4.0
5. Redis 版本：6.2
6. Nginx 版本：1.20.2
7. Vue 版本：3.0.5
8. Node.js 版本：17.8

**Demo 源码下载**

1. DEMO 前端源码：[下载地址](https://github.com/dji-sdk/Cloud-API-Demo-Web)
2. DEMO 后端源码：[下载地址](https://github.com/dji-sdk/DJI-Cloud-API-Demo)

## 获取源码

- 获取DJI-Cloud-API-Demo源码
  ```shell
  git clone https://github.com/dji-sdk/DJI-Cloud-API-Demo.git
  ```
  或者
  ```shell
  git clone git@github.com:dji-sdk/DJI-Cloud-API-Demo.git
  ```
- 获取Cloud-API-Demo-Web源码
  ```shell
  git clone https://github.com/dji-sdk/Cloud-API-Demo-Web.git
  ```
  或者
  ```shell
  git clone git@github.com:dji-sdk/Cloud-API-Demo-Web.git
  ```

##
## SuperDock设备支持扩展

### 概述

草莓创新SuperDock系列自动机场产品完全兼容DJI上云API标准，为了确保系统能够正确识别和管理各种SuperDock设备型号，需要在DJI Cloud API Demo项目中添加相应的设备支持。本节详细介绍如何扩展系统以支持SuperDock设备。

### SuperDock产品矩阵

草莓创新SuperDock系列包含多种机场型号，每种型号都有特定的设备标识：

#### SuperDock Pro 系列
- **SuperDock Pro V4** - 适配DJI M350/M300，小型化设计
- **SuperDock Pro** - 适配DJI M350/M300，独立通信塔设计

#### SuperDock Mini 系列
- **SuperDock Mini 2** - 适配御3系列/御4系列，一体化设计

#### SuperDock 专业系列
- **SuperDock S22M300** - M300专用机场 (type: 88097)
- **SuperDock S2201** - 通用机场2 (type: 88098)
- **SuperDock S2301** - M3系列机场 (type: 88099)
- **SuperDock S24M350** - M350机场-24 (type: 88100)
- **SuperDock S24M350S** - M350换电机场-24 (type: 88101)
- **SuperDock S24M3** - M3机场-24 (type: 88102)
- **SuperDock S24M4** - M4机场-24 (type: 88103)

### 设备适配需求分析

#### 1. 兼容性要求
- **DJI API兼容**：完全兼容DJI上云API标准，确保零学习成本
- **设备识别**：准确识别各种SuperDock机场型号和适配的无人机
- **数据路由**：正确处理设备状态、OSD数据和控制指令
- **版本管理**：支持设备固件版本管理和兼容性检查

#### 2. 技术架构
SuperDock设备使用DJI标准的三元组识别机制：
- **domain**: 设备域 (3=机场设备)
- **type**: 设备类型 (88097-88103为SuperDock系列)
- **sub_type**: 设备子类型 (通常为0)

### 主要修改内容

#### 1. 设备枚举扩展 (DeviceEnum.java)

**新增M4系列无人机支持**：
```java
// M4系列无人机 - 适配SuperDock Mini 2和S24M4
M4D(99, 0, 0, "M4D"),           // M4D无人机
M4TD(99, 1, 0, "M4TD"),         // M4TD无人机
M4E(100, 0, 0, "M4E"),          // M4E无人机
M4T(100, 1, 0, "M4T"),          // M4T无人机
```

**新增载荷设备支持**：
```java
// 新一代载荷设备
H30(82, 0, 1, "H30"),           // H30混合变焦相机
H30T(83, 0, 1, "H30T"),         // H30T热成像相机
L2(84, 0, 1, "L2"),             // L2激光雷达
PAYLOAD(31, 0, 1, "PAYLOAD"),   // 通用载荷
```

**修正设备类型映射**：
```java
// 修正M30系列设备映射关系
M30(89, 0, 0, "M30"),           // 从M30_OR_M3T_CAMERA修正
M30T(89, 1, 0, "M30T"),         // 从M30_OR_M3T_CAMERA修正
M3T_CAMERA(77, 1, 1, "M3T_CAMERA"), // 独立M3T相机定义
```


#### 2. SuperDock机场设备支持 (GatewayTypeEnum.java)

**新增SuperDock系列机场型号**：
```java
// SuperDock系列机场设备
S22M300(DeviceEnum.S22M300, "SuperDock S22M300"),     // M300专用机场
S2201(DeviceEnum.S2201, "SuperDock S2201"),           // 通用机场2
S2301(DeviceEnum.S2301, "SuperDock S2301"),           // M3系列机场
S24M350(DeviceEnum.S24M350, "SuperDock S24M350"),     // M350机场-24
S24M350S(DeviceEnum.S24M350S, "SuperDock S24M350S"),  // M350换电机场-24
S24M3(DeviceEnum.S24M3, "SuperDock S24M3"),           // M3机场-24
S24M4(DeviceEnum.S24M4, "SuperDock S24M4"),           // M4机场-24
```

#### 3. 设备类型定义扩展 (DeviceTypeEnum.java)

**新增设备类型定义**：
```java
// M4系列无人机类型
M4_SERIES(99, "M4系列无人机"),
M4_ADVANCED(100, "M4高级系列"),

// 新一代载荷类型
H30_CAMERA(82, "H30混合变焦相机"),
H30T_CAMERA(83, "H30T热成像相机"),
L2_LIDAR(84, "L2激光雷达"),

// SuperDock机场类型
SUPERDOCK_S22M300(88097, "SuperDock S22M300"),
SUPERDOCK_S2201(88098, "SuperDock S2201"),
SUPERDOCK_S2301(88099, "SuperDock S2301"),
SUPERDOCK_S24M350(88100, "SuperDock S24M350"),
SUPERDOCK_S24M350S(88101, "SuperDock S24M350S"),
SUPERDOCK_S24M3(88102, "SuperDock S24M3"),
SUPERDOCK_S24M4(88103, "SuperDock S24M4"),
```

#### 4. 版本信息更新

**DroneThingVersionEnum.java** - 新增M4系列版本支持：
```java
// M4系列无人机版本支持
V2_1_2("2.1.2", CloudSDKVersionEnum.V1_0_3),  // M4系列固件版本
V2_2_0("2.2.0", CloudSDKVersionEnum.V1_0_3),  // M4系列最新版本
```

**GatewayThingVersion.java** - 新增SuperDock版本信息：
```java
// SuperDock系列版本信息
SUPERDOCK_V1_0_0("1.0.0", CloudSDKVersionEnum.V1_0_3),
SUPERDOCK_V1_1_0("1.1.0", CloudSDKVersionEnum.V1_0_3),
```

### 技术实现原理

#### 设备识别机制
SuperDock设备使用DJI标准的三元组(domain, type, sub_type)来唯一标识：

```java
// 设备识别示例
public class DeviceIdentification {
    private int domain;     // 设备域：0=无人机，1=载荷，2=遥控器，3=机场
    private int type;       // 设备类型：88097-88103为SuperDock系列
    private int sub_type;   // 设备子类型：用于区分同一类型的不同变体

    // SuperDock S2301示例
    // domain=3, type=88099, sub_type=0
}
```

#### 数据路由机制
```java
// OSD数据路由配置
DOCK(true, OsdDock.class, ChannelName.INBOUND_OSD_DOCK,
     GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2,
     // 新增SuperDock系列支持
     GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201,
     GatewayTypeEnum.S2301, GatewayTypeEnum.S24M350,
     GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3,
     GatewayTypeEnum.S24M4),
```

#### 状态路由处理
```java
// StateRouter.java - 支持SuperDock设备的状态路由
private Class getTypeReference(String gatewaySn, Object data) {
    Set<String> keys = ((Map<String, Object>) data).keySet();
    switch (SDKManager.getDeviceSDK(gatewaySn).getType()) {
        case RC:
            return RcStateDataKeyEnum.find(keys).getClassType();
        case DOCK:
        case DOCK2:
        // 支持所有SuperDock机场类型
        case S22M300:
        case S2201:
        case S2301:
        case S24M350:
        case S24M350S:
        case S24M3:
        case S24M4:
            return DockStateDataKeyEnum.find(keys).getClassType();
        default:
            throw new CloudSDKException(CloudSDKErrorEnum.WRONG_DATA,
                "Unsupported device type: " + SDKManager.getDeviceSDK(gatewaySn).getType());
    }
}
```

### 数据库配置

#### 1. 设备字典表更新

**manage_device_dictionary表结构**：
```sql
CREATE TABLE `manage_device_dictionary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `device_name` varchar(255) DEFAULT NULL COMMENT '设备名称',
  `device_type` int DEFAULT NULL COMMENT '设备类型',
  `sub_type` int DEFAULT NULL COMMENT '设备子类型',
  `domain` int DEFAULT NULL COMMENT '设备域',
  `device_desc` varchar(500) DEFAULT NULL COMMENT '设备描述',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_device_type` (`device_type`,`sub_type`,`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设备类型字典表';
```

#### 2. SuperDock设备数据插入

**SQL更新脚本**：
```sql
-- 插入SuperDock系列机场设备
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
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

-- 插入M4系列无人机
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('M4D', 100, 0, 0, 'M4D无人机，标准版本'),
('M4TD', 100, 1, 0, 'M4TD无人机，热成像版本'),
('M4E', 99, 0, 0, 'M4E无人机，企业版'),
('M4T', 99, 1, 0, 'M4T无人机，企业热成像版')
ON DUPLICATE KEY UPDATE
device_name = VALUES(device_name),
device_desc = VALUES(device_desc),
update_time = CURRENT_TIMESTAMP;

-- 插入新一代载荷设备
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('H30', 82, 0, 1, 'H30混合变焦相机，高清可见光成像'),
('H30T', 83, 0, 1, 'H30T热成像相机，可见光+热成像双传感器'),
('L2', 84, 0, 1, 'L2激光雷达，高精度三维测量')
ON DUPLICATE KEY UPDATE
device_name = VALUES(device_name),
device_desc = VALUES(device_desc),
update_time = CURRENT_TIMESTAMP;
```


## 系统错误修复与优化

### SuperDock设备集成常见问题

在SuperDock设备集成过程中，可能遇到以下技术问题。本节提供详细的问题分析和解决方案：

#### 1. 设备上线失败问题

**问题现象**：
- SuperDock设备无法正常上线
- 系统日志显示设备类型不支持错误
- 前端界面无法显示设备状态

**问题分析**：
```
CloudSDKException: Unsupported device type: S2301
```

**解决方案**：

1. **检查设备枚举配置**：
```java
// 确认GatewayTypeEnum中包含SuperDock设备
public enum GatewayTypeEnum {
    DOCK(DeviceEnum.DOCK),
    DOCK2(DeviceEnum.DOCK2),
    // 确保包含以下SuperDock设备
    S22M300(DeviceEnum.S22M300),
    S2201(DeviceEnum.S2201),
    S2301(DeviceEnum.S2301),
    S24M350(DeviceEnum.S24M350),
    S24M350S(DeviceEnum.S24M350S),
    S24M3(DeviceEnum.S24M3),
    S24M4(DeviceEnum.S24M4);
}
```

2. **验证数据库配置**：
```sql
-- 检查设备字典表是否包含SuperDock设备
SELECT * FROM manage_device_dictionary
WHERE device_type = 88099 AND sub_type = 0 AND domain = 3;
```

3. **检查MQTT消息格式**：
```json
{
  "tid": "xxxx",
  "bid": "xxxx",
  "timestamp": 123456789,
  "method": "update_topo",
  "data": {
    "domain": 3,
    "type": 88100,
    "sub_type": 0,
    "device_secret": "05661bc2c3b6c83601263782dfef5451",
    "nonce": "57437ab038619be8b79bdb1d800ee6e5",
    "thing_version": "1.0.0",
    "sub_devices": []
  },
  "gateway": "dock-uuid"
}
```

#### 2. 设备绑定状态查询错误

**问题现象**：
```
Error Code: 210002, Error Msg: Invalid parameter.. bindStatus[1].organizationName must not be null
```

**问题分析**：
- SuperDock设备查询绑定状态时，系统无法找到对应的设备记录
- 缺失的设备导致无法构建完整的绑定状态响应
- `organizationName`、`organizationId`、`deviceCallsign` 等必需字段为空

**解决方案**：

1. **添加设备记录**：
```sql
-- 添加SuperDock机场设备
INSERT INTO manage_device (
    device_sn, device_name, nickname, workspace_id,
    device_type, sub_type, domain, bound_status,
    create_time, update_time, bound_time
) VALUES (
    'dock-uuid',  -- 设备序列号
    'SuperDock S2301',                    -- 设备名称
    'SuperDock S2301',                    -- 设备昵称
    'xx-uuid', -- 工作空间ID
    88099, 0, 3, 1,                      -- 设备类型信息和绑定状态
    UNIX_TIMESTAMP() * 1000,             -- 创建时间
    UNIX_TIMESTAMP() * 1000,             -- 更新时间
    UNIX_TIMESTAMP() * 1000              -- 绑定时间
);

-- 添加配套的无人机设备
INSERT INTO manage_device (
    device_sn, device_name, nickname, workspace_id,
    device_type, sub_type, domain, bound_status,
    create_time, update_time, bound_time
) VALUES (
    'dock-uuid',              -- 无人机序列号
    'M3T',                               -- 设备名称
    'M3T-Drone',                         -- 设备昵称
    'xx-uuid', -- 工作空间ID
    77, 1, 0, 1,                         -- M3T设备类型信息
    UNIX_TIMESTAMP() * 1000,
    UNIX_TIMESTAMP() * 1000,
    UNIX_TIMESTAMP() * 1000
);
```

2. **验证工作空间配置**：
```sql
-- 确认工作空间存在且配置正确
SELECT workspace_id, workspace_name, organization_name
FROM manage_workspace
WHERE workspace_id = 'xx-uuid';

-- 如果工作空间不存在，创建默认工作空间
INSERT INTO manage_workspace (
    workspace_id, workspace_name, organization_name,
    create_time, update_time
) VALUES (
    'xx-uuid',
    'SuperDock测试工作空间',
    '草莓创新',
    UNIX_TIMESTAMP() * 1000,
    UNIX_TIMESTAMP() * 1000
);
```

#### 3. 状态数据路由错误

**问题现象**：
```
Error Code: 220001, Error Msg: Data exceeds limit.. Unexpected value: S2301
```

**问题分析**：
- `StateRouter.getTypeReference()` 方法的 switch 语句中没有包含新的SuperDock机场类型
- 系统无法识别 S2301 等新机场设备类型，导致状态数据路由失败

**解决方案**：

修改 `StateRouter.java` 中的 `getTypeReference()` 方法：
```java
private Class getTypeReference(String gatewaySn, Object data) {
    Set<String> keys = ((Map<String, Object>) data).keySet();
    switch (SDKManager.getDeviceSDK(gatewaySn).getType()) {
        case RC:
            return RcStateDataKeyEnum.find(keys).getClassType();
        case DOCK:
        case DOCK2:
        // 支持所有SuperDock机场类型
        case S22M300:
        case S2201:
        case S2301:
        case S24M350:
        case S24M350S:
        case S24M3:
        case S24M4:
            return DockStateDataKeyEnum.find(keys).getClassType();
        default:
            throw new CloudSDKException(CloudSDKErrorEnum.WRONG_DATA,
                "Unexpected device type: " + SDKManager.getDeviceSDK(gatewaySn).getType());
    }
}
```

#### 4. 版本兼容性错误

**问题现象**：
```
CloudSDKVersionException: The current CloudSDK version(1.0.3) does not support this thing version(2.1.2)
```

**问题分析**：
- SuperDock设备或配套无人机报告的 thing version 是 `2.1.2`
- `DroneThingVersionEnum` 中只支持到较低版本
- 版本不匹配导致设备注册失败

**解决方案**：

在 `DroneThingVersionEnum.java` 中添加新版本支持：
```java
public enum DroneThingVersionEnum {
    V1_0_0("1.0.0", CloudSDKVersionEnum.V1_0_3),
    V1_2_0("1.2.0", CloudSDKVersionEnum.V1_0_3),

    // 添加对新版本的支持
    V2_1_2("2.1.2", CloudSDKVersionEnum.V1_0_3),
    V2_2_0("2.2.0", CloudSDKVersionEnum.V1_0_3),

    // 为SuperDock设备添加版本支持
    SUPERDOCK_V1_0_0("1.0.0", CloudSDKVersionEnum.V1_0_3),
    SUPERDOCK_V1_1_0("1.1.0", CloudSDKVersionEnum.V1_0_3);
}
```

### 监控和维护

#### 1. 系统监控指标

**关键性能指标**：
- SuperDock设备在线率
- MQTT消息处理成功率
- 设备状态数据更新频率
- WebSocket连接稳定性
- 数据库查询响应时间

**监控配置示例**：
```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,prometheus
  endpoint:
    health:
      show-details: always
  metrics:
    export:
      prometheus:
        enabled: true

logging:
  level:
    com.dji.sdk.mqtt: DEBUG
    com.dji.sample.manage.service: DEBUG
    com.dji.sdk.cloudapi.device: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
```

#### 2. 故障排查流程

**SuperDock设备连接问题**：
1. 检查网络连接和MQTT broker状态
2. 验证设备认证信息和证书
3. 确认设备枚举和数据库配置
4. 检查防火墙和端口配置

**数据处理问题**：
1. 检查Redis连接和数据完整性
2. 验证数据库表结构和索引
3. 查看Spring Integration消息流
4. 分析MQTT消息格式和内容

**前端显示问题**：
1. 检查WebSocket连接状态
2. 验证设备绑定和工作空间配置
3. 确认前端路由和组件状态
4. 检查API响应数据格式


### 技术支持和资源

#### 1. 文档和资源

**官方文档**：
- [草莓创新官网](https://sb.im/) - 产品信息和解决方案
- [DJI上云API文档](https://developer.dji.com/doc/cloud-api-tutorial/cn/) - DJI官方API参考
- [SuperDock产品手册](https://sb.im/products/) - 详细的产品规格和使用指南

**开源项目**：
- [DJI Cloud API Demo](https://github.com/dji-sdk/DJI-Cloud-API-Demo) - 后端参考实现
- [DJI Cloud API Demo Web](https://github.com/dji-sdk/Cloud-API-Demo-Web) - 前端参考实现

#### 2. 技术支持

**联系方式**：
- **GitHub组织**: [@sb-im](https://github.com/sb-im)

**支持服务**：
- 7x24小时技术支持热线
- 远程技术支持和故障诊断
- 现场技术服务和培训
- 定制化开发和集成服务

#### 3. 最佳实践建议

**开发环境**：
- 使用Docker容器化部署，确保环境一致性
- 配置完整的日志记录，便于问题排查
- 实施自动化测试，确保代码质量
- 建立监控和告警机制

**生产部署**：
- 进行充分的压力测试和性能调优
- 配置数据库备份和恢复策略
- 实施安全加固和访问控制
- 建立运维监控和故障响应流程

## 总结

通过本文档的详细介绍，您已经了解了如何将SuperDock设备完整集成到DJI Cloud API Demo系统中。主要成果包括：

### 技术成果

1. **完整的设备支持**：
    - 支持SuperDock全系列机场设备（S22M300、S2201、S2301、S24M350等）
    - 支持M4系列无人机和新一代载荷设备
    - 实现了完整的设备识别、状态监控和控制功能

2. **系统稳定性提升**：
    - 解决了设备上线、状态路由、版本兼容等关键问题
    - 优化了数据库结构和缓存策略
    - 建立了完善的错误处理和监控机制

3. **兼容性保证**：
    - 完全兼容DJI上云API标准，零学习成本
    - 保持向后兼容，不影响现有功能
    - 为未来设备扩展提供了标准化框架


---

:::tip 重要提示
在实际部署过程中，请确保：
- 所有设备的domain、type、sub_type参数与文档中的定义一致
- 数据库配置完整且经过验证
- 网络连接稳定且安全配置正确
- 监控和日志系统正常运行
  :::

:::info 技术支持
如果在集成过程中遇到任何问题，请随时联系草莓创新技术支持团队。我们提供专业的技术支持服务，确保您的项目顺利实施。
:::
