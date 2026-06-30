---
sidebar_label: Wayline Management
sidebar_position: 6
---

# Wayline Management

# Event

## Return Home Information

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** return_home_info

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| planned_path_points | List of planned trajectory points | array | `{"size": -, "item_type": struct}` | |
| »latitude | Latitude of the trajectory point (angle value) | double | `{"max":90,"min":-90}` | Trajectory point latitude in degrees. Negative for south, positive for north. Accurate to 6 decimal places |
| »longitude | Longitude of the trajectory point (angle value) | double | `{"max":180,"min":-180}` | Trajectory point longitude in degrees. Positive for east, negative for west. Accurate to 6 decimal places |
| »height | Trajectory point height | float | `{"max":"","min":"","step":0.1,"unit_name":"meter / m"}` | Ellipsoid height of the trajectory point |
| last_point_type | The type of the last point in the return path | enum_int | `{"0":"The last point of the trajectory is above the return point","1":"The last point of the trajectory is not above the return point"}` | |
| flight_id | Task ID | text | | |
| home_dock_sn | Home point Dock SN | text | | SN of the currently selected Dock home point in a multi-dock task; not applicable in standard tasks |
| multi_dock_home_info | Dock return information of the multi-dock task | array | `{"size": 2, "item_type": struct}` | Not applicable in standard tasks |
| »sn | Dock SN | text | | |
| »plan_status | Path planning state | enum_int | `{"0":"Planning failed or in progress","1":"Path planning unreachable","2":"Path planning unreachable due to insufficient battery level","3":"Destination reachable"}` | |
| »estimated_battery_consumption | Estimated battery consumption | int | `{"max":"100","min":"0","step":"1","unit_name":null}` | |
| »home_distance | Home point distance | float | `{"unit_name":"meter / m"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    "home_dock_sn": "6QCDL870020164",
    "last_point_type": 0,
    "multi_dock_home_info": [
      {
        "estimated_battery_consumption": 30,
        "home_distance": 298.3277282714844,
        "plan_status": 3,
        "sn": "6QCDL870020164"
      },
      {
        "estimated_battery_consumption": 30,
        "home_distance": 298.289794921875,
        "plan_status": 3,
        "sn": "6QCDL820020041"
      }
    ],
    "planned_path_points": [
      {
        "height": 60.285194396972656,
        "latitude": 22.755022128112614,
        "longitude": 114.89828051067889
      },
      {
        "height": 88.22719192504883,
        "latitude": 22.755022128112614,
        "longitude": 114.89828051067889
      },
      {
        "height": 88.22719192504883,
        "latitude": 22.75721542071551,
        "longitude": 114.89853624254465
      },
      {
        "height": 88.22719192504883,
        "latitude": 22.757445462048054,
        "longitude": 114.89860304631293
      },
      {
        "height": 78.30619430541992,
        "latitude": 22.757531544193625,
        "longitude": 114.89862810820341
      }
    ]
  },
  "gateway": "6QCDL820020041",
  "method": "return_home_info",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1720000266772
}
```

