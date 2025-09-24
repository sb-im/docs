---
id: index.base
title: 适配上云API代码
sidebar_label: 开发者中心
sidebar_position: 2
description: SBIM 系统设备适配上云API的完整开发指南
---
# 基础配置

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
## SBDock设备支持扩展

### 提交说明

本次提交（commit: dc84866）主要为DJI Cloud API Demo项目添加了SBDock（各种机场型号）的完整支持，包括设备枚举、类型定义、数据库更新等多个方面的修改。

### 修改原因

1. **设备支持扩展需求**：随着DJI机场产品线的扩展，需要支持更多的机场型号，包括S22M300、S2201、S2301、S24M350等多种SBDock设备。

2. **设备识别准确性**：原有的设备枚举存在一些不准确的映射关系，特别是M30/M30T系列设备的类型定义需要修正。

3. **数据库同步**：需要将新的设备类型信息同步到数据库中，确保系统能够正确识别和管理这些设备。

4. **系统完整性**：为了保证Cloud API Demo的完整性和实用性，需要支持最新的DJI设备产品线。

### 主要修改内容

#### 1. 设备枚举扩展 (DeviceEnum.java)
- **新增M4系列无人机支持**：
  - M4D (type: 100, sub_type: 0)
  - M4TD (type: 100, sub_type: 1) 
  - M4E (type: 99, sub_type: 0)
  - M4T (type: 99, sub_type: 1)

- **新增相机设备支持**：
  - PAYLOAD (type: 31)
  - H30 (type: 82)
  - H30T (type: 83)
  - L2 (type: 84)

- **修正设备类型映射**：
  - M30: 从 `M30_OR_M3T_CAMERA` 修正为 `M30`
  - M30T: 从 `M30_OR_M3T_CAMERA` 修正为 `M30T`
  - M3T_CAMERA: 从 `M30_OR_M3T_CAMERA` 修正为 `M3T_CAMERA`

#### 2. 设备类型定义扩展 (DeviceTypeEnum.java)
- 新增M4系列设备类型定义
- 新增H30系列相机类型定义
- 新增L2激光雷达类型定义
- 修正M30/M30T系列的类型定义

#### 3. 机场设备支持 (GatewayTypeEnum.java)
- **新增7种SBDock机场型号**：
  - S22M300: M300机场 (type: 88097)
  - S2201: 机场2 (type: 88098)
  - S2301: M3机场 (type: 88099)
  - S24M350: M350机场-24 (type: 88100)
  - S24M350S: M350换电机场-24 (type: 88101)
  - S24M3: M3机场-24 (type: 88102)
  - S24M4: M4机场-24 (type: 88103)


#### 4. 版本信息更新
- **DroneThingVersionEnum.java**: 新增M4系列无人机版本支持
- **GatewayThingVersion.java**: 新增各种机场设备的版本信息
- **DockLiveErrorStatus.java**: 扩展机场设备的错误状态定义

#### 5. 数据库更新脚本
- **type.json**: 包含所有设备类型的完整定义，用于数据同步
- **update_database.py**: Python脚本，用于自动更新数据库中的设备字典
- **update_device_dictionary.sql**: SQL脚本，直接更新manage_device_dictionary表

#### 6. 系统配置优化
- **application.yml**: 优化了配置文件结构，简化了部分配置项
- **SDKDeviceService.java**: 新增设备服务处理逻辑
- **StateRouter.java**: 扩展状态路由处理

### 技术实现原理

#### 设备识别机制
DJI Cloud API使用三元组(domain, type, sub_type)来唯一标识设备：
- **domain**: 设备域，0=无人机，1=载荷，2=遥控器，3=机场
- **type**: 设备类型，每种设备有唯一的类型编号
- **sub_type**: 设备子类型，用于区分同一类型下的不同变体

