"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gameplay = exports.Logic = exports.MadMapper = exports.Event = exports.Midi = exports.Tempo = void 0;
var Tempo_1 = require("./Tempo");
exports.Tempo = Tempo_1.default;
var Midi_1 = require("./Midi");
exports.Midi = Midi_1.default;
var Event_1 = require("./Event");
exports.Event = Event_1.default;
var MadMapper_1 = require("./MadMapper");
exports.MadMapper = MadMapper_1.default;
var Logic_1 = require("./Logic");
exports.Logic = Logic_1.default;
var Gameplay_1 = require("./Gameplay");
exports.Gameplay = Gameplay_1.default;
(function () {
    var e = new Event_1.default("1", "noteon", "1", "1").init();
    new Event_1.default("1", "noteon", "1", "1").sendMidi();
})();
