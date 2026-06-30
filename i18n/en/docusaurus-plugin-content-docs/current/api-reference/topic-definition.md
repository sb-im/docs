---
sidebar_label: Topic Definition
sidebar_position: 1
---
# Topic Overview

To make it easier for the cloud platform to apply different processing strategies for properties of different natures, the Thing Model properties reported by devices are divided into two categories, osd and state, which are reported on different topics.

*   **osd**: Properties reported by the device at a fixed frequency, corresponding to `pushmode = 0`.
*   **state**: Thing Model properties reported by the device on an event basis, corresponding to `pushmode=1`.

> **Note:** In the table below, `{gateway_sn}` indicates the SN of the gateway device, and `{device_sn}` indicates the SN of the device to which the Thing Model property belongs.

| Topic Name | Sender -> Subscriber | Message | Description |
| :--- | :--- | :--- | :--- |
| `thing/product/{device_sn}/osd` | Device > Cloud platform | [osd message struct](#osd-struct-example) | Device properties (properties) pushed by the device to the cloud platform at a fixed frequency.<br />For the specific content scope, see the Thing Model content. |
| `thing/product/{device_sn}/state` | Device > Cloud platform | [state message struct](#state-struct-example) | Device properties (properties) pushed by the device to the cloud platform on demand.<br />For the specific content scope, see the Thing Model content. |
| `thing/product/{gateway_sn}/services` | Cloud platform -> Device | [services message struct](#services-struct-example) | Services sent by the cloud platform to the device (for the specific service identifier, see the Thing Model content). |
| `thing/product/{gateway_sn}/services_reply` | Device > Cloud platform | [services\_reply message struct](#services_reply-struct-example) | The device's reply to the service and the processing result. |
| `thing/product/{gateway_sn}/events` | Device > Cloud platform | [events message struct](#events-struct-example) | Events that require attention and handling, sent by the device to the cloud platform.<br />For example, the SD card is full, the aircraft is unlocked in a no-fly zone, and so on (for the event scope, see the Thing Model content). |
| `thing/product/{gateway_sn}/events_reply` | Cloud platform -> Device | [events\_reply message struct](#events_reply-struct-example) | The cloud platform's reply to the device event and the processing result. |
| `thing/product/{gateway_sn}/requests` | Device > Cloud platform | [requests message struct](#requests-struct-example) | Requests sent by the device to the cloud platform to obtain information, such as a temporary credential for uploading. |
| `thing/product/{gateway_sn}/requests_reply` | Cloud platform -> Device | [requests\_reply message struct](#requests_reply-struct-example) | The cloud platform's reply to the device request. |
| `sys/product/{gateway_sn}/status` | Device > Cloud platform | [status message struct](#status-struct-example) | Device online/offline and topology update. |
| `sys/product/{gateway_sn}/status_reply` | Cloud platform -> Device | [status\_reply message struct](#status_reply-struct-example) | Platform response. |
| `thing/product/{gateway_sn}/property/set` | Cloud platform -> Device | [property set message struct](#property-set-struct-example) | Device Property Set. Whether a device property can be modified is determined by the "accessMode" identifier in the device property section; accessMode = rw indicates that it can be read and written. |
| `thing/product/{gateway_sn}/property/set_reply` | Device > Cloud platform | [property set\_reply message struct](#property-set_reply-struct-example) | Response to the device property set. |
| `thing/product/{gateway_sn}/drc/up` | Device > Cloud platform | [DRC message struct](#drc-up-struct-example) | DRC protocol uplink. |
| `thing/product/{gateway_sn}/drc/down` | Cloud platform > Device | [DRC message struct](#drc-down-struct-example) | DRC protocol downlink. |

## Common Field Descriptions

| Column | Name | Type | Description |
| :--- | :--- | :--- | :--- |
| tid | Transaction uuid | text | The UUID of a Transaction: represents a single simple message communication, such as create/delete/update/query, gimbal control, etc. It can be:<br /> 1. A data report request + a data report response<br />2. A handshake authentication request + response + ack<br /> 3. A one-way notification of an alarm event, etc. It solves the problems of transaction concurrency and message matching. |
| bid | Business uuid | text | The UUID of a Business: some functions cannot be completed in a single communication and include all interactions over a period of time.<br />A business is usually composed of multiple atomic transactions and lasts a relatively long time;<br />for example, on-demand playback/download/replay. It solves the problems of business concurrency and duplicate requests, and facilitates state-machine management for all modules. |
| timestamp | Millisecond timestamp | int | The time the message was sent |
| gateway | Serial number of the gateway device | text | The serial number of the gateway device that sent this message |
| data | Message content | object | Message content |

## osd Struct Example

*topic*: `thing/product/{device_sn}/osd`

```json
{
  "tid": "65717bf1-aee7-4abb-8ea3-9b1908548d74",
  "bid": "cf5ad2e6-2f32-4b59-980e-d5c9ee412805",
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
    "electric_supply_voltage": 231,
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
  "bid": "d6cfcea4-c6ca-439b-948f-b17d88fc308f",
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
  "tid": "e4c15182-776b-4c13-9973-3fc76848ca15",
  "timestamp": 1667220881576,
  "gateway": "dock_sn"
}
```

```json
{
  "tid": "43d2e632-1558-4c4e-83d2-eeb51b7a377a",
  "bid": "7578f2ac-1f12-4d47-9ab6-5de146ed7b8a",
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
    "air_conditioner_mode": 0,
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

## state Struct Example

*topic*: `thing/product/{device_sn}/state`

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "gateway": "sn",
  "data": {}
}
```

## services Struct Example

*topic*: `thing/product/{gateway_sn}/services`

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "gateway": "sn",
  "method": "some_method",
  "data": {}
}
```

## services\_reply Struct Example

### Required fields in data

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| result | Result code of the device response | int | | Non-zero indicates an error |
| output | Device message content | struct | | The message content of the device's response to the server command |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "gateway": "sn",
  "method": "some_method",
  "data": {
    "result": 0,
    "output": {}
  }
}
```

## events Struct Example

*topic*: `thing/product/{gateway_sn}/events`

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| need\_reply | Whether the server needs to reply | int | | After the server receives the device's events report message, it uses need\_reply to determine whether to send a receipt reply; 0 means not needed, 1 means needed |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "need_reply": 0,
  "gateway": "sn",
  "method": "some_method",
  "data": {}
}
```

## events\_reply Struct Example

*topic*: `thing/product/{gateway_sn}/events_reply`

### Required fields in data

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| result | Result code of the server response | int | | Non-zero indicates an error |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "gateway": "sn",
  "method": "some_method",
  "data": {
    "result": 0
  }
}
```

## requests Struct Example

*topic*: `thing/product/{gateway_sn}/requests`

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "gateway": "sn",
  "method": "some_method",
  "data": {}
}
```

## requests\_reply Struct Example

*topic*: `thing/product/{gateway_sn}/requests_reply`

### Required fields in data

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| result | Result code of the server response | int | | Non-zero indicates an error |
| output | Service message content | struct | | The message content of the server's response to the device |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "gateway": "sn",
  "method": "some_method",
  "data": {
    "result": 0,
    "output": {}
  }
}
```

## status Struct Example

*topic*: `sys/product/{gateway_sn}/status`

#### Gateway device and sub-device online

```json
{
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "method": "update_topo",
  "timestamp": 1234567890123,
  "data": {
    "type": 98,
    "sub_type": 0,
    "device_secret": "secret",
    "nonce": "nonce",
    "version": 1,
    "sub_devices": [
      {
        "sn": "drone001",
        "type": 116,
        "sub_type": 0,
        "index": "A",
        "device_secret": "secret",
        "nonce": "nonce",
        "version": 1
      }
    ]
  }
}
```

#### Sub-device offline

```json
{
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "method": "update_topo",
  "timestamp": 1234567890123,
  "data": {
    "type": 98,
    "sub_type": 0,
    "device_secret": "secret",
    "nonce": "nonce",
    "version": 1,
    "sub_devices": []
  }
}
```

## status\_reply Struct Example

*topic*: `sys/product/{gateway_sn}/status_reply`

### Required fields in data

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| result | Result code | int | | Non-zero indicates an error |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "method": "update_topo",
  "data": {
    "result": 0
  }
}
```

## property set Struct Example

*topic*: `thing/product/{gateway_sn}/property/set`

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| some\_property | The key of the property to be modified | string | | See [Device Management](/en/api-integration/api-reference/superdock-hangar/device)<br />Whether a device property can be modified is determined by the "accessMode" identifier in the device property section; accessMode = rw indicates that it can be read and written. |
| some\_value | The value of the property to be modified | string/int/float | | See the corresponding device property |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "data": {
    "some_property": "some_value"
  }
}
```

## property set\_reply Struct Example

*topic*: `thing/product/{gateway_sn}/property/set_reply`

### Required fields in data

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| some\_property | The key of the property to be modified | string | | See [Device Management](/en/api-integration/api-reference/superdock-hangar/device)<br />Whether a device property can be modified is determined by the "accessMode" identifier in the device property section; accessMode = rw indicates that it can be read and written. |
| result | The setting result of the corresponding property | int | | 0: success, 1: failure, 2: timeout; for others, see the error code descriptions |

```json
{
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "timestamp": 1598411295123,
  "data": {
    "some_property": {
      "result": 0
    }
  }
}
```

## drc up Struct Example

*topic*: `thing/product/{gateway_sn}/drc/up`

### Required fields in data

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| result | Result code of the server response | int | | Non-zero indicates an error |
| output | Service message content | struct | | The message content of the server's response to the device |

```json
{
  "method": "drone_control",
  "data": {
    "result": 0,
    "output": {
      "seq": 1
    }
  }
}
```

## drc down Struct Example

*topic*: `thing/product/{gateway_sn}/drc/down`

```json
{
  "method": "drone_control",
  "data": {
    "seq": 1,
    "x": 2.34,
    "y": -2.45,
    "h": 2.76,
    "w": 2.86
  }
}
```
