---
sidebar_label: Live Flight Controls
sidebar_position: 12
---

# Live Flight Controls

# Event

## Flyto execution result event notification

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** fly_to_point_progress

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| fly_to_id | Flyto target point ID | text | | |
| status | State | enum_string | `{"wayline_cancel":"Cancel flying to target point","wayline_failed":"Execution failed","wayline_ok":"Executed successfully, flown to target point","wayline_progress":"Executing"}` | |
| result | Return code | int | | Non-zero represents an error |
| way_point_index | Currently executing the nth waypoint | int | | |
| remaining_distance | Remaining mission distance | float | `{"step":0.1,"unit_name":"Meters / m"}` | |
| remaining_time | Remaining mission time | float | `{"step":0.1,"unit_name":"Seconds / s"}` | |
| planned_path_points | List of planned trajectory points | array | `{"size": -, "item_type": struct}` | |
| »latitude | Latitude of the trajectory point | double | `{"max":90,"min":-90}` | Latitude of the trajectory point, angle value, negative for south latitude, positive for north latitude, accurate to 6 decimal places |
| »longitude | Longitude of the trajectory point | double | `{"max":180,"min":-180}` | Longitude of the trajectory point, angle value, east longitude is positive, west longitude is negative, accurate to 6 decimal places |
| »height | Trajectory point height | float | `{"step":0.1,"unit_name":"Meters / m"}` | Trajectory point height, ellipsoid height |

**Example:**

```text
{
	"bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
	"data": {
		"fly_to_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
		"planned_path_points": [
			{
				"height": 123.234,
				"latitude": 13.23,
				"longitude": 123.234
			}
		],
		"remaining_distance": 0,
		"remaining_time": 0,
		"result": 0,
		"status": "wayline_progress",
		"way_point_index": 0
	},
	"need_reply": 1,
	"tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
	"timestamp": 16540709686556,
	"method": "fly_to_point_progress"
}
```

## One-key takeoff result event notification

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** takeoff_to_point_progress

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| status | Task state | enum_string | `{"task_finish":"One-key takeoff mission completed","task_ready":"Ready for takeoff","wayline_cancel":"Cancel flying to target point","wayline_failed":"Execution failed","wayline_ok":"Executed successfully, flown to target point","wayline_progress":"Executing"}` | |
| result | Return code | int | | Non-zero represents an error |
| flight_id | One-key takeoff mission UUID | text | | |
| track_id | Track ID | text | | |
| way_point_index | Currently executing the nth waypoint | int | | |
| remaining_distance | Remaining mission distance | float | `{"step":0.1,"unit_name":"Meters / m"}` | |
| remaining_time | Remaining mission time | float | `{"step":0.1,"unit_name":"Seconds / s"}` | |
| planned_path_points | List of planned trajectory points | array | `{"size": -, "item_type": struct}` | |
| »latitude | Latitude of the trajectory point | double | `{"max":90,"min":-90}` | Latitude of the trajectory point, angle value, negative for south latitude, positive for north latitude, accurate to 6 decimal places |
| »longitude | Longitude of the trajectory point | double | `{"max":180,"min":-180}` | Longitude of the trajectory point, angle value, east longitude is positive, west longitude is negative, accurate to 6 decimal places |
| »height | Trajectory point height | float | `{"step":0.1,"unit_name":"Meters / m"}` | Trajectory point height, ellipsoid height |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    "planned_path_points": [
      {
        "height": 123.234,
        "latitude": 13.23,
        "longitude": 123.234
      }
    ],
    "remaining_distance": 0,
    "remaining_time": 0,
    "result": 0,
    "status": "wayline_ok",
    "track_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    "way_point_index": 1
  },
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 16540709686556,
  "method": "takeoff_to_point_progress"
}
```

## DRC link state notification (Deprecated)

**Note: This protocol is no longer maintained and is inaccurate. For more accurate DRC link status, use the device property "drc_state" reported by the Dock or the "DRC heartbeat".**

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** drc_status_notify

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| drc_state | DRC state | enum_int | `{"0":"Not connected","1":"Connecting","2":"Connected"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "drc_state": 2,
    "result": 0
  },
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "drc_status_notify"
}
```

## DRC - flight control invalidity reason notification

DRC - flight control is an integrated drone control feature. If it is unavailable, the flight control capability cannot be used.

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** joystick_invalid_notify

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| reason | Task state | int | `{"0":"Remote controller lost connection","1":"Low battery return","2":"Low battery landing","3":"Close to the flight restriction zone","4":"Remote controller takes over control authority (for example, return triggered, Controller B takes over)"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "reason": 0
  },
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "joystick_invalid_notify"
}
```

## Report capture progress

When a photo-capturing action needs to continue, this event reports the progress. Currently only supported in: panorama photo mode

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** camera_photo_take_progress

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| output | Output | struct | | |
| »status | Capturing state | enum_string | `{"fail":"Failed","in_progress":"Executing","ok":"Completed"}` | |
| »progress | Progress | struct | | |
| »»current_step | Execution step | enum_int | `{"3000":"Panorama photo capturing has not started or has finished","3002":"Panorama photo is capturing","3005":"Panorama photo is synthesizing"}` | |
| »»percent | Progress value | int | `{"max":"100","min":"0","step":"1"}` | |
| »ext | Extended content | struct | | |
| »»camera_mode | Current camera mode | enum_int | `{"3":"Panorama"}` | |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "ext": {
        "camera_mode": 3
      },
      "progress": {
        "current_step": 0,
        "percent": 100
      },
      "status": "ok"
    },
    "result": 0
  },
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_photo_take_progress"
}
```

