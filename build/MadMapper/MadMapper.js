"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MadMapper = void 0;
const Event_1 = __importDefault(require("../Event"));
class MadMapper extends Event_1.default {
    constructor(channel, eventType, note, velocity) {
        super(channel, eventType, note, velocity);
        this.channel = channel;
        this.eventType = eventType;
        this.note = note;
        this.velocity = velocity;
    }
}
exports.MadMapper = MadMapper;
