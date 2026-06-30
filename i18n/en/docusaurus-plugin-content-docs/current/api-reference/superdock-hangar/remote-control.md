---
sidebar_label: Remote Control [In Adaptation]
sidebar_position: 12.1
---

# Remote Control [In Adaptation]

# Event

## PSDK - Floating Window Push
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_psdk_floating_window_text`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by device | |
| floating_window_text | Floating window content | text | `{"length":""}` | |

**Example:**

```json
{
    "data": {
        "floating_window_text": "",
        "psdk_index": 0
    },
    "method": "drc_psdk_floating_window_text",
    "seq": 1
}
```

## Speaker - Audio Playback Progress
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_speaker_play_progress`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by device | |
| result | Result | enum_int | `{"0":"Success"}` | |
| status | Status | enum_string | `{"failed":"Failed","in_progress":"In progress","success":"Success"}` | |
| progress | Progress | struct | | |
| »step_key | Step | enum_string | `{"change_work_mode":"Working","download":"Download","encoding":"Converting","play":"Playing","tts_processing":"TTS Play","upload":"Upload"}` | |
| »percent | Progress | int | `{"max":"100","min":"1"}` | |
| md5 | Verification | string | | |

## PSDK - Status Report
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_psdk_state_info`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by device | |
| psdk_type | PSDK type | enum_int | `{"4":"Third party","5":"DJI developed"}` | |
| psdk_name | Name | enum_string | `{"Searchlight":"Searchlight","Speaker":"Speaker"}` | |
| psdk_sn | SN | text | `{"length":""}` | |
| psdk_version | Version | text | `{"length":""}` | |
| psdk_lib_version | Lib version | text | `{"length":""}` | |
| speaker | Speaker | struct | | |
| »work_mode | Working mode | int | `{"0": "TTS mode", "1":"Real-time speaking","4": "Play while transmitting", "5":"Wayline speaking"}` | |
| »play_mode | Play mode | enum_int | `{"0":"Single play","1":"Loop play"}` | |
| »play_volume | Volume | int | `{"max":"100","min":"1"}` | |
| »play_file_name | File name | text | `{"length":""}` | |
| »play_file_md5 | File verification | text | `{"length":""}` | |
| »tts_volume | TTS playback volume | int | `{"max":"100","min":"1"}` | |
| »tts_type | TTS playback type | enum_int | `{"0":"Male voice","1":"Female voice"}` | |
| »tts_language | Language | enum_int | `{"0":"Chinese","1":"English"}` | |
| »tts_speed | Speech rate | int | `{"max":"100","min":"1"}` | |
| light | Searchlight | struct | | |
| »work_mode | Working mode | int | | |
| »brightness | Brightness | int | | |
| »calibration_status | Calibration | enum_int | `{"0":"Calibration Complete","1":"Calibrating","2":"Calibration Failed"}` | |
| »calibration_progress | Calibration progress | int | | |
| »left_value | Left light fine-tune value | int | `{"max":"+3°","min":"-3"}` | |
| »right_value | Right light fine-tune value | int | `{"max":"+3°","min":"-3"}` | |
| »wide_field_mode | Whether the Searchlight Wide Field of View Mode is enabled | bool | `{"false":"Disabled","true":"Enabled"}` | |
| »light_gimbal_control | Whether the Searchlight Gimbal Linkage is enabled | bool | `{"false":"Disabled","true":"Enabled"}` | |
| values | Custom value space position | struct | | |
| »index | index | int | | |
| »value | value | int | | |

## PSDK - UI Resource Package Upload
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_psdk_ui_resource`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by device | |
| psdk_ready | Whether ready | enum_int | `{"0":"Not ready","1":"Ready"}` | |
| object_key | OSS object | text | `{"length":""}` | |

**Example:**

```json
{
    "data": {
        "object_key": "b4cfaae6-bd9d-4cd0-8472-63b608c3c581/SN/psdk_config/0/2023_6_7_1103_XXXXXX.tar.gz",
        "psdk_index": 0,
        "psdk_ready": 1
    },
    "method": "drc_psdk_ui_resource",
    "seq": 1
}
```

