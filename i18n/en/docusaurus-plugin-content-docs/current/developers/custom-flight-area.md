---
id: custom-flight-area
title: Custom Flight Area Integration Guide
sidebar_label: Custom Flight Area Integration Guide
sidebar_position: 3
description: File format, cloud synchronization, and status reporting for M400 and M4 custom flight areas.
---
# Custom Flight Area Integration Guide

:::info Current support

Custom flight areas currently support only the M400 and M4 aircraft models. No-landing zones are not currently supported.

:::

A custom flight area, often called an electronic geofence, limits where an aircraft may operate. It can define the area an aircraft must remain inside or an area it must avoid in campus security, inspection, and other sensitive-location scenarios.

Custom flight areas support two region types:

| Type | Protocol value | Behavior |
| --- | --- | --- |
| Custom operation area | `dfence` | The aircraft may operate only inside the area and cannot cross its boundary |
| Custom restricted area | `nfz` | The aircraft may operate outside the area but cannot enter it |

M400 and M4 use a custom flight area file and synchronization workflow compatible with Cloud API. Actual flight behavior and firmware support depend on the applicable product and firmware documentation.

:::info Aircraft behavior near a boundary

- Restricted area encountered during return-to-home or fly-to-point operations: the aircraft automatically routes around the area and continues the task.
- Boundary approached during a wayline task: the task is interrupted automatically and the aircraft returns to home.
- Boundary approached during manual virtual-stick control: the aircraft hovers automatically and cannot be commanded across the boundary.

Always leave sufficient clearance from every boundary. Automatic rerouting must not be treated as the only safety control.

Behavior may differ between aircraft models and firmware versions. Always verify it through testing.

:::

A complete integration has three stages:

1. Draw operation and restricted areas and generate the flight-area file.
2. Host the file and synchronize it to the Dock through Cloud API.
3. Process synchronization status and aircraft-to-boundary reports from the Dock.

## 1. Generate the flight-area file

### 1.1 File structure

A custom flight area file is a GeoJSON `FeatureCollection`. All operation and restricted areas in the same project should be combined into one file.

The example below contains one circular operation area and one polygonal restricted area. It is formatted for readability. For production, use deterministic ordering and compact UTF-8 JSON without a BOM so that digest calculations remain reproducible.

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "id": "9b860a40-0096-4ab4-b3f8-8bfc0689c00b",
      "type": "Feature",
      "geofence_type": "dfence",
      "geometry": {
        "type": "Point",
        "coordinates": [114.2245, 22.6857]
      },
      "properties": {
        "subType": "Circle",
        "radius": 198,
        "enable": true
      }
    },
    {
      "id": "0d14f28c-c147-4bd0-9107-496923f9f2ca",
      "type": "Feature",
      "geofence_type": "nfz",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [114.2253, 22.6872],
          [114.2259, 22.6869],
          [114.2256, 22.6865],
          [114.2251, 22.6868],
          [114.2253, 22.6872]
        ]]
      },
      "properties": {
        "radius": 0,
        "enable": true
      }
    }
  ]
}
```

Key fields:

| Field | Description |
| --- | --- |
| `id` | Stable unique area ID; a UUID is recommended. The Dock uses it to reference the area |
| `geofence_type` | `dfence` for an operation area or `nfz` for a restricted area |
| `geometry.type` | `Point` for a circle or `Polygon` for a polygon |
| `properties.subType` | Must be `Circle` for a circle; omit it for a polygon |
| `properties.radius` | Circle radius in meters; use `0` for a polygon |
| `properties.enable` | Use `true` with the current protocol; remove an area from the file when it is no longer needed |
| `coordinates` | WGS84 in `[longitude, latitude]` order; a polygon must contain a closed outer ring |

You can download the local [Custom Flight Area File Protocol Template](/files/api-reference/custom-flight-area-template.json). The template contains `//` comments for explanation; those comments are not valid JSON and must be removed before use.

### 1.2 Geometry and planning constraints

Validate at least the following before generating a file:

- Operation areas must not overlap. A restricted area may be located inside an operation area.
- A polygon outer ring must be closed, contain at least three distinct vertices, and must not self-intersect.
- A closed polygon ring may contain at most 255 points, or 254 distinct vertices.
- A circle radius must be at least 10 meters.
- Coordinates must use WGS84. Convert GCJ-02 data from providers such as Amap or Tencent Maps, and BD-09 data from Baidu Maps, before writing the file.
- The Dock must be inside an operation area, outside every restricted area, and separated from all boundaries by a safe margin.
- Every area `id` must remain stable and must not be regenerated on each export.

