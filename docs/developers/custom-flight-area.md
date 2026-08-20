---
id: custom-flight-area
title: 自定义飞行区接入指南
sidebar_label: 自定义飞行区接入指南
sidebar_position: 3
description: 介绍 M400 和 M4 自定义飞行区的文件格式、云端同步与状态上报。
---

# 自定义飞行区接入指南

:::info 当前支持范围

自定义飞行区目前仅支持 M400 和 M4 机型，暂不支持禁降区。

:::

自定义飞行区也常被称为“电子围栏”，用于限制无人机的作业范围。在园区、巡检或敏感区域场景中，可以通过自定义飞行区规定飞行器允许进入或必须避开的区域。

自定义飞行区包含两种区域类型：

| 类型 | 协议值 | 作用 |
| --- | --- | --- |
| 自定义作业区 | `dfence` | 飞行器只能在区域内作业，不能飞出边界 |
| 自定义限飞区 | `nfz` | 飞行器可以在区域外作业，但不能进入该区域 |

M400 和 M4 使用兼容上云 API 的自定义飞行区文件与同步流程。具体飞行行为及固件要求，请以对应产品与固件版本的说明为准。

:::info 飞行器的边界行为

- 返航 / 指点飞行遇到限飞区：无人机会自动绕行，继续任务。
- 执行航线任务时靠近边界：任务会自动中断，无人机随即返航。
- 手动操控（虚拟摇杆）靠近边界：无人机会自动悬停，再怎么推杆也过不去。

规划航线时，应始终为边界保留足够的安全余量，不能将自动绕行作为唯一安全保障。

不同机型 / 固件可能会有区别，请务必以实测为准。

:::

完整接入可以分为三个阶段：

1. 绘制作业区和限飞区，生成飞行区文件。
2. 托管文件并通过上云 API 同步到机场。
3. 处理机场上报的同步状态和飞行区距离信息。

## 1. 生成飞行区文件

### 1.1 文件结构

自定义飞行区文件采用 GeoJSON `FeatureCollection`。同一项目的作业区和限飞区应合并到同一个文件中。

下面的示例包含一个圆形作业区和一个多边形限飞区。为了便于阅读，示例进行了格式化；生产环境建议使用稳定排序、紧凑且无 BOM 的 UTF-8 JSON，以保证摘要计算结果可重复。

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "id": "9b860a40-0096-4ab4-b3f8-8bfc0689c00b",
      "type": "Feature",
      "geofence_type": "dfence",
      "geometry": {
        "type": "Point",
        "coordinates": [114.2245, 22.6857]
      },
      "properties": {
        "subType": "Circle",
        "radius": 198,
        "enable": true
      }
    },
    {
      "id": "0d14f28c-c147-4bd0-9107-496923f9f2ca",
      "type": "Feature",
      "geofence_type": "nfz",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [114.2253, 22.6872],
          [114.2259, 22.6869],
          [114.2256, 22.6865],
          [114.2251, 22.6868],
          [114.2253, 22.6872]
        ]]
      },
      "properties": {
        "radius": 0,
        "enable": true
      }
    }
  ]
}
```

关键字段如下：

| 字段 | 说明 |
| --- | --- |
| `id` | 区域的稳定唯一 ID，建议使用 UUID；机场通过该字段引用对应区域 |
| `geofence_type` | `dfence`（作业区）或 `nfz`（限飞区） |
| `geometry.type` | 圆形使用 `Point`，多边形使用 `Polygon` |
| `properties.subType` | 圆形必须为 `Circle`；多边形不包含该字段 |
| `properties.radius` | 圆形半径，单位为米；多边形填写 `0` |
| `properties.enable` | 当前协议使用 `true`；不需要的区域应从文件中移除 |
| `coordinates` | WGS84 坐标，顺序为 `[经度, 纬度]`；多边形必须使用闭合外环 |

可以下载站点内的[自定义飞行区文件协议模板](/files/api-reference/custom-flight-area-template.json)。模板中的 `//` 注释仅用于解释字段，不属于合法 JSON，使用前需要移除。

### 1.2 几何与规划约束

生成文件前，建议至少完成以下校验：

- 多个作业区之间不能重叠；限飞区可以位于作业区内部。
- 多边形外环必须首尾闭合，至少包含 3 个不同顶点，且不能自相交。
- 多边形闭环后最多包含 255 个点，即最多 254 个不同顶点。
- 圆形半径不能小于 10 米。
- 坐标必须使用 WGS84。来自高德或腾讯地图的 GCJ-02 坐标、来自百度地图的 BD-09 坐标，必须先转换为 WGS84。
- 机场必须位于某个作业区内、所有限飞区外，并与边界保留安全距离。
- 每个区域的 `id` 必须保持稳定，不能在每次导出时重新生成。

