"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logic_1 = __importDefault(require("../Logic"));
const index_1 = require("../index");
class GameplayEvent {
    constructor(player1Domination) {
        this.player1Domination = player1Domination;
    }
    sendEvent() {
        switch (this.player1Domination) {
            case 0:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "8", "90").sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 17:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "3", "90").sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 33:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "7", "90").sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 50:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "2", "90").sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 66:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "6", "90").sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 83:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "5", "90").sendMidi();
                    },
                    isAlreadyFired: false
                });
                break;
            case 100:
                index_1.currentMidi.listenLogicTempo(true, {
                    function: () => {
                        new Logic_1.default(0, "cc", "5", "90").sendMidi();
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
