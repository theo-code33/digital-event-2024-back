"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Midi = void 0;
var easymidi = require("easymidi");
var Tempo_1 = require("../Tempo");
var Midi = /** @class */ (function (_super) {
    __extends(Midi, _super);
    function Midi(midi, bpm) {
        var _this = _super.call(this, bpm) || this;
        _this.midi = midi;
        _this.output = new easymidi.Output("Réseau leo-theo", false);
        return _this;
    }
    Midi.prototype.startFunction = function () {
        console.log("Midi startFunction");
    };
    return Midi;
}(Tempo_1.default));
exports.Midi = Midi;