# Service

## Grabbing flight control authority

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flight_authority_grab

**Data:** null

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {},
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flight_authority_grab"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flight_authority_grab

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flight_authority_grab"
}
```

## Grabbing payload control authority

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** payload_authority_grab

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Payload enumeration value | text | | Enumeration of camera payload and mounting position. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "payload_authority_grab"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** payload_authority_grab

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "payload_authority_grab"
}
```

## Enter Live Flight Controls Mode

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** drc_mode_enter

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| mqtt_broker | Broker connection information | struct | | Get the address and authentication information of the MQTT relay service |
| »address | Server connection address | text | | Server connection address, for example: 192.0.2.1:8883, mqtt.dji.com:8883 |
| »client_id | Client ID | text | | Customizable MQTT client ID. It is recommended to use the device's SN, which can also be combined with a meaningful prefix, for example, drc-4J4R101 |
| »username | Username | text | | Username used when establishing the connection |
| »password | Password | text | | Password required for authentication when establishing the connection |
| »expire_time | Authentication information expiration time | int | `{"unit_name":"Seconds / s"}` | Authentication information can be reused within the validity period. In addition, the expiration of authentication information does not affect devices that have already established a connection |
| »enable_tls | Whether to enable TLS | bool | | Enabling TLS encrypts the MQTT link |
| osd_frequency | OSD frequency | int | `{"max":30,"min":1,"unit_name":"Hertz / Hz"}` | Set the OSD reporting frequency |
| hsi_frequency | HSI frequency | int | `{"max":30,"min":1,"unit_name":"Hertz / Hz"}` | Set the HSI reporting frequency |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "hsi_frequency": 1,
    "mqtt_broker": {
      "address": "mqtt.dji.com:8883",
      "client_id": "sn_a",
      "enable_tls": true,
      "expire_time": 1672744922,
      "password": "jwt_token",
      "username": "sn_a_username"
    },
    "osd_frequency": 10
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "drc_mode_enter"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** drc_mode_enter

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "drc_mode_enter"
}
```

## Exit Live Flight Controls Mode

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** drc_mode_exit

**Data:** null

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {},
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "drc_mode_exit"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** drc_mode_exit

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "drc_mode_exit"
}
```

