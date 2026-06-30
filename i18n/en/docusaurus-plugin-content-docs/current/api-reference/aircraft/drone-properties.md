---
sidebar_label: Drone Device Properties
sidebar_position: 1
---

# Drone Device Properties

## Device Property List

*   **pushMode**：
    *   `0`: The device pushes fixed-frequency data and reports periodically at a frequency of 2 Hz (Topic:`thing/product/{device_sn}/osd`)
    *   `1`: The device pushes state data and reports when the state changes (Topic:`thing/product/{device_sn}/state`)
*   **accessMode**：
    *   `r`: Property can only be read
    *   `rw`: Property can be read and written (Topic:`thing/product/{gateway_sn}/property/set`)

| Column | Name | Type | constraint | Description | accessMode | pushMode |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| best_link_gateway | Gateway SN with the best aircraft image transmission link quality | text | | In a multi-dock (leapfrog) scenario, when the aircraft has been frequency-paired with two Docks, the SN of the Dock with the best connection is pushed | r | 1 |
| wireless_link_topo | Wireless link topology | struct | | | r | 1 |
| »secret_code | Encryption code | array | `{"size": 28, "item_type": int}` | | | 0 |
| »center_node | Aircraft frequency pairing information | struct | | | | 0 |
| »»sdr_id | Scrambling code information | int | | | | 0 |
| »»sn | Device SN | text | | | | 0 |
| »leaf_nodes | Frequency pairing information of the currently connected Dock or remote controller | array | `{"size": -, "item_type": struct}` | | | 0 |
| »»sdr_id | Scrambling code information | int | | | | 0 |
| »»sn | Device SN | text | | | | 0 |
| »»control_source_index | Control source index | int | `{"max":"2","min":"1","step":"1","unit_name":"None / "}` | | | 0 |
| cameras | Aircraft camera information | array | `{"size": -, "item_type": struct}` | | r | 0 |
| »remain_photo_num | Remaining number of photos to take | int | | Remaining number of photos to take | | 0 |
| »remain_record_duration | Remaining recording time | int | `{"unit_name":"Seconds / s"}` | Remaining recording time | | 0 |
| »record_time | Video recording duration | int | `{"unit_name":"Seconds / s"}` | Video recording duration | | 0 |
| »payload_index | Payload index | text | | Payload index. Camera enumeration value. Non-standard device_mode_key, formatted as `{type-subtype-gimbalindex}`. Please refer to [Product Support](/en/api-integration/cloud-api/device-types) | | 0 |
| »camera_mode | Camera mode | enum\_int | `{"0":"Capturing","1":"Recording","2":"Smart Low-Light","3":"Panoramic photography"}` | Camera mode | | 0 |
| »photo_state | Photo capturing status | enum\_int | `{"0":"Idle","1":"Capturing photo"}` | Photo capturing status | | 0 |
| »screen_split_enable | Whether split-screen is enabled | bool | `{"0":"Disable split screen","1":"Enable split screen"}` | | | 0 |
| »recording_state | Recording state | enum\_int | `{"0":"Idle","1":"Recording"}` | Recording state | | 0 |
| »zoom_factor | Zoom factor | float | | | | 0 |
| »ir_zoom_factor | Infrared zoom factor | float | | Infrared zoom factor | | 0 |
| »liveview_world_region | Field of view (FOV) region in liveview | struct | | The field of view of the zoom camera relative to the wide-angle camera or infrared camera may differ in liveview. The coordinate origin is the top-left corner of the lens. | | 0 |
| »»left | X-axis starting point of the top-left corner | float | | X-axis starting point of the top-left corner | r | 0 |
| »»top | Y-axis starting point of the top-left corner | float | | Y-axis starting point of the top-left corner | r | 0 |
| »»right | X-axis starting point of the bottom-right corner | float | | X-axis starting point of the bottom-right corner | r | 0 |
| »»bottom | Y-axis starting point of the bottom-right corner | float | | Y-axis starting point of the bottom-right corner | r | 0 |
| »photo_storage_settings | Photo storage settings collection | array | `{"size": -, "item_type": enum_string}` | Value range `{current, vision, ir}` | | 0 |
| »video_storage_settings | Video storage settings collection | array | `{"size": -, "item_type": enum_string}` | Value range `{current, vision, ir}` | | 0 |
| »wide_exposure_mode | Wide-angle lens exposure mode | enum\_int | `{"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}` | Current configuration of wide-angle lens exposure mode | | 0 |
| »wide_iso | Wide-angle lens ISO | enum\_int | `{"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}` | Current configuration of wide-angle lens ISO | | 0 |
| »wide_shutter_speed | Wide-angle lens shutter speed | enum\_int | `{"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}` | Current configuration of wide-angle lens shutter speed | | 0 |
| »wide_exposure_value | Wide-angle lens exposure value | enum\_int | `{"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}` | Current configuration of wide-angle lens exposure value | | 0 |
| »zoom_exposure_mode | Zoom lens exposure mode | enum\_int | `{"1":"Auto","2":"Shutter Priority","3":"Aperture Priority","4":"Manual"}` | Current configuration of zoom lens exposure mode | | 0 |
| »zoom_iso | Zoom lens ISO | enum\_int | `{"0":"Auto","1":"Auto(High Sense)","2":"50","3":"100","4":"200","5":"400","6":"800","7":"1600","8":"3200","9":"6400","10":"12800","11":"25600","255":"FIXED"}` | Current configuration of zoom lens ISO | | 0 |
| »zoom_shutter_speed | Zoom lens shutter speed | enum\_int | `{"0":"1/8000 s","1":"1/6400 s","2":"1/6000 s","3":"1/5000 s","4":"1/4000 s","5":"1/3200 s","6":"1/3000 s","7":"1/2500 s","8":"1/2000 s","9":"1/1600 s","10":"1/1500 s","11":"1/1250 s","12":"1/1000 s","13":"1/800 s","14":"1/725 s","15":"1/640 s","16":"1/500 s","17":"1/400 s","18":"1/350 s","19":"1/320 s","20":"1/250 s","21":"1/240 s","22":"1/200 s","23":"1/180 s","24":"1/160 s","25":"1/125 s","26":"1/120 s","27":"1/100 s","28":"1/90 s","29":"1/80 s","30":"1/60 s","31":"1/50 s","32":"1/40 s","33":"1/30 s","34":"1/25 s","35":"1/20 s","36":"1/15 s","37":"1/12.5 s","38":"1/10 s","39":"1/8 s","40":"1/6.25 s","41":"1/5 s","42":"1/4 s","43":"1/3 s","44":"1/2.5 s","45":"1/2 s","46":"1/1.67 s","47":"1/1.25 s","48":"1.0 s","49":"1.3 s","50":"1.6 s","51":"2.0 s","52":"2.5 s","53":"3.0 s","54":"3.2 s","55":"4.0 s","56":"5.0 s","57":"6.0 s","58":"7.0 s","59":"8.0 s","65534":"Auto"}` | Current configuration of zoom lens shutter speed | | 0 |
| »zoom_exposure_value | Zoom lens exposure value | enum\_int | `{"1":"-5.0EV","2":"-4.7EV","3":"-4.3EV","4":"-4.0EV","5":"-3.7EV","6":"-3.3EV","7":"-3.0EV","8":"-2.7EV","9":"-2.3EV","10":"-2.0EV","11":"-1.7EV","12":"-1.3EV","13":"-1.0EV","14":"-0.7EV","15":"-0.3EV","16":"0EV","17":"0.3EV","18":"0.7EV","19":"1.0EV","20":"1.3EV","21":"1.7EV","22":"2.0EV","23":"2.3EV","24":"2.7EV","25":"3.0EV","26":"3.3EV","27":"3.7EV","28":"4.0EV","29":"4.3EV","30":"4.7EV","31":"5.0EV","255":"FIXED"}` | Current configuration of zoom lens exposure value | | 0 |
| »zoom_focus_mode | Zoom lens focus mode | enum\_int | `{"0":"MF","1":"AFS","2":"AFC"}` | | | 0 |
| »zoom_focus_value | Zoom lens focus value | int | | | | 0 |
| »zoom_max_focus_value | Zoom lens maximum focus value | int | | | | 0 |
| »zoom_min_focus_value | Zoom lens minimum focus value | int | | | | 0 |
| »zoom_calibrate_farthest_focus_value | Zoom lens calibrated farthest focus value | int | | Farthest position with the clearest focus | | 0 |
| »zoom_calibrate_nearest_focus_value | Zoom lens calibrated nearest focus value | int | | Nearest position with the clearest focus | | 0 |
| »zoom_focus_state | Zoom lens focus state | enum\_int | `{"0":"Idle","1":"Focusing","2":"Focus successful","3":"Focus failed"}` | | | 0 |
| »ir_metering_mode | Infrared metering mode | enum\_int | `{"0":"Temperature measurement off","1":"Spot temperature measurement","2":"Area temperature measurement"}` | | | 0 |
| »ir_metering_point | Infrared metering point | struct | | Information related to the infrared metering point | | 0 |
| »»x | Metering point coordinate x | double | `{"max":1,"min":0}` | The horizontal coordinate x with the top-left corner of the lens as the origin | r | 0 |
| »»y | Metering point coordinate y | double | `{"max":1,"min":0}` | The vertical coordinate y with the top-left corner of the lens as the origin | r | 0 |
| »»temperature | Temperature of the metering point | double | | | r | 0 |
| »ir_metering_area | Infrared metering area | struct | | Information related to the infrared metering area | | 0 |
| »»x | Top-left corner coordinate x of the metering area | double | `{"max":1,"min":0}` | The horizontal coordinate x with the top-left corner of the lens as the origin | r | 0 |
| »»y | Top-left corner coordinate y of the metering area | double | `{"max":1,"min":0}` | The vertical coordinate y with the top-left corner of the lens as the origin | r | 0 |
| »»width | Width of the metering area | double | `{"max":1,"min":0}` | Width of the metering area | r | 0 |
| »»height | Height of the metering area | double | `{"max":1,"min":0}` | Height of the metering area | r | 0 |
| »»aver_temperature | Average temperature of the metering area | double | | Average temperature of the metering area | r | 0 |
| »»min_temperature_point | Lowest temperature point in the metering area | struct | | Information related to the lowest temperature point in the metering area | r | 0 |
| »»»x | Coordinate x of the lowest temperature point | double | `{"max":1,"min":0}` | The horizontal coordinate x with the top-left corner of the lens as the origin | r | 0 |
| »»»y | Coordinate y of the lowest temperature point | double | `{"max":1,"min":0}` | The vertical coordinate y with the top-left corner of the lens as the origin | r | 0 |
| »»»temperature | Temperature of the lowest temperature point | double | | Temperature of the lowest temperature point | r | 0 |
| »»max_temperature_point | Highest temperature point in the metering area | struct | | Information related to the highest temperature point in the metering area | r | 0 |
| »»»x | Coordinate x of the highest temperature point | double | `{"max":1,"min":0}` | The horizontal coordinate x with the top-left corner of the lens as the origin | r | 0 |
| »»»y | Coordinate y of the highest temperature point | double | `{"max":1,"min":0}` | The vertical coordinate y with the top-left corner of the lens as the origin | r | 0 |
| »»»temperature | Temperature of the highest temperature point | double | | Temperature of the highest temperature point | r | 0 |
| flysafe_database_version | Flight safety database version | text | `{"length":"64"}` | | r | 1 |
| offline_map_enable | Offline map switch | bool | `{"0":"Disabled","1":"Enabled"}` | When the offline map is disabled, offline map synchronization no longer performs automatic synchronization | r | 1 |
| current_rth_mode | Current value of the return home altitude mode | enum\_int | `{"0":"Intelligent altitude","1":"Preset altitude"}` | The return home altitude mode currently actually used by the DJI Dock | r | 1 |
| rth_mode | Return home altitude mode setting value | enum\_int | `{"0":"Intelligent altitude","1":"Preset altitude"}` | In intelligent return home mode, the aircraft will automatically plan the optimal return home altitude. The DJI Dock currently does not support setting the return home altitude mode and can only choose the 'Preset altitude' mode. When the environment or lighting does not meet the requirements of the visual system (such as direct sunlight in the evening, or weak or no light at night), the aircraft will use the return home altitude you set for straight-line return home | r | 1 |
| obstacle_avoidance | Aircraft obstacle sensing state | struct | | | rw | 0 |
| »horizon | Horizontal obstacle sensing state | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | | 0 |
| »upside | Upward obstacle sensing state | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | | 0 |
| »downside | Downward obstacle sensing state | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | | 0 |
| is_near_area_limit | Whether approaching the GEO Zone | enum\_int | `{"0":"Not reaching the GEO Zone","1":"Approaching the GEO Zone"}` | | r | 0 |
| is_near_height_limit | Whether approaching the set height limit | enum\_int | `{"0":"Not reaching the set height limit","1":"Approaching the set height limit"}` | | r | 0 |
| height_limit | Aircraft height limit | int | `{"max":"1500","min":"20","step":"1","unit_name":"Meters / m"}` | | rw | 0 |
| night_lights_state | Aircraft night flight light state | enum\_int | `{"0":"Off","1":"On"}` | | rw | 0 |
| activation_time | Aircraft activation time (Unix timestamp) | int | `{"unit_name":"Seconds / s"}` | | r | 0 |
| maintain_status | Maintenance information | struct | | | r | 0 |
| »maintain_status_array | Maintenance information array | array | `{"size": -, "item_type": struct}` | | | 0 |
| »»state | Maintenance state | enum\_int | `{"0":"No maintenance","1":"With maintenance"}` | | | 0 |
| »»last_maintain_type | Last maintenance type | enum\_int | `{"1":"Basic maintenance of the aircraft","2":"Regular maintenance of the aircraft","3":"Deep maintenance of the aircraft"}` | | | 0 |
| »»last_maintain_time | Last maintenance time | date | `{"unit_name":"Seconds / s"}` | | | 0 |
| »»last_maintain_flight_time | Flight hours at the last maintenance | int | `{"unit_name":"Hours / h"}` | | | 0 |
| »»last_maintain_flight_sorties | Flight sorties at the last maintenance | int | `{"max":"2147483647","min":"0","step":"1"}` | | | 0 |
| total_flight_sorties | Accumulated total sorties of the aircraft | int | `{"max":"2147483647","min":"0","step":"1"}` | | r | 0 |
| type_subtype_gimbalindex | Payload index | struct | | Consistent with the field payload\_index | r | 0 |
| »gimbal_pitch | Gimbal pitch axis angle | double | `{"max":"180","min":"-180","step":0.1,"unit_name":"Degrees / °"}` | | | 0 |
| »gimbal_roll | Gimbal roll axis angle | double | `{"max":"180","min":"-180","step":0.1,"unit_name":"Degrees / °"}` | | | 0 |
| »gimbal_yaw | Gimbal yaw axis angle | double | `{"max":"180","min":"-180","step":0.1,"unit_name":"Degrees / °"}` | | | 0 |
| »payload_index | Payload index, formatted as `{type-subtype-gimbalindex}` | text | | | | 0 |
| »zoom_factor | Zoom factor | double | | | | 0 |
| »thermal_current_palette_style | Palette style | enum\_int | `{"0":"White Hot","1":"Black Hot","2":"Red Hot","3":"Medical","5":"Rainbow 1","6":"Iron Red","8":"Arctic","11":"Lava","12":"Hot Iron","13":"Rainbow 2"}` | The infrared camera offers various color styles, allowing users to choose different color palettes based on different scenes for clearer visibility of targets | rw | 0 |
| »thermal_supported_palette_styles | Collection of supported palette styles by the device | array | `{"size": -, "item_type": enum_int}` | The capability of supported styles varies for different devices | r | 1 |
| »thermal_gain_mode | Gain mode | enum\_int | `{"0":"Auto","1":"Low Gain, temperature measurement range 0°C-500°C","2":"High Gain, temperature measurement range -20°C-150°C"}"` | Low gain provides a larger temperature measurement range, while high gain offers higher temperature measurement accuracy | rw | 0 |
| »thermal_isotherm_state | Whether isotherm is enabled | enum\_int | `{"0":"Disabled","1":"Enabled"}` | Isotherm allows users to observe the content of temperature ranges of interest, making objects in the temperature range of interest more prominent | rw | 0 |
| »thermal_isotherm_upper_limit | Upper limit of the temperature range | int | `{"unit_name":"Celsius / °C"}` | Effective only when the isotherm function is enabled | rw | 0 |
| »thermal_isotherm_lower_limit | Lower limit of the temperature range | int | `{"unit_name":"Celsius / °C"}` | Effective only when the isotherm function is enabled | rw | 0 |
| »thermal_global_temperature_min | Lowest temperature measured in the global frame | float | `{"unit_name":"Celsius / °C"}` | | r | 0 |
| »thermal_global_temperature_max | Highest temperature measured in the global frame | float | `{"unit_name":"Celsius / °C"}` | | r | 0 |
| track_id | Track ID | text | `{"length":"64"}` | | r | 0 |
| position_state | Satellite search state | struct | | | r | 0 |
| »is_fixed | Whether converged | enum\_int | `{"0":"Not started","1":"Converging","2":"Convergence successful","3":"Convergence failed"}` | | | 0 |
| »quality | Satellite acquisition mode | enum\_int | `{"1":"Gear 1","2":"Gear 2","3":"Gear 3","4":"Gear 4","5":"Gear 5","10":"RTK fixed"}` | | | 0 |
| »gps_number | Number of GPS satellites | int | | | | 0 |
| »rtk_number | Number of RTK satellites | int | | | | 0 |
| storage | Storage capacity | struct | | kb | r | 0 |
| »total | Total capacity | int | `{"unit_name":"Kilobytes / KB"}` | | | 0 |
| »used | Used capacity | int | `{"unit_name":"Kilobytes / KB"}` | | | 0 |
| battery | Aircraft battery information | struct | | | r | 0 |
| »capacity_percent | Total remaining battery level | int | `{"max":100,"min":0}` | | | 0 |
| »remain_flight_time | Remaining flight time | int | `{"unit_name":"Seconds / s"}` | | | 0 |
| »return_home_power | Percentage of power required for return home | int | `{"max":100,"min":0}` | | | 0 |
| »battery_percent_reserve_home | Additional return home battery percentage | int | `{"max":100,"min":0}` | Return home battery percentage forcibly set by the Dock: actual return home battery percentage = battery percentage required for return home + additional return home battery percentage | | 0 |
| »landing_power | Forced landing battery percentage | int | `{"max":100,"min":0}` | | | 0 |
| »batteries | Battery details | array | `{"size": -, "item_type": struct}` | | | 0 |
| »»capacity_percent | Remaining battery level | int | `{"max":100,"min":0}` | | | 0 |
| »»index | Battery index | int | `{"min":"0"}` | | | 0 |
| »»sn | Battery serial number (SN) | text | | | | 0 |
| »»type | Battery type | enum\_int | `{}` | | | 0 |
| »»sub_type | Battery subtype | enum\_int | `{}` | | | 0 |
| »»firmware_version | Firmware version | text | | | | 0 |
| »»loop_times | Battery cycle count | int | | | | 0 |
| »»voltage | Voltage | int | `{"unit_name":"Millivolts / mV"}` | | | 0 |
| »»temperature | Temperature | float | `{"unit_name":"Celsius / °C"}` | Retain one decimal place | | 0 |
| »»high_voltage_storage_days | High voltage storage days | int | `{"unit_name":"Days / day"}` | | | 0 |
| total_flight_distance | Accumulated total flight distance of the aircraft | float | `{"unit_name":"Meters / m"}` | | r | 0 |
| total_flight_time | Accumulated total flight time of the aircraft | float | `{"unit_name":"Seconds / s"}` | | r | 0 |
| serious_low_battery_warning_threshold | Critical low battery warning | int | | User-set battery critically low warning percentage | r | 1 |
| low_battery_warning_threshold | Low battery warning | int | | User-set battery low warning percentage | r | 1 |
| control_source | Current control source | text | | Can be a device or a browser. Devices use A/B to represent Controller A and Controller B, while browsers use a self-generated UUID as the identifier. | r | 1 |
| wind_direction | Current wind direction | enum\_int | `{"1":"True North","2":"Northeast","3":"East","4":"Southeast","5":"South","6":"Southwest","7":"West","8":"Northwest"}` | | r | 0 |
| wind_speed | Wind speed | float | `{"unit_name":"0.1 Meters per second / m/s"}` | Estimated wind speed, calculated based on the aircraft's attitude with some margin of error. It is for reference only and should not be used as meteorological data. | r | 0 |
| home_distance | Distance from the Home point | float | | | r | 0 |
| home_latitude | Home point latitude | float | | | r | 1 |
| home_longitude | Home point longitude | float | | | r | 1 |
| attitude_head | Yaw axis angle | int | | Yaw axis angle relative to true north (longitude). Positive values from the 0 to 6 o'clock direction, negative values from the 6 to 12 o'clock direction. | r | 0 |
| attitude_roll | Roll axis angle | float | | | r | 0 |
| attitude_pitch | Pitch axis angle | float | | | r | 0 |
| elevation | Height relative to takeoff point | float | | | r | 0 |
| height | Absolute altitude | float | | Height relative to the Earth ellipsoid surface. Calculation: height relative to takeoff point + ellipsoid height of takeoff point | r | 0 |
| latitude | Current latitude | float | `{"max":"3.402...","min":"-1.4E-45","step":"0.1"}` | | r | 0 |
| longitude | Current longitude | float | `{"max":"3.402...","min":"-1.4E-45","step":"0.1"}` | | r | 0 |
| vertical_speed | Vertical speed | float | `{"unit_name":"Meters per second / m/s"}` | | r | 0 |
| horizontal_speed | Horizontal speed | float | | | r | 0 |
| firmware_upgrade_status | Firmware upgrade state | enum\_int | `{"0":"Not upgraded","1":"Upgrading"}` | | r | 1 |
| compatible_status | Firmware consistency | enum\_int | `{"0":"No consistency upgrade required","1":"Consistency upgrade required"}` | Consistency upgrade: refers to the case where the firmware version of certain modules of the aircraft is inconsistent with the version matched by the system... | r | 1 |
| firmware_version | Firmware version | text | `{"length":"64"}` | | r | 1 |
| gear | Gear | enum\_int | `{"0":"A","1":"P","2":"NAV","3":"FPV","4":"FARM","5":"S","6":"F","7":"M","8":"G","9":"T"}` | | r | 0 |
| mode_code_reason | The reason the aircraft entered the current state | enum\_int | `{"0":"No meaning","1":"Insufficient battery power (return, landing)","2":"Insufficient battery voltage (return, landing)","3":"Severely low voltage (return, landing)","4":"Requested by remote controller buttons (takeoff, return, landing)","5":"Requested by App (takeoff, return, landing)","6":"Loss of remote controller signal (return, landing, hover)","7":"Triggered by external devices such as navigation, SDK, etc. (takeoff, return, landing)","8":"Entered the dock GEO Zone (landing)","9":"Although a return was triggered, it was too close to the Home point (landing)","10":"Although a return was triggered, it was too far from the Home point (landing)","11":"Requested when executing waypoint missions (takeoff)","12":"Requested after reaching above the Home point in the return phase (landing)","13":"Continued descent after the aircraft's height dropped to 0.7m from the ground (second-stage descent limit) leading to (landing)","14":"Forced breakthrough of low altitude protection by devices like App, SDK (landing)","15":"Requested due to passing flights in the vicinity (return, landing)","16":"Requested due to height control failure (return, landing)","17":"Entered after intelligent low battery return (landing)","18":"AP controls the flight mode (manual flight)","19":"Hardware abnormality (return, landing)","20":"End of anti-collision protection (landing)","21":"Return canceled (hover)","22":"Encountered obstacles during the return (landing)","23":"Triggered by strong wind in the dock scenario (return)"}` | | r | 1 |
| commander_flight_height | Commander flight altitude | float | `{"max":3000,"min":2,"step":0.1,"unit_name":"Meters / m"}` | Altitude relative to the (Dock) takeoff point, relative altitude ALT | rw | 1 |
| commander_flight_mode | Commander flight mode setting value | enum\_int | `{"0":"Intelligent altitude flight","1":"Preset altitude flight"}` | Commander flight mode setting value | rw | 1 |
| commander_mode_lost_action | Commander flight lost-control action | enum\_int | `{"0":"Continue executing the commander flight mission","1":"Exit the commander flight mission and execute normal lost-control behavior"}` | When control is lost during commander flight, choose whether to continue executing it or to execute the normal lost-control behavior | rw | 1 |
| camera_watermark_settings | Camera watermark settings | struct | | Users configure watermarks for photos and video files captured by the camera. Watermarks on live streaming footage are currently not supported. | rw | 1 |
| »global_enable | Watermark display global enable switch | enum\_int | `{"0":"Disabled","1":"Enabled"}` | The global enable switch must be turned on to display watermarks | rw | 1 |
| »drone_type_enable | Aircraft model display switch | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | rw | 1 |
| »drone_sn_enable | Aircraft serial number display switch | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | rw | 1 |
| »datetime_enable | Date and time display switch | enum\_int | `{"0":"Disabled","1":"Enabled"}` | Time zone defaults to local time zone | rw | 1 |
| »gps_enable | Latitude, longitude and altitude display switch | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | rw | 1 |
| »user_custom_string_enable | Custom text display switch | enum\_int | `{"0":"Disabled","1":"Enabled"}` | | rw | 1 |
| »user_custom_string | Custom text content | text | | Up to 250 bytes can be displayed | rw | 1 |
| »layout | Position of the watermark in the frame | enum\_int | `{"0":"Top-left","1":"Bottom-left","2":"Top-right","3":"Bottom-right"}` | | rw | 1 |
| mode_code | Aircraft state | enum\_int | `{"0":"Standby","1":"Takeoff preparation","2":"Takeoff preparation completed","3":"Manual flight","4":"Automatic takeoff","5":"Wayline flight","6":"Panoramic photography","7":"Intelligent tracking","8":"ADS-B avoidance","9":"Auto returning to home","10":"Automatic landing","11":"Forced landing","12":"Three-blade landing","13":"Upgrading","14":"Not connected","15":"APAS","16":"Virtual stick state","17":"Live Flight Controls","18":"Airborne RTK fixing mode","19":"Dock site selection in progress"}` | Dock site selection refers to the aircraft hovering in the air to select the Dock location and check RTK signal quality | r | 0 |
| distance_limit_status | Aircraft distance limit state | struct | | | rw | 0 |
| »state | Whether distance limit is enabled | enum\_int | `{"0":"Not set","1":"Set"}` | | | 0 |
| »distance_limit | Distance limit | int | `{"max":"8000","min":"15","step":"1","unit_name":"Meters / m"}` | | | 0 |
| »is_near_distance_limit | Whether approaching the set distance limit | enum\_int | `{"0":"Not reaching the set distance limit","1":"Approaching the set distance limit"}` | | r | 0 |
| psdk_ui_resource | PSDK UI resource package | array | `{"size": -, "item_type": struct}` | | r | 1 |
| »psdk_index | PSDK payload device index | int | `{"min":0}` | | r | 1 |
| »psdk_ready | PSDK ready state | enum\_int | `{"0":"Not ready","1":"Ready"}` | | r | 1 |
| »object_key | OSS object | text | | | r | 1 |
| psdk_widget_values | PSDK payload device property values | array | `{"size": -, "item_type": struct}` | | r | 1 |
| »psdk_index | PSDK payload device index | int | `{"min":0}` | | r | 1 |
| »psdk_name | Device name | text | | | r | 1 |
| »psdk_sn | Device serial number | text | | | r | 1 |
| »psdk_version | Device firmware version | text | | | r | 1 |
| »psdk_lib_version | PSDK lib version | text | | | r | 1 |
| »speaker | Speaker state | struct | | | r | 1 |
| »»work_mode | Speaker working mode | enum\_int | `{"0":"TTS payload mode","1":"Recording and speaking"}` | | r | 1 |
| »»play_mode | Speaker playback mode | enum\_int | `{"0":"Single play","1":"Loop play (single track)"}` | | r | 1 |
| »»play_volume | Speaker volume | int | `{"max":100,"min":0,"step":1}` | | r | 1 |
| »»system_state | Speaker state | enum\_int | `{"0":"Idle","1":"Transmitting (from Dock to aircraft)","2":"Playing","3":"Abnormal","4":"TTS text conversion in progress","99":"Downloading (Dock downloads from cloud)"}` | | r | 1 |
| »»play_file_name | Name of the file most recently played by the speaker | text | `{"length":128,"unit_name":"Bytes / B"}` | | r | 1 |
| »»play_file_md5 | MD5 checksum of the file most recently played by the speaker | text | | | r | 1 |
| »values | PSDK widget value list | array | `{"size": -, "item_type": struct}` | | r | 1 |
| »»index | Widget number | int | `{"min":0,"step":1}` | | r | 1 |
| »»value | Widget value | int | `{}` | | r | 1 |
