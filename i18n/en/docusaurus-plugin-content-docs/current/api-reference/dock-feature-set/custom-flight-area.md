---
sidebar_position: 11
---

# Custom Flight Area [In Adaptation]

## Function Overview

The Cloud API adds custom flight area functionality. Users can designate sensitive locations as restricted zones and synchronize this information with the Docks within the project. When the drone performs a task, it automatically bypasses the restricted zones, ensuring the safety and compliance of operations. This function defines the aircraft's flight area via the custom flight area file. **Click to download the [Custom Flight Area File Template](/files/api-reference/custom-flight-area-template.json)**.

This function allows users to plan custom flight areas on the map. There are two types of custom flight areas:

1.  Custom Operation Area: Within the custom operation area, the aircraft can take off and perform tasks but cannot fly out of the area.
2.  Custom Restricted-Flight Area: Outside the custom restricted-flight area, the aircraft can operate but cannot fly into the area.

## Interaction Sequence Diagram

```mermaid
sequenceDiagram

    participant geo_service as Cloud Server
    participant Dock as SuperDock
    participant Drone as Aircraft
    participant web as Web Page

    geo_service -->> geo_service: Package custom flight area file and upload to the storage bucket
    geo_service -->> Dock: Notify custom flight area file update <br/>Topic: thing/product/{gateway_sn}/services <br/>Method: flight_areas_update
    Dock -->> geo_service: Retrieve custom flight area file information <br/>Topic: thing/product/{gateway_sn}/requests <br/>Method: flight_areas_get
    geo_service -->> Dock: Return the latest custom flight area information from the cloud
    Dock -->> Drone: Turn on the aircraft and request to upgrade custom flight area data, carrying the file download URL and file MD5
    Drone -->> Dock: Return the custom flight area file information of the aircraft itself
    Dock -->> Dock: Check the custom flight area file version
    alt File version matches
       Dock -->> geo_service: Report synchronization completion <br/>Topic: thing/product/{gateway_sn}/events <br/>Method: flight_areas_sync_progress
       geo_service -->> web: Return synchronization completed state 
    else File version does not match (cloud version prevails if inconsistent)
       Dock -->> geo_service: Report synchronization in progress, enter data synchronization upgrade
       Dock -->> Drone: Download the latest file from the storage bucket and upload custom flight area data
       Drone -->> Dock: Send custom flight area synchronization progress state
       Dock -->> geo_service: Report custom flight area synchronization progress state <br/>Topic: thing/product/{gateway_sn}/events <br/>Method: flight_areas_sync_progress
       geo_service -->> geo_service: Local state persistence processing
       geo_service -->> web: Push the latest custom flight area synchronization progress state
    end
    Drone -->> Dock: Aircraft pushes flight area information to the Dock
    Dock -->> geo_service: Push flight area alarm information <br/>Topic: thing/product/{gateway_sn}/events <br/>Method: flight_areas_drone_location
    geo_service -->> web: Report aircraft and various area alarm information
```

## Detailed API Implementation

[Custom Flight Area](/en/api-integration/api-reference/superdock-hangar/custom-flight-area)
