import * as HID from "node-hid";

const displayConnectedDevices = () => {
    const devices = HID.devices();
    if (typeof devices !== "undefined" && devices.length > 0) {
        const devicePaths = devices.filter((device) =>
            device.manufacturer && device.manufacturer.includes("DragonRise")
        );
        if (devicePaths.length > 0) {

            return devicePaths;
        } else {
            console.log("No DragonRise devices found");
            return "No DragonRise device found";
        }
    } else {
        console.log("No devices found");
        return "No device found";
    }
}

export default displayConnectedDevices;