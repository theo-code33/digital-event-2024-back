"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tempo = void 0;
const node_timers_1 = require("node:timers");
const index_1 = require("../index");
class Tempo {
    constructor(bpm, loopLength) {
        this.bpm = bpm;
        this.loopLength = loopLength;
        this.intervalId = null;
        this.currentMesure = 1;
    }
    getBpm() {
        return this.bpm;
    }
    midiGateway(callback) {
        this.intervalId = setInterval(() => {
            callback();
            console.log(index_1.currentTempo.getLoopLength());
        }, index_1.currentTempo.getLoopLength());
    }
    setBpm(bpm) {
        this.bpm = bpm;
    }
    setLoopLength(loopLength) {
        this.loopLength = loopLength;
        (0, node_timers_1.clearInterval)(this.intervalId);
    }
    getLoopLength() {
        return this.loopLength;
    }
    setCurrentMesure(mesure) {
        this.currentMesure = mesure == 17 ? 1 : mesure;
    }
    getCurrentMesure() {
        return this.currentMesure;
    }
}
exports.Tempo = Tempo;
