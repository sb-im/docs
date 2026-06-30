---
id: superdock
title: Quickly Integrate SuperDock Devices
sidebar_label: Quickly Integrate SuperDock Devices
sidebar_position: 2
description: Extend the DJI Cloud API Demo to recognize SuperDock series Docks and related onboard/payload devices.
---

# Quickly Integrate SuperDock Devices

## Overview

The **SuperDock** series of automated Docks is fully compatible with the DJI Cloud API standard. To enable the Cloud API Demo to correctly recognize and manage different SuperDock models, you need to extend the **device enums, gateway types, device types, version mappings, state/OSD routing, and database dictionary**. This article provides the **minimal set of changes** and **copy-paste code snippets**.

You can refer to the commit in the [SuperDock GitHub repository](https://github.com/sb-im/DJI-Cloud-API-Demo/commit/740ef22f1bbb8d6bbc67534caf5e5fef73d86bf3) that adapts the DJI Cloud API Demo. The following is a brief description of the content that needs to be added.

## Device Identification (domain/type/sub_type)

SuperDock uses the standard DJI triple for identification:

```java
public class DeviceIdentification {
    private int domain;   // Device domain: 0=drone, 1=payload, 2=remote controller, 3=Dock
    private int type;     // Device type: 88097-88103 are the SuperDock series
    private int sub_type; // Subtype: variants within the same series
    // Example: S2301 => domain=3, type=88099, sub_type=0
}
```

For the complete device list, see [Device Types and Models](../cloud-api/device-types).

## The 9 Code Changes You Need to Make

### 1) Device Enum Extension (`DeviceEnum.java`)

**Add M4 series drones**:

```java
// M4 series drones - for SuperDock S24M4
M4D(DeviceDomainEnum.DRONE, DeviceTypeEnum.M4D, DeviceSubTypeEnum.ZERO),
M4TD(DeviceDomainEnum.DRONE, DeviceTypeEnum.M4TD, DeviceSubTypeEnum.ZERO),
M4E(DeviceDomainEnum.DRONE, DeviceTypeEnum.M4E, DeviceSubTypeEnum.ZERO),
M4T(DeviceDomainEnum.DRONE, DeviceTypeEnum.M4T, DeviceSubTypeEnum.ZERO),
```

**Add H30 series cameras/payloads**:

```java
// H30 series cameras and L2 LiDAR
H30(DeviceDomainEnum.PAYLOAD, DeviceTypeEnum.H30, DeviceSubTypeEnum.ZERO),
H30T(DeviceDomainEnum.PAYLOAD, DeviceTypeEnum.H30T, DeviceSubTypeEnum.ZERO),
L2(DeviceDomainEnum.PAYLOAD, DeviceTypeEnum.L2, DeviceSubTypeEnum.ZERO),
```

**Fix type mappings** (resolving historical mixed-use issues):

```java
// Fix the M30 series type mapping: split the mixed-use M30_OR_M3T_CAMERA into independent types
M30(DeviceDomainEnum.DRONE, DeviceTypeEnum.M30, DeviceSubTypeEnum.ZERO),
M30T(DeviceDomainEnum.DRONE, DeviceTypeEnum.M30T, DeviceSubTypeEnum.ONE),
M3T_CAMERA(DeviceDomainEnum.PAYLOAD, DeviceTypeEnum.M3T_CAMERA, DeviceSubTypeEnum.ZERO),
```

> **Why fix the type mappings?**
> Historically, `M30_OR_M3T_CAMERA` was shared by multiple devices, leading to inaccurate device identification. It is now split into independent `M30`, `M30T`, and `M3T_CAMERA` types, giving each device a clear type identifier, avoiding conflicts and improving the maintainability of the system.

### 2) SuperDock Gateway Types (`GatewayTypeEnum.java`)

```java
// SuperDock series Dock devices S22M300(DeviceEnum.S22M300, "SuperDock S22M300"),
S2201(DeviceEnum.S2201,   "SuperDock S2201"),
S2301(DeviceEnum.S2301,   "SuperDock S2301"),
S24M350(DeviceEnum.S24M350,   "SuperDock S24M350"),
S24M350S(DeviceEnum.S24M350S, "SuperDock S24M350S"),
S24M3(DeviceEnum.S24M3,   "SuperDock S24M3"),
S24M4(DeviceEnum.S24M4,   "SuperDock S24M4"),
```

### 3) Device Type Dictionary (`DeviceTypeEnum.java`)

```java
// M4 series drones (note: M4E=99, M4D=100; sub_type distinguishes different models)
M4E(99,  "M4E drone"),        // M4E base version
M4T(99,  "M4T drone"),        // M4T thermal version (same type, sub_type=1)
M4D(100, "M4D drone"),        // M4D base version
M4TD(100, "M4TD drone"),      // M4TD thermal version (same type, sub_type=1)

// Next-generation payloads
H30(82, "H30 hybrid zoom camera"),
H30T(83, "H30T thermal camera"),
L2(84,  "L2 LiDAR"),

// SuperDock Docks
S22M300(88097, "SuperDock S22M300"),
S2201(88098,   "SuperDock S2201"),
S2301(88099,   "SuperDock S2301"),
S24M350(88100, "SuperDock S24M350"),
S24M350S(88101, "SuperDock S24M350S"),
S24M3(88102,   "SuperDock S24M3"),
S24M4(88103,   "SuperDock S24M4"),
```

### 4) Thing/SDK Version Mapping

**`DroneThingVersionEnum.java`**:

```java
V2_1_2("2.1.2", CloudSDKVersionEnum.V1_0_3),
V2_2_0("2.2.0", CloudSDKVersionEnum.V1_0_3),
```

**`GatewayThingVersion.java`** (or its equivalent):

```java
SUPERDOCK_V1_0_0("1.0.0", CloudSDKVersionEnum.V1_0_3),
SUPERDOCK_V1_1_0("1.1.0", CloudSDKVersionEnum.V1_0_3),
```

### 5) Property Set Routing (`PropertySetEnum.java`)

All Dock property settings need to support the SuperDock series. Add all SuperDock types to the `Set.of()` of each property enum:

```java
// Example: night lights state setting
NIGHT_LIGHTS_STATE("night_lights_state", NightLightsStateSet.class, CloudSDKVersionEnum.V0_0_1,
    Set.of(GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2,
           GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201, GatewayTypeEnum.S2301,
           GatewayTypeEnum.S24M350, GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3, GatewayTypeEnum.S24M4)),

// SuperDock support needs to be added for all of the following properties:
// HEIGHT_LIMIT, DISTANCE_LIMIT_STATUS, OBSTACLE_AVOIDANCE, RTH_ALTITUDE,
// OUT_OF_CONTROL_ACTION, EXIT_WAYLINE_WHEN_RC_LOST, THERMAL_* series,
// USER_EXPERIENCE_IMPROVEMENT, COMMANDER_* series, SILENT_MODE, etc.
```

**Note**: Some properties are only supported on specific models, for example:
- `RTH_MODE` and `OFFLINE_MAP_ENABLE` are only supported on DOCK2 and S2201
- `SILENT_MODE` is not supported on S2201 (because it is based on the DOCK2 architecture)

### 6) OSD Data Routing (`OsdDeviceTypeEnum.java`)

Dock OSD data needs to be routed to all SuperDock types:

```java
DOCK(true, OsdDock.class, ChannelName.INBOUND_OSD_DOCK,
     GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2,
     GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201, GatewayTypeEnum.S2301,
     GatewayTypeEnum.S24M350, GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3, GatewayTypeEnum.S24M4),

DOCK_DRONE(false, OsdDockDrone.class, ChannelName.INBOUND_OSD_DOCK_DRONE,
           GatewayTypeEnum.DOCK, GatewayTypeEnum.DOCK2,
           GatewayTypeEnum.S22M300, GatewayTypeEnum.S2201, GatewayTypeEnum.S2301,
           GatewayTypeEnum.S24M350, GatewayTypeEnum.S24M350S, GatewayTypeEnum.S24M3, GatewayTypeEnum.S24M4),
```

### 7) Dock Live Error Status (`DockLiveErrorStatus.java`)

Fix the default-value handling for the success status to avoid a null pointer exception:

```java
@JsonCreator
public DockLiveErrorStatus(int code) {
    this.success = MqttReply.CODE_SUCCESS == code;
    if (MqttReply.CODE_SUCCESS == code) {
        // Use default values for the success status
        this.source = ErrorCodeSourceEnum.DOCK;
        this.errorCode = LiveErrorCodeEnum.SUCCESS;
        return;
    }
    this.source = ErrorCodeSourceEnum.find(code / MOD);
    this.errorCode = LiveErrorCodeEnum.find(code % MOD);
}
```

### 8) Dock Live Status Service (`SDKDeviceService.java`)

Add handling logic for Dock live status updates:

```java
@Override
public void dockLiveStatusUpdate(TopicStateRequest<DockLiveStatus> request, MessageHeaders headers) {
    String from = request.getFrom();
    DockLiveStatus liveStatus = request.getData();

    // Check whether the device is online
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

    // Push the live status to the web client via WebSocket
    deviceService.pushOsdDataToWeb(device.getWorkspaceId(), BizCodeEnum.DEVICE_OSD, from, liveStatus);
}
```

### 9) State Routing Validation (`StateRouter.java`)

Confirm that the state routing already includes all SuperDock types:

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

## Database Configuration (Dictionary Table + Initialization)

### Device Dictionary Table Structure

```sql
CREATE TABLE `manage_device_dictionary` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'Primary key',
  `device_name` varchar(255) NOT NULL COMMENT 'Device name',
  `device_type` int NOT NULL COMMENT 'Device type',
  `sub_type` int NOT NULL DEFAULT '0' COMMENT 'Device subtype',
  `domain` int NOT NULL COMMENT 'Device domain',
  `device_desc` varchar(500) DEFAULT NULL COMMENT 'Device description',
  `create_time` bigint DEFAULT NULL COMMENT 'Creation time',
  `update_time` bigint DEFAULT NULL COMMENT 'Update time',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_device_type` (`device_type`,`sub_type`,`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Device type dictionary table';
```

### Insert Script for SuperDock and Supporting Devices

```sql
-- SuperDock series Docks
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('SuperDock S22M300', 88097, 0, 3, 'S22M300 Dock'),
('SuperDock S2201', 88098, 0, 3, 'S2201 Dock'),
('SuperDock S2301', 88099, 0, 3, 'S2301 Dock'),
('SuperDock S24M350', 88100, 0, 3, 'M350 Dock 2024 version'),
('SuperDock S24M350S', 88101, 0, 3, 'M350 battery-swap Dock 2024 version'),
('SuperDock S24M3', 88102, 0, 3, 'M3 Dock 2024 version'),
('SuperDock S24M4', 88103, 0, 3, 'M4 Dock 2024 version')
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  device_desc = VALUES(device_desc),
  update_time = CURRENT_TIMESTAMP;

-- M4 series drones (note type numbers: M4E/M4T=99, M4D/M4TD=100)
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('M4E', 99, 0, 0, 'M4E drone'),
('M4T', 99, 1, 0, 'M4T drone'),
('M4D', 100, 0, 0, 'M4D drone'),
('M4TD', 100, 1, 0, 'M4TD drone')
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  device_desc = VALUES(device_desc),
  update_time = CURRENT_TIMESTAMP;

-- H30 series payloads
INSERT INTO manage_device_dictionary (device_name, device_type, sub_type, domain, device_desc) VALUES
('H30', 82, 0, 1, 'H30 hybrid zoom camera, next-generation imaging payload'),
('H30T', 83, 0, 1, 'H30T thermal camera, integrating visible light and thermal imaging'),
('L2', 84, 0, 1, 'L2 LiDAR, high-precision 3D measurement')
ON DUPLICATE KEY UPDATE
  device_name = VALUES(device_name),
  device_desc = VALUES(device_desc),
  update_time = CURRENT_TIMESTAMP;
```

---

## Frequently Asked Questions (Troubleshooting)

### 1) Device fails to come online

**Symptom**: The device cannot come online; the log indicates that the device type is not supported; no status is displayed on the front end.

**Typical log**:

```text
ERROR: Unsupported device type: S2301
```

**Troubleshooting steps**:

1. **Verify the gateway enum**: `GatewayTypeEnum` contains all SuperDock models.
2. **Check the device dictionary**:

   ```sql
   SELECT * FROM manage_device_dictionary
   WHERE device_type = 88099 AND sub_type = 0 AND domain = 3;
   ```

3. **Validate the MQTT registration message**:

   ```json
   {
     "bid": "...",
     "data": {
       "domain": 3,
       "type": 88099,
       "sub_type": 0,
       "device_secret": "device_secret",
       "nonce": "nonce",
       "version": "1.0.0",
       "sub_devices":[]
     },
     "tid": "...",
     "timestamp": 1234567890123,
     "method": "update_topo"
   }
   ```

### 2) Binding status query fails

**Error**:

```text
Error Code: 210002, Error Msg: Invalid parameter.. bindStatus[1].organizationName must not be null
```

**Cause**: A missing device record causes required fields such as organization/callsign to be null.

**Solution**: Populate the device and workspace data.

```sql
-- Device record
INSERT INTO manage_device (
    device_sn, device_name, nickname, workspace_id,
    device_type, sub_type, domain, bound_status,
    create_time, update_time, bound_time
) VALUES (
    'dock-uuid', 'SuperDock S2301', 'SuperDock S2301', 'xx-uuid',
    88099, 0, 3, 1,
    UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000
);

-- Workspace
INSERT INTO manage_workspace (
    workspace_id, workspace_name, organization_name,
    create_time, update_time
) VALUES (
    'xx-uuid', 'SuperDock Test Workspace', 'Strawberry Innovation',
    UNIX_TIMESTAMP()*1000, UNIX_TIMESTAMP()*1000
);
```

### 3) State routing fails

**Error**:

```text
Error Code: 220001, Error Msg: Data exceeds limit.. Unexpected value: S2301
```

**Cause**: `StateRouter.getTypeReference()` does not cover the new Dock types.

**Solution**: Add the missing `switch` branches following the example above.

### 4) Version compatibility error

**Error**:

```text
CloudSDKVersionException: The current CloudSDK version(1.0.3) does not support this thing version(2.1.2)
```

**Cause**: `DroneThingVersionEnum` does not include the `thing version` reported by the device.

**Solution**: Complete the enum as described in the "Thing/SDK Version Mapping" section (e.g., `2.1.2`, `2.2.0`).

### 5) Property setting fails

**Error**:

```text
Error Code: 400001, Error Msg: Property not supported for this device type
```

**Cause**: Some properties in `PropertySetEnum` do not include the SuperDock types.

**Solution**: Check the supported-device list for the property setting and make sure it includes the required SuperDock models.

### 6) OSD data reception error

**Symptom**: The front end cannot display the Dock status; OSD data routing fails.

**Troubleshooting**:

1. Check whether `OsdDeviceTypeEnum.DOCK` includes all SuperDock types
2. Verify the WebSocket connection and data push logic
3. Confirm that the device workspace configuration is correct

### 7) Live streaming malfunction

**Error**:

```text
NullPointerException in DockLiveErrorStatus
```

**Cause**: The success status code does not handle default values correctly.

**Solution**: Ensure the `DockLiveErrorStatus` constructor includes default-value handling logic for the success status.

---

> Congratulations! You now have a complete path from getting started with the Cloud API Demo to extending support for SuperDock devices. This article covers 8 key changes: device identification, enum extension, routing configuration, property settings, OSD data, live streaming, and more. We recommend treating this article as a "get-it-running manual + troubleshooting notes" and continuously updating it based on your actual deployment.
