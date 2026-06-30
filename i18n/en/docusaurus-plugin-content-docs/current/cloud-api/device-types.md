---
sidebar_position: 1
---
# Device Types and Model List

This document provides a complete reference for all device types and models supported by DJI and SuperDock, including drones, payloads, remote controllers, and Dock devices.

## Device Type Description

Device types are identified by the following fields:

- `domain`: Device domain (0=drone, 1=payload, 2=remote controller, 3=Dock)
- `type`: Device type code
- `sub_type`: Device subtype code
- `node_type`: Node type (uav/camera/rc/dock)

## Drones (UAV) - Domain 0

| Model | Domain | Type | Sub Type | Full Name | Description                    |
|------|--------|------|----------|------|------------------------------|
| M400 | 0 | 103 | 0 | Matrice 400 | DJI Matrice 400                         |
| M350 | 0 | 89 | 0 | Matrice 350 RTK | DJI Matrice 350 RTK          |
| M300 | 0 | 60 | 0 | Matrice 300 RTK | DJI Matrice 300 RTK          |
| M30 | 0 | 67 | 0 | Matrice 30 | DJI Matrice 30               |
| M30T | 0 | 67 | 1 | Matrice 30T | DJI Matrice 30T              |
| M3E | 0 | 77 | 0 | Mavic 3 Enterprise | DJI Mavic 3 Enterprise       |
| M3T | 0 | 77 | 1 | Mavic 3 Thermal | DJI Mavic 3 Thermal          |
| M3M | 0 | 77 | 2 | Mavic 3 Multispectral | DJI Mavic 3 Multispectral    |
| M3TA | 0 | 77 | 3 | Mavic 3 Thermal Advanced | DJI Mavic 3 Thermal Advanced |
| M3D | 0 | 91 | 0 | Matrice 3D | DJI Matrice 3D               |
| M3TD | 0 | 91 | 1 | Matrice 3TD | DJI Matrice 3TD              |
| M4D | 0 | 100 | 0 | Matrice 4D | DJI Matrice 4D               |
| M4TD | 0 | 100 | 1 | Matrice 4TD | DJI Matrice 4TD              |
| M4E | 0 | 99 | 0 | Matrice 4E | DJI Matrice 4E               |
| M4T | 0 | 99 | 1 | Matrice 4T | DJI Matrice 4T               |

## Payload Devices (Camera) - Domain 1

### Professional Payloads

| Payload Name | Domain | Type | Sub Type | Description |
|------|--------|------|----------|------|
| Z30  | 1 | 20   | 0 | Z30  |
| XT2  | 1 | 26   | 0 | XT2  |
| XTS  | 1 | 41   | 0 | XTS  |
| H20  | 1 | 42   | 0 | H20  |
| H20T | 1 | 43   | 0 | H20T |
| H20N | 1 | 61   | 0 | H20N |
| H30  | 1 | 82   | 0 | H30  |
| H30T | 1 | 83   | 0 | H30T |
| L1   | 1 | 50   | 0 | L1   |
| L2   | 1 | 84   | 0 | L2   |
| P1   | 1 | 50   | 0 | P1   |
| L3   | 1 | 103  | 0 | L3   |

### Integrated Cameras

| Camera Name | Domain | Type | Sub Type | Description | Gimbal Position |
|----------|--------|------|----------|------|----------|
| M30 Camera | 1 | 52 | 0 | Matrice 30 integrated camera | Main gimbal (0) |
| M30T Camera | 1 | 53 | 0 | Matrice 30T integrated camera | Main gimbal (0) |
| M3E Camera | 1 | 66 | 0 | Mavic 3 Enterprise camera | Main gimbal (0) |
| M3T Camera | 1 | 67 | 0 | Mavic 3 Thermal camera | Main gimbal (0) |
| M3M Camera | 1 | 68 | 0 | Mavic 3 Multispectral camera | Main gimbal (0) |
| M3TA Camera | 1 | 129 | 0 | Mavic 3 Thermal Advanced camera | Main gimbal (0) |
| M3D Camera | 1 | 80 | 0 | Matrice 3D camera | Main gimbal (0) |
| M3TD Camera | 1 | 81 | 0 | Matrice 3TD camera | Main gimbal (0) |
| M4D Camera | 1 | 98 | 0 | Matrice 4D camera | Main gimbal (0) |
| M4TD Camera | 1 | 99 | 0 | Matrice 4TD camera | Main gimbal (0) |
| M4E Camera | 1 | 88 | 0 | Matrice 4E camera | Main gimbal (0) |
| M4T Camera | 1 | 89 | 0 | Matrice 4T camera | Main gimbal (0) |

### FPV Camera

| Camera Name | Domain | Type | Sub Type | Description | Gimbal Position |
|----------|--------|------|----------|------|----------|
| FPV | 1 | 39 | 0 | FPV camera | FPV position (7) |

### Auxiliary Camera

| Camera Name | Domain | Type | Sub Type | Description      | Gimbal Position |
|----------|--------|------|----------|---------|----------|
| Vision Assist | 1 | 176 | 0 | Drone Vision Assist | Auxiliary position (10000) |

### Other Payloads

| Payload Name | Domain | Type | Sub Type | Description |
|----------|--------|------|----------|------|
| PAYLOAD | 1 | 31 | 0 | Generic payload |
| DJI_MINI_3_PRO | 1 | 60 | 0 | Mini 3 Pro camera |
| DJI_MINI_3 | 1 | 76 | 0 | Mini 3 camera |
| Dock Camera | 1 | 165 | 0 | Dock camera |
| NOT_SUPPORTED | 1 | 65535 | 0 | Unsupported payload |