## Task Ready Notification

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** flighttask_ready

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_ids | Plan ID | array | `{"size": -, "item_type": text}` | Collection of IDs for tasks that currently meet the task-ready conditions |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_ids": [
      "aaaaaaa",
      "bbbbbbb"
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flighttask_ready"
}
```

## Report Wayline Mission Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** flighttask_progress

**Data:**

| Column | Name | Type | constraint | Description                         |
| --- | --- | --- | --- |-------------------------------------|
| ext | Extended content | struct | |                                     |
| »current_waypoint_index | Current waypoint number being executed | int | |                                     |
| »wayline_mission_state | Wayline task state | enum_int | `{"0":"Disconnected","1":"This waypoint is not supported","2":"Wayline preparation state. It can upload files and execute existing files","3":"Wayline file uploading","4":"Trigger start command. The aircraft triggers logic such as reading the wayline. The task has not started yet and is in a preparation state","5":"Entering the wayline, heading to the first waypoint","6":"Wayline execution","7":"Wayline interrupted. Triggered conditions: 1. User actively pauses; 2. Flight controller abnormality","8":"Wayline recovery","9":"Wayline stopped"}` |                                     |
| »media_count | Number of media files generated by this wayline mission execution | int | |                                     |
| »track_id | Track ID | text | |                                     |
| »flight_id | Task ID | text | |                                     |
| »break_point | Wayline breakpoint information | struct | | Optional field, used to inform the cloud of the breakpoint information for this wayline mission               |
| »»index | Breakpoint sequence number | int | |                                     |
| »»state | Breakpoint state | enum_int | `{"0":"On the flight segment","1":"On the waypoint"}` |                                     |
| »»progress | Current flight segment progress | float | `{"max":"1.0","min":"0","step":"","unit_name":null}` |                                     |
| »»wayline_id | Wayline ID | int | |                                     |
| »»break_reason | Interruption reason | enum_int | `{"0":"No exception","1":"Mission ID does not exist; this wayline mission was not executed","2":"Uncommon error; contact technical support","4":"When requesting to start/resume the wayline mission, the wayline file failed to load; try uploading the file again to start, or contact technical support","5":"When requesting breakpoint information, the breakpoint file query failed. When requesting to resume the wayline mission, parsing the breakpoint type failed","6":"When requesting to start/end the wayline mission, the cmd parameter is incorrect, or the command in the protocol request is incorrect. When requesting to resume the wayline mission, parsing the breakpoint type failed","7":"When requesting to start/resume the wayline mission, parsing the wpmz file timed out; please retry","257":"The wayline has already started and cannot be started again","258":"The wayline cannot be interrupted in this state; the wayline can only be paused while it is executing","259":"The wayline has not started and cannot be ended","261":"Flight task conflict; cannot acquire control of the aircraft; the wayline cannot be started during landing or return-to-home","262":"The wayline cannot be resumed in this state; the wayline can only be resumed while it is paused","513":"The aircraft exceeds the altitude limit","514":"The aircraft exceeds the distance limit","516":"The aircraft triggered the minimum altitude limit","517":"The aircraft triggered obstacle avoidance","518":"Poor RTK signal","519":"Approaching the boundary of a no-fly zone","521":"Exceeds the altitude limit of the Dock restricted flight zone","522":"Wayline takeoff request failed","523":"Takeoff task execution failed","524":"Wayline mission request failed","526":"Request for wayline RTK convergence task failed","527":"Wayline RTK convergence task failed to run","529":"Obstacles or a no-fly zone make the wayline unreachable","769":"Weak GPS signal","770":"The remote controller gear is not in N gear","771":"The return point has not been refreshed","772":"Current battery level is too low to start the task","773":"Low-battery return-to-home interrupted the wayline","775":"The remote controller lost connection with the aircraft","778":"The aircraft started its propellers on the ground; the wayline cannot be started","779":"During real-time terrain following, the camera state is abnormal (e.g., too bright, too dark, or inconsistent brightness on the two sides)","780":"The terrain-following altitude set by the user for real-time terrain following is invalid (greater than 200 m or less than 30 m)","781":"An error occurred in the global map computation during real-time terrain following","784":"Strong-wind return-to-home interrupted the wayline","1281":"User exited","1282":"User interrupted","1283":"User triggered return-to-home","1539":"Start information (waypoint index or progress) is incorrect","1540":"An unsupported coordinate system was used","1541":"An unsupported altitude mode was used","1542":"An unsupported transition wayline mode was used","1543":"An unsupported yaw mode was used","1544":"An unsupported yaw direction reversal mode was used","1545":"An unsupported waypoint type was used","1546":"The first and last points cannot use the coordinated turn type","1547":"The wayline global speed is out of the reasonable range","1548":"Abnormal number of waypoints","1549":"Abnormal latitude/longitude data","1550":"Abnormal turn intercept","1551":"The flight segment maximum speed is out of the reasonable range","1552":"The flight segment target speed is out of the reasonable range","1553":"The waypoint yaw angle is out of the reasonable range","1555":"Incorrect mission_id input for breakpoint resume","1556":"Incorrect progress information input for breakpoint resume","1557":"Abnormal task state for breakpoint resume","1558":"Incorrect waypoint index information input for breakpoint resume","1559":"Incorrect latitude/longitude information input for breakpoint resume","1560":"Incorrect waypoint yaw input for breakpoint resume","1561":"Incorrect flag setting for breakpoint resume","1563":"Wayline generation failed","1564":"Wayline execution failed","1565":"Wayline obstacle-avoidance emergency stop","1588":"Unrecognized action type","1595":"Action ID cannot be duplicated","1598":"Action ID value cannot be 65535","1602":"The number of action groups is out of the reasonable range","1603":"Incorrect effective range of the action group","1606":"Action index out of the reasonable range during breakpoint resume","1608":"Abnormal trigger execution result in the breakpoint information","1609":"Action group ID information cannot be duplicated during breakpoint resume","1610":"Action group positions cannot be duplicated during breakpoint resume","1611":"Action group position out of the reasonable range during breakpoint resume","1612":"The action ID is not in the breakpoint information during resume","1613":"The action state cannot be changed to interrupted during breakpoint resume","1614":"Incorrect breakpoint information caused the resume to fail","1634":"Unrecognized action type","1649":"Unrecognized trigger type","65534":"Unknown internal error","65535":"Unknown internal error"}` |                                     |
| »»latitude | Breakpoint latitude | float | `{"max":"90","min":"-90","step":"","unit_name":"degree / °"}` |                                     |
| »»longitude | Breakpoint longitude | float | `{"max":"180","min":"-180","step":"","unit_name":"degree / °"}` |                                     |
| »»height | Breakpoint height relative to the Earth ellipsoid surface | float | `{"unit_name":"meter / m"}` |                                     |
| »»attitude_head | Breakpoint yaw axis angle | float | |                                     |
| »wayline_id | ID of the wayline currently in operation | int | | Includes the transition phase of entering the wayline; for example, 0 indicates that the aircraft is entering or already executing the first wayline |
| status | Task status | enum_string | `{"canceled":"Canceled or terminated","failed":"Failed","in_progress":"In progress","ok":"Executed successfully","partially_done":"Partially completed","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timed out"}` |                                     |
| progress | Progress | struct | |                                     |
| »current_step | Execution step | enum_int | `{"0":"Idle","7":"Opening the dock cover","9":"Waiting for the aircraft to be ready","19":"Closing the dock cover","25":"Waiting for landing","28":"Clamping the push rods","50":"Task completed","99":"Task failed"}` |                                     |
| »percent | Progress value | int | `{"max":"100","min":"0","step":"1"}` |                                     |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "ext": {
        "break_point": {
          "attitude_head": 30,
          "break_reason": 1,
          "height": 100.23,
          "index": 1,
          "latitude": 23.4,
          "longitude": 113.99,
          "progress": 0.34,
          "state": 0,
          "wayline_id": 0
        },
        "current_waypoint_index": 3,
        "flight_id": "flight_id",
        "media_count": 6,
        "track_id": "track_id",
        "wayline_id": 0,
        "wayline_mission_state": 9
      },
      "progress": {
        "current_step": 50,
        "percent": 100
      },
      "status": "ok"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flighttask_progress"
}
```