## One-Key Takeoff

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** takeoff_to_point

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| target_latitude | Target point latitude | double | `{"max":90,"min":-90}` | Target point latitude, in degree values. Negative for south, positive for north. Precision up to 6 decimal places |
| target_longitude | Target point longitude | double | `{"max":180,"min":-180}` | Target point longitude, in degree values. Positive for east, negative for west. Precision up to 6 decimal places |
| target_height | Target point height | float | `{"max":1500,"min":2,"step":0.1,"unit_name":"Meters / m"}` | Target point height (ellipsoidal height), using the WGS84 model. Default behavior after the aircraft reaches the point: hovering |
| security_takeoff_height | Safe takeoff height | float | `{"max":1500,"min":20,"step":0.1,"unit_name":"Meters / m"}` | Altitude relative to the (Dock) takeoff point (ALT). The aircraft first ascends to a specific height, then flies toward the target point. |
| rth_mode | [Required] Return home mode setting value | enum_int | `{"0":"Intelligent altitude","1":"Preset altitude"}` | In intelligent return home mode, the aircraft will automatically plan the optimal return home altitude. The DJI Dock currently does not support setting the return home altitude mode and can only choose the 'Preset altitude' mode. When the environment or lighting does not meet the requirements of the visual system (such as direct sunlight in the evening, weak or no light at night), the aircraft will use the return home altitude you set for straight-line return home |
| rth_altitude | Return home altitude | int | `{"max":1500,"min":2,"step":1,"unit_name":"Meters / m"}` | Altitude relative to the (Dock) takeoff point, relative altitude ALT |
| rc_lost_action | Remote controller lost control action | enum_int | `{"0":"Hovering","1":"Landing","2":"Returning to home"}` | Remote controller lost control action |
| commander_mode_lost_action | [Required] To-point flight loss of control action | enum_int | `{"0":"Continue with the to-point flight mission","1":"Exit the to-point flight mission and perform normal loss of control behavior"}` | |
| commander_flight_mode | [Required] To-point flight mode setting value | enum_int | `{"0":"Intelligent altitude flight","1":"Preset altitude flight"}` | |
| commander_flight_height | [Required] To-point flight height | float | `{"max":3000,"min":2,"step":0.1,"unit_name":"Meters / m"}` | Altitude relative to the (Dock) takeoff point, relative altitude ALT |
| flight_id | One-key takeoff mission UUID | text | | Mission UUID, globally unique, used for coloring so that the cloud can distinguish whether this value is a regular planned mission or a one-key takeoff mission |
| max_speed | Maximum speed achievable during the one-key takeoff flight | int | `{"max":15,"min":1,"unit_name":"Meters per second / m/s"}` | |
| simulate_mission | Whether to execute the mission in the simulator | struct | | Optional field, used for simulated mission debugging indoors.<br />>**Note: Before performing simulated flights, be sure to remove the propellers to prevent them from being cut off when the dock cover closes.** |
| »is_enable | Whether to enable the simulator mission | enum_int | `{"0":"Do not enable","1":"Enable"}` | Turn the simulator on or off for this mission |
| »latitude | Latitude | double | `{"max":"90.0","min":"-90.0"}` | |
| »longitude | Longitude | double | `{"max":"180.0","min":"-180.0"}` | |
| flight_safety_advance_check | Flight safety pre-check | bool | `{"0":"Closed","1":"Opened"}` | Set whether flight safety is pre-checked during one-key takeoff and wayline missions. This field is optional and defaults to 0; a value of 0 means closed, and 1 means opened. Flight safety pre-check means: before the aircraft executes a mission, it checks whether its own operating area file is consistent with the cloud; if inconsistent, it pulls the updated file; if consistent, it does nothing |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "ABDEAC21DCADDA",
    "max_speed": 12,
    "rc_lost_action": 0,
    "rth_altitude": 100,
    "security_takeoff_height": 100,
    "target_height": 100,
    "target_latitude": 12.23,
    "target_longitude": 12.32,
    "commander_mode_lost_action": 1,
    "commander_flight_height": 80,
    "flight_safety_advance_check": 1
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "takeoff_to_point"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** takeoff_to_point

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "takeoff_to_point"
}
```

## flyto Fly to Target Point

Special note: The aircraft has a minimum flight altitude (20m) safety guarantee mechanism. If the altitude of the aircraft relative to the takeoff point is lower than 20m, it will first ascend to 20m.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** fly_to_point

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| fly_to_id | Fly to target point ID | text | | |
| max_speed | Maximum speed achievable during the flyto flight | int | `{"max":15,"min":0,"unit_name":"Meters per second / m/s"}` | |
| points | List of flyto target points | array | `{"size": -, "item_type": struct}` | Only supports 1 target point |
| »latitude | Target point latitude | double | `{"max":90,"min":-90}` | Target point latitude, in degree values. Negative for south, positive for north. Precision up to 6 decimal places |
| »longitude | Target point longitude | double | `{"max":180,"min":-180}` | Target point longitude, in degree values. Positive for east, negative for west. Precision up to 6 decimal places |
| »height | Target point height | float | `{"max":10000,"min":2,"step":0.1,"unit_name":"Meters / m"}` | Target point height (ellipsoidal height), using the WGS84 model |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "fly_to_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    "max_speed": 12,
    "points": [
      {
        "height": 100,
        "latitude": 12.23,
        "longitude": 12.23
      }
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "fly_to_point"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** fly_to_point

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "fly_to_point"
}
```

## Stop the flyto Fly to Target Point Task

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** fly_to_point_stop

**Data:** null

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {},
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "fly_to_point_stop"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** fly_to_point_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "fly_to_point_stop"
}
```

## Update the flyto Target Point

During the process of `one-key takeoff` or `flyto fly to target point`, the target point can be quickly updated through this command

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** fly_to_point_update

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| max_speed | Maximum speed achievable during the live flight controls flight | int | `{"max":15,"min":1,"unit_name":"Meters per second / m/s"}` | |
| points | List of updated target points | array | `{"size": -, "item_type": struct}` | Only supports 1 target point |
| »latitude | Target point latitude | double | `{"max":90,"min":-90}` | Target point latitude, in degree values. Negative for south, positive for north. Precision up to 6 decimal places |
| »longitude | Target point longitude | double | `{"max":180,"min":-180}` | Target point longitude, in degree values. Positive for east, negative for west. Precision up to 6 decimal places |
| »height | Target point height | float | `{"max":10000,"min":2,"step":0.1,"unit_name":"Meters / m"}` | Target point height (ellipsoidal height), using the WGS84 model |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "max_speed": 12,
    "points": [
      {
        "height": 100,
        "latitude": 12.23,
        "longitude": 12.23
      }
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "fly_to_point_update"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** fly_to_point_update

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "fly_to_point_update"
}
```