#### 机场设备扩展原理
```java
// 原有机场支持
DOCK(DeviceEnum.DOCK),           // 通用机场
DOCK2(DeviceEnum.DOCK2),         // 机场2

// 新增具体机场型号支持
S22M300(DeviceEnum.S22M300),     // M300专用机场
S2301(DeviceEnum.S2301),         // M3系列机场
S24M350(DeviceEnum.S24M350),     // M350机场
// ... 其他型号
```

#### 数据库同步机制
1. **type.json**: 作为设备类型的标准定义文件
2. **update_database.py**: 读取JSON文件并更新数据库
3. **update_device_dictionary.sql**: 提供直接的SQL更新方案

### 使用方法

#### 1. 数据库更新
```bash
# 方法1: 使用Python脚本
python3 update_database.py

# 方法2: 直接执行SQL
mysql -u root -p cloud_sample < update_device_dictionary.sql
```

#### 2. 设备识别示例
```java
// 识别M4E无人机
DeviceEnum device = DeviceEnum.M4E;
// domain=0, type=99, sub_type=0

// 识别S24M350机场
DeviceEnum dock = DeviceEnum.S24M350;
// domain=3, type=88100, sub_type=0
```

### 影响范围

1. **设备管理**: 系统现在可以正确识别和管理更多类型的DJI设备
2. **数据库结构**: manage_device_dictionary表包含了最新的设备信息
3. **API兼容性**: 保持了向后兼容，不影响现有功能
4. **扩展性**: 为未来新设备的支持提供了标准化的扩展方式

### 注意事项

1. **数据库备份**: 在执行数据库更新前，建议先备份现有数据
2. **版本兼容**: 确保使用的DJI SDK版本支持这些新设备
3. **配置更新**: 部署时需要同步更新相关配置文件
4. **测试验证**: 建议在测试环境中先验证新设备的识别和功能

### 相关文件清单

本次提交涉及的主要文件：

```
cloud-sdk/src/main/java/com/dji/sdk/cloudapi/device/
├── DeviceEnum.java                    # 设备枚举定义
├── DeviceTypeEnum.java               # 设备类型枚举
└── DockLiveErrorStatus.java          # 机场错误状态

cloud-sdk/src/main/java/com/dji/sdk/config/version/
├── DroneThingVersionEnum.java        # 无人机版本枚举
├── GatewayThingVersion.java          # 网关版本信息
└── GatewayTypeEnum.java              # 网关类型枚举

sample/src/main/java/com/dji/sample/manage/service/impl/
└── SDKDeviceService.java             # 设备服务实现

数据库相关文件：
├── type.json                         # 设备类型定义
├── update_database.py                # 数据库更新脚本
└── update_device_dictionary.sql      # SQL更新脚本
```


## 系统错误修复与优化

### 问题诊断与解决方案

在DJI Cloud API Demo的实际运行过程中，我们遇到了几个关键的技术问题，以下是详细的问题分析和解决方案：

#### 1. dockLiveStatusUpdate 方法未实现错误

**问题描述**：
```
java.lang.UnsupportedOperationException: dockLiveStatusUpdate not implemented
```

**错误原因**：
- `AbstractDeviceService` 类中的 `dockLiveStatusUpdate` 方法只有抽象定义，没有具体实现
- 当MQTT消息到达时，Spring Integration框架调用该方法，但由于未实现而抛出异常

**解决方案**：
在 `SDKDeviceService` 类中实现 `dockLiveStatusUpdate` 方法：

```java
@Override
public void dockLiveStatusUpdate(TopicStateRequest<DockLiveStatus> request, MessageHeaders headers) {
    String from = request.getFrom();
    DockLiveStatus liveStatus = request.getData();
    
    // 检查设备是否在线
    Optional<DeviceDTO> deviceOpt = deviceRedisService.getDeviceOnline(from);
    if (deviceOpt.isEmpty()) {
        log.warn("Device {} is not online, ignoring live status update", from);
        return;
    }

    DeviceDTO device = deviceOpt.get();
    if (!StringUtils.hasText(device.getWorkspaceId())) {
        log.warn("Device {} has no workspace, ignoring live status update", from);
        return;
    }

    // 记录直播状态更新用于调试
    log.debug("Received dock live status update from {}: {}", from, liveStatus);

    // 通过WebSocket推送直播状态更新到Web客户端
    // 注意：我们不将此数据存储在Redis OSD缓存中，以避免与OsdDock数据冲突
    deviceService.pushOsdDataToWeb(device.getWorkspaceId(), BizCodeEnum.DEVICE_OSD, from, liveStatus);
}
```