## Device Notification of Return to Home Exit State

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** device_exit_homing_notify

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| sn | Dock SN | text | `{}` | |
| action | Exit return notification message type | enum_int | `{"0":"Exit Return to Home Exit State","1":"Enter Return to Home Exit State"}` | Entering the Return to Home Exit State means that while the Dock is in return-to-home mode, the return-to-home process was exited due to the reason shown in the `reason` field. Similarly, exiting the Return to Home Exit State means that the Dock stopped this process of exiting return-to-home. |
| reason | Exit return reason | enum_int | `{"0":"Throttle added to the joystick","1":"Joystick interval added","2":"Behavior tree initialization failed","3":"Surrounded by obstacles","4":"Triggered flight restriction","5":"Obstacle too close","6":"No GPS signal","7":"GPS and VIO position output flags are false","8":"Large position error between GPS and VIO fusion","9":"Short-distance backtracking","10":"Return triggered at close range"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "action": 1,
    "reason": "0",
    "sn": "Dock SN"
  },
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp:": 1654070968655,
  "method": "device_exit_homing_notify"
}
```

## In-Flight Wayline Status Report

**Method:** `in_flight_wayline_progress`

**Topic:** `thing/product/{gateway_sn}/events`

**Direction:** up

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| in_flight_wayline_id | Wayline mission ID | string | | Unique identifier of the in-flight wayline mission |
| progress | Task progress | object | | Task progress information |
| progress.percent | Completion percentage | int | `{min: 0, max: 100}` | Task completion percentage |
| status | Task status code | int | | **Status code description:** `status`: `1`: Uploading file (`wayline_uploading`) `2`: File uploaded successfully (`wayline_uploaded`) `3`: Executing task (`wayline_progress`) `4`: Task paused (`wayline_paused`) `5`: Task canceled (`wayline_cancel`) `6`: Task succeeded (`wayline_ok`) `7`: Task failed (`wayline_failed`) Error code when the task fails `8`: Task timed out |
| result | Error reason code | int | | |
| way_point_index | Current waypoint index | int | | Index of the waypoint currently being executed |

**Example:**

