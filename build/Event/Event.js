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
exports.Event = void 0;
const easymidi = __importStar(require("easymidi"));
const const_1 = require("../utils/const");
class Event {
    constructor(channel, event, note, velocity) {
        this.channel = channel;
        this.event = event;
        this.note = note;
        this.velocity = velocity;
        this.output = new easymidi.Output(const_1.network, false);
    }
    sendMidi() {
        const payload = this.event === "cc"
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
    }
}
exports.Event = Event;