**技术要点**：
- 验证设备在线状态和工作空间配置
- 通过WebSocket推送状态更新到前端
- 避免将直播状态数据存储到Redis OSD缓存中，防止与其他OSD数据类型冲突

#### 2. DockLiveErrorStatus 反序列化错误

**问题描述**：
```
com.dji.sdk.common.ErrorCodeSourceEnum has unknown data: [0]
```

**错误原因**：
- `DockLiveErrorStatus` 构造函数在处理成功状态（错误代码为0）时，试图将0解析为错误源枚举
- `ErrorCodeSourceEnum` 只包含 DEVICE(3)、DOCK(5)、PILOT(6)，不包含0值
- 当设备报告成功状态时（error_status: 0），反序列化失败

**解决方案**：
修改 `DockLiveErrorStatus` 构造函数，添加对成功状态的特殊处理：

```java
@JsonCreator
public DockLiveErrorStatus(int code) {
    this.success = MqttReply.CODE_SUCCESS == code;
    if (MqttReply.CODE_SUCCESS == code) {
        // 对于成功状态，使用默认值
        this.source = ErrorCodeSourceEnum.DOCK;
        this.errorCode = LiveErrorCodeEnum.SUCCESS;
        return;
    }
    this.source = ErrorCodeSourceEnum.find(code / MOD);
    this.errorCode = LiveErrorCodeEnum.find(code % MOD);
}
```

**技术要点**：
- 参考 `ServicesErrorCode` 和 `EventsErrorCode` 的实现模式
- 对成功状态（code=0）进行特殊处理，避免枚举查找失败
- 保持与其他错误处理类的一致性

#### 3. Redis数据类型冲突问题

**问题描述**：
```
java.lang.ClassCastException: Cannot cast com.dji.sdk.cloudapi.device.DockLiveStatus to com.dji.sdk.cloudapi.device.OsdDock
```

**错误原因**：
- 不同类型的设备数据被存储到同一个Redis键中
- `DockLiveStatus` 覆盖了 `OsdDock` 数据，导致类型转换失败
- Redis OSD缓存设计为存储单一类型的数据

**解决方案**：
1. **避免数据覆盖**：不将 `DockLiveStatus` 存储到OSD Redis缓存中
2. **数据隔离**：为不同类型的状态数据使用不同的存储策略
3. **实时推送**：直接通过WebSocket推送状态更新，无需持久化存储

**最佳实践**：
```java
// 错误做法 - 会导致数据冲突
deviceRedisService.setDeviceOsd(from, liveStatus);

// 正确做法 - 直接推送，避免存储冲突
deviceService.pushOsdDataToWeb(device.getWorkspaceId(), BizCodeEnum.DEVICE_OSD, from, liveStatus);
```

#### 4. 载荷控制权限验证问题

**问题描述**：
```
The current state of the drone does not support this function, please try again later.
```

**错误原因**：
- `PayloadCommandsHandler.canPublish()` 方法无法从Redis中获取到正确的 `OsdDockDrone` 数据
- 相机载荷索引不匹配或设备OSD数据缺失
- 相机状态不满足执行条件

**诊断方法**：
1. **检查设备OSD数据**：确认Redis中是否有正确的设备状态数据
2. **验证载荷索引**：确认请求的载荷索引与设备实际配置匹配
3. **检查相机状态**：确认相机当前状态支持请求的操作

