---
sidebar_label: Device Properties
sidebar_position: 1
---

# Dock Device Properties

### Device Property List

*   pushMode:
    *   0: The device pushes fixed-frequency data, reporting periodically at a frequency of 0.5 Hz (Topic: thing/product/*`{device_sn}`*/osd)
    *   1: The device pushes state data, reporting when the state changes (Topic: thing/product/*`{device_sn}`*/state)
*   accessMode:
    *   r: Property is read-only
    *   rw: Property is readable and writable (Topic: thing/product/*`{gateway_sn}`*/property/set)

| Column | Name | Type | constraint | Description | accessMode | pushMode |
|--------------------------------|----------------------| --- |------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --- | --- |
| home_position_is_valid | Home Point validity | enum_int | `{"0":"Invalid","1":"Valid"}` |  | r | 0 |
| heading | Dock heading angle | double | `{"max":"180","min":"-180","step":"","unit_name":"Degrees / °"}` |  | r | 0 |
| drone_rtcm_info | Aircraft RTK calibration source | struct |  |  | r | 1 |
| »mount_point | Network RTK mount point information | text |  |  | | 0 |
| »port | Network port information | text |  |  | | 0 |
| »host | Network host information | text |  |  | | 0 |
| »rtcm_device_type | Device type | enum_int | `{"0":"Aircraft"}` |  | | 0 |
| »source_type | Calibration type | enum_int | `{"0":"Dock local RTK source","1":"DJI aircraft RTK source","2":"Network RTK source"` |  | | 0 |
| air_conditioner | Dock air conditioner working state information | struct | |  | r | 0 |
| »air_conditioner_state | Dock air conditioner state | enum_int | `{"0":"Idle mode (no cooling, heating, or dehumidification)","1":"Cooling mode","2":"Heating mode","3":"Dehumidification mode","4":"Cooling exit mode","5":"Heating exit mode","6":"Dehumidification exit mode","7":"Cooling ready mode","8":"Heating ready mode","9":"Dehumidification ready mode"10":"Preparing for air cooling"11":"Air cooling in progress"12":"Air cooling exiting"13":"Preparing for defogger"14":"Defogger in progress"15":"Defogger exiting"}` | Dock air conditioner working state information; the air conditioner has only one working mode | | 0 |
| »switch_time | Remaining waiting time before switching | int | `{"unit_name":"Seconds / s"}` | The air conditioner state sequence is: switch from the ready mode to the working mode, then after operation switch to the exit mode, and after exiting switch to the idle mode. Therefore, this property indicates how long after issuing a command it can switch to the next state. For example, if it is currently in the idle state, after enabling the cooling mode it enters the cooling ready mode, and this time indicates how long before it can enter the cooling working mode. And so on. | | 0 |
| air_transfer_enable | Aerial transfer [aircraft to dock] | bool | `{"false":"Disable","true":"Enable"}` | Photos taken by the user during aircraft flight are quickly transferred back to the dock | rw | 1 |
| cloud_transfer_enable | Aerial transfer [dock to cloud] | enum_int | `{"0":"Disabled (no upload during flight)","1":"100 KB/s","2":"200 KB/s","3":"400 KB/s","4":"800 KB/s","5":"No speed limit during flight"}` | Photos taken by the user during aircraft flight are quickly transferred from the dock to the cloud; the uplink bandwidth limit during flight can be configured. | rw | 1 |
| silent_mode | Dock quiet mode | enum_int | `{"0":"Not in quiet mode","1":"In quiet mode"}` | Enabling quiet mode means: 1. The fan speed decreases, the air conditioner cooling performance drops, and the operation interval becomes longer in hot weather. 2. The buzzer sound is turned off; please be cautious of the surroundings when opening or closing the dock cover. 3. The white indicator light for the dock standby state is turned off, while the indicator lights for other operating states remain normal. | rw | 1 |
| user_experience_improvement | User experience improvement plan | enum_int | `{"0":"Initial state","1":"Refuse to join the user experience improvement plan","2":"Agree to join the user experience improvement plan"}` |  | rw | 1 | | r | 0 |
| drone_battery_maintenance_info | Aircraft battery maintenance information | struct | |  | | 0 |
| »maintenance_state | Maintenance state | enum_int | `{"0":"No maintenance required","1":"Waiting for maintenance","2":"In maintenance"}` |  | | 0 |
| »maintenance_time_left | Remaining battery maintenance time | int | `{"unit_name":"Hours / h"}` | Rounded down | | 0 |
| »heat_state | Battery heating and preservation state | enum_int | `{"0":"Battery not heating or preserving","1":"Battery in heating","2":"Battery in heat preservation"}` | When the aircraft is powered off in the dock, this property reports the battery heating and preservation information of the aircraft connected to the dock | | 0 |
| »batteries | Battery details | array | `{"size": -, "item_type": struct}` | When the aircraft is powered off in the dock, this property reports the battery information of the aircraft connected to the dock. The basic data is essentially consistent with the battery information in the aircraft thing model | | 0 |
| »»capacity_percent | Remaining battery capacity | int | `{"max":100,"min":0}` | Retain one decimal place. Normal range 0-100. The abnormal value when the device cannot retrieve data is 32767 | | 0 |
| »»index | Battery serial number | enum_int | `{"0":"Left battery","1":"Right battery"}` |  | | 0 |
| »»voltage | Voltage | int | `{"unit_name":"Millivolts / mV"}` | Normal range 0-28000mV. The abnormal value when the device cannot retrieve data is 32767 | | 0 |
| »»temperature | Temperature | float | `{"unit_name":"Celsius / °C"}` | Retain one decimal place. Normal range -40-150°C. The abnormal value when the device cannot retrieve data is 32767 | | 0 |
| maintain_status | Maintenance information | struct | |  | r | 0 |
| position_state | Satellite search state | struct | |  | r | 0 |
| »is_calibration | Whether calibrated | enum_int | `{"0":"Not calibrated","1":"Calibrated"}` |  | | 0 |
| »is_fixed | Whether is Fixed | enum_int | `{"0":"Not started","1":"Fixing","2":"Fixing successful","3":"Fixing failed"}` |  | | 0 |
| »quality | Satellite acquisition mode | enum_int | `{"1":"Gear 1","2":"Gear 2","3":"Gear 3","4":"Gear 4","5":"Gear 5","10":"RTK fixed"}` |  | | 0 |
| »gps_number | Number of GPS satellites | int | |  | | 0 |
| »rtk_number | Number of RTK satellites | int | |  | | 0 |
| emergency_stop_state | Emergency stop [hardware-limited] button state (hardware emergency stop) | enum_int | `{"0":"Disabled","1":"Enabled"}` |  | r | 0 |
| soft_emergency_stop_state | Emergency stop [software-limited] button state (software emergency stop) | enum_int | `{"0":"Disabled","1":"Enabled"}` |  | r | 0 |
| drone_charge_state | Aircraft charging state | struct | | Aircraft charging state | r | 0 |
| »capacity_percent | Battery percentage | int | `{"max":"100","min":"0"}` |  | | 0 |
| »state | Charging state | enum_int | `{"0":"Idle","1":"Charging"}` |  | | 0 |
| backup_battery | Dock backup battery information | struct | |  | r | 0 |
| »switch | Backup battery switch | enum_int | `{"1":"Enable"}` |  | | 0 |
| »voltage | Voltage of the backup battery | int | `{"desc":"Voltage is 0 when the backup battery is turned off","max":"30000","min":"0","step":"1","unit_name":"Millivolts / mV"}` |  | | 0 |
| »temperature | Backup battery temperature | float | `{"step":"0.1","unit_name":"Celsius / °C"}` | Retain one decimal place | | 0 |
| alarm_state | Dock sound and light alarm state | enum_int | `{"0":"Disabled","1":"Enabled"}` |  | r | 0 |
| battery_store_mode | Battery operating mode | enum_int | `{"1":"Schedule mode","2":"Standby mode"}` | Schedule mode is suitable for regular operation scenarios; when there is no mission, the battery level is maintained between 55% and 60%, and the battery life is longer. Standby mode is suitable for emergency operation scenarios; when there is no mission, the battery level is maintained between 90% and 95%, and the battery life is shorter. | r | 0 |
| activation_time | Dock activation time (Unix timestamp) | int | `{"unit_name":"Seconds / s"}` |  | r | 0 |
| height | Ellipsoid height | double | `{"unit_name":"Meters / m"}` |  | r | 0 |
| alternate_land_point | Alternate landing point | struct | |  | r | 0 |
| »longitude | Longitude | float | `{}` |  | | 0 |
| »latitude | Latitude | float | `{}` |  | | 0 |
| »safe_land_height | Safe landing height (backup landing transfer height) | float | `{}` |  | | 0 |
| »is_configured | Whether the alternate landing point is set | enum_int | `{"0":"Not set","1":"Already set"}` |  | | 0 |
| »height | Ellipsoid height | float | |  | | 0 |
| compatible_status | Firmware consistency | enum_int | `{"0":"No consistency upgrade required","1":"Consistency upgrade required"}` | Consistency upgrade: refers to the case where the firmware versions of certain modules of the aircraft are inconsistent with the system-matched version and need to be upgraded. A common case: the aircraft and remote controller have already been upgraded to the latest version, but when replacing the battery it is found that the battery has not been upgraded, at which point the consistency upgrade will be prompted. Normal upgrade: the developer upgrades all modules of the aircraft to the specified firmware version. | r | 1 |
| acc_time | Dock cumulative operating time | int | `{"unit_name":"Seconds / s"}` |  | r | 1 |
| first_power_on | First power-on time | int | `{"unit_name":"Milliseconds / ms"}` |  | r | 0 |
| storage | Storage capacity | struct | |  | r | 0 |
| »total | Total capacity [256GB or 512GB] | int | `{"unit_name":"Kilobytes / KB"}` |  | | 0 |
| »used | Used capacity | int | `{"unit_name":"Kilobytes / KB"}` |  | | 0 |
| working_current | Working current | float | `{"unit_name":"Milliamps / mA"}` |  | r | 0 |
| working_voltage | Working voltage | int | `{"unit_name":"Millivolts / mV"}` |  | r | 0 |
| humidity | Humidity inside the dock | float | `{"max":"100","min":"0","step":"0.1","unit_name":"Relative humidity / %RH"}` |  | r | 0 |
| temperature | Inside dock temperature | float | `{"unit_name":"Celsius / °C"}` |  | r | 0 |
| environment_temperature | Environment temperature | float | `{"unit_name":"Celsius / °C"}` |  | r | 0 |
| wind_speed | Wind speed | float | `{"unit_name":"Meters per second / m/s"}` |  | r | 0 |
| rainfall | Rainfall | enum_int | `{"0":"No rain","1":"Light rain","2":"Moderate rain","3":"Heavy rain"}` |  | r | 0 |
| live_capacity | Gateway device live streaming capability | struct | |  | r | 1 |
| »available_video_number | Number of selectable streaming bitrates | int | |  | | 0 |
| »coexist_video_number_max | Maximum number of streams that can be pushed simultaneously | int | |  | | 0 |
| »device_list | Selectable video device sources | array | `{"size": -, "item_type": struct}` | Selectable video device sources (device layer, such as the aircraft) | | 0 |
| »»sn | Serial number (SN) of the video source device, such as the aircraft | text | |  | | 0 |
| »»available_video_number | Number of streaming bitrates that can be selected for the device with this serial number | int | |  | | 0 |
| »»coexist_video_number_max | Maximum number of streams that can be pushed simultaneously by the device with this serial number | int | |  | | 0 |
| »»camera_list | List of cameras on the device with this serial number | array | `{"size": -, "item_type": struct}` |  | | 0 |
| »»»camera_index | Camera index | text | | Using the format `{type-subtype-gimbalindex}` | | 0 |
| »»»available_video_number | Number of streaming bitrates that can be selected for the camera-level video source | int | |  | | 0 |
| »»»coexist_video_number_max | Maximum number of streams that can be pushed simultaneously for the camera-level video source | int | |  | | 0 |
| »»»video_list | List of streams that can be selected for the camera-level video source | array | `{"size": -, "item_type": struct}` |  | | 0 |
| »»»»video_index | Index of the stream that can be selected for the camera-level video source | text | |  | | 0 |
| »»»»video_type | Type of the stream that can be selected for the camera-level video source | text | |  | | 0 |
| »»»»switchable_video_types | Video lens types that this video stream supports switching to | array | `{"size": -, "item_type": text}` |  | | 0 |
| live_status | Gateway's current overall live streaming state push | array | `{"size": -, "item_type": struct}` |  | r | 1 |
| »video_id | Live streaming identifier | text | | Identifier of a video stream being pushed, formatted as `{sn}/{camera_index}/{video_index}`. Here `{sn}` is the serial number of the video source device. `{camera_index}` is the camera index, using the format `{type-subtype-gimbalindex}`. `{video_index}` is the index of the stream that can be selected for the camera-level video source. | | 0 |
| »video_type | Video type | text | `{"length":"24"}` | Indicates the type of video lens, such as normal/wide/zoom/infrared, etc. | | 0 |
| »video_quality | Quality of the live streaming | enum_int | `{"0":"Adaptive","1":"Smooth","2":"Standard definition","3":"High definition","4":"Ultra-high definition"}` |  | | 0 |
| »status | Live streaming state | enum_int | `{"0":"Not live streaming","1":"In live streaming"}` |  | | 0 |
| »error_status | Error code | int | `{"length":6}` |  | | 0 |
| wireless_link | Image transmission link | struct | |  | r | 0 |
| »dongle_number | Number of Dongles on the aircraft | int | |  | | 0 |
| »4g_link_state | 4G link connection state | enum_int | `{"0":"Not connected","1":"Connected"}` |  | | 0 |
| »sdr_link_state | SDR link connection state | enum_int | `{"0":"Not connected","1":"Connected"}` |  | | 0 |
| »link_workmode | Dock's image transmission link mode | enum_int | `{"0":"SDR Mode","1":"4G Fusion Mode"}` |  | | 0 |
| »sdr_quality | SDR signal quality | int | `{"max":"5","min":"0","step":"1"}` |  | | 0 |
| »4g_quality | Overall 4G signal quality | int | `{"max":"5","min":"0","step":"1"}` |  | | 0 |
| »4g_uav_quality | Sky-side 4G signal quality | int | `{"max":"5","min":"0","step":"1"}` | Signal quality between the aircraft and the 4G server | | 0 |
| »4g_gnd_quality | Ground-side 4G signal quality | int | `{"max":"5","min":"0","step":"1"}` | Signal quality between the ground device (such as the remote controller, DJI Dock, etc.) and the 4G server | | 0 |
| »sdr_freq_band | SDR frequency band | float | |  | | 0 |
| »4g_freq_band | 4G frequency band | float | |  | | 0 |
| media_file_detail | Media file upload details | struct | |  | r | 0 |
| »remain_upload | Pending upload quantity | int | |  | | 0 |
| job_number | Cumulative number of dock operations | int | `{"unit_name":"Times / count"}` |  | r | 0 |
| drone_in_dock | Whether the aircraft is in the dock | enum_int | `{"0":"Outside the dock","1":"Inside the dock"}` |  | r | 0 |
| network_state | Network state | struct | |  | r | 0 |
| »type | Network type | enum_int | `{"1":"4G","2":"Ethernet"}` |  | | 0 |
| »quality | Network quality | enum_int | `{"0":"No signal","1":"Poor","2":"Fairly poor","3":"Average","4":"Fairly good","5":"Good"}` |  | | 0 |
| »rate | Network rate | float | `{"unit_name":"Kilobytes per second / KB/s"}` |  | | 0 |
| supplement_light_state | Supplementary light state | enum_int | `{"0":"Off","1":"On"}` |  | r | 0 |
| cover_state | Cover state | enum_int | `{"0":"Closed","1":"Open","2":"Half open","3":"Cover state abnormal"}` |  | r | 0 |
| sub_device | Sub-device state | struct | |  | r | 0 |
| »device_sn | Sub-device serial number (SN) | text | |  | | 0 |
| »device_model_key | Sub-device enumeration values | text | | Format as `{domain-type-subtype}` | | 0 |
| »device_online_status | Aircraft power-on state on the dock landing pad | enum_int | `{"0":"Power off","1":"Power on"}` |  | | 0 |
| »device_paired | Whether the aircraft on the dock landing pad is paired with the dock | enum_int | `{"0":"Not paired","1":"Paired"}` |  | | 0 |
| flighttask_step_code | Dock mission state | enum_int | `{"0":"Operation preparation","1":"In-flight operation","2":"Post-operation state recovery","3":"Custom flight area updating","4":"Terrain obstacle updating","5":"Mission idle","255":"Aircraft is abnormal","256":"Unknown state"}` |  | r | 0 |
| mode_code | Dock state | enum_int | `{"0":"Idle","1":"On-site debugging","2":"Remote debugging","3":"Firmware upgrade in progress","4":"In operation","5":"To be calibrated"}` |  | r | 0 |
| firmware_upgrade_status | Firmware upgrade state | enum_int | `{"0":"Not upgraded","1":"Upgrading"}` |  | r | 1 |
| firmware_version | Firmware version | text | `{"length":"64"}` |  | r | 1 |
| latitude | Latitude | double | `{"max":"90","min":"-90","step":"0.01"}` |  | r | 0 |
| longitude | Longitude | double | `{"max":"180","min":"-180","step":"0.01"}` | Longitude of the gateway device | r | 0 |
| drc_state | DRC link state | enum_int | `{"0":"Not connected","1":"Connecting","2":"Connected"}` |  | r | 0 |

