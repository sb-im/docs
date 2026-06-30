---
sidebar_position: 4
---

# Media Management

## Function Overview

The media library feature set is mainly the process in which the SuperDock Dock downloads the media files (photos/videos) from the aircraft to the local storage of the remote controller/Dock, and then uploads them to a third-party server over the network. Media upload includes both auto upload and manual upload; for the Dock, only auto upload is available.


## Interaction Sequence Diagram

```mermaid
sequenceDiagram

    participant client  as SuperDock
    participant server as Cloud Server
    participant oss as Object Storage

    client ->> server : Get temporary credentials for upload<br/>Topic: thing/product/{gateway_sn}/requests<br/>Method: storage_config_get
    server -->> client : Server side sends temporary credentials<br/>Topic: thing/product/{gateway_sn}/requests_reply<br/>Method: storage_config_get
    client ->> oss : Execute file upload
    oss -->> client : Return uploading result

    activate server
    activate oss
    client ->> server : Media file upload result report<br/>Topic: thing/product/{gateway_sn}/events<br/>Method: file_upload_callback
    server -->> client : Return uploading result<br/>Topic: thing/product/{gateway_sn}/events_reply<br/>Method: file_upload_callback
    deactivate server
    deactivate oss
```

## Detailed API Implementation

[Media Management (MQTT)](/en/api-integration/api-reference/superdock-hangar/file)

*   **Obtain Temporary Credential**  
    For each media file upload, you need to obtain a temporary file upload credential from the server, so that the Dock will bring this credential to the object storage service for verification when uploading.
*   **Report Media File Upload Result**  
    After the media file transfer is finished, the Dock will call this interface to inform the server of the corresponding media file upload result.