**调试建议**：
```java
public boolean canPublish(String deviceSn) {
    Optional<OsdDockDrone> deviceOpt = SpringBeanUtilsTest.getBean(IDeviceRedisService.class)
            .getDeviceOsd(deviceSn, OsdDockDrone.class);
    if (deviceOpt.isEmpty()) {
        log.error("Device {} OSD data not found in Redis", deviceSn);
        throw new RuntimeException("The device is offline.");
    }
    
    OsdDockDrone osdDockDrone = deviceOpt.get();
    log.debug("Device {} OSD data: cameras count = {}", deviceSn, 
              osdDockDrone.getCameras() != null ? osdDockDrone.getCameras().size() : 0);
    
    // 详细的载荷索引匹配日志
    osdCamera = osdDockDrone.getCameras().stream()
            .filter(osdCamera -> param.getPayloadIndex().equals(osdCamera.getPayloadIndex().toString()))
            .findAny()
            .orElseThrow(() -> {
                log.error("Camera with payload index {} not found for device {}. Available cameras: {}", 
                         param.getPayloadIndex(), deviceSn, 
                         osdDockDrone.getCameras().stream()
                                 .map(c -> c.getPayloadIndex().toString())
                                 .collect(Collectors.toList()));
                return new RuntimeException("Did not receive osd information about the camera, please check the cache data.");
            });
    return true;
}
```

### 数据库处理优化

#### 1. 设备字典表更新

**表结构**：`manage_device_dictionary`
```sql
CREATE TABLE `manage_device_dictionary` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `device_name` varchar(255) DEFAULT NULL COMMENT '设备名称',
  `device_type` int DEFAULT NULL COMMENT '设备类型',
  `sub_type` int DEFAULT NULL COMMENT '设备子类型',
  `domain` int DEFAULT NULL COMMENT '设备域',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_device_type` (`device_type`,`sub_type`,`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**数据更新脚本**：
```sql
-- 新增M4系列设备
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain) VALUES
('M4D', 100, 0, 0),
('M4TD', 100, 1, 0),
('M4E', 99, 0, 0),
('M4T', 99, 1, 0)
ON DUPLICATE KEY UPDATE 
device_name = VALUES(device_name),
update_time = CURRENT_TIMESTAMP;

-- 新增机场设备
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain) VALUES
('S22M300', 88097, 0, 3),
('S2201', 88098, 0, 3),
('S2301', 88099, 0, 3),
('S24M350', 88100, 0, 3),
('S24M350S', 88101, 0, 3),
('S24M3', 88102, 0, 3),
('S24M4', 88103, 0, 3)
ON DUPLICATE KEY UPDATE 
device_name = VALUES(device_name),
update_time = CURRENT_TIMESTAMP;

