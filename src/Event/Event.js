"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var easymidi = require("easymidi");
var const_1 = require("../utils/const");
var Event = /** @class */ (function () {
    function Event(channel, event, note, velocity) {
        this.channel = channel;
        this.event = event;
        this.note = note;
        this.velocity = velocity;
        this.output = new easymidi.Output(const_1.network, false);
    }
    Event.prototype.sendMidi = function () {
        var payload = this.event === "cc"
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
        this.output.send(this.event, payload);
    };
    Event.prototype.init = function () {
        console.log("init");
    };
    return Event;
}());
exports.Event = Event;