## Aircraft State Information Report
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_drone_state_push`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| stealth_state | Stealth mode state | bool | `{"0":"Disabled","1":"Enabled"}` | |
| night_lights_state | Night flight light state | bool | `{"0":"Disabled","1":"Enabled"}` | |
| mode_code | Aircraft state | enum_int | `{"0":"Standby","1":"Takeoff preparation","2":"Takeoff preparation completed","3":"Manual flight","4":"Automatic takeoff","5":"Wayline flight","6":"Panorama","7":"Intelligent tracking","8":"ADS-B avoidance","9":"Automatic returning to home","10":"Automatic landing","11":"Forced landing","12":"Three-blade landing","13":"Upgrading","14":"Not connected","15":"APAS","16":"Virtual stick state","17":"Live Flight Controls"}` | |

**Example:**

```json
{
    "data": {
        "mode_code": 0,
        "night_lights_state": 0,
        "stealth_state": 0
    },
    "method": "drc_drone_state_push",
    "seq": 1
}
```

## Camera Status Report
Pushes camera information when it changes (`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`).

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_camera_state_push`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}` |
| camera_state | Camera status information | struct | | |
| »camera_mode | Camera status | enum_int | `{"0":"Capturing","1":"Recording","2":"Smart Low-Light","3":"Panorama","4":"Timed Shot"}` | |
| »interval_photo_interval | Time interval of Timed Shot | int | `{"unit_name":"Second / s"}` | |
| »video_resolution | Video resolution | enum_string | `{"0":"1920*1080 ","1":"3840*2160"}` | |
| »linkage_zoom_state | Link Zoom status | bool | `{"0":"Closed","1":"Opened"}` | |
| »photo_size | Photo size | enum_int | `{"0":"Default","1":"Extra small","2":"Small","3":"Medium","4":"Large","5":"Extra large"}` | |
| »record_time | Video recording duration | int | `{"unit_name":"Second / s"}` | |
| »recording_state | Recording status | enum_int | `{"0":"Idle","1":"Recording"}` | |
| »photo_state | Capturing status | enum_int | `{"0":"Idle","1":"Capturing"}` | |
| »remain_photo_num | Remaining number of photos | int | | |
| »remain_record_duration | Remaining time of recording | int | `{"unit_name":"Second / s"}` | |
| »night_mode_settings | Night mode settings | struct | | |
| »»night_mode | Night mode status | enum_int | `{"0":"Disabled","1":"Enabled","2":"Auto"}` | Automatic mode automatically switches according to ambient light |
| »»denoise_level | Noise reduction level | enum_int | `{"0":"Disabled","1":"Standard noise reduction","2":"Enhanced noise reduction","3":"Super noise reduction"}` | Enhanced noise reduction will affect frame rate |
| »»night_vision_enable | Night Vision enable | bool | `{"false":"Disabled","true":"Enabled"}` | Only works when zoom is 7x or above |
| »»infrared_fill_light_enable | Near infrared fill light enable | bool | `{"false":"Disabled","true":"Enabled"}` | Only works when zoom is 7x or above |
| »»night_scene_mode_suggestion | Night scene suggestions | enum_int | `{"0":"No suggestions","1":"It is recommended to turn on night mode"}` | Recommendations based on ambient light |
| »»is_working | Is it in effect | enum_int | `{"0":"Not effective","1":"Taking effect"}` | Actual working status |
| media_storage | Media storage information | struct | | |
| »photo_storage_settings | Set of photo storage settings | array | `{"size": -, "item_type": text}` | Capturing storage types are `{current, vision, ir}`. Multiple selections are available based on the models. |
| »video_storage_settings | Set of video storage settings | array | `{"size": -, "item_type": text}` | Video storage types are `{current, vision, ir}`. Multiple selections are available based on the models. |

**Example:**

```json
{
    "data": {
        "camera_state": {
            "camera_mode": 0,
            "interval_photo_interval": 2.5,
            "linkage_zoom_state": 0,
            "photo_size": 1,
            "photo_state": 0,
            "record_time": 0,
            "recording_state": 0,
            "remain_photo_num": 6727,
            "remain_record_duration": 0,
            "video_resolution": 0,
            "night_mode_settings": {
                "night_mode": 0,
                "denoise_level": 1,
                "night_vision_enable": true,
                "infrared_fill_light_enable": true,
                "night_scene_mode_suggestion": 1,
                "is_working": 1
              }
        },
        "media_storage": {
            "photo_storage_settings": [
                "current",
                "ir"
            ],
            "video_storage_settings": [
                "current",
                "ir"
            ]
        },
        "payload_index": "81-0-0"
    },
    "method": "drc_camera_state_push",
    "seq": 1
}
```

## Camera OSD Push
Used to push camera parameter information (`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`).

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_camera_osd_info_push`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | `{"length":""}` | Camera enumeration value. A non-standard device_mode_key, in the format `{type-subtype-gimbalindex}` |
| wide_lense | Wide-angle lens info | struct | | |
| »wide_exposure_mode | Wide-angle lens exposure mode | enum_int | `{"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}` | Current configuration of the wide-angle lens exposure mode |
| »wide_iso | Wide-angle lens ISO | enum_int | `{"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}` | Current configuration of the wide-angle lens ISO |
| »wide_shutter_speed | Wide-angle lens shutter speed | enum_int | `{"0":"1/8000 s"... "65534":"Auto"}` | Current configuration of the wide-angle lens shutter speed |
| »wide_exposure_value | Wide-angle lens exposure value | enum_int | `{"1":"-5.0EV"... "31":"5.0EV","255":"FIXED"}` | Current configuration of the wide-angle lens exposure value |
| »wide_aperture_value | Aperture value | enum_int | `{"0":"F_AUTO"... "25600":"F256"}` | The range varies depending on the model |
| zoom_lense | Zoom lens info | struct | | |
| »zoom_exposure_mode | Zoom lens exposure mode | enum_int | `{"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}` | Current configuration of the zoom lens exposure mode |
| »zoom_iso | Zoom lens ISO | enum_int | `{"0":"Auto"... "255":"FIXED"}` | Current configuration of the zoom lens ISO |
| »zoom_shutter_speed | Zoom lens shutter speed | enum_int | `{"0":"1/8000 s"... "65534":"Auto"}` | Current configuration of the zoom lens shutter speed |
| »zoom_exposure_value | Zoom lens exposure value | enum_int | `{"1":"-5.0EV"... "255":"FIXED"}` | Current configuration of the zoom lens exposure value |
| »zoom_focus_mode | Zoom lens focus mode | enum_int | `{"0":"MF","1":"AFS","2":"AFC"}` | |
| »zoom_focus_value | Zoom lens focus value | int | | |
| »zoom_max_focus_value | Zoom lens maximum focus value | int | | |
| »zoom_min_focus_value | Zoom lens minimum focus value | int | | |
| »zoom_calibrate_farthest_focus_value | Zoom lens calibrated farthest focus value | int | | Focused value at the farthest clear position |
| »zoom_calibrate_nearest_focus_value | Zoom lens calibrated nearest focus value | int | | Focused value at the nearest clear position |
| »zoom_focus_state | Zoom lens focus status | int | | |
| »zoom_factor | Zoom ratio | int | | |
| »zoom_aperture_value | Zoom lens aperture value | enum_int | `{"440":"F4.4"}` | The range varies depending on the model |
| measure_target | Target ranging and height measurement | struct | | |
| »measure_target_longitude | Laser ranging target longitude | double | `{"max":"180","min":"-180","unit":"Degrees / °"}` | |
| »measure_target_latitude | Laser ranging target latitude | double | `{"max":"90","min":"-90","unit":"Degrees / °"}` | |
| »measure_target_altitude | Laser ranging target altitude | double | `{"unit":"Meters / m"}` | |
| »measure_target_distance | Laser ranging distance | double | `{"unit":"Meters / m"}` | |
| ir_lense | Infrared information | struct | | |
| »screen_split_enable | Whether split screen is enabled | bool | `{"false":"Disable split screen","true":"Enable split screen"}` | |
| »ir_zoom_factor | Infrared zoom ratio | float | `{"max":20,"min":2}` | Infrared zoom ratio |
| »thermal_supported_palette_styles | Collection of supported palette styles by the device | array | `{"size": -, "item_type": enum_int}` | The capability of supported styles varies for different devices |
| »thermal_gain_mode | Gain mode | enum_int | `{"0":"Auto","1":"Low Gain, temperature measurement range 0°C-500°C","2":"High Gain, temperature measurement range -20°C-150°C"}` | Low gain provides a larger temperature measurement range, while high gain offers higher temperature measurement accuracy |
| »thermal_isotherm_state | Whether isotherm is enabled | enum_int | `{"0":"Disabled","1":"Enabled"}` | Isotherm allows users to observe the content of temperature ranges of interest, making objects in the temperature range more prominent |
| »thermal_isotherm_upper_limit | Upper limit of the temperature range for isotherm | int | `{"unit":"Celsius / °C"}` | Effective only when isotherm is enabled |
| »thermal_isotherm_lower_limit | Lower limit of the temperature range for isotherm | int | `{"unit":"Celsius / °C"}` | Effective only when isotherm is enabled |
| »thermal_global_temperature_min | Minimum temperature measured in the overall view | float | `{"unit":"Celsius / °C"}` | |
| »thermal_global_temperature_max | Maximum temperature measured in the overall view | float | `{"unit":"Celsius / °C"}` | |
| liveview | Liveview area information | struct | | |
| »liveview_world_region | Field of view (FOV) region in liveview | struct | | The field of view of the zoom camera relative to that of the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the upper-left corner of the lens. |
| »»left | X-axis starting point in the upper-left corner | float | | X-axis starting point in the upper-left corner |
| »»top | Y-axis starting point in the upper-left corner | float | | Y-axis starting point in the upper-left corner |
| »»right | X-axis starting point in the lower-right corner | float | | X-axis starting point in the lower-right corner |
| »»bottom | Y-axis starting point in the lower-right corner | float | | Y-axis starting point in the lower-right corner |

