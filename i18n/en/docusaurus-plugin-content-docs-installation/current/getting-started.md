# Unboxing and Installation

This document guides you through unboxing, installing, and performing the initial configuration of the SuperDock automated drone Dock.

## Prerequisites

## 1. Initial Configuration

### 1.1 Network Check
**Important: After powering on, contact the supplier's engineer to verify that the network is working properly. Only proceed with the following steps after confirmation!**

### 1.2 Connect to the Dock Wi-Fi
1. **Find the Wi-Fi information**
    - Locate the Wi-Fi password label where the device's top cover opens
    - Record the Wi-Fi name and password

2. **Connect the device**
    - Use a phone, tablet, or computer to search for the Dock Wi-Fi
    - Enter the password to connect to the network
    - Confirm the connection is successful

### 1.3 Access the Control Interface
1. Open a browser
2. Navigate to: `192.168.110.201:3000`
3. Wait for the page to finish loading

### 1.4 On-Site Operation Configuration

**Note: Do not open the Dock's top cover while performing the following operations.**

#### 1.4.1 RTK Calibration
1. Click the "On-Site Operation" menu
2. Click "Start RTK Calibration"
3. Wait for the calibration to complete
4. Confirm that the feedback message is received: `SVIN finish`

#### 1.4.2 Mechanical Function Test
Test whether the following functions execute properly:
- Open the dock cover
- Release the push rods
- Clamp the push rods
- Close the dock cover

#### 1.4.3 Aircraft Placement
1. **Open the dock cover**
    - Open the dock cover through the control interface

2. **Place the aircraft correctly**
    - Arrow markings surround the landing pad
    - The aircraft heading (gimbal end) should point in the direction indicated by the arrows
    - The aircraft tail (battery side) should face the side of the Dock
    - Make sure the aircraft is placed stably

#### 1.4.4 Power Function Test
Test the following functions in sequence:
1. Power on the aircraft
2. Start charging
3. Stop charging
4. Power off the aircraft
5. Click "Restart Dock"

### 1.5 System Restart Verification
1. **Wait for the restart to complete**
    - The Wi-Fi will disconnect during the restart
    - Reconnect to the Dock Wi-Fi

2. **Confirm the status**
    - Return to the home page to check the system status
    - Take a screenshot to save the home page information
    - Send the screenshot to the supplier's engineer for confirmation

## 2. MQTT Configuration

### 2.1 Access the MQTT Configuration
1. Connect to the Dock Wi-Fi
2. Navigate to `192.168.110.201:3000` in your browser
3. Click the "Reset/Write MQTT" button

### 2.2 View the Current Configuration
Enter the MQTT information page to view the information of the currently connected MQTT server

### 2.3 Switch the MQTT Server
1. **Reset MQTT**
    - Click "Reset MQTT"
    - Wait one minute and then refresh the page

2. **Enter the new server information**
    - Enter the MQTT server address
    - Enter the organization ID and organization secret
    - Click "Submit"

3. **Verify the connection**
    - Wait one minute
    - Observe whether the MQTT server receives messages

### 2.4 Switch to the Manufacturer's Server (Optional)
1. Click "Set Up Cloud Access"
2. Wait one minute and then log in to the system

## 3. Wayline Import

### 3.1 Wayline Preparation
1. Make sure the pilot has completed wayline planning
2. Verify the feasibility and safety of the wayline
3. Prepare the wayline file

### 3.2 Import Operation
1. Select "Wayline Management" in the control system
2. Upload the wayline file
3. Verify the wayline parameters
4. Save the wayline configuration

## 4. First Flight Test

### 4.1 Test Preparation
- **Operator**: The supplier's engineer is the primary operator
- **Supporting personnel**: On-site deployment personnel observe and assist
- **Safety check**: Confirm that the flight area is safe

### 4.2 Test Procedure
1. System self-check
2. Aircraft pre-check
3. Wayline verification
4. Takeoff test
5. Wayline flight
6. Return-to-home and landing

### 4.3 Test Records
- Record flight data
- Record any anomalies
- Archive photos/videos

## Frequently Asked Questions

### Q1: What should I do if the Wi-Fi connection fails?
**A1:**
1. Confirm that the Wi-Fi password was entered correctly
2. Check that the device has powered on properly
3. Try restarting the device and reconnecting

### Q2: Cannot access 192.168.110.201:3000?
**A2:**
1. Confirm that you are connected to the Dock Wi-Fi
2. Check whether your browser is supported
3. Try clearing the browser cache

### Q3: RTK calibration fails?
**A3:**
1. Confirm that the GPS signal is good
2. Check the antenna connection
3. Contact technical support

### Q4: Mechanical actions are abnormal?
**A4:**
1. Check for any foreign objects blocking the mechanism
2. Confirm that the power supply is normal
3. Contact technical support