## Payload control - subject zoom

The subject zoom function enables you to select and frame a target area within the camera lens's field of view. When activated, the camera screen will automatically switch to the target frame, zoom in, and rotate the gimbal.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_frame_zoom

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | |
| camera_type | Camera type | enum_string | `{"ir":"Infrared","wide":"Wide-angle","zoom":"Zoom"}` | |
| locked | Whether the relative relationship between the aircraft heading and the gimbal is locked | bool | `{"0":"Only the gimbal turns, the aircraft body does not turn","1":"Lock the aircraft heading, the gimbal and the aircraft body turn together"}` | |
| x | Upper-left coordinate x of the target frame | float | `{"max":"1","min":"0","step":"0.000001","unit_name":"None / "}` | |
| y | Upper-left coordinate y of the target frame | float | `{"max":"1","min":"0","step":"0.000001","unit_name":"None / "}` | |
| width | Width of the target frame | float | `{"max":"1","min":"0","step":"0.000001","unit_name":"None / "}` | |
| height | Height of the target frame | float | `{"max":"1","min":"0","step":"0.000001","unit_name":"None / "}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "height": 0.2,
    "locked": true,
    "payload_index": "39-0-7",
    "width": 0.2,
    "x": 0.5,
    "y": 0.5
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_frame_zoom"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_frame_zoom

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_frame_zoom"
}
```

## Payload control - Switch Camera Mode

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_mode_switch

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_mode | Camera mode | enum_int | `{"0":"Capturing","1":"Recording","2":"Smart Low-Light","3":"Panorama"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_mode": 0,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_mode_switch"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_mode_switch

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_mode_switch"
}
```

## Payload control - Start capturing

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_photo_take

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_photo_take"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_photo_take

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"in_progress":"Executing"}` | When panorama photo capturing or other persistent photo capturing is in progress, state information will be reported, indicating that further persistent progress events will follow. For details, refer to the camera_photo_take_progress event |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_photo_take"
}
```

## Payload control - Stop capturing

Command to stop capturing. Currently, only panorama mode is supported.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_photo_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_photo_stop"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_photo_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_photo_stop"
}
```

## Payload control - Start Recording

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_recording_start

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_recording_start"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_recording_start

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_recording_start"
}
```

## Payload control - Stop Recording

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_recording_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_recording_stop"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_recording_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_recording_stop"
}
```

## Payload Control—Screen Drag Control

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_screen_drag

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. See [Product Support](/en/api-integration/cloud-api/device-types) |
| locked | Whether the relative relationship between the aircraft heading and the gimbal is locked | bool | `{"false":"Only the gimbal rotates, the aircraft body does not","true":"Lock the aircraft heading; the gimbal and aircraft body rotate together"}` | |
| pitch_speed | Gimbal pitch speed | double | `{"unit_name":"degree per second / degree/s"}` | Gimbal pitch speed |
| yaw_speed | Gimbal yaw speed | double | `{"unit_name":"degree per second / degree/s"}` | Gimbal yaw speed; takes effect only when the aircraft heading is not locked |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "locked": true,
    "payload_index": "39-0-7",
    "pitch_speed": 0.1,
    "yaw_speed": 0.1
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_screen_drag"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_screen_drag

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_screen_drag"
}
```

## Payload Control—Double-tap to AIM

The double-tap AIM feature: within the field of view of the camera lens, double-tap a target point in the lens, and that target point becomes the center of the lens field of view.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_aim

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. See [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"ir":"Infrared","wide":"Wide-angle","zoom":"Zoom"}` | |
| locked | Whether the relative relationship between the aircraft heading and the gimbal is locked | bool | `{"false":"Only the gimbal rotates, the aircraft body does not","true":"Lock the aircraft heading; the gimbal and aircraft body rotate together"}` | |
| x | Target coordinate x | double | `{"max":1,"min":0}` | Target coordinate x, with the top-left corner of the lens as the coordinate origin and the horizontal direction as x |
| y | Target coordinate y | double | `{"max":1,"min":0}` | Target coordinate y, with the top-left corner of the lens as the coordinate origin and the vertical direction as y |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "locked": true,
    "payload_index": "39-0-7",
    "x": 0.5,
    "y": 0.5
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_aim"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_aim

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_aim"
}
```