**Example:**

```json
{
    "data": {
        "ir_lense": {
            "ir_zoom_factor": 2,
            "screen_split_enable": false,
            "thermal_current_palette_style": 11,
            "thermal_gain_mode": 2,
            "thermal_global_temperature_max": 40.0373764038086,
            "thermal_global_temperature_min": 31.65154457092285,
            "thermal_isotherm_lower_limit": -20,
            "thermal_isotherm_state": 0,
            "thermal_isotherm_upper_limit": 150
        },
        "liveview": {
            "liveview_world_region": {
                "bottom": 0.5609484910964966,
                "left": 0.43238765001297,
                "right": 0.5639060735702515,
                "top": 0.433199942111969
            }
        },
        "measure_target": {
            "measure_target_altitude": 34.60000228881836,
            "measure_target_distance": 0,
            "measure_target_error_state": 1,
            "measure_target_latitude": 22.907619920797877,
            "measure_target_longitude": 113.70345426744846
        },
        "payload_index": "81-0-0",
        "wide_lense": {
            "wide_aperture_value": 10,
            "wide_exposure_mode": 1,
            "wide_exposure_value": 16,
            "wide_iso": 8,
            "wide_shutter_speed": 45
        },
        "zoom_lense": {
            "zoom_aperture_value": 10,
            "zoom_calibrate_farthest_focus_value": 34,
            "zoom_calibrate_nearest_focus_value": 64,
            "zoom_exposure_mode": 1,
            "zoom_exposure_value": 16,
            "zoom_factor": 6.999994214380596,
            "zoom_focus_mode": 0,
            "zoom_focus_state": 0,
            "zoom_focus_value": 34,
            "zoom_iso": 8,
            "zoom_max_focus_value": 64,
            "zoom_min_focus_value": 33,
            "zoom_shutter_speed": 45
        }
    },
    "method": "drc_camera_osd_info_push",
    "seq": 1
}
```

