---
id: compatibility-comparison
title: Cloud API Feature Comparison
sidebar_label: Cloud API Feature Comparison
sidebar_position: 3
description: A comparison of the differences in Cloud API features between the SuperDock product series and the DJI Dock
---

# Cloud API Feature Comparison

## Overview

This document compares the differences in Cloud API features between the SuperDock product series and the DJI Dock. Based on the DJI Cloud API standard, it helps developers understand the feature differences of the products.
This document uses the DJI Dock 2 as the baseline for comparison.

### Reference


DJI Dock 2 feature reference:
[Live Streaming](/en/api-integration/api-reference/superdock-hangar/live) 
[Wayline](/en/api-integration/api-reference/superdock-hangar/wayline) 
[Remote Debugging](/en/api-integration/api-reference/superdock-hangar/cmd) 
[Live Flight Controls](/en/api-integration/api-reference/superdock-hangar/drc) 
[PSDK Features](/en/api-integration/api-reference/superdock-hangar/psdk) 

## Legend

- ✅ **Implemented** - Feature is fully implemented and verified by testing
- ⚠️ **Partially Implemented** - Feature is partially implemented or subject to limitations
- 🔄 **In Development** - Feature is under development and is expected to be released soon
- ❌ **Not Implemented** - Feature is not yet implemented
- 🚀 **Enhanced Implementation** - Provides enhanced features on top of the DJI standard

## Feature Comparison

### SuperDock-Exclusive Features

| Specific Feature        | DJI Dock | SuperDock | Remarks |
|-------------|---------|----------|------|
| Enhanced image transmission module online authentication  | ❌ | ✅ | New interface |
| Switch drone RTK information  | ❌ | ✅ | New interface |
| Dock third-party payload customization process | ❌ | 🚀 | Cloud API (MQTT) |
| Third-party Speaker      | ❌ | 🚀 | Cloud API (MQTT) |
| Third-party Searchlight      | ❌ | 🚀 | Cloud API (MQTT) |


### Features Partially Implemented by SuperDock

| Specific Feature | DJI Dock | SuperDock | Remarks |
|---------|---------|----------|------|
| Bind to the corresponding organization using a device binding code | ✅ | 🔄 | Cloud API (MQTT) |
| Start live streaming | ✅ | ⚠️ | Live streaming push modes only support rtmp and whip |
| Set live streaming quality | ✅ | ⚠️ | Live streaming quality cannot be set for the Dock's live video stream |

### Features Not Implemented by SuperDock

#### Core Dock Features

| Specific Feature | DJI Dock | SuperDock | Remarks |
|---------|---------|----------|------|
| Firmware upgrade progress | ✅ | ❌ | Cloud API (MQTT) |
| Firmware upgrade | ✅ | ❌ | Cloud API (MQTT) |
| Get the list of files available for upload from the device | ✅ | ❌ | Cloud API (MQTT) |
| Initiate log file upload | ✅ | ❌ | Cloud API (MQTT) |

#### Remote Debugging Features

| Specific Feature | DJI Dock | SuperDock | Remarks |
|---------|---------|----------|------|
| Force close dock cover | ✅ | ❌ | Method: cover_force_close |
| Turn on supplementary light | ✅ | ❌ | Method: supplement_light_open |
| Turn off supplementary light | ✅ | ❌ | Method: supplement_light_close |
| Battery maintenance state switch | ✅ | ❌ | Method: battery_maintenance_switch |
| Battery operating mode switch | ✅ | ❌ | Method: battery_store_mode_switch |
| Air conditioner working mode switch | ✅ | ❌ | Method: air_conditioner_mode_switch |
| Sound and light alarm switch | ✅ | ❌ | Method: alarm_state_switch |
| eSIM activation | ✅ | ❌ | Method: esim_activate |
| eSIM and SIM switch | ✅ | ❌ | Method: sim_slot_switch |
| eSIM carrier switch | ✅ | ❌ | Method: esim_operator_switch |
| Aircraft data formatting | ✅ | ❌ | The drone is automatically formatted before takeoff |
| Dock data formatting | ✅ | ❌ | Data is cleaned up automatically on a schedule |

#### Live Flight Controls Features

| Specific Feature | DJI Dock | SuperDock | Remarks |
|---------|---------|----------|------|
| Update fly-to target point | ✅ | ❌ | Method: fly_to_point_update |
| Enter POI orbit mode | ✅ | ❌ | Method: poi_mode_enter |
| Exit POI orbit mode | ✅ | ❌ | Method: poi_mode_exit |
| POI orbit speed setting | ✅ | ❌ | Method: poi_circle_speed_set |
| Split-screen control | ✅ | ❌ | Method: camera_screen_split |
| Photo storage setting | ✅ | ❌ | Method: photo_storage_set |
| Video storage setting | ✅ | ❌ | Method: video_storage_set |
| Exposure mode setting | ✅ | ❌ | Method: camera_exposure_mode_set |
| Exposure value adjustment | ✅ | ❌ | Method: camera_exposure_set |
| Focus mode setting | ✅ | ❌ | Method: camera_focus_mode_set |
| Focus value setting | ✅ | ❌ | Method: camera_focus_value_set |
| Joystick invalid reason notification | ✅ | ❌ | Method: joystick_invalid_notify |
| POI orbit status notification | ✅ | ❌ | Method: poi_status_notify |
| Photo capture progress report | ✅ | ❌ | Method: camera_photo_take_progress |
| Obstacle avoidance information report | ✅ | ❌ | Method: hsi_info_push |
| Image transmission link latency information report | ✅ | ❌ | Method: delay_info_push |
