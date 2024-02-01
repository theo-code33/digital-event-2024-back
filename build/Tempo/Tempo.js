"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tempo = void 0;
class Tempo {
    constructor(bpm, loopLength) {
        this.bpm = bpm;
        this.loopLength = loopLength;
    }
    getBpm() {
        return this.bpm;
    }
    midiGateway() {
        console.log();
    }
    setBpm(bpm) {
        this.bpm = bpm;
    }
    setLoopLength(loopLength) {
        this.loopLength = loopLength;
    }
    getLoopLength() {
        return this.loopLength;
    }
}
exports.Tempo = Tempo;
