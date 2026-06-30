---
sidebar_label: HMS Management
sidebar_position: 7
---

# HMS Management

# Event

## Health Warning

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** hms

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| list | Health alert list | array | `{"size": 20, "item_type": struct}` | |
| »level | Alarm level | enum_int | `{"0":"Notification","1":"Reminder","2":"Warning"}` | |
| »module | Event module | enum_int | `{"0":"Flight mission","1":"Device management","2":"Media","3":"hms"}` | |
| »in_the_sky | In flight | enum_int | `{"0":"On the ground","1":"In the sky"}` | |
| »code | Alarm code | text | `{"length":"10240"}` | |
| »device_type | Device type | text | | Format is `{domain-type-subtype}`, can be queried at [Product Support](/en/api-integration/cloud-api/device-types). |
| »imminent | Whether it is imminent | enum_int | `{"0":"No","1":"Yes"}` | Represents whether it is an imminent alarm code. For example, if the wind is too strong, it will automatically disappear as the wind decreases. |
| »args | Parameters | struct | | |
| »»component_index | Copywriting variable | int | `{"length":"10240"}` | Variable to be filled in the 'alarm copy query json file', [hms.json](/en/api-integration/api-reference/dock-feature-set/hms). |
| »»sensor_index | Copywriting variable | int | `{"length":"10240"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "list": [
      {
        "args": {
          "component_index": 0,
          "sensor_index": 0
        },
        "code": "0x16100083",
        "device_type": "0-67-0",
        "imminent": 1,
        "in_the_sky": 0,
        "level": 2,
        "module": 3
      }
    ]
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "hms"
}
```
