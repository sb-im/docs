---
sidebar_label: Media Management
sidebar_position: 5
---

# Media Management

# Event

## Media File Upload Priority Report

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** highest_priority_upload_flighttask_media

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Task ID | text | | ID of the task that currently has the highest priority |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxx"
  },
  "gateway": "xxx",
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "highest_priority_upload_flighttask_media"
}
```

## Media File Upload Result Report

**Topic:** thing/product/`{gateway_sn}`/events

**Direction:** up

**Method:** file_upload_callback

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| file | File information | struct | | |
| »object_key | Key of the file in the object storage bucket | text | | |
| »path | Business path of the file | text | | |
| »name | File name | text | | |
| »ext | File extension content | struct | | |
| »»flight_id | Task ID | text | | |
| »»drone_model_key | Aircraft product enum | text | | |
| »»payload_model_key | Payload product enum | text | | |
| »»is_original | Whether it is the original image | bool | `{"0":"No","1":"Yes"}` | |
| »metadata | Media metadata | struct | | |
| »»gimbal_yaw_degree | Gimbal yaw angle | float | | |
| »»absolute_altitude | Absolute altitude at capture | float | | |
| »»relative_altitude | Relative altitude at capture | float | | |
| »»create_time | Media capture time | date | `{"format":"iso8601"}` | |
| »»shoot_position | Capture position | struct | | |
| »»»lat | Latitude of the capture position | float | | |
| »»»lng | Longitude of the capture position | float | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "file": {
      "cloud_to_cloud_id": "DEFAULT",
      "ext": {
        "drone_model_key": "0-67-0",
        "flight_id": "xxx",
        "is_original": true,
        "payload_model_key": "0-67-0"
      },
      "metadata": {
        "absolute_altitude": 56.311,
        "create_time": "2021-05-10 16:04:20",
        "gimbal_yaw_degree": "-91.40",
        "relative_altitude": 41.124,
        "shoot_position": {
          "lat": 22.1,
          "lng": 122.5
        }
      },
      "name": "dog.jpeg",
      "object_key": "object_key",
      "path": "xxx"
    },
    "flight_task": {
      "expected_file_count": 14,
      "flight_type": 0,
      "uploaded_file_count": 12
    }
  },
  "gateway": "xxx",
  "method": "file_upload_callback",
  "need_reply": 1,
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655
}
```

# Service

## Set an Uploading File to the Highest Priority

**Topic:** thing/product/`{gateway_sn}`/services

**Direction:** down

**Method:** upload_flighttask_media_prioritize

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| flight_id | Task ID | text | | The task to be uploaded with the highest priority |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "flight_id": "xxx"
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "upload_flighttask_media_prioritize"
}
```

**Topic:** thing/product/`{gateway_sn}`/services_reply

**Direction:** up

**Method:** upload_flighttask_media_prioritize

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
  "method": "upload_flighttask_media_prioritize"
}
```

# Requests

## Obtain Temporary Upload Credentials

**Topic:** thing/product/`{gateway_sn}`/requests

**Direction:** up

**Method:** storage_config_get

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| module | Module enum | enum_int | `{"0":"Media"}` | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "module": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "storage_config_get"
}
```

**Topic:** thing/product/`{gateway_sn}`/requests_reply

**Direction:** down

**Method:** storage_config_get

**Data:**

| Column | Name | Type | constraint | Description |
| --- | --- | --- | --- | --- |
| result | Return code | int | | A non-zero value indicates an error |
| output | Output | struct | | |
| »bucket | Object storage bucket name | text | | |
| »credentials | Credential information | struct | | |
| »»access_key_id | Access key ID | text | | |
| »»access_key_secret | Secret access key | text | | |
| »»expire | Access key expiration time | int | `{"step":"1","unit_name":"Seconds / s"}` | |
| »»security_token | Session token | text | | |
| »endpoint | Access domain of the external service | text | | |
| »provider | Cloud vendor enum | enum_string | `{"ali":"Alibaba Cloud","aws":"Amazon Web Services","minio":"minio"}` | |
| »region | Region where the data center is located | text | | |
| »object_key_prefix | Key prefix of the object storage bucket | text | | |

**Example:**

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "data": {
    "output": {
      "bucket": "bucket_name",
      "credentials": {
        "access_key_id": "access_key_id",
        "access_key_secret": "access_key_secret",
        "expire": 3600,
        "security_token": "security_token"
      },
      "endpoint": "https://oss-cn-hangzhou.aliyuncs.com",
      "object_key_prefix": "b4cfaae6-bd9d-4cd0-8472-63b608c3c581",
      "provider": "ali",
      "region": "hz"
    },
    "result": 0
  },
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "storage_config_get"
}
```
