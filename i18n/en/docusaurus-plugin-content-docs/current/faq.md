---
title: FAQ
description: SuperDock API frequently asked questions
last_update:
  date: 2025-09-23
  author: SuperDock Team
---

# Frequently Asked Questions

Welcome to the SuperDock Dock FAQ page! This page compiles the most common questions and solutions encountered by users.

## Operation, Maintenance, and Troubleshooting


### Q: What should I do if executing a task returns error code 600001?

**A:** Error code 600001 indicates "drone pre-takeoff self-check failed". Troubleshoot as follows:

**1. Check HMS information**:
- The drone's HMS information is recorded on the system
- Monitor the drone's HMS information while executing the task

**2. Common troubleshooting scope**:
- Whether the drone's arms are unfolded and locked in place
- Whether the remote controller gear is in the N position
- Check the device binding status and frequency pairing
- Whether the battery is installed correctly

**3. Review HMS alerts**:
Refer to the [HMS Health Management](./cloud-api/hms.md) document for specific HMS alert information.


### Q: Is it normal for the drone to show HMS alerts while inside the dock cabin?

**A:** The following HMS alerts are normal when the drone is inside the dock cabin and can be ignored:

- `0x1F100031`: Unable to take off
- `0x16100066`: Poor RTK signal
- `0x1610008F`: Onboard antenna satellite search abnormality
- `0x1F0B0001`: Aircraft cannot use the LTE link
- `0x1F0B003A`: Aircraft DJI Cellular Dongle cannot access the network
- `0x1A420BC1-BC6`: Ambient light too dark in each direction, visual obstacle avoidance disabled

These are normal prompts for a drone in an enclosed environment. We recommend confirming that the drone can take off normally before executing a task.

### Q: Which HMS alerts require special attention during flight?

**A:** The following HMS alerts require special attention:

**Environment-related**:
- Wind speed too high, fly with caution
- `0x16100020`: Flight controller temperature too high

**Battery-related**:
- Low battery warning
- Critically low battery warning

**Device-related**:
- `0x16100066`: Poor RTK signal
- `0x1608005B`: Wayline issue
- `0x1D040001`: Abnormal gimbal vibration
- `0x1610009A`: Excessive gimbal vibration
- `0x1610004C`: Remote controller joystick requires calibration

**Communication-related**:
- `0x1F0B0001`: Aircraft cannot use the LTE link
- `0x1F0B003A`: Aircraft DJI Cellular Dongle cannot access the network

When these alerts occur, we recommend immediately checking the relevant system status and taking appropriate measures.


### Q: What should I do if RTK calibration fails?

**A:** Troubleshooting steps for RTK calibration failure:

**1. Check GPS signal**:
- Confirm that the GPS signal is good and the number of satellites is sufficient
- Avoid calibrating in environments obstructed by tall buildings or trees

**2. Check antenna connections**:
- Confirm that the RTK antenna is securely connected
- Check whether the antenna is damaged or obstructed
- Check whether the antenna connection cable is disconnected

**3. Check network connection**:
- Confirm whether the on-site network is stable

**4. Recalibrate**:
- Wait for better signal conditions
- Re-run the RTK calibration process

If the problem persists, please contact technical support.

### Q: How do I handle abnormal mechanical actions?

**A:** How to handle abnormal mechanical actions:

**1. Safety check**:
- Stop all operations immediately
- Check whether any foreign object is blocking the mechanical parts
- Do not touch the Dock-related parts

**2. Basic troubleshooting**:
- Check whether the power supply is normal
- Confirm whether the mainboard signal is normal
- Check the error code returned by the action

**3. Professional maintenance**:
- Contact technical support
- Arrange for professional technicians to perform repairs

**Note**: Mechanical abnormalities may affect flight safety. Do not force operation.

## Network and Communication

### Q: What should I do if the MQTT connection fails?

**A:** Troubleshooting steps for MQTT connection issues:

**1. Check network connection**:
- Confirm that the device's network connection is normal
- Test network latency and stability
- Check the server-side firewall settings

**2. Verify MQTT configuration**:
- Confirm that the MQTT server address is correct
- Check the port number (usually 1883 or 8883)
- Verify the username and password


### Q: How do I configure MQTT server switching?

**A:** Steps to switch the MQTT server:

**1. Access the MQTT configuration page**:
- Connect to the Dock WiFi
- Visit `192.168.110.201:3000` in a browser
- Click the "Reset/Write MQTT" button

**2. Reset the current configuration**:
- Click "Reset MQTT"
- Wait one minute, then refresh the page

**3. Enter the new server information**:
- Enter the MQTT server address
- Enter the organization ID and organization secret
- Click "Submit" to submit

**4. Verify the connection**:
- Wait one minute
- Observe whether the MQTT server receives messages
- Confirm that the device status is normal

### Q: What should I do if the network signal is unstable?

**A:** Network signal optimization recommendations:

1. Confirm whether the network is connected
2. Test the network packet loss rate using PING
3. Test the current maximum network throughput using iperf


## Data Management and Storage

### Q: What should I do if media file upload fails?

**A:** How to resolve media file upload issues:

**1. Check storage space**:
- Confirm that there is sufficient local storage space
- Check whether the cloud storage service has any issues
- Check whether the cloud server has a firewall

**2. Verify network conditions**:
- Confirm that the network bandwidth is sufficient
- Check network stability
- Avoid uploading during network peak hours
