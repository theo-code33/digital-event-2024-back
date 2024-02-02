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
const Logic_1 = __importDefault(require("../Logic"));
class Midi extends Tempo_1.default {
    constructor(midi, bpm, loopLength) {
        super(bpm, loopLength);
        this.midi = midi;
        this.tempoNotesArray = [];
        this.isAlreadyStarted = false;
        this.isRestarting = false;
        this.input = new easymidi_1.default.Input(const_1.network, false);
    }
    listenLogicTempo(callbackFunction) {
        this.input.on("noteon", (msg) => {
            if (msg.velocity === 112 && !this.isRestarting) {
                index_1.currentTempo.setCurrentMesure(index_1.currentTempo.getCurrentMesure() + 1);
                this.tempoNotesArray.push(new Date().getTime());
                const lastNote = this.tempoNotesArray[this.tempoNotesArray.length - 1];
                const noteBeforeLastNote = this.tempoNotesArray[this.tempoNotesArray.length - 2];
                const deltaTime = lastNote - noteBeforeLastNote;
                console.log("current loop length:", index_1.currentTempo.getLoopLength(), 'current bpm:', index_1.currentTempo.getBpm(), "current mesure:", index_1.currentTempo.getCurrentMesure());
                if (index_1.currentTempo.getCurrentMesure() === 1) {
                    callbackFunction();
                }
                if (this.tempoNotesArray.length == 2 && !this.isAlreadyStarted) {
                    new Logic_1.default(0, "cc", "4", "10").sendMidi();
                    console.log("restart !");
                    this.isAlreadyStarted = true;
                    this.isRestarting = true;
                    setTimeout(() => {
                        this.isRestarting = false;
                        index_1.currentTempo.setBpm(60000 / deltaTime * 4);
                        index_1.currentTempo.setLoopLength(deltaTime * 15);
                        index_1.currentTempo.setCurrentMesure(1);
                        index_1.currentTempo.midiGateway(() => {
                            console.log('has just restarted !');
                        });
                    }, deltaTime);
                }
            }
        });
    }
}
exports.Midi = Midi;