## AI Status Report
Used to push information related to the AI target recognition feature (`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`).

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Direction:** up
*   **Method:** `drc_ai_info_push`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| identify_on | Recognition switch | enum_int | `{"0":"Off","1":"On"}` | Whether to enable the target recognition feature. |
| spotlight_zoom_on | Follow switch | enum_int | `{"0":"Off","1":"On"}` | Whether to enable the AI follow feature. |
| ai_spotlight_zoom | AI follow status | struct | | AI follow status and reason information. |
| »state | Follow status | enum_int | `{"0":"Idle","1":"Waiting for selection","2":"Waiting for confirmation","3":"Following"}` | Current AI follow status. |
| »state_reason | Status reason | enum_int | `{"0":"Normal","1":"Too close to target", ... "168":"Remote controller/image transmission signal lost"}` | Description of the current status or exit reason. |
| ai_model_list | Model list | array | `{"item_type":"struct"}` | List of AI models available on the device. |
| »index | Model index | int | `{"min":0}` | |
| »signed_name | Model name | text | `{"length":""}` | Model signature name. |
| selected_ai_model | Currently selected model | struct | | Information about the currently selected AI model. |
| »index | Model index | int | `{"min":0}` | Index of the currently selected model. |
| »score | Confidence | int | `{"max":"100","min":"0","step":"1"}` | Confidence of the current recognition result. |
| »score_mode | Confidence mode | enum_int | `{"0":"Invalid value","1":"Counting mode","2":"Search and rescue mode","3":"User-defined mode"}` | |
| »image_source | Image source | enum_list | `{"1":"Wide-angle","2":"Zoom","3":"Infrared","7":"Visible light"}` | Bitstreams supported by the model. |
| »digital_effect | Color palette mode | enum_list | `{"0":"White hot","1":"Black hot","2":"Red hot"}` | Infrared color palette types supported by the model. |
| »filters | Filters | array | `{"size": -, "item_type": int}` | Current target filter list. |
| »labels | Recognition labels | array | `{"item_type":"struct"}` | Set of labels the model can recognize. |
| »»index | Label ID | int | `{"min":0}` | Unique identifier of the label. |
| »»name | Label name | text | `{"length":""}` | |

