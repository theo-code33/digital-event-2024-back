"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gameplay = void 0;
var HID = require("node-hid");
var InitialCombination_1 = require("./utils/InitialCombination");
var DisplayConnectedDevices_1 = require("./utils/DisplayConnectedDevices");
var Gameplay = /** @class */ (function () {
    function Gameplay(path, deviceSlot, initialBtnValue, possibilityPlayer) {
        this.gameArray = [];
        this.level = 1;
        this.hidiDevice = new HID.HID(path);
        this.deviceSlot = deviceSlot;
        this.initialBtnValue = initialBtnValue;
        this.possibilityPlayer = possibilityPlayer;
        this.combinationPlayer = (0, InitialCombination_1.default)(this.possibilityPlayer);
    }
    Gameplay.prototype.init = function () {
        var _this = this;
        console.log(this.combinationPlayer);
        var isClicking = false;
        this.hidiDevice.on("data", function (data) {
            var inputArray = Array.from(data);
            if (inputArray[_this.deviceSlot] != _this.initialBtnValue && !isClicking) {
                _this.gameArray.push(inputArray[_this.deviceSlot]);
                var game = _this.checkCombinationPlayer();
                game ? _this.level++ : null;
                isClicking = true;
            }
            else if (inputArray[_this.deviceSlot] == _this.initialBtnValue && isClicking) {
                isClicking = false;
            }
        });
        this.hidiDevice.on("error", function (error) {
            console.error("error:", error);
        });
    };
    Gameplay.prototype.checkCombinationPlayer = function () {
        for (var i = 0; i < this.gameArray.length; i++) {
            if (this.gameArray[i] != this.combinationPlayer[i]) {
                this.gameArray.length = 0;
                console.log("BEURRE !");
                return false;
            }
            else {
                if (i === this.combinationPlayer.length - 1) {
                    var newPossibility = this.possibilityPlayer[Math.floor(Math.random() * this.possibilityPlayer.length)];
                    this.combinationPlayer.push(newPossibility);
                    this.gameArray.length = 0;
                    return true;
                }
            }
        }
    };
    return Gameplay;
}());
exports.Gameplay = Gameplay;
var devicePaths = (0, DisplayConnectedDevices_1.default)();
var device1 = new Gameplay(devicePaths[0].path, 5, 15, [31, 47, 79]);
var device2 = new Gameplay(devicePaths[1].path, 6, 0, [1, 2, 4]);
device1.init();
device2.init();
