---
sidebar_position: 2
---

# Device Management

## Feature Overview

The device management feature allows devices to report topology information to the cloud, push device properties, and lets the cloud set device properties. This enables users to view and adjust device status in the cloud, making it easier to carry out their work.

## Interaction Sequence Diagram

```mermaid
sequenceDiagram
    participant object as Aircraft
    participant client as SuperDock
    participant server as Cloud Server

    note over object,server: Device online
    object ->> client: Device communication link established with the gateway; device online
    client ->> server: Device topology update Topic: sys/product/{gateway_sn}/status<br/>Method: update_topo

    loop  osd property pushed at fixed 2 HZ
        object ->> client: Aircraft property push
        client ->> server: Device (aircraft) property push Topic: thing/product/{device_sn}/osd
        client ->> server: Device (Dock) property push Topic: thing/product/{device_sn}/osd
    end

    opt state property event-driven report
        object ->> client: Aircraft property push
        client ->> server: Device (aircraft) property push Topic: thing/product/{device_sn}/state
        client ->> server: Device (Dock) property push Topic: thing/product/{device_sn}/state
    end

    server ->> client: Device property set Topic: thing/product/{gateway_sn}/property/set
    client ->> object: Issue change command
    object ->> object: Device property change
    object ->> client: Aircraft response
    client -->> server: Device-side response Topic: thing/product/{gateway_sn}/property/set_reply

    note over object,server: Device offline
    object --x client: Device communication with the gateway device disconnected; device offline
    client ->> server: Device topology update Topic: sys/product/{gateway_sn}/status<br/>Method: update_topo
```

## Interface Implementation Details

*   [Aircraft Device Properties](/en/api-integration/api-reference/aircraft/drone-properties)
*   [Dock Device Properties](/en/api-integration/api-reference/superdock-hangar/properties)
*   [Device Management (MQTT)](/en/api-integration/api-reference/superdock-hangar/device)
    *   **Device Topology Update**  
        When the gateway device detects the connection or disconnection of communication with a sub-device, it reports the sub-device's online/offline status to the cloud. For the values of `type` and `sub_type` in the protocol, please refer to the [Device Types and Aircraft Model List](/en/api-integration/cloud-api/device-types) section for the mapping.
    *   **Device Property Push**  
        Device properties are divided into fixed frequency data (osd) and state data (state). The osd properties are reported at a fixed frequency of 2 HZ, while the state properties are reported when a property changes. We provide different handling strategies for different device properties and report them using different topics. The device properties are described separately in the [Aircraft Device Properties](/en/api-integration/api-reference/aircraft/drone-properties), [Dock Device Properties](/en/api-integration/api-reference/superdock-hangar/properties), and [Remote Controller Device Properties](/en/api-integration/api-reference/aircraft/drone-properties) sections.
    *   **Device Property Set**
        *   The setting of device properties is not yet fully covered; we will implement it gradually in the future.
        *   In the device properties sections, the read/write status of a property is indicated by "accessMode". A value of "rw" indicates that the property can be set.
        *   Device property setting only supports setting a single property field. For example, the `aircraft distance limit status (distance_limit_status)` property includes two fields: `whether distance limit is enabled (state)` and `distance limit (distance-limit)`. When setting the aircraft distance limit status property, the set command needs to be sent twice.