## Remote Controllers (RC) - Domain 2

| Remote Controller Name | Domain | Type | Sub Type | Description | Supported Models |
|------------|--------|------|----------|------|----------|
| RC | 2 | 56 | 0 | DJI Smart Controller Enterprise | Matrice 300 RTK |
| RC Plus | 2 | 119 | 0 | DJI RC Plus | M350 RTK, M300 RTK, M30/M30T |
| RC Plus 2 | 2 | 174 | 0 | DJI RC Plus 2 | Matrice 4 Series |
| RC Pro Enterprise | 2 | 144 | 0 | DJI RC Pro Enterprise | Mavic 3 Enterprise Series |

## Dock Devices (Dock) - Domain 3

### DJI Official Docks

| Dock Name | Domain | Type | Sub Type | Description |
|----------|--------|------|----------|------|
| Dock | 3 | 1 | 0 | DJI Dock |
| Dock 2 | 3 | 2 | 0 | DJI Dock 2 |
| Dock 3 | 3 | 3 | 0 | DJI Dock 3 |

### SuperDock Series Docks

| Dock Name     | Domain | Type  | Sub Type | Description           |
|----------|--------|-------|----------|--------------|
| S22M300  | 3 | 88097 | 0 | M300 Dock      |
| S2201    | 3 | 88098 | 0 | Dock 2         |
| S2301    | 3 | 88099 | 0 | M3 Dock        |
| S24M350  | 3 | 88100 | 0 | M350 Dock-24   |
| S24M350S | 3 | 88101 | 0 | M350 battery-swap Dock-24 |
| S24M3    | 3 | 88102 | 0 | M3 Dock-24     |
| S24M4    | 3 | 88103 | 0 | M4 Dock-24     |
| S25M4    | 3 | 88104 | 0 | M4 Dock-25     |
| S25M400  | 3 | 88105 | 0 | M400 charging Dock-25 |
| S25M400S | 3 | 88106 | 0 | M400 battery-swap Dock-25 |

## Gimbal Position Description

### Gimbal Index Definition

The gimbal index (Component Index) is used to identify gimbal and camera devices at different positions on the drone.

| Index Value | Identifier | Description | Applicable Scenario                  |
|---------|--------|------|-----------------------|
| 0 | LEFT_OR_MAIN | Left gimbal or main gimbal | Left gimbal for M300 RTK, main gimbal for other models |
| 1 | RIGHT | Right gimbal | Multi-gimbal models such as M300 RTK and M350 RTK |
| 2 | UP | Upper gimbal | Models supporting an upward-mounted gimbal, such as M300 RTK and M350 RTK |
| 3 | INDEX_3 | Reserved index 3 | Reserved for other model extensions                  |
| 4 | UP_TYPE_C | Type-C upward-mounted gimbal | Upward-mounted gimbal supporting the Type-C interface     |
| 5 | UP_TYPE_C_EXT_ONE | Type-C extension gimbal 1 | Type-C extension gimbal position         |
| 6 | INDEX_6 | Reserved index 6 | Reserved for other model extensions              |
| 7 | FPV | FPV camera | First-person view camera                |
| 8 | INDEX_8 | Reserved index 8 | Reserved for other model extensions              |
| 9 | INDEX_9 | Reserved index 9 | Reserved for other model extensions              |
| 10 | INDEX_10 | Reserved index 10 | Reserved for other model extensions              |
| 11 | INDEX_11 | Reserved index 11 | Reserved for other model extensions              |
| 12 | INDEX_12 | Reserved index 12 | Reserved for other model extensions              |
| 65534 | AGGREGATION | AGGREGATION | AGGREGATION                    |
| 10000 | VISION_ASSIST | Vision assist system | Vision assist system             |
| 20001 | PORT_1 | Port 1 | M400 extension port device            |
| 20002 | PORT_2 | Port 2 | M400 extension port device            |
| 20003 | PORT_3 | Port 3 | M400 extension port device            |
| 20004 | PORT_4 | Port 4 | M400 extension port device            |
| 20005 | PORT_5 | Port 5 | M400 extension port device            |
| 20006 | PORT_6 | Port 6 | M400 extension port device            |
| 20007 | PORT_7 | Port 7 | M400 extension port device            |
| 20008 | PORT_8 | Port 8 | M400 extension port device            |
| 65535 | UNKNOWN | Unknown device | Unrecognizable device type             |

**Common Index Notes:**

- **Single-gimbal models** (M3 Series/M30 Series/M4 Series, etc.): Typically use only index `0` (main gimbal), `7` (FPV), or `10000` (VISION_ASSIST)
- **Multi-gimbal models** (M300 RTK/M350 RTK): Can use index `0` (left), `1` (right), `2` (up), and `7` (FPV).
- **Multi-payload models** (M400): Can use indexes `20001` through `20008`; different payloads can be distinguished and invoked for payload functions based on their live streaming capability and PSDK status.

### Dock Camera Positions

The Dock camera uses the `camera_position` parameter:

- `0`: Interior camera
- `1`: Exterior camera

### Compatibility Notes

- **SuperDock Series Docks**: Fully compatible with the DJI Cloud API standard
- **Device type codes**: Consistent with DJI's official definitions
- **New models**: SuperDock supports the latest M4 Series and M400 drones
- **Third-party payloads**: Third-party payload interfaces can be custom-developed if needed