**Example:**

```json
{
  "seq": 1,
  "method": "drc_ai_info_push",
  "data": {
    "identify_on": 1,
    "spotlight_zoom_on": 1,
    "ai_spotlight_zoom": {
      "state": 0,
      "state_reason": 0
    },
    "ai_model_list": [
      {
        "index": 0,
        "signed_name": "DJI"
      },
      {
        "index": 128,
        "signed_name": "Highway scene recognition"
      }
    ],
    "selected_ai_model": {
      "index": 0,
      "score": 100,
      "score_mode": 1,
      "image_source": [1, 2, 3],
      "digital_effect": [0, 1, 2],
      "filters": [1, 2, 3],
      "labels": [
        {
          "index": 0,
          "name": "Motorcycle"
        },
        {
          "index": 1,
          "name": "Bicycle"
        }
      ]
    },
    "ai_wayline_state": {
      "sequence_shot": true,
      "wait_control": true,
      "record": true,
      "normal_shot": true,
      "count_down_time": 23,
      "alert_uuid": "xxxxxxxxxxxxxxx"
    }
  }
}
```

***

# Service

## Night Scene Mode Settings
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Direction:** down
*   **Method:** `drc_camera_night_mode_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enum | text | `{"length":""}` | Camera enum value. M4D (98-0-0) and M4TD (99-0-0) are recommended. |
| mode | Night scene mode | enum_int | `{"0":"Off","1":"On","2":"Auto"}` | Auto mode turns on automatically based on the amount of incoming light. |

**Example:**

```json
{
    "seq": 1,
    "method": "drc_camera_night_mode_set",
    "data": {
        "payload_index": "99-0-0",
        "mode": 0
    }
}
```

**Response (Up):**

*   **Topic:** `thing/product/{gateway_sn}/drc/up`
*   **Method:** `drc_camera_night_mode_set`

| Column | Name | Type | constraint | Description |
| :---: | :---: | :---: | :---: | :---: |
| result | Return code | int | | A non-zero value indicates an error |

## Noise Reduction Level Settings
`seq` is an incrementing sequence number that ensures commands are executed in order; it is at the same level as `data`.

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Direction:** down
*   **Method:** `drc_camera_denoise_level_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :---: | :---: | :---: | :---: | :---: |
| payload_index | Camera enum | text | `{"length":""}` | M4D (98-0-0) and M4TD (99-0-0) are recommended |
| level | Noise reduction level | enum_int | `{"2":"Enhanced noise reduction 15fps","3":"Ultra noise reduction 5fps"}` | Effective only after night scene mode is manually enabled |

