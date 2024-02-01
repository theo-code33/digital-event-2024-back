"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const HID = __importStar(require("node-hid"));
const displayConnectedDevices = () => {
    const devices = HID.devices();
    if (typeof devices !== "undefined" && devices.length > 0) {
        const devicePaths = devices.filter((device) => device.manufacturer && device.manufacturer.includes("DragonRise"));
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
