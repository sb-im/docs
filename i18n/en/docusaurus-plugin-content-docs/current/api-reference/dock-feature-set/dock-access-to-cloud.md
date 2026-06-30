---
sidebar_position: 1
---

# Dock Cloud Access

## Overview

SuperDock Dock cloud access uses the SuperDock Local Client program to access the cloud, connecting the Dock and the cloud service over MQTT.

## Interaction Sequence

```mermaid
sequenceDiagram
    participant pilot as Local Client
    participant client as SuperDock
    participant server as Cloud Server

    note over pilot: Enter the MQTT gateway address, MQTT username and password
    client ->> server: MQTT connection established

    note over pilot, server: License verification

    client ->> server: Request parameters required for License verification Topic: thing/product/{gateway_sn}/requests<br/>Method: config
    server -->> client: Return parameters Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: config

    note over client: License verification succeeded
    opt If verification fails, the subsequent organization binding process will not proceed
        note over client: License verification failed
        client -x server: MQTT connection closed
    end

    note over pilot, server: Organization binding
    pilot ->> client: Request device binding information
    client ->> server: Get device binding information Topic: thing/product/{gateway_sn}/requests<br/>Method: airport_bind_status
    note over server: Query device binding information
    server -->> client: Return query result Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: airport_bind_status

    opt If the device is not bound
        pilot ->> client: Request the organization information corresponding to the device binding code
        client ->> server: Request the corresponding organization information Topic: thing/product/{gateway_sn}/requests<br/>Method: airport_organization_get
        note over server: Query the corresponding organization information
        server -->> client: Return query result Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: airport_organization_get
        pilot ->> client: Bind the device to the corresponding organization using the device binding code
        client ->> server: Bind device to organization Topic: thing/product/{gateway_sn}/requests<br/>Method: airport_organization_bind
        note over server: Bind device to organization
        server -->> client: Return binding result Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: airport_organization_bind
    end
```

## Interface Implementation Details

*   [Configuration Update](/en/api-integration/api-reference/superdock-hangar/config)
    *   Get configuration
*   [Organization Management](/en/api-integration/api-reference/superdock-hangar/organization)
    *   Get device binding information
    *   Query the organization information to which the device is bound
        If the device is bound successfully, the Dock and aircraft will be bound to the organization corresponding to the device binding code. Developers can design how to verify and obtain the organization name for binding using the device binding code and organization ID entered on the Pilot side. In the Dock cloud access Demo we provide, the device binding code is filled in by default, for reference only.
    *   Bind the corresponding organization using the device binding code