**Example:**

```json
{
    "seq": 1,
    "method": "drc_camera_denoise_level_set",
    "data": {
        "payload_index": "99-0-0",
        "level": 2
    }
}
```

## Black-and-White Night Vision Enable

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_camera_night_vision_enable`

**Data:**

| Column | Name | Type | constraint | Description |
| :---: | :---: | :---: | :---: | :---: |
| payload_index | Camera enum | text | `{"length":""}` | M4TD (99-0-0) is recommended |
| enable | Enable status | bool | `{"false":"Off","true":"On"}` | Effective only at zoom 7x and above |

## Near-Infrared Supplementary Light Enable

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_infrared_fill_light_enable`

**Data:**

| Column | Name | Type | constraint | Description |
| :---: | :---: | :---: | :---: | :---: |
| payload_index | Camera enum | text | `{"length":""}` | M4TD (99-0-0) is recommended |
| enable | Enable status | bool | `{"false":"Off","true":"On"}` | Effective only at zoom 7x and above |

## Forced Landing
Once called, the aircraft descends directly to the ground regardless of obstacles. Use the `drone_emergency_stop` command to cancel. After landing is complete, the aircraft can only be retrieved manually. Use with caution!

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Direction:** down
*   **Method:** `drc_force_landing`
*   **Data:** null

## Emergency Stop

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Direction:** down
*   **Method:** `drone_emergency_stop`
*   **Data:** null

## Emergency Landing
Once called, the aircraft begins to land. When obstacle avoidance is enabled, landing may be aborted because obstacle avoidance is triggered. Use the `drone_emergency_stop` command to cancel.

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Direction:** down
*   **Method:** `drc_emergency_landing`
*   **Data:** null

## Searchlight—Brightness Settings

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_light_brightness_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |
| group | Type | enum_int | `{"0":"Main Light"}` | |
| brightness | Brightness | int | `{"max":100","min":"1"}` | Brightness value |

## Searchlight—Mode Settings

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_light_mode_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |
| group | Type | enum_int | `{"0":"Main Light"}` | |
| mode | Mode | enum_int | `{ "0": "Off", "1": "Constant", "2": "Strobe", "3": "Fast strobe", "4": "Alternating strobe" }` | |

## Searchlight—Left/Right Angle Fine Tuning

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_light_fine_tuning_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |
| position | Light | enum_int | `{"0":"Left Light","1":"Right Light"}` | |
| value | Value | int | `{"max":"+3°","min":"-3"}` | |
| saved | Whether to save | bool | `{"0":"No","1":"Yes"}` | |

## Searchlight—Gimbal Calibration

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_light_calibration`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |

## Speaker—Mode Settings

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_speaker_play_mode_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |
| play_mode | Speaker playback mode | enum_int | `{"0":"Play once","1":"Loop playback (single track)"}` | |

## Speaker—TTS Announcement Settings

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_speaker_tts_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |
| volume | Volume | int | `{"max":"100","min":0}` | |
| type | Type | enum_int | `{"0":"Male voice","1":"Female voice"}` | |
| language | Language | enum_int | `{"0":"Chinese","1":"English"}` | |
| speed | Speech rate | int | `{"max":100,"min":"0"}` | |

## Speaker—Set Volume

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_speaker_play_volume_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |
| play_volume | Speaker volume | int | `{"max":"100","min":"1"}` | |

## Speaker—Stop Playback

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_speaker_play_stop`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |

## Speaker—Replay

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_speaker_replay`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Pushed by the device | |

## Speaker—Play TTS Text

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_speaker_tts_play_start`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Set as pushed by the device | |
| tts | TTS text | struct | | |
| »name | File name | text | `{"length":""}` | |
| »text | Text content | text | `{"length":""}` | |
| »md5 | MD5 checksum of the file content | text | `{"length":""}` | Used as the unique identifier of the Dock |
## PSDK - Send Text Box Content

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_psdk_input_box_text_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | | |
| value | Text content | text | `{"length":"128"}` | |

