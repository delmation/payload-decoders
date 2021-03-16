# Milesight EM300-SLD - Spot Leak Detection Sensor
![EM300-SLD](EM300-SLD.png)

Deze payload decoder is voor de Milesight EM300-SLD.

Voor meer informatie bezoek (https://wwww.delmation.nl).


## Payload Definitie

 ```
                    [channel_id] [channel_type] [channel_value]
 01: battery      -> 0x01         0x75          [1byte ] Unit: %
 03: temperature  -> 0x03         0x67          [2bytes] Unit: °C
 04: humidity     -> 0x04         0x68          [1byte ] Unit: %
 05: waterleak    -> 0x05         0x00          [1byte ] Unit:

 ```

## Voorbeeld voor The Things Network v3

**Payload**
```
01 75 5C 03 67 B6 00 04 68 5B 05 00 01
```



**Data Segmentation**

   - `01 75 5C`
   - `03 67 B6 00`
   - `04 68 5B`
   - `05 00 01`



**Output**

 ```json
{
  "battery": 92,
  "temperature": 18.2,
  "humidity": 45.5,
  "waterleak": 1
}
 ```
