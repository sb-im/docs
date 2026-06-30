---
id: index
title: Run the Cloud API Demo
sidebar_label: Run the Cloud API Demo
sidebar_position: 1
description: A complete development guide for adapting SBIM system devices to the Cloud API
---
# Run the Cloud API Demo

> This is a **zero-to-one** hands-on guide: it walks you through bringing up the dependency services on your local machine or a cloud host, importing the sample data, getting the Cloud API Demo running, and preparing for the next step of adapting **SuperDock** devices.

:::tip What you will get

* A ready-to-run Dockerized base environment (EMQX, MySQL, Redis, MinIO, SRS).
* A pre-imported sample database for local joint debugging and regression testing.
* Clear version requirements and common pitfall reminders (ports, networking, permissions).
* An entry point to SuperDock integration best practices (direct links below).

:::

## Why choose the DJI Cloud API

* **Lower migration cost**: The interface is unified and the ecosystem is mature. After becoming compatible with this interface, customers can reuse their existing systems and experience without relearning, greatly reducing development and training costs.
* **Improve system compatibility**: Through a standardized interface, SuperDock can be managed in a unified way alongside DJI devices, supporting hybrid deployment, simplifying the integration process, and ensuring stability and flexibility.

---

## Disclaimer and usage notes

> This document is based on the **Cloud API Demo** project and is provided for technical reference and learning only. The examples are not equivalent to a production-grade solution; be sure to complete a **security assessment and audit** before going live.

* **Technical reference**: The example code and configurations in this document are reference implementations derived from and extending the open-source Demo, and do not constitute a production-grade solution.
* **Security notice**: The Demo may contain security risks (such as data exposure, insufficient authentication, etc.). Do not expose it directly on the public internet; if external access is required, harden it (network isolation, least privilege, WAF, audit logs, etc.).
* **Compatibility**: The compatibility between SuperDock and the Cloud API **Demo** is verified against the current version. Changes to device firmware and API versions may affect the results, so perform thorough regression testing before formal deployment.
* **Disclaimer**: **SuperDock Innovation and its associated personnel assume no liability** for any business interruption, data loss, security incident, third-party claim, equipment damage, or other consequences arising from referencing this document.

> Production recommendation: develop in an isolated environment → professional security audit → backup and recovery plan → monitoring and alerting → continuous patch updates.

---

## Prerequisites

* A Linux cloud server (Ubuntu 20.04+ recommended, 16.04 also works) or a local Linux/Mac environment.
* **Docker** and **Docker Compose**

    * Installation guides:

        * Docker: [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/)
        * Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)
* (For source build scenarios) **Java 11+**, **Node.js 17.8**, **Nginx 1.20.2**, etc.

:::caution Ports and networking

* Ports required: `1883/8883/18083` (EMQX), `3306` (MySQL), `6379` (Redis), `9000/9001` (MinIO), `1935/1985/8080/8000` (SRS).
* Compose creates a `192.168.6.0/24` bridge network by default; make sure it does not conflict with your existing network.
  :::

---

## Get the sample package

* Download the packaged resources directly (includes images and sample files):

  **[Download the source package](https://terra-sz-hc1pro-cloudapi.oss-cn-shenzhen.aliyuncs.com/c0af9fe0d7eb4f35a8fe5b695e4d0b96/docker/cloud_api_sample_docker.zip)**

After extracting `cloud_api_sample_docker.zip`, you will see a directory structure similar to the following:

```text
root@server:~/djicloud/cloud_api_sample# ls
cloud_api_sample_docker_v1.10.0.tar  docker-compose.yml  update_backend.sh
data                                 source              update_front.sh
```

> Note: The directory names may vary slightly between versions. The core files include `docker-compose.yml`, `data/` (data persistence), `source/` (source code and SQL location), and the prepackaged image tar.

---

## Start the dependency services (Docker Compose)

1) Replace `docker-compose.yml` with the following content:

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
      - EMQX_ALLOW_ANONYMOUS=true # Local/demo environment only!
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
      - /etc/localtime:/etc/localtime
      - ./data/mysql:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=root
    hostname: cloud_api_sample_mysql

  redis:
    image: redis:6.2
    restart: always
    hostname: cloud_api_sample_redis
    ports:
      - "6379:6379"
    networks:
      - cloud_service_bridge
    command: ["redis-server"]

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
    command: ["server", "/data", "--console-address", ":9001"]
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
      - CANDIDATE=【Replace with the server's externally reachable IP】
    command: ["objs/srs", "-c", "conf/rtmp2rtc.conf"]
    restart: always

