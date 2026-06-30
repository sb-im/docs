---
sidebar_position: 12
---

# Multi-Dock Task [In Adaptation]

## Feature Overview

Some Docks support issuing multi-dock tasks. By configuring the takeoff Dock and the landing Dock through the task execution command, the aircraft can take off from and land on different Docks.

### Issuing the Multi-Dock Task Command

When the task issuing stage is reached according to the sequence diagram, if both the takeoff and landing Docks respond successfully, you can issue the `flighttask_execute` command to start the multi-dock task. The key parameters in the `flighttask_execute` command are described below. A new `multi_dock_task` field is added to configure and validate the takeoff and landing Dock parameters, where:

*   The `dock_infos` field contains the takeoff and landing Dock parameters. The two Docks selected to execute the multi-dock task must be set as the takeoff Dock and the landing Dock respectively.
    *   For the takeoff Dock, set the `dock_type` field to "takeoff", set the `sn` field to the takeoff Dock's device serial number, set the `index` field to the unique identifier of that Dock within this task, and fill the remaining fields with the latest reported values of the corresponding device properties of that takeoff Dock.
    *   For the landing Dock, set the `dock_type` field to "landing". The other fields are filled in the same way as for the takeoff Dock, and you must ensure the `index` values are not duplicated.
*   The `wireless_link_topo` field assembles the frequency pairing information of the three devices required to pair the aircraft with the two Docks. The `secret_code` and `center_node` fields are filled with the corresponding field values from the aircraft device property `wireless_link_topo`. The `leaf_nodes` field must distinguish between the frequency pairing information of the takeoff Dock and the landing Dock and fill them in separately; the `sdr_id` and `sn` fields are filled with the takeoff Dock and the landing Dock respectively. The `control_source_index` field of the takeoff Dock comes from the Dock device property, and the `control_source_index` of the landing Dock must be the opposite of the takeoff Dock's. For example, if the takeoff Dock reports a `control_source_index` of 1, then fill in 2 for this parameter on the landing Dock, and vice versa.

**Note:**

*   The two Docks executing the multi-dock task must be calibrated using a network RTK service from the same source, and [it is recommended to select "High-Precision RTK Task" for the wayline precision type `wayline_precision_type`](/en/api-integration/api-reference/superdock-hangar/wayline); otherwise there is a risk of crashing the aircraft.
*   You must ensure that an aircraft is present in the takeoff Dock at the moment the multi-dock task is executed.
*   During the execution of the multi-dock task, if the aircraft triggers the return-to-home logic or the user manually issues a return-to-home command, the aircraft will autonomously select the return-to-home target Dock based on the battery level and the Dock locations. The planned landing Dock has higher priority than the takeoff Dock, and the aircraft will by default use the planned landing Dock as the return-to-home target Dock. Only when the planned landing Dock is unreachable will the takeoff Dock be used as the return-to-home target Dock. If, during wayline execution, the user wants to designate a specific Dock as the return-to-home target Dock, the newly added protocol `return_specific_home` can be used.
*   During the execution of the multi-dock task, if an altitude limit zone is encountered, the aircraft will return to home and execute the default return-to-home logic. The altitude is determined relative to the takeoff Dock, while the logic for other restricted flight zones is consistent with that of a normal wayline task.
*   During the execution of the multi-dock task, the `{gateway_sn}` in the Topic for issuing the aircraft live streaming command `live_start_push` must be based on the `best_link_gateway` field currently reported by the aircraft. Moreover, to keep the aircraft's video stream continuous, when the aircraft's `best_link_gateway` property changes, you must re-issue the `live_start_push` command using the gateway sn pushed in the latest `best_link_gateway` property as the `{gateway_sn}` in the Topic of the `live_start_push` command.
*   During the execution of the multi-dock task, for downlink commands issued to the aircraft, such as pause/resume/return-to-home commands, the `{gateway_sn}` in the command's Topic must be based on the `best_link_gateway` currently reported by the aircraft, consistent with the live streaming command.
*   When executing the multi-dock task, once the takeoff and landing Docks have been set, the connection of Controller B will be preempted and disconnected.

## Interaction Sequence Diagram

IoT represents the IoT layer on the server side, used for device access, maintaining device status. Task Service represents the upper-layer business system on the server side, used for device task management and issuing task commands.

```mermaid
sequenceDiagram
    participant d1 as Dock A
    participant d2 as Dock B
    participant i as IoT
    participant u as Drone
    participant t as Task Service

    Note over d1,i: Property reporting
    d1 ->> i: Dock A reports<br/>RTK calibration source info rtcm_info<br/>Frequency pairing info wireless_link_topo<br/>Dock location info latitude, longitude, height, heading, home_position_is_valid<br/>Dock alternate landing point info alternate_land_point
    d2 ->> i: Dock B reports<br/>RTK calibration source info rtcm_info<br/>Frequency pairing info wireless_link_topo<br/>Dock location info latitude, longitude, height, heading, home_position_is_valid<br/>Dock alternate landing point info alternate_land_point
    u ->> i: Aircraft reports frequency pairing info wireless_link_topo

    Note over t,d1: Task issuing
    t ->> d1: Issue flighttask_prepare command
    t ->> d2: Issue flighttask_prepare command, with the same content as the command issued to Dock A
    d1 ->> t: Respond to flighttask_prepare
    d2 ->> t: Respond to flighttask_prepare

    alt A Dock responds with failure
        t ->> t: Do not issue the flighttask_execute command, update the task status to start failed
    else Both takeoff and landing Docks respond successfully
        t ->> d1: Issue the flighttask_execute command, see "Issuing the Multi-Dock Task Command" on this page for the content
        t ->> d2: Issue the flighttask_execute command, with the same content as the command issued to Dock A
    end

    Note over t,d1: Task execution
    loop Docks report execution progress

    note over d1, t: The server updates the execution status of the devices; Dock A and Dock B report simultaneously
      d1 ->> t: Dock A reports flighttask_progress
      t ->> t: Update task status, store the task status of each device
      d2 ->> t: Dock B reports flighttask_progress
      t ->> t: Update task status, store the task status of each device


    note over d1, t: The device side queries the execution status of the other Dock; Dock A and Dock B query simultaneously
        d1 ->> t: Dock A queries Dock B's task execution status flighttask_progress_get
        t ->> d1: Return the progress reported by Dock B's most recent flighttask_progress
        d2 ->> t: Dock B queries Dock A's task execution status flighttask_progress_get
        t ->> d2: Return the progress reported by Dock A's most recent flighttask_progress

    alt Dock A reports a terminal state
        t ->> d2: New protocol flighttask_stop, notify Dock B that the task has ended, end the task progress update loop
    else Dock B reports a terminal state
        t ->> d1: New protocol flighttask_stop, notify Dock A that the task has ended, end the task progress update loop
    end

    end
```

## Detailed Interface Implementation

*   [Dock device properties](/en/api-integration/cloud-api/device-types)
    *   wireless_link_topo (required)
    *   rtcm_info (required)
    *   latitude (required)
    *   longitude (required)
    *   height (required)
    *   heading (required)
    *   home_position_is_valid (required)
    *   alternate_land_point (required)
*   [Aircraft device properties](/en/api-integration/api-reference/aircraft/drone-properties)
    *   wireless_link_topo (required)
    *   best_link_gateway
*   [Wayline Management](/en/api-integration/api-reference/superdock-hangar/wayline)
    *   Service
        *   flighttask_execute (required)
        *   flighttask_stop (required)
        *   return_specific_home
    *   Requests
        *   flighttask_progress_get (required)
    *   Events
        *   return_home_info
