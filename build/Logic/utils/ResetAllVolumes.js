"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = require("../Logic");
const resetAllVolumes = (channel, controllers, eventType) => {
    controllers.forEach((controller) => {
        new Logic_1.Logic(channel, eventType, controller, 0).sendMidi();
    });
};
exports.default = resetAllVolumes;