```json
{
  "in_flight_wayline_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "progress": {
    "percent": 100
  },
  "status": 0,
  "result": 0,
  "way_point_index": 0
}
```

# Service

## Execute Task

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_execute

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Plan ID | text | | |
| multi_dock_task | Multi-dock task parameters | struct | | |
| »wireless_link_topo | Wireless link topology | struct | | |
| »»secret_code | Encryption code | array | `{"size": 28, "item_type": int}` | Obtained from the aircraft device properties |
| »»center_node | Aircraft frequency information | struct | | Obtained from the aircraft device properties |
| »»»sdr_id | Scrambling code information | int | | |
| »»»sn | Device SN | text | | |
| »»leaf_nodes | Dock or remote controller frequency information; assembles the corresponding Dock properties for executing the multi-dock task | array | `{"size": -, "item_type": struct}` | |
| »»»sdr_id | Scrambling code information | int | | |
| »»»sn | Device SN | text | | |
| »»»control_source_index | Control source index | int | `{"max":"2","min":"1","step":"1","unit_name":"None / "}` | |
| »dock_infos | Dock information | array | `{"size": 2, "item_type": struct}` | Dock information for this multi-dock task; except for dock_type which must be specified, all other fields can be obtained directly from the device property reports |
| »»dock_type | Dock role in the multi-dock task | enum_string | `{"landing":"Landing","takeoff":"Takeoff Dock"}` | |
| »»latitude | Latitude | double | `{"max":"90","min":"-90","step":"0.01"}` | Dock latitude, obtainable from the Dock device properties |
| »»longitude | Longitude | double | `{"max":"180","min":"-180","step":"0.01"}` | Dock longitude, obtainable from the Dock device properties |
| »»height | Ellipsoid height | double | `{"unit_name":"meter / m"}` | Dock height, obtainable from the Dock device properties |
| »»heading | Dock heading angle | double | `{"max":"180","min":"-180","step":"","unit_name":"degree / °"}` | Dock heading angle, obtainable from the Dock device properties |
| »»home_position_is_valid | Dock home point validity | enum_int | `{"0":"Invalid","1":"Valid"}` | Obtainable from the Dock device properties |
| »»index | Dock task unique identifier | int | `{"max":"31","min":"1"}` | Number assigned to the Dock; it must remain unique within a single task and preferably be used consistently over the long term |
| »»sn | Dock SN | text | | |
| »»rtcm_info | Dock RTK calibration source | struct | | |
| »»»mount_point | Network RTK mount point information | text | | |
| »»»port | Network port information | text | | |
| »»»host | Network host information | text | | |
| »»»rtcm_device_type | Device type | enum_int | `{"1":"Dock"}` | |
| »»»source_type | Calibration type | enum_int | `{"0":"Not calibrated","1":"Auto-convergence calibration","2":"Manual calibration","3":"Network RTK calibration"}` | |
| »»alternate_land_point | Alternate landing point | struct | | |
| »»»longitude | Longitude | float | `{}` | |
| »»»latitude | Latitude | float | `{}` | |
| »»»height | Ellipsoid height | float | `{}` | |
| »»»safe_land_height | Safe altitude (alternate landing transfer altitude) | float | `{}` | |
| »»»is_configured | Whether the alternate landing point is set | enum_int | `{"0":"Not set","1":"Already set"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "aee739dc-f1cc-47d5-beaa-64d327f2d797",
    "multi_dock_task": {
      "dock_infos": [
        {
          "alternate_land_point": {
            "height": 0,
            "is_configured": 1,
            "latitude": 37.348792490321514,
            "longitude": 116.52867090782102,
            "safe_land_height": 30
          },
          "dock_type": "takeoff",
          "heading": -78.7066650390625,
          "height": 30.81130027770996,
          "home_position_is_valid": 1,
          "index": 1,
          "latitude": 37.3487657248638,
          "longitude": 116.52893686422743,
          "rtcm_info": {
            "host": "120.253.226.97",
            "mount_point": "RTCM33_GRCEJ",
            "port": "8002",
            "rtcm_device_type": 1,
            "source_type": 3
          },
          "sn": "7CTDM5900B3X1B"
        },
        {
          "alternate_land_point": {
            "height": 0,
            "is_configured": 1,
            "latitude": 37.336024417709915,
            "longitude": 116.554075635852,
            "safe_land_height": 30
          },
          "dock_type": "landing",
          "heading": -69.79183197021484,
          "height": 32.31420135498047,
          "home_position_is_valid": 1,
          "index": 2,
          "latitude": 37.33605462094235,
          "longitude": 116.55416413516038,
          "rtcm_info": {
            "host": "120.253.226.97",
            "mount_point": "RTCM33_GRCEJ",
            "port": "8002",
            "rtcm_device_type": 1,
            "source_type": 3
          },
          "sn": "7CTDM5900BK07M"
        }
      ],
      "wireless_link_topo": {
        "center_node": {
          "sdr_id": 933765657,
          "sn": "1581F6Q8D245P00EKS87"
        },
        "leaf_nodes": [
          {
            "control_source_index": 1,
            "sdr_id": 920128532,
            "sn": "7CTDM5900B3X1B"
          },
          {
            "control_source_index": 2,
            "sdr_id": 911741468,
            "sn": "7CTDM5900BK07M"
          }
        ],
        "secret_code": [
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          123,
          114,
          19,
          203,
          192,
          100,
          244,
          160,
          146,
          228,
          196,
          213,
          105,
          220,
          176,
          147,
          87,
          182,
          90,
          210
        ]
      }
    }
  },
  "method": "flighttask_execute",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1720095314016
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_execute

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
  "timestamp": 1234567890123,
  "method": "flighttask_execute"
}
```