-- 新增载荷设备
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain) VALUES
('H30', 82, 0, 1),
('H30T', 83, 0, 1),
('L2', 84, 0, 1)
ON DUPLICATE KEY UPDATE 
device_name = VALUES(device_name),
update_time = CURRENT_TIMESTAMP;
```

#### 2. 设备状态表优化

**建议新增表**：`manage_device_status_history`
```sql
CREATE TABLE `manage_device_status_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `device_sn` varchar(255) NOT NULL COMMENT '设备序列号',
  `status_type` varchar(50) NOT NULL COMMENT '状态类型：OSD/LIVE/HMS等',
  `status_data` json DEFAULT NULL COMMENT '状态数据JSON',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_device_sn` (`device_sn`),
  KEY `idx_status_type` (`status_type`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设备状态历史记录表';
```

#### 3. 数据库连接池优化

**HikariCP配置**：
```yaml
spring:
  datasource:
    type: com.zaxxer.hikari.HikariDataSource
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      auto-commit: true
      idle-timeout: 30000
      pool-name: DatebookHikariCP
      max-lifetime: 1800000
      connection-timeout: 30000
      connection-test-query: SELECT 1
```

### 系统架构优化建议

#### 1. 消息处理架构

**当前架构**：
```
MQTT消息 → Spring Integration → 路由器 → 服务方法 → 业务处理
```

**优化建议**：
- 添加消息验证层，确保数据完整性
- 实现优雅的错误处理和重试机制
- 添加消息处理的监控和日志

#### 2. 数据存储策略

**Redis缓存设计**：
```
设备在线状态: online:{deviceSn}
设备OSD数据: osd:{deviceSn}
直播状态: live_status:{deviceSn}  # 建议新增
载荷状态: payload_status:{deviceSn}  # 建议新增
```

**数据库设计**：
- 设备基础信息：manage_device
- 设备字典：manage_device_dictionary
- 设备状态历史：manage_device_status_history（建议新增）

#### 3. 错误处理机制

**统一错误处理**：
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(UnsupportedOperationException.class)
    public ResponseEntity<ErrorResponse> handleUnsupportedOperation(UnsupportedOperationException e) {
        log.error("Unsupported operation: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED)
                .body(new ErrorResponse("OPERATION_NOT_SUPPORTED", e.getMessage()));
    }
    
    @ExceptionHandler(ClassCastException.class)
    public ResponseEntity<ErrorResponse> handleClassCast(ClassCastException e) {
        log.error("Data type mismatch: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("DATA_TYPE_MISMATCH", "Internal data processing error"));
    }
}
```

### 部署和维护指南

#### 1. 部署前检查清单

- [ ] 确认所有抽象方法都有具体实现
- [ ] 验证Redis数据结构的一致性
- [ ] 检查数据库表结构和数据完整性
- [ ] 测试MQTT消息处理流程
- [ ] 验证WebSocket连接和消息推送

#### 2. 监控和日志

**关键监控指标**：
- MQTT消息处理成功率
- Redis缓存命中率
- WebSocket连接数和消息推送量
- 设备在线状态统计
- 错误发生频率和类型

**日志配置建议**：
```yaml
logging:
  level:
    com.dji.sdk.mqtt: DEBUG
    com.dji.sample.manage.service: DEBUG
    org.springframework.integration: INFO
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n"
```

#### 3. 故障排查指南

**常见问题排查步骤**：

1. **设备连接问题**：
   - 检查MQTT连接状态
   - 验证设备认证信息
   - 确认网络连通性

2. **数据处理问题**：
   - 检查Redis连接和数据
   - 验证数据库连接和表结构
   - 查看Spring Integration消息流

3. **前端显示问题**：
   - 检查WebSocket连接状态
   - 验证消息格式和内容
   - 确认前端路由和组件状态

通过以上优化和修复，DJI Cloud API Demo系统的稳定性和可靠性得到了显著提升，能够更好地支持各种DJI设备的接入和管理。


## 新设备类型支持与运行时错误修复

### 问题背景

在扩展DJI Cloud API Demo以支持新的机场设备类型（如S2301等）时，遇到了一系列运行时错误。这些问题主要涉及设备类型识别、版本兼容性、数据路由和设备绑定等方面。

### 核心问题与解决方案

#### 1. 设备绑定状态查询错误

**问题描述**：
```
Error Code: 210002, Error Msg: Invalid parameter.. bindStatus[1].organizationName must not be null
```

**错误原因**：
- 机场查询绑定状态时，系统无法找到对应的设备记录
- 缺失的设备导致无法构建完整的绑定状态响应
- `organizationName`、`organizationId`、`deviceCallsign` 等必需字段为空

**解决方案**：
1. **添加缺失设备记录**：
```sql
-- 添加机场设备
INSERT INTO manage_device (device_sn, device_name, nickname, workspace_id, device_type, sub_type, domain, bound_status, create_time, update_time, bound_time) 
VALUES ('09EBE02D9C39545580BFE4AD57571C54', 'S2301', 'S2301', 'e3dea0f5-37f2-4d79-ae58-490af3228069', 88099, 0, 3, 1, UNIX_TIMESTAMP() * 1000, UNIX_TIMESTAMP() * 1000, UNIX_TIMESTAMP() * 1000);

-- 添加无人机设备
INSERT INTO manage_device (device_sn, device_name, nickname, workspace_id, device_type, sub_type, domain, bound_status, create_time, update_time, bound_time) 
VALUES ('1581F5FHB22A7002097T', 'M3T', 'M3T-Drone', 'e3dea0f5-37f2-4d79-ae58-490af3228069', 77, 1, 0, 1, UNIX_TIMESTAMP() * 1000, UNIX_TIMESTAMP() * 1000, UNIX_TIMESTAMP() * 1000);
```

2. **验证工作空间配置**：
```sql
-- 确认工作空间存在
SELECT workspace_id, workspace_name FROM manage_workspace WHERE workspace_id = 'e3dea0f5-37f2-4d79-ae58-490af3228069';
```

**技术要点**：
- `dto2BindStatus` 方法需要完整的设备信息来构建响应
- 设备必须绑定到有效的工作空间
- 所有必需字段（nickname、workspaceId、workspaceName）都必须有值

#### 2. State 数据路由错误

**问题描述**：
```
Error Code: 220001, Error Msg: Data exceeds limit.. Unexpected value: S2301
```

**错误原因**：
- `StateRouter.getTypeReference()` 方法的 switch 语句中没有包含新的机场类型
- 系统无法识别 S2301 等新机场设备类型
- 导致状态数据路由失败

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
        // 支持所有新的机场类型
        case S22M300:
        case S2201:
        case S2301:
        case S24M350:
        case S24M350S:
        case S24M3:
        case S24M4:
            return DockStateDataKeyEnum.find(keys).getClassType();
        default:
            throw new CloudSDKException(CloudSDKErrorEnum.WRONG_DATA, "Unexpected value: " + SDKManager.getDeviceSDK(gatewaySn).getType());
    }
}
```

**技术要点**：
- 新机场类型使用与 DOCK/DOCK2 相同的处理逻辑
- 都使用 `DockStateDataKeyEnum` 进行数据路由
- 保持向后兼容性

#### 3. CloudSDK 版本兼容性错误

**问题描述**：
```
CloudSDKVersionException: The current CloudSDK version(1.0.3) does not support this thing version(2.1.2)
```

**错误原因**：
- 无人机设备报告的 thing version 是 `2.1.2`
- `DroneThingVersionEnum` 中只支持到 `V1_2_0("1.2.0")`
- 版本不匹配导致设备注册失败

**解决方案**：
在 `DroneThingVersionEnum.java` 中添加新版本支持：

```java
V1_2_0("1.2.0", CloudSDKVersionEnum.V1_0_3),

