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