"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tempo = void 0;
const node_timers_1 = require("node:timers");
const index_1 = require("../index");
const const_1 = require("../utils/const");
class Tempo {
    constructor(bpm, loopLength) {
        this.bpm = bpm;
        this.loopLength = loopLength;
        this.intervalId = null;
        this.currentMesure = 1;
        this.loopIndex = 0;
        this.moduloLoops = 0;
        this.currentChan = 0;
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
        if (mesure === 13) {
            this.currentMesure = 1;
            index_1.currentTempo.setLoopIndex();
        }
        else {
            this.currentMesure = mesure;
        }
    }
    getCurrentMesure() {
        return this.currentMesure;
    }
    setLoopIndex() {
        this.loopIndex++;
        switch (this.loopIndex) {
            case 2:
                this.currentChan += 1;
                break;
            case 4:
                this.currentChan++;
                break;
            case 6:
                this.currentChan++;
                break;
            default:
                break;
        }
    }
    setModuloLoops() {
        this.moduloLoops = Math.floor(const_1.gameLength / this.loopLength);
        console.log("modulo loops: ", this.moduloLoops, "game length: ", const_1.gameLength, "loop index: ", this.loopIndex);
    }
}
exports.Tempo = Tempo;
