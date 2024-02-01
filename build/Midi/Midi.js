"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midi = void 0;
const Tempo_1 = __importDefault(require("../Tempo"));
class Midi extends Tempo_1.default {
    constructor(midi, bpm) {
        super(bpm);
        this.midi = midi;
    }
    startFunction() {
        console.log("Midi startFunction");
    }
}
exports.Midi = Midi;
