"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logic = void 0;
const Event_1 = require("../Event/Event");
class Logic extends Event_1.Event {
    constructor(channel, eventType, note, velocity) {
        super(channel, eventType, note, velocity);
        this.channel = channel;
        this.eventType = eventType;
        this.note = note;
        this.velocity = velocity;
    }
}
exports.Logic = Logic;