networks:
  cloud_service_bridge:
    driver: bridge
    ipam:
      config:
        - subnet: 192.168.6.0/24
```

2) Start:

```bash
sudo docker compose up -d
```

3) Verify that the services are ready:

```bash
sudo docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
```

You should see `emqx` / `mysql` / `redis` / `minio` / `sd.srsdemo` all in the `Up` state.

:::tip Common checkpoints

* `CANDIDATE` must be an IP at which SRS can be reached from the external network/devices (or a genuinely reachable IP in an intranet joint-debugging environment).
* `EMQX_ALLOW_ANONYMOUS=true` is for the development stage only; in production, be sure to disable anonymous access and integrate authentication.
* If a port is already in use, first check for existing services on the host or adjust the mapped port.
  :::

---

## Import the sample database (cloud_sample.sql)

1) Locate the SQL file:

```text
source/backend_service/sql/cloud_sample.sql
```

2) Import the data into the MySQL instance inside the container:

```bash
sudo docker exec -i cloud_api_sample-mysql-1 \
  mysql -uroot -proot < source/backend_service/sql/cloud_sample.sql
```

> If your current directory is not the project root, replace the path to `cloud_sample.sql` with your actual path.

3) Verify that the database was created successfully:

```bash
sudo docker exec -it cloud_api_sample-mysql-1 \
  mysql -uroot -proot -e "SHOW DATABASES LIKE 'cloud_sample';"
```

Example of normal output:

```text
+-------------------------+
| Database (cloud_sample) |
+-------------------------+
| cloud_sample            |
+-------------------------+
```

---

## Source code retrieval and secondary development

The Demo uses a separated frontend and backend: the frontend uses **TS + Vue3**, and the backend uses **Java 11+ / Spring Boot**. We recommend first getting the dependencies running as described above, then pulling the source code for secondary development.

**Frontend requirements**: TypeScript / HTML / CSS, Vue 3.x, Node.js (npm/yarn), Ant Design Vue v2, HTTP/WebSocket, Nginx (for deployment).

**Backend requirements**: Java 11+, Spring Boot, MQTT, MySQL, WebSocket, Redis.

**Reference versions**:

* Linux: Ubuntu 20.04+
* Java: OpenJDK 11+
* MySQL: 8.0.26
* EMQX: 4.4.0
* Redis: 6.2
* Nginx: 1.20.2
* Vue: 3.0.5
* Node.js: 17.8

**Technical support and resources**:

* **SuperDock Innovation official website**: [https://sb.im/](https://sb.im/)
* **Cloud API documentation**: [https://developer.dji.com/doc/cloud-api-tutorial/cn/](https://developer.dji.com/doc/cloud-api-tutorial/cn/)
* **Open-source backend**: [https://github.com/dji-sdk/DJI-Cloud-API-Demo](https://github.com/dji-sdk/DJI-Cloud-API-Demo)
* **Open-source frontend**: [https://github.com/dji-sdk/Cloud-API-Demo-Web](https://github.com/dji-sdk/Cloud-API-Demo-Web)

> If you need to build custom images, refer to the `update_backend.sh` / `update_front.sh` scripts in the repository.

---

## Viewing logs

**Common log locations and example commands**:

```bash
# Application logs
tail -f logs/cloud-api-demo.log

# MQTT connection logs
grep "MQTT" logs/cloud-api-demo.log

# Device registration logs
grep "thing.register" logs/cloud-api-demo.log

# Error logs
grep "ERROR" logs/cloud-api-demo.log
```

---

## Next step: Integrate SuperDock devices

* If you only want to get the Demo running first, you are basically done here ✅.
* If you want the Demo to correctly recognize and manage the **SuperDock series of Docks**, continue to the next article:

👉 **[Quickly integrate SuperDock devices](./superdock)**

---
