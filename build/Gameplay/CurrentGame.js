"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gameplay_1 = require("./Gameplay");
const DisplayConnectedDevices_1 = __importDefault(require("./utils/DisplayConnectedDevices"));
const GameplayEvent_1 = __importDefault(require("./GameplayEvent"));
class CurrentGame {
    constructor() {
        this.totalScore = 0;
        this.player1Domination = 50;
    }
    startGame() {
        const devicePaths = (0, DisplayConnectedDevices_1.default)();
        this.player1 = new Gameplay_1.Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79]);
        this.player2 = new Gameplay_1.Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4]);
        this.player1.init();
        this.player2.init();
    }
    checkScore() {
        this.totalScore = this.player1.level + this.player2.level;
        this.player1Domination = Math.round((this.player1.level / this.totalScore) * 100);
        console.log(this.player1Domination);
        new GameplayEvent_1.default([this.player1.level, this.player2.level]).sendEvent();
    }
    stopGame() {
        this.player1 = null;
        this.player2 = null;
    }
}
exports.default = CurrentGame;