### Device Property Push

**Topic:** thing/product/*`{device_sn}`*/state `State data: the device reports when the state changes`

**Topic:** thing/product/*`{device_sn}`*/osd `Fixed-frequency data: the device reports periodically at a frequency of 2 Hz`

**Direction:** up

**API Description:**
Payload property reporting refers to the reporting of properties of the payload mounted on the aircraft, such as the camera's property reporting. A payload is uniquely identified by the payload index (payload index: product type-subtype-mounting position `{type-subtype-gimbalIndex}`); for type and subtype values, refer to: [Product Supported](/en/api-integration/cloud-api/device-types). For the gimbalindex mapping, see wpml:payloadPositionIndex in [Wayline File Format](https://developer.dji.com/doc/cloud-api-tutorial/cn/api-reference/dji-wpml/common-element.html).
The protocols that currently involve payload property reporting are the gateway device's `Device Property Push` and the live streaming feature's `Live Capability Update`. For `Device Property Push`, the payload property report contains the camera's own information, such as the gimbal pitch, yaw, and roll angles. For `Live Capability Update`, the payload property report contains more of the camera's capabilities during live streaming, such as the maximum number of streams that can be pushed simultaneously. For the specific payload property structure, refer to the example below. Note that the remote controller's device properties are reported in a single message body, whereas the dock's device property push is sent across multiple messages.

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| data | Message content | text | `{}` | The content can refer to the device's device properties |
| »*camera_index* | type-subtype-gimbalIndex | text | `{}` | gimbalIndex is the camera position. For type and sub_type, refer to: [Product Supported](/en/api-integration/cloud-api/device-types) |

