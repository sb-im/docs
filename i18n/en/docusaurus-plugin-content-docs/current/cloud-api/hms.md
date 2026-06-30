---
sidebar_position: 4
---

# HMS Alarm Information List

HMS (Health Management System) is the health management system of the SuperDock product series. It implements device health status monitoring and alarm functions based on the DJI Cloud API standard.

## Overview

The HMS system pushes device health alarm information in real time over the MQTT protocol, helping developers stay informed of device status, prevent failures, and ensure flight safety.

## Features

### Real-time health monitoring
- **Device status monitoring** - Monitor the health status of the Dock and the drone in real time
- **Alarm push** - Automatically push health alarm information to the cloud platform
- **Status classification** - Support alarm information at different levels (notice, warning, error)

## Notes for Developers

### 1. MQTT subscription based on DJI Cloud HMS
Developers need to configure the MQTT subscription correctly to receive HMS alarm information:
- **Product documentation**: [DJI HMS official documentation](/en/api-integration/api-reference/dock-feature-set/hms)
- **Alarm text lookup JSON file**: [Alarm text lookup JSON file](/files/api-reference/hms.json)

### 2. Alarm information handling
- **Timely response** - Handle alarm information promptly after receiving it to avoid affecting flight safety
- **Status logging** - It is recommended to log all alarm information for fault analysis and prevention
- **User notification** - Important alarms should be reported to the operator promptly

### 3. Understanding alarm levels
- **0 - Notice** - General reminder that does not affect normal operation
- **1 - Warning** - A status that requires attention and may affect performance
- **2 - Error** - A serious problem that requires immediate handling

### 4. Data format
HMS alarm data uses the standard JSON format and contains information such as the alarm code, level, and description. Developers need to parse this data correctly.

## Frequently Asked Questions (QA)

### Q1: Executing a task returns error code 600001

**Resolution steps**:
1. Log the drone's HMS information in the system
2. Monitor the drone's HMS information while executing the task
3. In general, a 600001 returned when executing a task indicates a problem with the drone and the remote controller. You can troubleshoot based on the related HMS information. The common troubleshooting scope is already known:
   1. Whether the drone's arms are unfolded and locked into place
   2. Whether the remote controller gear is in the N position
   3. The bound device is being verified or does not match, and the number of temporary takeoffs has been used up. Please use the bound remote controller or bind the current remote controller
   4. The battery is not installed properly

### Q2: Why does the drone show HMS alarms while inside the Dock?

The following alarms shown while the drone is inside the Dock can be ignored:

**Including but not limited to**
1. `0x1F100031`: Unable to take off
2. `0x16100066`: Poor RTK signal
3. `0x1610008F`: Onboard antenna satellite search anomaly
4. `0x1F0B0001`: The aircraft cannot use the LTE link
5. `0x1F0B003A`: The aircraft's DJI Cellular Dongle cannot access the network
6. `0x1A420BC1`: Forward ambient light too dim, forward vision obstacle avoidance disabled, please fly with caution
7. `0x1A420BC2`: Backward ambient light too dim, backward vision obstacle avoidance disabled, please fly with caution
8. `0x1A420BC3`: Rightward ambient light too dim, rightward vision obstacle avoidance disabled, please fly with caution
9. `0x1A420BC4`: Leftward ambient light too dim, leftward vision obstacle avoidance disabled, please fly with caution
10. `0x1A420BC5`: Upward ambient light too dim, upward vision obstacle avoidance disabled, please fly with caution
11. `0x1A420BC6`: Horizontal ambient light too dim, horizontal vision obstacle avoidance disabled, please fly with caution

These are HMS alarms reported by the drone in an enclosed environment. The basic check is to confirm whether the task can be executed, that is, whether the drone is able to take off. Then troubleshoot according to Q1.

### Q3: Which HMS alarms should I watch for before takeoff or during flight?

The following are HMS alarms related to anomalies that customers have historically encountered before takeoff and during flight.
**Including but not limited to**

1. Wind speed too high, fly with caution
2. Low battery alarm
3. Critically low battery alarm
4. `0x16100020`: Flight controller temperature too high
5. `0x16100066`: Poor RTK signal
6. `0x1608005B`: Wayline problem
7. `0x1D040001`: Abnormal gimbal vibration
8. `0x1610009A`: Excessive gimbal vibration
9. `0x16100020`: Flight controller temperature too high
10. `0x1610004C`: Remote controller sticks need calibration
11. `0x1F0B0001`: The aircraft cannot use the LTE link
12. `0x1F0B003A`: The aircraft's DJI Cellular Dongle cannot access the network