## Payload Control—Zoom

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_focal_length_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. See [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"ir":"Infrared","wide":"Wide-angle","zoom":"Zoom"}` | Camera type enumeration |
| zoom_factor | Zoom factor | double | `{"max":200,"min":2}` | Zoom factor. Visible light is 2-200; infrared is 2-20 |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "payload_index": "39-0-7",
    "zoom_factor": 5
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_focal_length_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_focal_length_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_focal_length_set"
}
```

## Payload Control—Reset Gimbal

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** gimbal_reset

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Payload index | text | | Payload index, camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. See [Product Support](/en/api-integration/cloud-api/device-types) |
| reset_mode | Reset mode type | enum_int | `{"0":"Recenter","1":"Down","2":"Yaw recenter","3":"Pitch down"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7",
    "reset_mode": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "gimbal_reset"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** gimbal_reset

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "gimbal_reset"
}
```

## Payload Control—Look At

The Look At feature turns the aircraft from its current orientation toward the point specified by the actual latitude, longitude, and altitude. On the M30/M30T model, locking the aircraft heading is recommended; in gimbal-only rotation scenarios, the Look At feature behaves abnormally after the gimbal reaches its limit angle.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_look_at

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. See [Product Support](/en/api-integration/cloud-api/device-types) |
| locked | Whether the relative relationship between the aircraft heading and the gimbal is locked | bool | `{"false":"Only the gimbal rotates, the aircraft body does not","true":"Lock the aircraft heading; the gimbal and aircraft body rotate together"}` | |
| latitude | Target point latitude | double | `{"max":90,"min":-90}` | Angle value. South latitude is negative, north latitude is positive, accurate to 6 decimal places. |
| longitude | Target point longitude | double | `{"max":180,"min":-180}` | Angle value. East longitude is positive, west longitude is negative, accurate to 6 decimal places. |
| height | Target point altitude | float | `{"max":10000,"min":2,"step":0.1,"unit_name":"meter / m"}` | Target point altitude (ellipsoidal height) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "height": 100,
    "latitude": 12.23,
    "locked": true,
    "longitude": 12.23,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_look_at"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_look_at

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_look_at"
}
```

## Payload Control—Split Screen

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_screen_split

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. See [Product Support](/en/api-integration/cloud-api/device-types) |
| enable | Whether to enable split screen | bool | | Turn split screen on or off |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "enable": true,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_screen_split"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_screen_split

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_screen_split"
}
```

## Payload control - Photo storage settings

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** photo_storage_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| photo_storage_settings | Photo storage settings collection | array | `{"size": -, "item_type": enum_string}` | `Photo storage type {current, vision, ir}; multiple selections allowed` |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7",
    "photo_storage_settings": [
      "current",
      "wide",
      "zoom",
      "ir"
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "photo_storage_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** photo_storage_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "photo_storage_set"
}
```

## Payload control - Video storage settings

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** video_storage_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| video_storage_settings | Video storage settings collection | array | `{"size": -, "item_type": enum_string}` | `Video storage type {current, wide, zoom, ir}; multiple selections allowed` |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7",
    "video_storage_settings": [
      "current",
      "wide",
      "zoom",
      "ir"
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "video_storage_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** video_storage_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "video_storage_set"
}
```

## Payload control - Camera exposure mode settings

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_exposure_mode_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle","zoom":"Zoom"}` | Camera type enumeration |
| exposure_mode | Exposure mode | enum_int | `{"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "exposure_mode": 1,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_exposure_mode_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_exposure_mode_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_exposure_mode_set"
}
```

## Payload control - Camera exposure value adjustment

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_exposure_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle","zoom":"Zoom"}` | |
| exposure_value | Exposure value | enum_string | `{"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "exposure_value": 5,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_exposure_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_exposure_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_exposure_set"
}
```

## Payload control - Camera focus mode settings

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_focus_mode_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle","zoom":"Zoom"}` | Camera type enumeration. Note: The Matrice 30 Series aircraft only supports configuring this parameter under the zoom lens |
| focus_mode | Focus mode | enum_int | `{"0":"MF","1":"AFS","2":"AFC"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "focus_mode": 1,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_focus_mode_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_focus_mode_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_focus_mode_set"
}
```