**Example:**

**Topic: thing/product/*`{dock_sn}`*/state**

**Topic: thing/product/*`{dock_sn}`*/osd**

```json
{
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1667220873846,
  "data": {
    "job_number": 492,
    "acc_time": 1859010,
    "activation_time": 0,
    "maintain_status": {
      "maintain_status_array": [
        {
          "state": 0,
          "last_maintain_type": 17,
          "last_maintain_time": 0,
          "last_maintain_work_sorties": 0
        }
      ]
    },
    "working_voltage": 25440,
    "working_current": 1120,
    "backup_battery": {
      "voltage": 26631,
      "temperature": 27.9,
      "switch": 1
    },
    "drone_battery_maintenance_info": {
      "maintenance_state": 0,
      "maintenance_time_left": 0
    }
  },
  "gateway": "dock_sn"
}
```

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flighttask_step_code": 255,
    "media_file_detail": {
      "remain_upload": 0
    },
    "wireless_link": {
      "4g_freq_band": 2.4,
      "4g_gnd_quality": 0,
      "4g_link_state": 0,
      "4g_quality": 0,
      "4g_uav_quality": 0,
      "dongle_number": 0,
      "link_workmode": 0,
      "sdr_freq_band": 2.4,
      "sdr_link_state": 0,
      "sdr_quality": 0
    }
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1667220881576,
  "gateway": "dock_sn"
}
```

```json
{
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1667220916697,
  "data": {
    "network_state": {
      "type": 2,
      "quality": 0,
      "rate": 5.0970001220703125
    },
    "drone_charge_state": {
      "state": 0,
      "capacity_percent": 100
    },
    "drone_in_dock": 1,
    "rainfall": 0,
    "wind_speed": 0,
    "environment_temperature": 24,
    "temperature": 24.9,
    "humidity": 62,
    "latitude": 22.907809968,
    "longitude": 113.703482143,
    "height": 34.17412567138672,
    "alternate_land_point": {
      "latitude": 22.90789831990866,
      "longitude": 113.70347329676635,
      "safe_land_height": 0,
      "is_configured": 1
    },
    "first_power_on": 1631945855969,
    "position_state": {
      "is_calibration": 1,
      "is_fixed": 2,
      "quality": 5,
      "gps_number": 6,
      "rtk_number": 25
    },
    "storage": {
      "total": 82045336,
      "used": 51772
    },
    "mode_code": 1,
    "cover_state": 0,
    "supplement_light_state": 0,
    "emergency_stop_state": 0,
    "air_conditioner": {
      "air_conditioner_state": 3,
      "switch_time": 1
    },
    "battery_store_mode": 1,
    "alarm_state": 0,
    "putter_state": 0,
    "sub_device": {
      "device_sn": "1581F5BKD225D00BP891",
      "device_model_key": "0-67-0",
      "device_online_status": 0,
      "device_paired": 1
    }
  },
  "gateway": "dock_sn"
}
```

**Topic: thing/product/*`{aircraft_sn}`*/state**

**Topic: thing/product/*`{aircraft_sn}`*/osd**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "52-0-0": {
      "measure_target_altitude": 0,
      "measure_target_distance": 591.7000122070312,
      "measure_target_error_state": 1,
      "measure_target_latitude": 0,
      "measure_target_longitude": 0,
      "payload_index": "52-0-0",
      "version": 1
    },
    "activation_time": 1667935211,
    "attitude_head": 41.7,
    "attitude_pitch": 2.7,
    "attitude_roll": 0,
    "battery": {
      "batteries": [
        {
          "capacity_percent": 95,
          "firmware_version": "02.00.20.44",
          "high_voltage_storage_days": 16,
          "index": 0,
          "loop_times": 137,
          "sn": "4BUPJ99DAD009W",
          "sub_type": 0,
          "temperature": 33.3,
          "type": 0,
          "voltage": 24303
        },
        {
          "capacity_percent": 85,
          "firmware_version": "02.00.20.44",
          "high_voltage_storage_days": 5,
          "index": 1,
          "loop_times": 82,
          "sn": "4BUPJ9EDAD01CE",
          "sub_type": 0,
          "temperature": 32,
          "type": 0,
          "voltage": 24311
        }
      ],
      "capacity_percent": 90,
      "landing_power": 0,
      "remain_flight_time": 0,
      "return_home_power": 0
    },
    "distance_limit_status": {
      "distance_limit": 5000,
      "state": 0
    },
    "elevation": 0,
    "firmware_version": "05.01.0214",
    "gear": 1,
    "height": 38.41746520996094,
    "height_limit": 120,
    "home_distance": 0,
    "horizontal_speed": 0,
    "latitude": 0,
    "longitude": 0,
    "maintain_status": {
      "maintain_status_array": [
        {
          "last_maintain_flight_time": 0,
          "last_maintain_time": 0,
          "last_maintain_type": 1,
          "state": 0
        },
        {
          "last_maintain_flight_time": 0,
          "last_maintain_time": 0,
          "last_maintain_type": 2,
          "state": 0
        },
        {
          "last_maintain_flight_time": 0,
          "last_maintain_time": 0,
          "last_maintain_type": 3,
          "state": 0
        }
      ]
    },
    "mode_code": 0,
    "night_lights_state": 0,
    "obstacle_avoidance": {
      "downside": 1,
      "horizon": 1,
      "upside": 1
    },
    "position_state": {
      "gps_number": 0,
      "is_fixed": 0,
      "quality": 0,
      "rtk_number": 0
    },
    "storage": {
      "total": 0,
      "used": 0
    },
    "total_flight_distance": 0,
    "total_flight_sorties": 0,
    "total_flight_time": 0,
    "track_id": "",
    "vertical_speed": 0,
    "wind_direction": 0,
    "wind_speed": 0
  },
  "tid": "2d2040eb-23b0-43dc-b7ac-64838276c4ac",
  "timestamp": 1670422793916,
  "gateway": "dock_sn"
}
```

### Device Property Set

**Topic:** thing/product/`{gateway_sn}`/property/set

**Direction:** down

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| data | Message content | text | `{}` | The content can refer to the device's device properties |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "distance_limit_status": {
      "state": 1
    }
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1643268212187
}
```

**Topic:** thing/product/`{gateway_sn}`/property/set_reply

**Direction:** up

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| data | Message content | text | `{}` | The content can refer to the device's device properties |

**Example:**

```json
{
  "bid":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data":{
    "distance_limit_status": {
      "state": {
        "result": 0  // 0: Success, 1: Failure, 2: Timeout, 0x123456: specific error reason code
        }
    }
  },
  "tid":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp":1643268212187
}
```
