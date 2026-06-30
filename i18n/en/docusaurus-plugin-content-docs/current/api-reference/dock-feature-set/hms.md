---
sidebar_position: 6
---

# HMS Function

## Functional Overview

The purpose of opening the HMS function in the Cloud API is to display device problems in the cloud, improve users' perception and handling of risks, and ensure operational safety.

> **Note:** HMS reports complete alarm information. If an alarm reported in the previous HMS report disappears in the current HMS report, it means this alarm has been resolved.

### Alarm copy query

Users have to splice the `Copy Key` from the fields of the reported protocol. Based on the `Copy Key`, users can query the corresponding alarm copy in the `alarm copy query json file`. The splicing rules differ depending on the alarming device.

*   Alarm copy query json file: [hms.json](/files/api-reference/hms.json).

*   Splicing rules and examples:
    *   `{code}` is the alarm code, and `{in_the_sky}` indicates whether the device is in flight. Both can be obtained from the fields of the protocol. The fields of the HMS function protocol and their explanations can be found in [Server API > HMS Function](/en/api-integration/api-reference/superdock-hangar/hms).
    *   If it is an alarm from a Dock device, `dock_tip_` should be spliced before `{code}`. Dock splicing logic: `dock_tip_{code}`.
        Taking the error code `0x16100083` as an example, the Copy Key is `dock_tip_0x16100083`.
    *   If it is an alarm from the aircraft, the user needs to splice the `Copy Key` by themselves. Aircraft splicing logic: `fpv_tip_{code}_{in_the_sky}`.
        Taking the error code `0x16100083` as an example:
        *   If `in_the_sky` in the protocol is 0, it means that whether the device is in flight or on the ground, the same Copy Key `fpv_tip_0x16100083` is used.
        *   If `in_the_sky` in the protocol is 1, when the device is in flight, the Copy Key is `fpv_tip_0x16100083_in_the_sky`. When the device is on the ground, the Copy Key is `fpv_tip_0x16100083`.

### Alarm copy replacement

As seen in the alarm copy query json file [hms.json](/files/api-reference/hms.json), the queried alarm copy may contain content that needs to be replaced, such as "%alarmid" and "%index".

Replacement rules and examples:

*   The content used for replacement can be obtained from the "args" field of the HMS function protocol. For the explanation of the args field, the complete enumeration of variables under the args field, and the introduction of variables, refer to [HMS Function](/en/api-integration/api-reference/superdock-hangar/hms). For example, the variables include `alarmid`, `sensor_index`, `component_index`, and so on.

*   Aircraft alarm copy replacement rules:
    1.  If the text contains "%alarmid", replace it with a specific hexadecimal alarmid, such as 0x16100001.
    2.  If the text contains "%index", replace it with sensor_index + 1.
    3.  If the text contains "%component_index", replace it with component_index + 1 (the final range is limited to between 1 and 2, because currently a maximum of gimbal 1, gimbal 2, and gimbal 3 are supported).
    4.  If the text contains "%battery_index" and sensor_index is 0, use "left" to replace "%battery_index"; otherwise, use "right".

*   Dock alarm copy replacement rules:
    1.  If the text contains "%dock_cover_index" and sensor_index is 0, use "left" to replace "%dock_cover_index"; otherwise, use "right".
    2.  If the text contains "%charging_rod_index", when sensor_index is 0, use "front" to replace "%charging_rod_index". When sensor_index is 1, use "back". When sensor_index is 2, use "left". When sensor_index is 3, use "right".

## Interaction Sequence

The device uploads the alarm information of the Dock device and the aircraft to the cloud through the `health alarm` protocol (Topic: `thing/product/{gateway_sn}/events` Method: `hms`). The cloud obtains the correct and complete alarm copy by splicing the Key, querying the json file, and rendering the copy, and then presents it on the web interface.

## Detailed API Implementation

[HMS Management](/en/api-integration/api-reference/superdock-hangar/hms)

*   Health Alarm
