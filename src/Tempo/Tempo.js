"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tempo = void 0;
var Tempo = /** @class */ (function () {
    function Tempo(bpm) {
        this.bpm = bpm;
    }
    Tempo.prototype.getBpm = function () {
        return this.bpm;
    };
    Tempo.prototype.setBpm = function (bpm) {
        this.bpm = bpm;
    };
    return Tempo;
}());
exports.Tempo = Tempo;
