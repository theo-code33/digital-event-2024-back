"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentMidi = exports.currentTempo = exports.Gameplay = exports.Logic = exports.MadMapper = exports.Event = exports.Midi = exports.Tempo = void 0;
const Tempo_1 = __importDefault(require("./Tempo"));
exports.Tempo = Tempo_1.default;
const Midi_1 = __importDefault(require("./Midi"));
exports.Midi = Midi_1.default;
const Event_1 = __importDefault(require("./Event"));
exports.Event = Event_1.default;
const MadMapper_1 = __importDefault(require("./MadMapper"));
exports.MadMapper = MadMapper_1.default;
const Logic_1 = __importDefault(require("./Logic"));
exports.Logic = Logic_1.default;
const Gameplay_1 = __importDefault(require("./Gameplay"));
exports.Gameplay = Gameplay_1.default;
const ResetAllVolumes_1 = __importDefault(require("./Logic/utils/ResetAllVolumes"));
exports.currentTempo = new Tempo_1.default(120, 1000);
exports.currentMidi = new Midi_1.default("midi", 120, 1000);
// currentMidi.listenLogicTempo(false);
// const initFunction = {
//     function: () => {console.log('init function')},
//     isAlreadyFired: false
// }
// currentMidi.listenLogicTempo(true, initFunction);
(0, ResetAllVolumes_1.default)(0, [1, 2, 3, 4, 5, 6, 7, 8], "cc");
(0, ResetAllVolumes_1.default)(1, [1, 2, 3, 4, 5, 6, 7, 8], "cc");
(0, ResetAllVolumes_1.default)(2, [1, 2, 3, 4, 5, 6, 7, 8], "cc");
