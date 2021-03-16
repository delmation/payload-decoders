/**
 * Payload Decoder for The Things Network V3
 *
 * Copyright 2021 Delmation Products
 *
 * @product EM300-ZLD
 */
 function decodeUplink(input) {

    var bytes = input.bytes;

    var decoded = {};

    for (var i = 0; i < bytes.length;) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];
        // BATTERY
        if (channel_id === 0x01 && channel_type === 0x75) {
            decoded.battery = bytes[i];
            i += 1;
        }
        // TEMPERATURE
        else if (channel_id === 0x03 && channel_type === 0x67) {
            // ℃
            decoded.temperature = readInt16LE(bytes.slice(i, i + 2)) / 10;
            i += 2;
        }
        // HUMIDITY
        else if (channel_id === 0x04 && channel_type === 0x68) {
            decoded.humidity = bytes[i] / 2;
            i += 1;
        }
        // WATER LEAK
        else if (channel_id === 0x05 && channel_type === 0x00) {
            decoded.waterleak = (bytes[i] === 0) ? '1' : '0';
            i += 1;
        } else {
            break;
        }
    }

    return {
      data: decoded
    };

}

function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return value & 0xffff;
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return ref > 0x7fff ? ref - 0x10000 : ref;
}
