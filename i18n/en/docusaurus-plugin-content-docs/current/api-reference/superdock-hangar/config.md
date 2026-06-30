---
sidebar_label: Configuration Update
sidebar_position: 11
---

# Configuration Update

# Requests

## Get Configuration

**Topic:** thing/product/`{gateway_sn}`/requests

**Direction:** up

**Method:** config

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| config_type | Configuration type | enum_string | `{"json":"JSON format"}` | |
| config_scope | Configuration scope | enum_string | `{"product":"Product dimension"}` | |

**Example:**

```json
{
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "data": {
    "config_scope": "product",
    "config_type": "json"
  },
  "gateway": "sn",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "timestamp": 1667803298000,
  "method": "config"
}
```

**Topic:** thing/product/`{gateway_sn}`/requests_reply

**Direction:** down

**Method:** config

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| ntp_server_host | NTP service Host | text | | |
| app_id | The ID of the App created on the [Developer Website](https://developer.dji.com/user/apps/#all) | text | | |
| app_key | The Key of the App created on the [Developer Website](https://developer.dji.com/user/apps/#all) | text | | |
| app_license | The License of the App created on the [Developer Website](https://developer.dji.com/user/apps/#all) | text | | |
| ntp_server_port | NTP service port | int | | If this field is absent from the request, the default NTP port number is 123 |

**Example:**

```json
{
  "bid": "42a19f36-5117-4520-bd13-fd61d818d52e",
  "data": {
    "app_id": "123456",
    "app_key": "app_key",
    "app_license": "app_license",
    "ntp_server_host": "host_url",
    "ntp_server_port": 456
  },
  "gateway": "sn",
  "tid": "6a7bfe89-c386-4043-b600-b518e10096cc",
  "timestamp": 1667803298000,
  "method": "config"
}
```
