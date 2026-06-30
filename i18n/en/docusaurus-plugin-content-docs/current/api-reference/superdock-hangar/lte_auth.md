---
sidebar_label: Add 4G Remote Control Method
sidebar_position: 12
---

# Add 4G Remote Control Method

# Device State

## 4G Information Report

**Topic:** thing/product/`{drone_sn}`/state

**Direction:** up

**Method:** N/A (State Update)

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| sim_phone_area_code | Area code | string | | |
| sim_phone_number | Mobile number | string | | |
| sim_remaining_time | Remaining verification time | int | | |
| sim_last_authenticated_time | Last verification time | int | | |
| sim_is_authentication_available | Whether verification succeeded | bool | | |
| sim_link_workmode | Enhanced image transmission mode | bool | | Whether the Dock has enabled Enhanced image transmission mode |

**Example:**

```json
{
  "bid": "338071d7-476e-4343-9e7b-d16205729d21",
  "data": {
    "dongle_infos": [
      {
        "sim_is_authentication_available": true,
        "sim_last_authenticated_time": 1732847059,
        "sim_link_workmode": true,
        "sim_phone_area_code": "86",
        "sim_phone_number": "132*******1",
        "sim_remaining_time": 2046912
      }
    ]
  },
  "gateway": "XXXXXXX",
  "method": "",
  "tid": "1e610983-a2fd-484e-918c-421ac2585531",
  "timestamp": 1733392150598
}
```

# Service

## Enable Verification

**Topic:** thing/product/`{depot_sn}`/services

**Direction:** down

**Method:** lte_verification

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| phone_area_code | Area code | string | | |
| phone_number | Mobile number | string | | |

**Example:**

```json
{
  "bid": "ec269113-6a9c-4478-b043-049e0acc4f11",
  "data": {
    "phone_area_code": "86",
    "phone_number": "13300000000"
  },
  "method": "lte_verification",
  "tid": "a7aa8792-9174-46fd-8db4-a07a2cf82669",
  "timestamp": 1733391441818
}
```

## Verify Verification Code

**Topic:** thing/product/`{depot_sn}`/services

**Direction:** down

**Method:** lte_auth

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| phone_area_code | Area code | string | | |
| phone_number | Mobile number | string | | |
| verification_code | Verification code | string | | |

**Example:**

```json
{
  "bid": "ec269113-6a9c-4478-b043-049e0acc4f11",
  "data": {
    "phone_area_code": "86",
    "phone_number": "13300000000",
    "verification_code": "123456"
  },
  "method": "lte_auth",
  "tid": "a7aa8792-9174-46fd-8db4-a07a2cf82669",
  "timestamp": 1733391441818
}
```
