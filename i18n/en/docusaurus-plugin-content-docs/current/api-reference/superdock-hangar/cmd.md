---
sidebar_label: Remote Debugging
sidebar_position: 8
---

# Remote Debugging

# Event

## Shutdown Aircraft Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** drone_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_ac_input_state":"Check AC power supply state","upgrading_prevent_reboot":"Check if the working mode is firmware update","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","check_scram_state":"Check the emergency stop button status","close_drone":"Power off the aircraft"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 20,
        "step_key": "check_work_mode"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "drone_close"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** drone_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "drone_close",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Aircraft Power-On Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** drone_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp:": 1654070968655,
  "method": "drone_open"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** drone_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "drone_open",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Dock Reboot Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** device_reboot

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_ac_input_state":"Check AC power supply state","upgrading_prevent_reboot":"Check if the working mode is firmware update","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","write_reboot_param_file":"Write to the reboot flag"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 20,
        "step_key": "write_reboot_param_file"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "device_reboot"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** device_reboot

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "device_reboot",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Push Rod Closing Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** putter_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","check_scram_state":"Check the emergency stop button status","close_putter":"Close the push rod"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 30,
        "step_key": "check_work_mode"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "putter_close"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** putter_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "putter_close",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Push Rod Opening Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** putter_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","check_scram_state":"Check the emergency stop button status","free_putter":"Release the push rod"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 80,
        "step_key": "free_putter"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "putter_open"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** putter_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "putter_open",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```


## Close Cover Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** cover_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","check_scram_state":"Check the emergency stop button status","turn_on_drone":"Power on the aircraft","drone_paddle_forward":"The aircraft is slowly rotating the propellers","close_cover":"Close the dock cover","drone_paddle_reverse":"The aircraft is slowly rotating the propellers in reverse","drone_paddle_stop":"The aircraft stopped rotating the propellers"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 58,
        "step_key": "drone_paddle_reverse"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "cover_close"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** cover_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "cover_close",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Open Cover Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** cover_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","check_scram_state":"Check the emergency stop button status","open_cover":"Open the dock cover"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 70,
        "step_key": "open_cover"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "cover_open"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** cover_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "cover_open",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Start Charging Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** charge_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","check_scram_state":"Check the emergency stop button status","check_cover":"Check the dock cover state","start_charge":"Start charging"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 45,
        "step_key": "close_putter"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "charge_open"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** charge_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "charge_open",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```

## Stop Charging Progress

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** charge_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
| »progress | Progress | struct | | |
| »»percent | Progress percentage | int | `{"max":"100","min":"0","step":"1","unit_name":"Percentage / %"}` | |
| »»step_key | Current step | enum_string | `{"get_bid":"Get bid","check_work_mode":"Check if the working mode is remote debugging","check_task_state":"Check the task exclusion state in debugging mode","stop_charge":"Stop charging"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "progress": {
        "percent": 80,
        "step_key": "stop_charge"
      },
      "status": "in_progress"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "charge_close"
}
```

**Topic:** thing/product/`{gateway_sn}`/events_reply

**Direction:** down

**Method:** charge_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |

**Example:**

```json
{
  "method": "charge_close",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": "1234567890123",
  "data": {
    "result": 0
  }
}
```



# Service

## Debug Mode Opened

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** debug_mode_open

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** debug_mode_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Debug Mode Closed

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** debug_mode_close

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** debug_mode_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Turn On Supplementary Light

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** supplement_light_open

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** supplement_light_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero represents an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |
## Turn Off Supplementary Light

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** supplement_light_close

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** supplement_light_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Dock Sound and Light Alarm State Switch

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** alarm_state_switch

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| action | Operation | enum_int | `{"0":"Disabled","1":"Enabled"}` | |

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** alarm_state_switch

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |


## Dock Reboot

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** device_reboot

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** device_reboot

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Aircraft Power-On

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** drone_open

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** drone_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Shutdown Aircraft

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** drone_close

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** drone_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |


## Open Cover

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** cover_open

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** cover_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Close Cover

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** cover_close

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** cover_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Start Charging

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** charge_open

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** charge_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Stop Charging

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** charge_close

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** charge_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Enhanced Image Transmission Switch

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** sdr_workmode_switch

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| link_workmode | image transmission mode | enum_int | `{"0":"SDR Only","1":"4G Enhanced Mode"}` | In 4G Enhanced Mode, both SDR and 4G will be used simultaneously |

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** sdr_workmode_switch

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |


## One-Click Calibration

Note: No parameters need to be added here. It can automatically connect to a fixed cloud RTK link to perform calibration.

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** rtk_calibration

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** rtk_calibration

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |

## Deploy Push Rod

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** putter_open

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** putter_open

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

## Retract Push Rod

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** putter_close

**Data:** null

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** putter_close

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | Non-zero indicates an error |
| output | Output | struct | | |
| »status | Task state | enum_string | `{"canceled":"Cancelled or terminated","failed":"Failed","in_progress":"Executing","ok":"Executed successfully","paused":"Paused","rejected":"Rejected","sent":"Issued","timeout":"Timeout"}` | |