## Payload control - Camera focus value settings

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_focus_value_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle","zoom":"Zoom"}` | Camera type enumeration. Note: The Matrice 30 Series aircraft only supports configuring this parameter under the zoom lens |
| focus_value | Focus value | int | | Focus value. For the range, refer to the aircraft thing model properties zoom_max_focus_value and zoom_min_focus_value |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "focus_value": 5,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_focus_value_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_focus_value_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_focus_value_set"
}
```

## Payload Control - Point Focus

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** camera_point_focus_action

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enum | text | | Camera enum value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle","zoom":"Zoom"}` | Camera type enum. Note: Matrice 30 Series aircraft only support configuring this parameter under the zoom lens |
| x | Focus point coordinate x | double | `{"max":1,"min":0}` | The top-left corner of the lens is the coordinate origin; the horizontal direction is x |
| y | Focus point coordinate y | double | `{"max":1,"min":0}` | The top-left corner of the lens is the coordinate origin; the vertical direction is y |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "camera_type": "zoom",
    "payload_index": "39-0-7",
    "x": 0.5,
    "y": 0.5
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_point_focus_action"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** camera_point_focus_action

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "camera_point_focus_action"
}
```

## Payload Control - Infrared Temperature Measurement Mode Setting

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** ir_metering_mode_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enum | text | | Camera enum value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| mode | Temperature measurement mode | enum_int | `{"0":"Disable temperature measurement","1":"Spot temperature measurement","2":"Area temperature measurement"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "mode": 1,
    "payload_index": "39-0-7"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "ir_metering_mode_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** ir_metering_mode_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "ir_metering_mode_set"
}
```

## Payload Control - Infrared Temperature Measurement Point Setting

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** ir_metering_point_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enum | text | | Camera enum value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| x | Temperature measurement point coordinate x | double | `{"max":1,"min":0}` | The top-left corner of the lens is the coordinate origin; the horizontal direction is x |
| y | Temperature measurement point coordinate y | double | `{"max":1,"min":0}` | The top-left corner of the lens is the coordinate origin; the vertical direction is y |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "payload_index": "39-0-7",
    "x": 0.5,
    "y": 0.5
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "ir_metering_point_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** ir_metering_point_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "ir_metering_point_set"
}
```

