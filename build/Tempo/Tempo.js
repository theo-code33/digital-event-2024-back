"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tempo = void 0;
class Tempo {
    constructor(bpm) {
        this.bpm = bpm;
    }
    getBpm() {
        return this.bpm;
    }
    setBpm(bpm) {
        this.bpm = bpm;
    }
}
exports.Tempo = Tempo;