:::caution 坐标系与安全余量

坐标系不一致会造成围栏整体偏移。对于使用 GCJ-02 或 BD-09 底图的业务系统，必须在生成文件前完成坐标转换。

按照 DJI 官方建议，航线应与飞行区边界保留至少 5 米余量；机场与作业区或限飞区边界建议保留 10 米以上余量。生产项目还应结合定位误差、飞行速度、风况和现场风险进一步增加余量。

:::

### 1.3 可视化绘制工具

草莓创新提供了可直接体验和复用的开源绘制工具：

- [在线体验](https://sb-im.github.io/demo-custom-flight-area/)
- [GitHub 源码](https://github.com/sb-im/demo-custom-flight-area)
- [Gitee 镜像](https://gitee.com/sb-im/demo-custom-flight-area)

该工具支持圆形和多边形绘制、区域校验、示例加载，以及 `geofence_{md5}.json` 文件的导入和导出。生成的文件已在 SuperDock M400 上验证可用。

项目按职责划分为三层，可以根据业务需要选择性复用：

| 接入目标 | 参考文件 | 运行时依赖 |
| --- | --- | --- |
| 构建或解析飞行区文件 | `types.ts`、`geometry.ts`、`validation.ts`、`geofenceFile.ts`、`hash.ts` | 无第三方依赖，可用于 React、Vue 或 Node.js |
| 增加地图绘制 | 上述文件，以及 `draw.ts`、`render.ts`、`viewer.ts` | Cesium |
| 参考完整界面 | 上述文件，以及 `main.ts`、`index.html`、`style.css` | 浏览器 DOM、Cesium |

:::note 工具边界

绘制工具只负责区域绘制、校验以及文件导入和导出，不包含账号、后端、对象存储、MQTT 或设备同步逻辑。设备同步仍需按照下文实现。

:::

## 2. 将文件同步到机场

### 2.1 同步流程

云端不能直接把文件内容推送给机场。标准流程是：云端通知机场存在新版本，由机场通过 `flight_areas_get` 主动获取文件信息并下载文件。

| 顺序 | Topic 方向 | Method | 说明 |
| --- | --- | --- | --- |
| 1 | 云端内部 | — | 构建飞行区文件并上传至 OSS、S3 或 MinIO 等对象存储 |
| 2 | 云端 → 机场 | `flight_areas_update` | 通知机场检查最新飞行区文件 |
| 3 | 机场 → 云端 | `flight_areas_get` | 机场请求最新文件信息 |
| 4 | 云端 → 机场 | `flight_areas_get` 回复 | 返回文件名、下载 URL、SHA-256 和文件大小 |
| 5 | 机场 → 云端 | `flight_areas_sync_progress` | 持续上报同步状态和最终结果 |

完整时序可参阅[自定义飞行区功能说明](../api-reference/dock-feature-set/custom-flight-area)，接口字段可参阅[自定义飞行区接口](../api-reference/superdock-hangar/custom-flight-area)。

### 2.2 文件名、摘要与大小

文件信息中存在三个容易混淆的值：

| 字段 | 计算方式 |
| --- | --- |
| 文件名 | `geofence_{fileMD5}.json`，其中 `fileMD5` 是最终文件字节的 MD5 |
| `files[].checksum` | 最终文件字节的 SHA-256，不是文件名中的 MD5 |
| `files[].size` | 最终文件的字节数 |

:::warning 必须基于同一份最终文件计算

MD5、SHA-256 和文件大小必须基于上传到对象存储的同一组字节计算。修改空白、字段顺序、换行、编码或 BOM 后，都需要重新计算。

如果 MD5 与 SHA-256 混用，机场可能重复下载文件，或通过 `flight_areas_sync_progress` 上报 `reason = 12`（checksum 校验失败）。

:::

建议按照区域 `id` 排序，并使用稳定的紧凑序列化方式生成文件。这样在区域语义未发生变化时，可以生成完全相同的字节、摘要和文件名，避免不必要的重复同步。

对象存储的下载 URL 必须能够被机场网络访问，并为下载、重试和飞行器开机过程预留充足的有效时间。

### 2.3 响应 `flight_areas_get`

机场通过以下 Topic 请求飞行区文件：

- Topic：`thing/product/{gateway_sn}/requests`
- Method：`flight_areas_get`

云端通过 `thing/product/{gateway_sn}/requests_reply` 返回结果。存在飞行区文件时，示例如下：

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flight_areas_get",
  "data": {
    "result": 0,
    "output": {
      "files": [
        {
          "name": "geofence_ada784c65e1a9455089486be7e6db5d8.json",
          "url": "https://example.com/geofence.json?signature=...",
          "checksum": "<文件 SHA-256>",
          "size": 500
        }
      ]
    }
  }
}
```

需要明确区分以下三种业务语义：

| 场景 | `data` 返回值 | 语义 |
| --- | --- | --- |
| 项目存在飞行区 | `{"result":0,"output":{"files":[{...}]}}` | 使用指定文件 |
| 显式清空飞行区 | `{"result":0,"output":{"files":[]}}` | 删除飞行器上的全部自定义飞行区 |
| 平台未接管该项目的飞行区 | `{"result":0}` | 不干预当前飞行区 |

:::danger 不要混淆“清空”与“未接管”

`files: []` 是明确的清空指令。如果平台尚未接管某个项目的飞行区，不应默认返回空数组，否则可能删除其他平台已经同步到飞行器的区域。

:::

即使平台暂时不使用自定义飞行区，也建议正确响应 `flight_areas_get` 和 `offline_map_get`。部分旧版机场固件会在任务前等待这两个请求的回复，未回复可能增加约 40 秒等待时间。对于不接管相关数据的平台，可以返回 `{"data":{"result":0}}`。

### 2.4 主动通知机场更新

当用户保存区域后需要立即同步，可以下发 `flight_areas_update`：

- Topic：`thing/product/{gateway_sn}/services`
- Method：`flight_areas_update`
- `data`：`null`

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flight_areas_update",
  "data": null
}
```

机场在 `services_reply` 中返回 `result = 0`，只表示更新请求已受理。最终是否同步成功，仍应以 `flight_areas_sync_progress` 为准。

下发前建议确认：

- 机场在线且处于空闲状态。
- 飞行器位于机场内。
- 当前没有正在执行或等待执行的任务。
- 对象存储文件已上传完成，下载 URL 可用。

### 2.5 任务前安全预检查

下发 `flighttask_prepare` 时，可以启用 `flight_safety_advance_check`：

```json
{
  "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "file": {
    "url": "https://example.com/mission.kmz",
    "fingerprint": "..."
  },
  "flight_safety_advance_check": 1
}
```

该字段为可选字段，默认值为 `0`。设置为 `1` 后，飞行器会在执行任务前检查自身飞行区文件是否与云端一致；不一致时拉取最新文件，一致时不重复处理。完整字段定义参阅[航线任务接口](../api-reference/superdock-hangar/wayline)。

需要注意：

1. `flight_safety_advance_check` 必须显式设置为 `1` 才会启用。
2. 该功能仍依赖 `flight_areas_get` 和文件托管，不能代替云端请求应答。
3. 一致性检查发生在任务流程内、飞行器实际离地前；不同机型和协议版本的 `current_step` 编号可能不同，应按对应接口文档解析。
4. `flight_areas_update` 是可选的提前同步手段，任务前安全预检查是起飞前的兜底机制。

推荐的产品流程如下：

```text
保存区域修改
  → 后端自动重建并上传飞行区文件
  → 可选：用户触发“立即同步”
  → 任务实际执行前再次确认云端文件为最新版本
  → flighttask_prepare(flight_safety_advance_check = 1)
  → 机场在飞行器离地前完成一致性检查
```

对于定时任务和条件任务，应在任务实际执行时重新检查云端文件，避免任务创建后飞行区发生变化。

## 3. 处理机场状态与告警

### 3.1 同步状态 `flight_areas_sync_progress`

机场通过以下事件上报同步状态：

- Topic：`thing/product/{gateway_sn}/events`
- Method：`flight_areas_sync_progress`
- `need_reply`：`1`，云端必须通过 `events_reply` 返回 `{"result":0}`

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 16540709686556,
  "method": "flight_areas_sync_progress",
  "need_reply": 1,
  "data": {
    "status": "synchronized",
    "reason": 0,
    "file": {
      "name": "geofence_xxx.json",
      "checksum": "<文件 SHA-256>"
    }
  }
}
```

`status` 的取值如下：

| 值 | 含义 |
| --- | --- |
| `wait_sync` | 待同步 |
| `synchronizing` | 同步中 |
| `synchronized` | 已同步 |
| `fail` | 同步失败 |
| `switch_fail` | 使能开关失败 |

`reason = 0` 表示正常，其他返回码可用于排查同步问题：

| 返回码 | 含义 |
| --- | --- |
| `1` | 解析云端返回的文件信息失败 |
| `2` | 获取飞行器端文件信息失败 |
| `3` | 从云端下载文件失败 |
| `4` | 链路翻转失败 |
| `5` | 传输文件失败 |
| `6` | disable 失败 |
| `7` | 删除自定义飞行区失败 |
| `8` | 飞行器端加载作业区域数据失败 |
| `9` | enable 失败 |
| `10` | 机场增强图传无法关闭，作业区域数据同步失败 |
| `11` | 飞行器开机失败，无法同步作业区域数据 |
| `12` | checksum 校验失败 |
| `13` | 同步异常超时 |

排障时，可以优先按以下方向检查：

- `reason = 1` 或 `3`：检查返回结构、下载 URL、网络可达性和 URL 有效期。
- `reason = 11`：检查飞行器开机与机场状态。
- `reason = 12`：确认 SHA-256、文件内容和实际上传字节完全一致。

### 3.2 状态存储建议

建议将云端意图、已发布文件和设备实际上报分开存储：

| 状态 | 含义 |
| --- | --- |
| `desired_deployment` | 根据当前启用区域计算出的期望文件 |
| `deployment` | `flight_areas_get` 当前实际对外提供的文件 |
| 设备同步状态 | 机场通过 `flight_areas_sync_progress` 上报的原始状态 |

只有在文件名与 SHA-256 完全一致，同时满足 `status = synchronized`、`reason = 0` 时，界面才应显示为“已同步”。

对于中间状态，建议至少区分：

- `draft_changed`：区域草稿已变化，但云端文件尚未成功发布。
- `file_mismatch`：云端文件已更新，但机场仍在使用旧版本。

### 3.3 飞行区距离 `flight_areas_drone_location`

飞行器运行过程中，机场通过以下事件上报飞行器与区域边界的关系：

- Topic：`thing/product/{gateway_sn}/events`
- Method：`flight_areas_drone_location`
- `need_reply`：`0`

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 16540709686556,
  "method": "flight_areas_drone_location",
  "need_reply": 0,
  "data": {
    "drone_locations": [
      {
        "area_id": "d275c4e1-d864-4736-8b5d-5f5882ee9bdd",
        "area_distance": 100.11,
        "is_in_area": true
      }
    ]
  }
}
```

| 字段 | 说明 |
| --- | --- |
| `area_id` | 区域唯一 ID，对应飞行区文件中的 `id` |
| `area_distance` | 飞行器与区域边界的距离，单位为米 |
| `is_in_area` | 飞行器是否位于该区域内 |

因此，区域 `id` 必须保持稳定。否则平台无法把设备上报关联到地图中的具体区域。

:::note 真机兼容提示

部分 DJI Dock 2 固件可能上报数据库中 36 字符 UUID 的 35 字符前缀。匹配 `area_id` 时，可以兼容“完整 UUID 精确相等”和“已知的单字符截断”两种情况，但不建议进行不受约束的前缀匹配。

:::

可以基于这条事件实现：

- 在地图上展示飞行器与各飞行区的实时位置关系。
- 对靠近边界的飞行器生成告警。
- 使用不同的触发阈值和解除阈值形成迟滞，避免飞行器在阈值附近移动时频繁触发和解除告警。
- 结合航线任务结果与错误码进行事后归因。

常见相关错误码如下，最终含义请以设备固件及[错误码文档](../cloud-api/error-codes)为准：

| 错误码 | 含义 |
| --- | --- |
| `321528` | 触碰自定义飞行区边界，航线任务已暂停；可能同时出现 `break_reason = 528` |
| `337546` | 已触碰自定义飞行区边界 |
| `338006` | 无法执行飞行任务，需要检查机场是否位于作业区外或限飞区内等情况 |
| `319028` | 正在更新自定义飞行区 |
| `325010` | 当前机场正在更新自定义飞行区，请稍后重试 |

## 参考资料

- [自定义飞行区功能说明](../api-reference/dock-feature-set/custom-flight-area)
- [自定义飞行区接口](../api-reference/superdock-hangar/custom-flight-area)
- [航线任务接口](../api-reference/superdock-hangar/wayline)
- [错误码文档](../cloud-api/error-codes)
- [自定义飞行区文件协议模板](/files/api-reference/custom-flight-area-template.json)
- [开源绘制 Demo](https://github.com/sb-im/demo-custom-flight-area)