## Payload Control - Infrared Temperature Measurement Area Setting

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** ir_metering_area_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| payload_index | Camera enum | text | | Camera enum value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}`. Refer to [Product Support](/en/api-integration/cloud-api/device-types) |
| x | Top-left corner coordinate x of the temperature measurement area | double | `{"max":1,"min":0}` | The top-left corner of the lens is the coordinate origin; the horizontal direction is x |
| y | Top-left corner coordinate y of the temperature measurement area | double | `{"max":1,"min":0}` | The top-left corner of the lens is the coordinate origin; the vertical direction is y |
| width | Width of the temperature measurement area | double | `{"max":1,"min":0}` | |
| height | Height of the temperature measurement area | double | `{"max":1,"min":0}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "height": 0.5,
    "payload_index": "39-0-7",
    "width": 0.5,
    "x": 0.5,
    "y": 0.5
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "ir_metering_area_set"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** ir_metering_area_set

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "ir_metering_area_set"
}
```

# DRC

## DRC - Stick Control

After establishing the DRC link, you can control the aircraft and gimbal attitude through the "DRC - Stick Control" command. The send frequency must be maintained at 5-10 Hz in order to control the aircraft's movement relatively precisely. This protocol has no acknowledgment mechanism.

**Topic:** thing/product/`{gateway_sn}`/drc/down

**Direction:** down

**Method:** stick_control

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| roll | Roll channel | int | `{"max":"1684","min":"364","unit_name":""}` | Corresponds to channel A of the remote controller, controlling aircraft roll (manifested as left-right translation). Stick value range [1024±660], with 1024 as the median (no action); increasing the value indicates tilting right, decreasing indicates tilting left. |
| pitch | Pitch channel | int | `{"max":"1684","min":"364","unit_name":""}` | Corresponds to channel E of the remote controller, controlling aircraft pitch (manifested as forward-backward translation). Stick value range [1024±660]**, with 1024 as the median (no action); increasing the value indicates pitching forward (diving), decreasing indicates pitching backward (nose up). |
| throttle | Throttle channel | int | `{"max":"1684","min":"364","unit_name":""}` | Corresponds to channel T of the remote controller, controlling aircraft ascent and descent. Stick value range [1024±660], with 1024 as the hover state; increasing the value indicates ascending, decreasing indicates descending. |
| yaw | Yaw channel | int | `{"max":"1684","min":"364","unit_name":""}` | Corresponds to channel R of the remote controller, controlling aircraft yaw (manifested as left-right rotation). Stick value range [1024±660], with 1024 as the median (no action); increasing the value indicates clockwise rotation, decreasing indicates counterclockwise rotation. |

**Example:**

```json
{
  "seq": 1,
  "method": "stick_control",
  "data": {
    "roll": 1024,
    "pitch": 1024,
    "throttle": 1024,
    "yaw": 1024,
    "gimbal_pitch": 1024
  }
}
```

## DRC - Flight Control (Deprecated)

**Note: This protocol is no longer maintained. Use "DRC - Stick Control" for better response performance.**

After entering Live Flight Controls mode, this command can be used to control the aircraft's navigation direction and speed. The send frequency must be kept within **5-10 Hz** so the device can control speed changes and direction relatively precisely.

**Topic:** thing/product/`{gateway_sn}`/drc/down

**Direction:** down

**Method:** drone_control

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| seq | Command sequence number | int | | An incrementing sequence number that ensures commands are executed in order. If the x, y, h, or w parameters change, seq must start incrementing from 0. |
| x | Speed in the forward/backward direction | double | `{"max":17,"min":-17,"unit_name":"meters per second / m/s"}` | Maximum forward/backward speed; a negative value indicates moving backward |
| y | Speed in the left/right direction | double | `{"max":17,"min":-17,"unit_name":"meters per second / m/s"}` | Maximum left/right speed; a negative value indicates moving left |
| h | Speed in the up/down direction | double | `{"max":5,"min":-4,"unit_name":"meters per second / m/s"}` | Maximum up/down speed; a negative value indicates moving down |
| w | Aircraft body angular velocity | double | `{"max":90,"min":-90,"unit_name":"degrees per second / degree/s"}` | Maximum clockwise/counterclockwise angular velocity; a negative value indicates counterclockwise rotation |

**Example:**

```json
{
  "data": {
    "h": 2.76,
    "seq": 1,
    "w": 2.86,
    "x": 2.34,
    "y": -2.45
  },
  "method": "drone_control"
}
```

**Topic:** thing/product/`{gateway_sn}`/drc/up

**Direction:** up

**Method:** drone_control

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | If the send is successful, there will be no return code. Non-zero indicates an error. Exception cases: no flight control authority, no virtual stick permission, incorrect data packet sequence number |
| output | Output | struct | | |
| »seq | Command sequence number | int | | An incrementing sequence number that ensures commands are executed in order |

**Example:**

```json
{
  "data": {
    "output": {
      "seq": -1
    },
    "result": 319033
  },
  "method": "drone_control"
}
```

## DRC-Aircraft emergency stop

**Topic:** thing/product/`{gateway_sn}`/drc/down

**Direction:** down

**Method:** drone_emergency_stop

**Data:** null

**Example:**

```json
{
  "data": {},
  "method": "drone_emergency_stop"
}
```

**Topic:** thing/product/`{gateway_sn}`/drc/up

**Direction:** up

**Method:** drone_emergency_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

**Example:**

```json
{
  "data": {
    "result": 0
  },
  "method": "drone_emergency_stop"
}
```

## DRC-Heartbeat

The seq at the same level as data is an incrementing sequence number that guarantees commands are executed in order.

**Topic:** thing/product/`{gateway_sn}`/drc/down

**Direction:** down

**Method:** heart_beat

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| seq | [Deprecated] Command sequence number | int | | Incrementing sequence number that guarantees commands are executed in order |
| timestamp | Heartbeat send timestamp | int | `{"unit_name":"millisecond / ms"}` | The application side can use the heartbeat protocol to determine whether the DRC link is active. If no heartbeat response is received within a certain period, the DRC link can be considered abnormal and a retry can be initiated. If the device does not receive a heartbeat protocol sent by the application side for more than 1 minute, the device will consider the DRC link idle and exit the DRC link. |

**Example:**

```json
{
  "data": {
    "timestamp": 1670415891013
  },
  "method": "heart_beat",
  "seq": 1
}
```

**Topic:** thing/product/`{gateway_sn}`/drc/up

**Direction:** up

**Method:** heart_beat

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| seq | [Deprecated] Command sequence number | int | | Incrementing sequence number that guarantees commands are executed in order |
| timestamp | Heartbeat send timestamp | int | `{"unit_name":"millisecond / ms"}` | The application side can use the heartbeat protocol to determine whether the DRC link is active. If no heartbeat response is received within a certain period, the DRC link can be considered abnormal and a retry can be initiated. If the device does not receive a heartbeat protocol sent by the application side for more than 1 minute, the device will consider the DRC link idle and exit the DRC link. |

**Example:**

```json
{
  "data": {
    "timestamp": 1670415891013
  },
  "method": "heart_beat",
  "seq": 1
}
```

## DRC-Obstacle avoidance information report

**Topic:** thing/product/`{gateway_sn}`/drc/up

**Direction:** up

**Method:** hsi_info_push

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| up_distance | Distance of upward obstacle | int | `{"unit_name":"millimeter / mm"}` | |
| down_distance | Distance of downward obstacle | int | `{"unit_name":"millimeter / mm"}` | |
| up_enable | State of upward obstacle sensing switch | bool | | |
| up_work | Working state of upward obstacle sensing | bool | | |
| down_enable | State of downward obstacle sensing switch | bool | | |
| down_work | Working state of downward obstacle sensing | bool | | |
| left_enable | State of leftward obstacle sensing switch | bool | | |
| left_work | Working state of leftward obstacle sensing | bool | | |
| right_enable | State of rightward obstacle sensing switch | bool | | |
| right_work | Working state of rightward obstacle sensing | bool | | |
| front_enable | State of forward obstacle sensing switch | bool | | |
| front_work | Working state of forward obstacle sensing | bool | | |
| back_enable | State of backward obstacle sensing switch | bool | | |
| back_work | Working state of backward obstacle sensing | bool | | |
| vertical_enable | State of vertical obstacle sensing switch | bool | | |
| vertical_work | Working state of vertical obstacle sensing | bool | | |
| horizontal_enable | State of horizontal obstacle sensing switch | bool | | |
| horizontal_work | Working state of horizontal obstacle sensing | bool | | |
| around_distances | Surrounding obstacle distance | array | `{"size": 360, "item_type": int}` | Horizontal observation points distributed over the angular range [0,360), where 0 corresponds to straight ahead of the aircraft heading, distributed clockwise; for example, 0 degrees is straight ahead of the aircraft heading and 90 degrees is directly to the right of the aircraft. Each value indicates the distance between the obstacle at that angle and the aircraft; 60000 means there is no obstacle at that angle. If an empty array is reported, it means there are no obstacles at any angle. If an array of 4 values is reported, it means the data is TOF obstacle-sensing data, reported when infrared obstacle sensing fails, such as in nighttime scenarios. |

**Example:**

```json
{
  "method": "hsi_info_push",
  "timestamp": 1670415891013,
  "data": {
    "up_distance": 10,
    "down_distance": 10,
    "around_distance": [
      10,
      8,
      9,
      16,
      2
    ],
    "up_enable": true,
    "up_work": true,
    "down_enable": true,
    "down_work": true,
    "left_enable": true,
    "left_work": true,
    "right_enable": true,
    "right_work": true,
    "front_enable": true,
    "front_work": true,
    "back_enable": true,
    "back_work": true,
    "vertical_enable": true,
    "vertical_work": true,
    "horizontal_enable": true,
    "horizontal_work": true
  }
}
```

## DRC-Image transmission link delay information report

**Topic:** thing/product/`{gateway_sn}`/drc/up

**Direction:** up

**Method:** delay_info_push

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| sdr_cmd_delay | Transmission protocol command link delay | int | `{"unit_name":"millisecond / ms"}` | Transmission protocol command link delay |
| liveview_delay_list | Video stream transmission delay | array | `{"size": -, "item_type": struct}` | Video stream transmission delay, multi-channel code stream |
| »video_id | Code stream index | text | | Code stream index |
| »liveview_delay_time | Code stream delay | int | `{"unit_name":"millisecond / ms"}` | Code stream delay |

**Example:**

```json
{
  "data": {
    "liveview_delay_list": [
      {
        "liveview_delay_time": 60,
        "video_id": "1581BN210004555439234/52-0-0/normal-0"
      },
      {
        "liveview_delay_time": 80,
        "video_id": "1581BN210004555439234/53-0-0/normal-0"
      }
    ],
    "sdr_cmd_delay": 10
  },
  "timestamp": 1670415891013
}
```

## DRC-High-frequency osd information report

**Topic:** thing/product/`{gateway_sn}`/drc/up

**Direction:** up

**Method:** osd_info_push

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| attitude_head | Head angle of aircraft attitude | double | `{"unit_name":"degree / °"}` | Head angle of aircraft attitude |
| latitude | Aircraft latitude | double | `{"unit_name":"degree / °"}` | |
| longitude | Aircraft longitude | double | `{"unit_name":"degree / °"}` | |
| height | Aircraft altitude | double | `{"unit_name":"degree / °"}` | Aircraft altitude above sea level |
| speed_x | Current speed of the aircraft in the X coordinate direction | double | `{"unit_name":"meter per second / m/s"}` | Current speed of the aircraft in the X coordinate direction |
| speed_y | Current speed of the aircraft in the Y coordinate direction | double | `{"unit_name":"meter per second / m/s"}` | Current speed of the aircraft in the Y coordinate direction |
| speed_z | Current speed of the aircraft in the Z coordinate direction | double | `{"unit_name":"meter per second / m/s"}` | |
| gimbal_pitch | Gimbal pitch angle | double | `{"unit_name":"degree / °"}` | |
| gimbal_roll | Gimbal roll angle | double | `{"unit_name":"degree / °"}` | |
| gimbal_yaw | Gimbal yaw angle | double | `{"unit_name":"degree / °"}` | |

**Example:**

```json
{
  "data": {
    "attitude_head": 60,
    "gimbal_pitch": 60,
    "gimbal_roll": 60,
    "gimbal_yaw": 60,
    "height": 10,
    "latitude": 10,
    "longitude": 10,
    "speed_x": 10,
    "speed_y": 10,
    "speed_z": 10
  },
  "timestamp": 1670415891013
}
```