## Designate home point for returning

In a multi-dock task, used when a specific Dock needs to be designated as the return destination

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** return_specific_home

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| home_dock_sn | Target Dock SN for returning | text | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "home_dock_sn": "xxxxxxxx"
  },
  "method": "return_specific_home",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** return_specific_home

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
  "method": "return_specific_home",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1695634358385
}
```

## Task termination

In a multi-dock task, after one Dock reports that the task has ended, this command must be issued to the other Dock to end the task

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_stop

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Task id | text | | |
| reason | Termination reason | enum_int | `{"0":"Normal termination","1":"The state machine of the other dock is abnormal"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    "reason": 0
  },
  "method": "flighttask_stop",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_stop

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
  "method": "flighttask_stop",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1695634358385
}
```

## Cancel return

After returning home, the aircraft will exit the wayline mode. If return is canceled at this point, the aircraft will hover

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** return_home_cancel

**Data:** null

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {},
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "return_home_cancel"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** return_home_cancel

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
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "return_home_cancel"
}
```

## One-key return

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** return_home

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** return_home

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Wayline recovery

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_recovery

**Data:** null

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {},
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flighttask_recovery"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_recovery

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
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flighttask_recovery"
}
```

## Paused the wayline

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_pause

**Data:** null

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {},
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flighttask_pause"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_pause

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
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flighttask_pause"
}
```

## Cancel mission

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_undo

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_ids | Plan ID | array | `{"size": -, "item_type": text}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_ids": [
      "aaaaaaa",
      "bbbbbbb"
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123,
  "method": "flighttask_undo"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_undo

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
  "timestamp": 1234567890123,
  "method": "flighttask_undo"
}
```
## Issue a mission

