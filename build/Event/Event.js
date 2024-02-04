"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const easymidi_1 = __importDefault(require("easymidi"));
const const_1 = require("../utils/const");
class Event {
    constructor(channel, eventType, note, velocity) {
        this.channel = channel;
        this.eventType = eventType;
        this.note = note;
        this.velocity = velocity;
        this.output = new easymidi_1.default.Output(const_1.network, false);
    }
    sendMidi() {
        const payload = this.eventType === "cc"
            ? {
                controller: this.note,
                value: this.velocity,
                channel: this.channel,
            }
            : {
                note: this.note,
                velocity: this.velocity,
                channel: this.channel,
            };
        this.output.send(this.eventType, payload);
        console.log(this.eventType, payload);
    }
    sendMidiWithTransition(transition) {
        const isEaseIn = transition[0] < transition[1];
        const delay = 3;
        const iterate = (i) => {
            setTimeout(() => {
                this.velocity = i;
                this.sendMidi();
                if ((isEaseIn && i < transition[1]) || (!isEaseIn && i > transition[1])) {
                    iterate(isEaseIn ? i + 1 : i - 1);
                }
            }, delay);
        };
        iterate(transition[0]);
    }
    init() {
        console.log("init");
    }
}
exports.Event = Event;
