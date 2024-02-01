"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midi = void 0;
const Tempo_1 = __importDefault(require("../Tempo"));
const easymidi_1 = __importDefault(require("easymidi"));
const const_1 = require("../utils/const");
const index_1 = require("../index");
class Midi extends Tempo_1.default {
    constructor(midi, bpm, loopLength) {
        super(bpm, loopLength);
        this.midi = midi;
        this.tempoNotesArray = [];
        this.input = new easymidi_1.default.Input(const_1.network, false);
    }
    listenMidi() {
        this.input.on("noteon", (msg) => {
            if (msg.velocity === 112) {
                this.tempoNotesArray.push(new Date().getTime());
                const lastNote = this.tempoNotesArray[this.tempoNotesArray.length - 1];
                const noteBeforeLastNote = this.tempoNotesArray[this.tempoNotesArray.length - 2];
                const deltaTime = lastNote - noteBeforeLastNote;
                index_1.currentTempo.setBpm(60000 / deltaTime * 4);
                index_1.currentTempo.setLoopLength(deltaTime * 16);
                console.log(index_1.currentTempo.getBpm(), index_1.currentTempo.getLoopLength());
            }
        });
    }
}
exports.Midi = Midi;