If the user's cloud service cannot access the external network (the WAN), the `configuration update` function must be implemented to issue the URL of an NTP service that the cloud service can access, so that clock synchronization can be achieved. Otherwise, the wayline mission cannot run properly.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_prepare

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Plan ID | text | | |
| execute_time | Start execution time | int | `{"length":13}` | The task start time as a millisecond timestamp. Optional field. Required when `task_type` is 0 or 1, and not required when it is 2. |
| task_type | Mission type | enum_int | `{"0":"Immediate mission","1":"Timed mission","2":"Conditional mission"}` | Both immediate missions and timed missions specify their execution time via execute_time; conditional missions support the ready_conditions field to specify task readiness conditions, and the device can execute the mission once the readiness conditions are met within the specified time period; immediate missions have the highest media upload priority, while timed missions and conditional missions have the same media upload priority. |
| file | Wayline file object | struct | | |
| »url | File URL | text | | |
| »fingerprint | File signature | text | | File content MD5 signature |
| ready_conditions | Mission readiness conditions | struct | | Optional field. Required for conditional missions (i.e., when `task_type` is 2); this field is ignored for other types of missions. After a conditional mission is issued, the device periodically checks whether all `ready_conditions` are met. If they are all satisfied, a `flighttask_ready` event notification is triggered. Additionally, when the device receives the `flighttask_execute` command, it also checks whether all the mission's `ready_conditions` have been met. |
| »battery_capacity | Battery capacity | int | | The aircraft battery level percentage threshold for an executable mission. The aircraft battery level when the mission starts must be greater than `battery_capacity`. |
| »begin_time | Start time of the mission's executable period | int | `{"length":13}` | The start time of the mission's executable period as a millisecond timestamp. The time at which the mission starts execution must be greater than `begin_time`. |
| »end_time | End time of the mission's executable period | int | `{"length":13}` | The end time of the mission's executable period as a millisecond timestamp. The time at which the mission starts execution must be less than `end_time`. |
| executable_conditions | Mission execution conditions | struct | | Optional field, used to add pre-execution check conditions on the device side. If any condition is not met, execution fails. |
| »storage_capacity | Storage capacity | int | | The minimum storage capacity of the dock or aircraft that can execute the mission. If the dock or aircraft storage capacity does not meet `storage_capacity`, mission execution fails. |
| break_point | Wayline breakpoint information | struct | | Optional field, used for resuming from a breakpoint. If this field is specified, the wayline mission resumes from the breakpoint position specified by the field. |
| »index | Breakpoint number | int | | |
| »state | Breakpoint state | enum_int | `{"0":"On segment","1":"On waypoint"}` | |
| »progress | Current segment progress | float | `{"max":"1.0","min":"0"}` | |
| »wayline_id | Wayline ID | int | | |
| rth_altitude | Return home altitude | int | `{"max":1500,"min":20,"unit_name":"Meters / m"}` | |
| rth_mode | Return home altitude mode | enum_int | `{"0":"Optimal","1":"Preset"}` | In Optimal mode, the aircraft automatically plans the optimal return-home altitude. The DJI Dock currently does not support setting the return-home altitude mode; only the 'Preset' mode can be selected. When the environment or lighting does not meet the requirements of the vision system (for example, direct sunlight in the evening, or low/no light at night), the aircraft performs a straight-line return at the altitude you set. |
| out_of_control_action | Remote controller lost control action | enum_int | `{"0":"Return to home","1":"Hover","2":"Land"}` | Out-of-control action. The currently fixed value is 0, i.e., return to home. Note that the enumeration definition is inconsistent between the flight controller and the Dock; the Dock side performs the conversion. |
| exit_wayline_when_rc_lost | Wayline lost control action | enum_int | `{"0":"Continue executing the wayline mission","1":"Exit the wayline mission and execute the remote controller lost control action"}` | Keep consistent with the KMZ file |
| wayline_precision_type | Wayline precision type | enum_int | `{"0":"GPS mission","1":"High-precision RTK mission"}` | High-precision RTK mission: After taking off, the aircraft waits in the air for the RTK to converge before executing the mission. The mission cannot be paused while waiting for RTK convergence. This mode is recommended for the default scenario. GPS mission: The aircraft can start execution directly without waiting for RTK convergence. This mode is recommended for missions with low accuracy requirements or missions with high takeoff timeliness requirements. |
| simulate_mission | Whether to execute the mission in the simulator | struct | | Optional field, used for simulated mission debugging indoors.<br />>**Note: Before performing a simulated flight, be sure to remove the propellers to prevent them from being cut when the dock cover closes.** |
| »is_enable | Whether to enable the simulator mission | enum_int | `{"0":"Do not enable","1":"Enable"}` | Enable or disable the simulator for this mission |
| »latitude | Latitude | double | `{"max":"90.0","min":"-90.0"}` | |
| »longitude | Longitude | double | `{"max":"180.0","min":"-180.0"}` | |
| flight_safety_advance_check | Flight safety advance check | bool | `{"0":"Disabled","1":"Enabled"}` | Sets whether to pre-check flight safety in one-key takeoff and wayline missions. This field is optional and defaults to 0; a value of 0 means disabled, and 1 means enabled. Flight safety advance check means: before the aircraft executes the mission, it checks whether its own operating area file is consistent with the cloud side; if inconsistent, it pulls the file update, and if consistent, it takes no action. |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "break_point": {
      "index": 1,
      "progress": 0.34,
      "state": 0,
      "wayline_id": 0
    },
    "executable_conditions": {
      "storage_capacity": 1000
    },
    "execute_time": 1234567890123,
    "exit_wayline_when_rc_lost": 0,
    "file": {
      "fingerprint": "xxxx",
      "url": "https://xxx.com/xxxx"
    },
    "flight_id": "xxxxxxx",
    "flight_safety_advance_check": 1,
    "out_of_control_action": 0,
    "ready_conditions": {
      "battery_capacity": 90,
      "begin_time": 1234567890123,
      "end_time": 1234567890123
    },
    "rth_altitude": 100,
    "simulate_mission": {
      "is_enable": 1,
      "latitude": 22.1223,
      "longitude": 113.2222
    },
    "task_type": 2,
    "wayline_precision_type": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123,
  "method": "flighttask_prepare"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_prepare

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
  "timestamp": 1234567890123,
  "method": "flighttask_prepare"
}
```

## Create a wayline mission (deprecated)

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** flighttask_create

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Plan ID | text | | |
| type | Mission type | text | | |
| file | Wayline file object | struct | | |
| »url | File URL | text | | |
| »sign | MD5 signature | text | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "file": {
      "sign": "xxxx",
      "url": "https://xxx.com/xxxx"
    },
    "flight_id": "xxxxxxx",
    "type": "wayline"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp:": 1654070968655,
  "method": "flighttask_create"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** flighttask_create

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
  "timestamp:": 1654070968655,
  "method": "flighttask_create"
}
```

