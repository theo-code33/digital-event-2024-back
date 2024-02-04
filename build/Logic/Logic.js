"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logic = void 0;
const Event_1 = require("../Event/Event");
class Logic extends Event_1.Event {
    constructor(channel, eventType, note, velocity, controllers) {
        super(channel, eventType, note, velocity);
        this.channel = channel;
        this.eventType = eventType;
        this.note = note;
        this.velocity = velocity;
        this.controllers = controllers;
    }
    setAllVolumes(transition) {
        if (this.controllers && transition) {
            this.controllers.forEach((controller) => {
                new Event_1.Event(this.channel, this.eventType, controller, this.velocity).sendMidiWithTransition(transition);
            });
        }
        else if (this.controllers && !transition) {
            this.controllers.forEach((controller) => {
                new Event_1.Event(this.channel, this.eventType, controller, this.velocity).sendMidi();
            });
        }
    }
}
exports.Logic = Logic;