// 添加对新版本的支持
V2_1_2("2.1.2", CloudSDKVersionEnum.V1_0_3),

;
```

**技术要点**：
- 新版本映射到当前系统支持的 CloudSDK 版本
- 保持与现有版本管理机制的一致性
- 支持向后兼容


#### 4. OSD 设备类型路由优化

**已解决问题**：
在之前的修改中，我们已经更新了 `OsdDeviceTypeEnum.java`：

```java
DOCK(true, OsdDock.class, ChannelName.INBOUND_OSD_DOCK, 
     GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2, 
     GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201, GatewayTypeEnum.S2301, 
     GatewayTypeEnum.S24M350, GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3, GatewayTypeEnum.S24M4),

DOCK_DRONE(false, OsdDockDrone.class, ChannelName.INBOUND_OSD_DOCK_DRONE, 
           GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2, 
           GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201, GatewayTypeEnum.S2301, 
           GatewayTypeEnum.S24M350, GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3, GatewayTypeEnum.S24M4);
```

这确保了 OSD 数据能够正确路由到相应的处理器。

### 数据库配置优化

#### 1. 设备字典表更新

使用 `type.json` 文件更新设备字典：

```json
{
  "domain": 3,
  "type": 88099,
  "sub_type": 0,
  "name": "S2301",
  "说明": "M3机场"
}
```

**更新脚本**：
```sql
-- 清空并重新插入所有设备类型
TRUNCATE TABLE manage_device_dictionary;