## Issue a wayline in flight

While the aircraft is flying in the air, waylines with smaller file sizes can be issued.

**Method:** `in_flight_wayline_deliver`

**Topic:** `thing/product/{gateway_sn}/services`

**Direction:** down

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| bid | Request ID | string | | Unique identifier of the request |
| tid | Task ID | string | | Unique identifier of the task |
| timestamp | Timestamp | int64 | | Timestamp of the request |
| method | Method name | string | | Fixed as `in_flight_wayline_deliver` |
| data | Data | object | | Specific data of the issued wayline |
| data.file | File information | object | | Wayline file information |
| data.file.fingerprint | File fingerprint | string | | Used to verify file integrity |
| data.file.url | File download URL | string | | Download URL of the wayline file |
| data.in_flight_wayline_id | Wayline mission ID | string | | Unique identifier of the in-flight wayline mission |
| data.out_of_control_action | Out-of-control action | int | `{0: "Return to home", 1: "Hover", 2: "Land"}` | Action when the remote controller loses control |
| data.exit_wayline_when_rc_lost | Lost connection action | int | `{0: "Continue execution", 1: "Execute flight control out-of-control action"}` | Action when the wayline loses connection |
| data.rth_altitude | Return home altitude | int | `{min: 20, max: 1500}` | Return home altitude, unit: meters |
| data.rth_mode | Return mode | int | `{0: "Optimal", 1: "Preset"}` | Return home altitude mode |
| data.wayline_precision_type | Wayline precision type | int | `{0: "GPS mission", 1: "High-precision RTK mission"}` | Wayline precision type |

**Example:**

```json
{
  "bid": "d26db6b4-3bb0-432c-bdb2-a8e53c827b72",
  "tid": "a5d95abe-e99c-4931-95cc-e2f3fdbc488f",
  "timestamp": 1731135221528,
  "method": "in_flight_wayline_deliver",
  "data": {
    "file": {
      "fingerprint": "7a7cea5060c55920b7619a2a981f2223",
      "url": "XXXX"
    },
    "in_flight_wayline_id": "f2b31c13-3fce-4a7e-b188-87a78ff2f8a6",
    "out_of_control_action": 1,
    "exit_wayline_when_rc_lost": 0,
    "rth_altitude": 120,
    "rth_mode": 1,
    "wayline_precision_type": 1
  }
}
```

**Topic:** `thing/product/{gateway_sn}/services_reply`

**Direction:** up

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "result": 0
}
```

## Pause an in-flight wayline

**Method:** `in_flight_wayline_stop`

**Topic:** `thing/product/{gateway_sn}/services`

**Direction:** down

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| bid | Request ID | string | | Unique identifier of the request |
| tid | Task ID | string | | Unique identifier of the task |
| timestamp | Timestamp | int64 | | Timestamp of the request |
| method | Method name | string | | Fixed as `in_flight_wayline_stop` |
| data | Data | object | | Specific data of the paused wayline |
| data.in_flight_wayline_id | Wayline mission ID | string | | Unique identifier of the in-flight wayline mission |

**Example:**

```json
{
  "bid": "bf1d9985-5077-4ea5-9f2b-44edbcde9a11",
  "tid": "9da675b5-0a87-4b89-9813-4fb2e3aac4ec",
  "timestamp": 1731136137237,
  "method": "in_flight_wayline_stop",
  "data": {
    "in_flight_wayline_id": "36747381-4886-4ed0-9b2b-2919d6d4863c"
  }
}
```

**Topic:** `thing/product/{gateway_sn}/services_reply`

**Direction:** up

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "result": 0
}
```

## Resume an in-flight wayline