:::caution Coordinate system and safety margins

A mismatched coordinate system can shift the complete geofence. Applications using GCJ-02 or BD-09 basemaps must convert coordinates to WGS84 before generating the file.

DJI recommends leaving at least 5 meters between a waypoint route and a custom flight area boundary, and more than 10 meters between the Dock and an operation or restricted-area boundary. Production planning should add further margin for positioning error, aircraft speed, wind, and site-specific risk.

:::

### 1.3 Visual drawing tool

Strawberry Innovation provides an open-source drawing tool that you can try or reuse:

- [Live demo](https://sb-im.github.io/demo-custom-flight-area/)
- [GitHub source](https://github.com/sb-im/demo-custom-flight-area)
- [Gitee mirror](https://gitee.com/sb-im/demo-custom-flight-area)

It supports circle and polygon drawing, geometry validation, example loading, and import or export of `geofence_{md5}.json` files. Files generated by the tool have been validated on a SuperDock M400.

The project is separated into three layers, so an integration can reuse only what it needs:

| Integration goal | Reference files | Runtime dependencies |
| --- | --- | --- |
| Build or parse flight-area files | `types.ts`, `geometry.ts`, `validation.ts`, `geofenceFile.ts`, `hash.ts` | No third-party dependency; usable with React, Vue, or Node.js |
| Add map drawing | Files above, plus `draw.ts`, `render.ts`, and `viewer.ts` | Cesium |
| Reference the complete UI | Files above, plus `main.ts`, `index.html`, and `style.css` | Browser DOM and Cesium |

:::note Tool scope

The drawing tool covers area drawing, validation, and file import or export only. It does not include accounts, backend services, object storage, MQTT, or device synchronization. Implement device synchronization as described below.

:::

## 2. Synchronize the file to the Dock

### 2.1 Synchronization flow

The cloud cannot push the file contents directly to the Dock. In the standard flow, the cloud notifies the Dock that a new version is available, and the Dock uses `flight_areas_get` to request the file metadata and download the file.

| Step | Topic direction | Method | Description |
| --- | --- | --- | --- |
| 1 | Cloud internal | — | Build the flight-area file and upload it to OSS, S3, MinIO, or another object store |
| 2 | Cloud → Dock | `flight_areas_update` | Tell the Dock to check for the latest flight-area file |
| 3 | Dock → Cloud | `flight_areas_get` | Request the latest file metadata |
| 4 | Cloud → Dock | `flight_areas_get` reply | Return the filename, download URL, SHA-256 digest, and file size |
| 5 | Dock → Cloud | `flight_areas_sync_progress` | Report synchronization progress and the final result |

See [Custom Flight Area](../api-reference/dock-feature-set/custom-flight-area) for the complete sequence and [Custom Flight Area API](../api-reference/superdock-hangar/custom-flight-area) for field definitions.

### 2.2 Filename, digests, and size

Three values in the file metadata are easy to confuse:

| Field | Calculation |
| --- | --- |
| Filename | `geofence_{fileMD5}.json`, where `fileMD5` is the MD5 of the final file bytes |
| `files[].checksum` | SHA-256 of the final file bytes, not the MD5 embedded in the filename |
| `files[].size` | Final file size in bytes |

:::warning Calculate all values from the same final file

MD5, SHA-256, and file size must all be calculated from the exact bytes uploaded to object storage. Recalculate them after changing whitespace, field order, line endings, encoding, or the BOM.

If MD5 and SHA-256 are mixed up, the Dock may download the file repeatedly or report `reason = 12` (checksum verification failed) through `flight_areas_sync_progress`.

:::

Sort areas by `id` and use deterministic compact serialization. If the area definitions have not changed, this produces the same bytes, digests, and filename and avoids unnecessary synchronization.

The object-storage download URL must be reachable from the Dock network and remain valid long enough for download, retries, and aircraft startup.

### 2.3 Respond to `flight_areas_get`

The Dock requests flight-area metadata through:

- Topic: `thing/product/{gateway_sn}/requests`
- Method: `flight_areas_get`

The cloud replies on `thing/product/{gateway_sn}/requests_reply`. When a flight-area file is available, return a payload like this:

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flight_areas_get",
  "data": {
    "result": 0,
    "output": {
      "files": [
        {
          "name": "geofence_ada784c65e1a9455089486be7e6db5d8.json",
          "url": "https://example.com/geofence.json?signature=...",
          "checksum": "<file SHA-256>",
          "size": 500
        }
      ]
    }
  }
}
```

Distinguish these three business states:

| Scenario | Returned `data` | Meaning |
| --- | --- | --- |
| The project has a flight-area file | `{"result":0,"output":{"files":[{...}]}}` | Use this file |
| Explicitly clear all flight areas | `{"result":0,"output":{"files":[]}}` | Delete all custom flight areas from the aircraft |
| The platform does not manage this project's flight areas | `{"result":0}` | Do not modify the current flight areas |

:::danger Do not confuse “clear” with “not managed”

`files: []` is an explicit clear instruction. If the platform does not manage flight areas for a project, do not return an empty array by default; doing so may remove areas synchronized by another platform.

:::

Even if a platform does not currently use custom flight areas, it should still respond correctly to `flight_areas_get` and `offline_map_get`. Some older Dock firmware waits for both replies before starting a task, and a missing reply may add approximately 40 seconds. A platform that does not manage these datasets can return `{"data":{"result":0}}`.

### 2.4 Notify the Dock of an update

To synchronize immediately after a user saves area changes, send `flight_areas_update`:

- Topic: `thing/product/{gateway_sn}/services`
- Method: `flight_areas_update`
- `data`: `null`

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 1654070968655,
  "method": "flight_areas_update",
  "data": null
}
```

A `result = 0` response on `services_reply` means only that the request was accepted. Use `flight_areas_sync_progress` to determine whether synchronization completed successfully.

Before sending the update, confirm that:

- The Dock is online and idle.
- The aircraft is inside the Dock.
- No task is running or waiting to run.
- The object-storage upload has completed and the download URL is valid.

### 2.5 Preflight safety check

Enable `flight_safety_advance_check` when sending `flighttask_prepare`:

```json
{
  "flight_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "file": {
    "url": "https://example.com/mission.kmz",
    "fingerprint": "..."
  },
  "flight_safety_advance_check": 1
}
```

This field is optional and defaults to `0`. When it is set to `1`, the aircraft checks whether its flight-area file matches the cloud version before executing the task. It downloads the latest file when they differ and does nothing when they match. See the [Wayline Task API](../api-reference/superdock-hangar/wayline) for the complete field definition.

Important details:

1. Set `flight_safety_advance_check` explicitly to `1` to enable it.
2. The check still depends on `flight_areas_get` and file hosting; it does not replace the cloud request handler.
3. The consistency check runs inside the task workflow before the aircraft leaves the ground. `current_step` values differ between device models and protocol versions, so parse them using the applicable API reference.
4. `flight_areas_update` is an optional way to synchronize earlier; the preflight safety check is the final guard before takeoff.

Recommended product flow:

```text
Save area changes
  → Rebuild and upload the flight-area file automatically
  → Optional: let the user trigger “Sync now”
  → Confirm the cloud file is current when the task actually runs
  → flighttask_prepare(flight_safety_advance_check = 1)
  → Complete the consistency check before takeoff
```

For scheduled and conditional tasks, check the cloud file again at execution time so that area changes made after task creation are not missed.

## 3. Process Dock status and alerts

### 3.1 Synchronization status: `flight_areas_sync_progress`

The Dock reports synchronization status through:

- Topic: `thing/product/{gateway_sn}/events`
- Method: `flight_areas_sync_progress`
- `need_reply`: `1`; the cloud must return `{"result":0}` through `events_reply`

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 16540709686556,
  "method": "flight_areas_sync_progress",
  "need_reply": 1,
  "data": {
    "status": "synchronized",
    "reason": 0,
    "file": {
      "name": "geofence_xxx.json",
      "checksum": "<file SHA-256>"
    }
  }
}
```

Supported `status` values:

| Value | Meaning |
| --- | --- |
| `wait_sync` | Waiting to synchronize |
| `synchronizing` | Synchronization in progress |
| `synchronized` | Synchronized |
| `fail` | Synchronization failed |
| `switch_fail` | Enable switch failed |

`reason = 0` indicates success. Other values help diagnose failures:

| Reason | Meaning |
| --- | --- |
| `1` | Failed to parse file metadata returned by the cloud |
| `2` | Failed to obtain aircraft-side file metadata |
| `3` | Failed to download the file from the cloud |
| `4` | Link switch failed |
| `5` | File transfer failed |
| `6` | Disable failed |
| `7` | Failed to delete the custom flight area |
| `8` | Aircraft failed to load operation-area data |
| `9` | Enable failed |
| `10` | Dock enhanced transmission could not be disabled, so synchronization failed |
| `11` | Aircraft startup failed, so synchronization could not proceed |
| `12` | Checksum verification failed |
| `13` | Synchronization timed out |

Start troubleshooting with these checks:

- `reason = 1` or `3`: verify the reply structure, download URL, network reachability, and URL expiration.
- `reason = 11`: verify aircraft startup and Dock state.
- `reason = 12`: verify that the SHA-256 matches the exact uploaded bytes.

### 3.2 State storage

Store the desired cloud state, published file, and device-reported state separately:

| State | Meaning |
| --- | --- |
| `desired_deployment` | File expected from the currently enabled areas |
| `deployment` | File currently returned by `flight_areas_get` |
| Device synchronization state | Raw state reported through `flight_areas_sync_progress` |

Show “Synchronized” only when the filename and SHA-256 match and the device reports both `status = synchronized` and `reason = 0`.

At minimum, distinguish these intermediate states:

- `draft_changed`: the area draft changed, but the cloud file has not been published successfully.
- `file_mismatch`: the cloud file is current, but the Dock still reports an older file.

### 3.3 Boundary distance: `flight_areas_drone_location`

While the aircraft is operating, the Dock reports its relationship to area boundaries through:

- Topic: `thing/product/{gateway_sn}/events`
- Method: `flight_areas_drone_location`
- `need_reply`: `0`

```json
{
  "bid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "tid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "timestamp": 16540709686556,
  "method": "flight_areas_drone_location",
  "need_reply": 0,
  "data": {
    "drone_locations": [
      {
        "area_id": "d275c4e1-d864-4736-8b5d-5f5882ee9bdd",
        "area_distance": 100.11,
        "is_in_area": true
      }
    ]
  }
}
```

| Field | Description |
| --- | --- |
| `area_id` | Unique area ID matching the `id` in the flight-area file |
| `area_distance` | Distance from the aircraft to the area boundary, in meters |
| `is_in_area` | Whether the aircraft is inside the area |

The area `id` must remain stable; otherwise, the platform cannot associate a report with the corresponding area on the map.

:::note Device compatibility

Some DJI Dock 2 firmware may report the first 35 characters of a 36-character UUID stored in the database. An `area_id` matcher can support both an exact UUID and this known single-character truncation, but it should not use unrestricted prefix matching.

:::

This event can support:

- A real-time map showing the aircraft relative to all flight areas.
- Proximity alerts as the aircraft approaches a boundary.
- Separate trigger and clear thresholds to add hysteresis and prevent alert flapping near a threshold.
- Post-flight diagnosis combined with task results and error codes.

Common related error codes are listed below. Use the applicable firmware and [Error Codes](../cloud-api/error-codes) documentation as the final reference:

| Code | Meaning |
| --- | --- |
| `321528` | The aircraft reached a custom flight-area boundary and the wayline task was paused; `break_reason = 528` may also be reported |
| `337546` | A custom flight-area boundary was reached |
| `338006` | The task cannot run; verify that the Dock is not outside an operation area or inside a restricted area |
| `319028` | A custom flight-area update is in progress |
| `325010` | The Dock is updating its custom flight area; retry later |

## References

- [Custom Flight Area](../api-reference/dock-feature-set/custom-flight-area)
- [Custom Flight Area API](../api-reference/superdock-hangar/custom-flight-area)
- [Wayline Task API](../api-reference/superdock-hangar/wayline)
- [Error Codes](../cloud-api/error-codes)
- [Custom Flight Area File Protocol Template](/files/api-reference/custom-flight-area-template.json)
- [Open-source drawing demo](https://github.com/sb-im/demo-custom-flight-area)
