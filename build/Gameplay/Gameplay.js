"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gameplay = void 0;
const HID = __importStar(require("node-hid"));
const InitialCombination_1 = __importDefault(require("./utils/InitialCombination"));
const DisplayConnectedDevices_1 = __importDefault(require("./utils/DisplayConnectedDevices"));
class Gameplay {
    constructor(path, deviceSlot, initialBtnValue, possibilityPlayer) {
        this.gameArray = [];
        this.level = 1;
        this.hidiDevice = new HID.HID(path);
        this.deviceSlot = deviceSlot;
        this.initialBtnValue = initialBtnValue;
        this.possibilityPlayer = possibilityPlayer;
        this.combinationPlayer = (0, InitialCombination_1.default)(this.possibilityPlayer);
    }
    init() {
        console.log(this.combinationPlayer);
        let isClicking = false;
        this.hidiDevice.on("data", (data) => {
            const inputArray = Array.from(data);
            if (inputArray[this.deviceSlot] != this.initialBtnValue && !isClicking) {
                console.log(inputArray[this.deviceSlot], this.combinationPlayer, this.level);
                this.gameArray.push(inputArray[this.deviceSlot]);
                const game = this.checkCombinationPlayer();
                game ? this.level++ : null;
                isClicking = true;
            }
            else if (inputArray[this.deviceSlot] == this.initialBtnValue && isClicking) {
                isClicking = false;
            }
        });
        this.hidiDevice.on("error", (error) => {
            console.error("error:", error);
        });
    }
    checkCombinationPlayer() {
        for (let i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i] != this.combinationPlayer[i]) {
                this.gameArray.length = 0;
                console.log("error !");
                return false;
            }
            else {
                if (i === this.combinationPlayer.length - 1) {
                    console.log("success !");
                    const newPossibility = this.possibilityPlayer[Math.floor(Math.random() * this.possibilityPlayer.length)];
                    this.combinationPlayer.push(newPossibility);
                    this.gameArray.length = 0;
                    return true;
                }
            }
        }
    }
}
exports.Gameplay = Gameplay;
const devicePaths = (0, DisplayConnectedDevices_1.default)();
const device1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79]);
const device2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4]);
device1.init();
device2.init();