**Method:** `in_flight_wayline_recover`

**Topic:** `thing/product/{gateway_sn}/services`

**Direction:** down

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| bid | Request ID | string | | Unique identifier of the request |
| tid | Task ID | string | | Unique identifier of the task |
| timestamp | Timestamp | int64 | | Timestamp of the request |
| method | Method name | string | | Fixed as `in_flight_wayline_recover` |
| data | Data | object | | Specific data of the resumed wayline |
| data.in_flight_wayline_id | Wayline mission ID | string | | Unique identifier of the in-flight wayline mission |

**Example:**

```json
{
  "bid": "8fd307b9-6a70-465c-aeb7-5edac860017b",
  "tid": "b3a76306-2576-4bc5-9a55-77e4f8f3b17c",
  "timestamp": 1731136244583,
  "method": "in_flight_wayline_recover",
  "data": {
    "in_flight_wayline_id": "36747381-4886-4ed0-9b2b-2919d6d4863c"
  }
}
```

**Topic:** `thing/product/{gateway_sn}/services_reply`

**Direction:** up

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "result": 0
}
```

## Cancel In-Flight Wayline

**Method:** `in_flight_wayline_cancel`

**Topic:** `thing/product/{gateway_sn}/services`

**Direction:** down

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| bid | Request ID | string | | Unique identifier of the request |
| tid | Task ID | string | | Unique identifier of the task |
| timestamp | Timestamp | int64 | | Timestamp of the request |
| method | Method name | string | | Fixed value `in_flight_wayline_cancel` |
| data | Data | object | | Specific data for canceling the wayline |

**Example:**

```json
{
  "bid": "8fd307b9-6a70-465c-aeb7-5edac860017b",
  "tid": "b3a76306-2576-4bc5-9a55-77e4f8f3b17c",
  "timestamp": 1731136244583,
  "method": "in_flight_wayline_cancel",
  "data": {}
}
```

**Topic:** `thing/product/{gateway_sn}/services_reply`

**Direction:** up

**Data:**

| Column | Name | Type | Constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |

**Example:**

```json
{
  "result": 0
}
```

# Requests

## Get Dock Task Status

In a multi-dock scenario, a Dock needs to request the task execution status of another Dock.

**Topic:** thing/product/`{gateway_sn}`/requests

**Direction:** up

**Method:** flighttask_progress_get

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| target_sn | Target device SN | text | | |
| flight_id | Target wayline task UUID | text | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
    "target_sn": "xxx"
  },
  "gateway": "xxx",
  "method": "flighttask_progress_get",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123
}
```

**Topic:** thing/product/`{gateway_sn}`/requests_reply

**Direction:** down

**Method:** flighttask_progress_get

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |
| output | Output | struct | | |
| »flight_id | Latest current task ID of the device | text | | |
| »progress | Task progress | struct | | The field enum values are the same as the progress field in flighttask_progress (Report the wayline mission progress) |
| »»current_step | Execution step | enum_int | `{"0":"Idle","7":"Opening dock cover","9":"Waiting for aircraft to be ready","19":"Closing dock cover","25":"Waiting for landing","28":"Clamping push rod","50":"Task completed","99":"Task failed"}` | The field enum values are the same as `flighttask_progress.progress.current_step` (Report the wayline mission progress). |
| »»percent | Execution progress | int | `{"max":"100","min":"0","step":"","unit_name":null}` | |
| »status | Task status | text | | The field enum values are the same as the status field in flighttask_progress (Report the wayline mission progress) |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
      "progress": {
        "current_step": 25,
        "percent": 90
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "gateway": "xxx",
  "method": "flighttask_progress_get",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 0
}
```

## Get Task Resource

**Topic:** thing/product/`{gateway_sn}`/requests

**Direction:** up

**Method:** flighttask_resource_get

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Plan ID | text | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxxxxxx"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123,
  "method": "flighttask_resource_get"
}
```

**Topic:** thing/product/`{gateway_sn}`/requests_reply

**Direction:** down

**Method:** flighttask_resource_get

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |
| output | Output | struct | | |
| »file | Wayline file object | struct | | |
| »»url | File URL | text | | |
| »»fingerprint | File signature | text | | File MD5 signature |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "file": {
        "fingerprint": "signxxxx",
        "url": "https://xx.oss-cn-hangzhou.aliyuncs.com/xx.kmz?Expires=xx&OSSAccessKeyId=xxx&Signature=xxx"
      }
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1234567890123,
  "method": "flighttask_resource_get"
}
```
