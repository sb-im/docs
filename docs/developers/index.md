---
id: index
title: 运行DJI上云API Demo
sidebar_label: 运行DJI上云API Demo
sidebar_position: 1
description: SBIM 系统设备适配上云API的完整开发指南
---
# 运行DJI上云API Demo

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

## 相关文档

如需了解 SuperDock 设备的详细集成方案，请参考：

- [SuperDock设备支持扩展](./superdock.md) - SuperDock系列设备在DJI Cloud API Demo中的集成和扩展指南

---