INSERT INTO manage_device_dictionary (domain, device_type, sub_type, device_name, device_desc) VALUES
-- 机场设备
(3, 88097, 0, 'S22M300', 'M300机场'),
(3, 88098, 0, 'S2201', '机场 2'),
(3, 88099, 0, 'S2301', 'M3机场'),
(3, 88100, 0, 'S24M350', 'M350机场-24'),
(3, 88101, 0, 'S24M350S', 'M350换电机场-24'),
(3, 88102, 0, 'S24M3', 'M3机场-24'),
(3, 88103, 0, 'S24M4', 'M4机场-24');
```

#### 2. 设备绑定验证

**验证设备绑定状态**：
```sql
-- 检查设备绑定信息
SELECT device_sn, device_name, nickname, workspace_id, bound_status 
FROM manage_device 
WHERE device_sn IN ('09EBE02D9C39545580BFE4AD57571C54', '1581F5FHB22A7002097T');

-- 检查工作空间信息
SELECT workspace_id, workspace_name 
FROM manage_workspace 
WHERE workspace_id = 'e3dea0f5-37f2-4d79-ae58-490af3228069';
```

### 系统架构改进

#### 1. 错误处理机制

**统一错误处理策略**：
- 设备不存在时的优雅降级
- 版本不兼容时的自动适配
- 数据路由失败时的重试机制

#### 2. 设备注册流程优化

**改进的设备注册流程**：
1. 验证设备类型和版本兼容性
2. 检查设备是否已在数据库中注册
3. 自动创建缺失的设备记录
4. 绑定到默认工作空间（如果未指定）

#### 3. 监控和日志增强

**关键监控点**：
- 设备绑定状态查询成功率
- State 数据路由成功率
- 版本兼容性检查结果
- OSD 数据处理性能

**日志配置**：
```yaml
logging:
  level:
    com.dji.sdk.mqtt.state.StateRouter: DEBUG
    com.dji.sample.manage.service.impl.SDKOrganizationService: DEBUG
    com.dji.sdk.config.version.DroneThingVersionEnum: DEBUG
```

### 部署和维护指南

#### 1. 部署前检查

- [ ] 确认所有新设备类型已添加到相关枚举中
- [ ] 验证数据库中的设备字典数据完整性
- [ ] 检查设备绑定关系的正确性
- [ ] 测试新设备类型的消息路由

#### 2. 故障排查

**常见问题诊断**：

1. **设备绑定失败**：
   - 检查设备是否存在于 `manage_device` 表中
   - 验证工作空间配置是否正确
   - 确认设备的 nickname 字段不为空

2. **消息路由失败**：
   - 检查 `StateRouter` 中是否包含新设备类型
   - 验证 `SDKManager` 中的设备注册状态
   - 确认设备类型枚举定义正确

3. **版本兼容性问题**：
   - 检查 `DroneThingVersionEnum` 中的版本支持
   - 验证设备报告的 thing version
   - 确认 CloudSDK 版本映射关系

#### 3. 性能优化建议

**数据库优化**：
- 为 `manage_device` 表的 `device_sn` 字段添加索引
- 定期清理过期的设备状态数据
- 优化设备查询的 SQL 语句

**缓存策略**：
- 缓存设备字典数据，减少数据库查询
- 使用 Redis 缓存设备绑定状态
- 实现设备在线状态的快速查询

### 总结

通过系统性地解决设备绑定、消息路由、版本兼容性等关键问题，DJI Cloud API Demo 现在能够：

1. **完整支持新机场设备类型**：包括 S2301、S24M350 等多种机场型号
2. **正确处理设备绑定状态查询**：确保所有必需字段都有有效值
3. **准确路由各类消息**：State、OSD、Status 等消息都能正确处理
4. **兼容新版本设备**：支持 thing version 2.1.2 等新版本
5. **提供完整的错误处理**：优雅处理各种异常情况

这些改进显著提升了系统的稳定性、兼容性和可维护性，为后续的功能扩展奠定了坚实的基础。