## PSDK - Set Widget Value

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_psdk_widget_value_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| psdk_index | PSDK payload device index | int | Push by device | |
| index | Widget number | int | | |
| value | Widget value | int | | Switches, progress, and other widget values are defined by the developer |

## DRC Initial State Subscription

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_initial_state_subscribe`
*   **Data:** `null`

## Night Flight Light Settings

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_night_lights_state_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| night_lights_state | Status | enum_int | `{"0":"Disabled","1":"Enabled"}` | |

## Flight Control—Discreet Mode
Set the aircraft's discreet mode to turn off all aircraft lights.

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_stealth_state_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| stealth_state | Discreet mode | enum_int | `{"0":"Disabled","1":"Enabled"}` | Discreet mode state |

## Payload Control—Camera Aperture

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_camera_aperture_value_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | | |
| camera_type | Camera type | enum_string | `{"wide":"Wide angle","zoom":"Zoom"}` | |
| aperture_value | Aperture value | enum_int | `{"0":"F_AUTO","50":"F0_5","70":"F0_7","80":"F0_8","90":"F0_9","95":"F0_95","100":"F1_0","110":"F1_1","120":"F1_2","140":"F1_4","160":"F1_6","170":"F1_7","180":"F1_8","200":"F2","220":"F2_2","240":"F2_4","250":"F2_5","280":"F2_8","320":"F3_2","330":"F3_3","340":"F3_4","350":"F3_5","400":"F4","440":"F4_4","450":"F4_5","480":"F4_8","500":"F5","560":"F5_6","630":"F6_3","670":"F6_7","680":"F6_8","710":"F7_1","800":"F8","900":"F9","950":"F9_5","960":"F9_6","1000":"F10","1100":"F11","1300":"F13","1400":"F14","1600":"F16","1800":"F18","1900":"F19","2000":"F20","2200":"F22","2500":"F25","2700":"F27","2900":"F29","3200":"F32","3600":"F36","3800":"F38","4000":"F40","4500":"F45","5100":"F51","5400":"F54","5700":"F57","6400":"F64","7200":"F72","7600":"F76","8000":"F80","9000":"F90","10700":"F107","12800":"F128","18000":"F180","25600":"F256"}` | Depending on the aircraft model, the range may vary |

## Payload Control—Camera Shutter

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_camera_shutter_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | | |
| camera_type | Camera type | enum_string | `{"wide":"Wide angle","zoom":"Zoom"}` | |
| shutter_value | Shutter settings | enum_int | `{"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","60":"Auto"}	` | Depending on the aircraft model, the range may vary |

## Payload Control—ISO Settings

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_camera_iso_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | | |
| camera_type | Camera type | enum_string | `{"wide":"Wide angle","zoom":"Zoom"}` | |
| iso_value | ISO value | enum_int | `{"0":"ISO_AUTO","2":"ISO_50","3":"ISO_100","4":"ISO_200","5":"ISO_400","6":"ISO_800","7":"ISO_1600","8":"ISO_3200","9":"ISO_6400","10":"ISO_12800","11":"ISO_25600","12":"ISO_51200","13":"ISO_102400","255":"ISO_FIXED"}` | Depending on the aircraft model, the range may vary |

## Payload Control—Mechanical Shutter
Allows users to manually close the mechanical shutter to prolong the device's service life. Mechanical shutter switch for Matrice 3D wide-angle mode.

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_camera_mechanical_shutter_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | | |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle"}` | |
| mechanical_shutter_state | Whether mechanical shutter is enabled | enum_int | `{"0":"Disabled","1":"Enabled"}` | Enable or disable the mechanical shutter |

## Payload Control—Lens Dewarp
Eliminates vignetting in the user's wide-angle view. Lens dewarp for Matrice 3D wide-angle mode.

*   **Topic:** `thing/product/{gateway_sn}/drc/down`
*   **Method:** `drc_camera_dewarping_set`

**Data:**

| Column | Name | Type | constraint | Description |
| :--- | :--- | :--- | :--- | :--- |
| payload_index | Camera enumeration | text | | |
| camera_type | Camera type | enum_string | `{"wide":"Wide-angle"}` | |
| dewarping_state | Whether dewarp is enabled | enum_int | `{"0":"Disabled","1":"Enabled"}` | Enable or disable dewarp |
