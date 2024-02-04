"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = __importDefault(require("../Logic"));
const index_1 = require("../index");
class GameplayEvent {
    constructor(score1, score2) {
        this.score1 = score1;
        this.score2 = score2;
    }
    sendEvent() {
        switch (this.score1 - this.score2) {
            case -3:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 1, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case -2:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 2, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case -1:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 3, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 0:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 4, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 1:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 5, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 2:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 6, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 3:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(index_1.currentTempo.getCurrentChan(), "cc", 7, 90).sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            default:
                break;
        }
    }
}
exports.default = GameplayEvent;
