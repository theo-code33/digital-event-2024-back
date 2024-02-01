"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HID = require("node-hid");
var displayConnectedDevices = function () {
    var devices = HID.devices();
    if (typeof devices !== "undefined" && devices.length > 0) {
        var devicePaths = devices.filter(function (device) {
            return device.manufacturer && device.manufacturer.includes("DragonRise");
        });
        if (devicePaths.length > 0) {
            return devicePaths;
        }
        else {
            console.log("No DragonRise devices found");
            return "No DragonRise device found";
        }
    }
    else {
        console.log("No devices found");
        return "No device found";
    }
};
exports.default = displayConnectedDevices;
